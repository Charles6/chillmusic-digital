import React, { useEffect, useMemo, useRef, useState } from "react";
import { ARRANGEMENTS, DEFAULT_CONTEXT } from "../data/arrangements";
import { BUILTIN_LAYERS } from "../data/layers";
import { compile } from "../lib/compiler";
import {
  ensureStrudelReady,
  hushStrudel,
  playCode,
  setStrudelVolume,
} from "../lib/strudel";
import LayerItem from "./layer-builder/LayerItem";
import ZenMode from "./layer-builder/ZenMode";
import {
  // Auth imports — commented out until accounts are enabled:
  // AccountBtn,
  // ModalActions,
  // ModalCancelBtn,
  // ModalError,
  // ModalHint,
  // ModalInput,
  // ModalOverlay,
  // ModalPanel,
  // ModalSubmitBtn,
  // ModalTitle,
  // SaveBtn,
  ArrangeBtn,
  ArrangeRow,
  CodeHead,
  CodePanel,
  CopyBtn,
  DisplayBar,
  DisplayValue,
  Divider,
  Eyebrow,
  Footer,
  GlobalStyle,
  Label,
  LayerList,
  Notice,
  Panel,
  PlayBtn,
  Shell,
  Slider,
  StatusText,
  StopBtn,
  Title,
  ZenBtn,
} from "./layer-builder/styles";

function cloneLayers() {
  return BUILTIN_LAYERS.map((layer) => ({
    ...layer,
    params: { ...layer.params },
  }));
}

function arrangementLayers(enabledIds) {
  return BUILTIN_LAYERS.map((layer) => ({
    ...layer,
    params: { ...layer.params },
    enabled: enabledIds.includes(layer.id),
    muted: false,
  }));
}

function sortByOrder(layers) {
  return [...layers].sort((a, b) => a.order - b.order);
}

function sharedPrefixLength(a, b) {
  const limit = Math.min(a.length, b.length);
  let index = 0;

  while (index < limit && a[index] === b[index]) {
    index += 1;
  }

  return index;
}

function sharedSuffixLength(a, b, prefixLength) {
  const maxSuffix = Math.min(a.length, b.length) - prefixLength;
  let index = 0;

  while (
    index < maxSuffix &&
    a[a.length - 1 - index] === b[b.length - 1 - index]
  ) {
    index += 1;
  }

  return index;
}

export default function LayerBuilder({ initialNewsItems = [] }) {
  const [layers, setLayers] = useState(cloneLayers);
  const [context, setContext] = useState({ ...DEFAULT_CONTEXT });
  const [activeArrangementId, setActiveArrangementId] = useState(null);
  const [soloId, setSoloId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [engineStatus, setEngineStatus] = useState("READY");
  const [engineError, setEngineError] = useState("");
  const [volume, setVolume] = useState(0.8);
  const [copied, setCopied] = useState(false);
  const [newsItems, setNewsItems] = useState(initialNewsItems);

  useEffect(() => {
    if (newsItems.length > 0) return;
    fetch("/api/news")
      .then((r) => r.ok ? r.json() : [])
      .then((items) => { if (items.length) setNewsItems(items); })
      .catch(() => {});
  }, []);

  // Auth state — commented out until accounts are enabled:
  // const [user, setUser] = useState(null);
  // const [authModal, setAuthModal] = useState(null); // null | 'login' | 'register'
  // const [authForm, setAuthForm] = useState({ email: "", password: "", error: "", loading: false });
  // const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    let cancelled = false;

    setEngineStatus("LOADING...");
    ensureStrudelReady()
      .then(() => {
        if (!cancelled) {
          setEngineStatus("READY");
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setEngineStatus("ERROR");
          setEngineError(error instanceof Error ? error.message : String(error));
        }
      });

    return () => {
      cancelled = true;
      hushStrudel();
    };
  }, []);

  useEffect(() => {
    setStrudelVolume(volume);
  }, [volume]);

  const sortedLayers = useMemo(() => sortByOrder(layers), [layers]);
  const { display: generatedCode, stack: stackCode } = useMemo(
    () => compile(layers, context, { soloId }),
    [layers, context, soloId]
  );
  const activeLayerIds = useMemo(
    () =>
      sortedLayers
        .filter((layer) => layer.enabled && !isMuted(layer))
        .map((layer) => layer.id),
    [sortedLayers, soloId]
  );

  const activeCount = layers.filter((layer) => layer.enabled && !isMuted(layer)).length;

  const [displayedCode, setDisplayedCode] = useState(generatedCode);
  const typewriterRef = useRef(null);
  const prevCodeRef = useRef(generatedCode);
  const prevActiveLayerIdsRef = useRef(activeLayerIds);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (!stackCode) {
      hushStrudel();
      setIsPlaying(false);
      setEngineStatus("READY");
      return;
    }

    let cancelled = false;

    ensureStrudelReady()
      .then(() => {
        if (cancelled) {
          return;
        }
        setStrudelVolume(volume);
        playCode(stackCode, context.bpm);
        setEngineStatus("PLAYING");
        setEngineError("");
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }
        setIsPlaying(false);
        setEngineStatus("ERROR");
        setEngineError(error instanceof Error ? error.message : String(error));
      });

    return () => {
      cancelled = true;
    };
  }, [context.bpm, isPlaying, stackCode]);

  useEffect(() => {
    if (typewriterRef.current) clearInterval(typewriterRef.current);

    const prev = prevCodeRef.current;
    const target = generatedCode;
    const prevActiveLayerIds = prevActiveLayerIdsRef.current;
    prevCodeRef.current = target;
    prevActiveLayerIdsRef.current = activeLayerIds;

    const addedLayerIds = activeLayerIds.filter(
      (id) => !prevActiveLayerIds.includes(id)
    );
    const removedLayerIds = prevActiveLayerIds.filter(
      (id) => !activeLayerIds.includes(id)
    );

    if (
      addedLayerIds.length !== 1 ||
      removedLayerIds.length > 0 ||
      target.length <= prev.length
    ) {
      setDisplayedCode(target);
      return;
    }

    const prefixLength = sharedPrefixLength(prev, target);
    const suffixLength = sharedSuffixLength(prev, target, prefixLength);
    const stablePrefix = target.slice(0, prefixLength);
    const insertedChunk = target.slice(
      prefixLength,
      target.length - suffixLength
    );
    const stableSuffix = target.slice(target.length - suffixLength);

    if (!insertedChunk) {
      setDisplayedCode(target);
      return;
    }

    setDisplayedCode(`${stablePrefix}${stableSuffix}`);
    let pos = 0;

    typewriterRef.current = setInterval(() => {
      pos += 1;
      setDisplayedCode(
        `${stablePrefix}${insertedChunk.slice(0, pos)}${stableSuffix}`
      );
      if (pos >= insertedChunk.length) clearInterval(typewriterRef.current);
    }, 6);

    return () => clearInterval(typewriterRef.current);
  }, [activeLayerIds, generatedCode]);

  function resetArrangementSelection() {
    setActiveArrangementId(null);
  }

  function isMuted(layer) {
    return soloId !== null ? layer.id !== soloId : layer.muted;
  }

  function updateLayer(id, changes) {
    setLayers((current) =>
      current.map((layer) => (layer.id === id ? { ...layer, ...changes } : layer))
    );
    resetArrangementSelection();
  }

  function updateParam(id, key, value) {
    setLayers((current) =>
      current.map((layer) =>
        layer.id === id
          ? { ...layer, params: { ...layer.params, [key]: value } }
          : layer
      )
    );
    resetArrangementSelection();
  }

  function moveLayer(id, direction) {
    setLayers((current) => {
      const ordered = sortByOrder(current);
      const index = ordered.findIndex((layer) => layer.id === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= ordered.length) {
        return current;
      }

      const currentLayer = ordered[index];
      const targetLayer = ordered[targetIndex];

      return current.map((layer) => {
        if (layer.id === currentLayer.id) {
          return { ...layer, order: targetLayer.order };
        }
        if (layer.id === targetLayer.id) {
          return { ...layer, order: currentLayer.order };
        }
        return layer;
      });
    });
    resetArrangementSelection();
  }

  function applyArrangement(id) {
    const arrangement = ARRANGEMENTS.find((item) => item.id === id);
    if (!arrangement) {
      return;
    }

    setLayers(arrangementLayers(arrangement.enabledLayers));
    setActiveArrangementId(id);
    setSoloId(null);
    setExpandedId(null);
  }

  async function handlePlay() {
    if (!stackCode) {
      return;
    }

    try {
      await ensureStrudelReady();
      setIsPlaying(true);
      setEngineStatus("PLAYING");
      setEngineError("");
    } catch (error) {
      setIsPlaying(false);
      setEngineStatus("ERROR");
      setEngineError(error instanceof Error ? error.message : String(error));
    }
  }

  function handleStop() {
    hushStrudel();
    setIsPlaying(false);
    setEngineStatus("STOPPED");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  // --- Auth handlers — commented out until accounts are enabled: -----------
  //
  // function openAuth(mode) { ... }
  // async function handleAuthSubmit(event) { ... }
  // async function handleLogout() { ... }
  // async function handleSavePreferences() { ... }

  return (
    <>
      <GlobalStyle />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;800;900&family=Share+Tech+Mono&family=Outfit:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {!showControls && (
        <ZenMode
          isPlaying={isPlaying}
          items={newsItems}
          onExit={() => setShowControls(true)}
        />
      )}

      {/* Auth modal — commented out until accounts are enabled:
      {authModal && (
        <ModalOverlay onClick={() => setAuthModal(null)}>
          <ModalPanel onClick={(e) => e.stopPropagation()}>
            ...
          </ModalPanel>
        </ModalOverlay>
      )}
      */}

      {showControls && (
        <Shell>
          <Panel>
            <Eyebrow>Layer Builder</Eyebrow>
            <Title>Trance Composer</Title>

            <ArrangeRow>
              {ARRANGEMENTS.map((arrangement) => (
                <ArrangeBtn
                  key={arrangement.id}
                  $active={activeArrangementId === arrangement.id}
                  onClick={() => applyArrangement(arrangement.id)}
                  title={arrangement.description}
                >
                  {arrangement.name}
                </ArrangeBtn>
              ))}
              {activeArrangementId === null && (
                <ArrangeBtn
                  $active={false}
                  style={{ opacity: 0.4, pointerEvents: "none" }}
                >
                  Custom
                </ArrangeBtn>
              )}
            </ArrangeRow>

            <DisplayBar style={{ marginTop: "0.6rem" }}>
              <Label>BPM</Label>
              <Slider
                type="range"
                min={80}
                max={180}
                step={1}
                value={context.bpm}
                onChange={(event) => {
                  setContext((current) => ({ ...current, bpm: Number(event.target.value) }));
                  resetArrangementSelection();
                }}
              />
              <DisplayValue>{context.bpm}</DisplayValue>
            </DisplayBar>

            <Divider />

            <LayerList>
              {sortedLayers.map((layer, index) => (
                <LayerItem
                  key={layer.id}
                  layer={layer}
                  isExpanded={expandedId === layer.id}
                  isSoloed={soloId === layer.id}
                  isEffectivelyMuted={isMuted(layer)}
                  isFirst={index === 0}
                  isLast={index === sortedLayers.length - 1}
                  onToggle={() => updateLayer(layer.id, { enabled: !layer.enabled })}
                  onMute={() => updateLayer(layer.id, { muted: !layer.muted })}
                  onSolo={() => setSoloId((current) => (current === layer.id ? null : layer.id))}
                  onMoveUp={() => moveLayer(layer.id, "up")}
                  onMoveDown={() => moveLayer(layer.id, "down")}
                  onParamChange={(key, value) => updateParam(layer.id, key, value)}
                  onExpand={() =>
                    setExpandedId((current) => (current === layer.id ? null : layer.id))
                  }
                />
              ))}
            </LayerList>

            <Divider />

            <DisplayBar>
              <Label>Vol</Label>
              <Slider
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
              />
              <DisplayValue style={{ fontSize: "0.85rem" }}>
                {Math.round(volume * 100)}%
              </DisplayValue>
            </DisplayBar>

            <Footer>
              <PlayBtn onClick={handlePlay} disabled={!stackCode}>
                {isPlaying ? "Restart" : "Play"}
              </PlayBtn>
              <StopBtn onClick={handleStop}>Stop</StopBtn>
              <StatusText>
                {activeCount} layer{activeCount !== 1 ? "s" : ""} · {engineStatus}
              </StatusText>
              {/* Account / Save buttons — commented out until accounts are enabled:
              {user ? (
                <>
                  <SaveBtn onClick={handleSavePreferences}>...</SaveBtn>
                  <AccountBtn onClick={handleLogout}>Sign Out</AccountBtn>
                </>
              ) : (
                <AccountBtn onClick={() => openAuth("login")}>Account</AccountBtn>
              )}
              */}
              <ZenBtn onClick={() => setShowControls(false)} title="Zen clock mode">
                ZEN
              </ZenBtn>
            </Footer>

            {engineError && <Notice>{engineError}</Notice>}
            <Notice>Audio starts after the first click. Changes take effect on Play.</Notice>
          </Panel>

          <Panel>
            <CodeHead>
              <Eyebrow style={{ margin: 0 }}>Generated Code</Eyebrow>
              <CopyBtn $done={copied} onClick={handleCopy}>
                {copied ? "Copied ✓" : "Copy"}
              </CopyBtn>
            </CodeHead>
            <CodePanel>{displayedCode}</CodePanel>
          </Panel>
        </Shell>
      )}
    </>
  );
}
