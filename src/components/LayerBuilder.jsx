import React, { useEffect, useMemo, useRef, useState } from "react";
import { ARRANGEMENTS, DEFAULT_CONTEXT } from "../data/arrangements";
import { BUILTIN_LAYERS } from "../data/layers";
import { KEYS, PROGRESSIONS } from "../data/progressions";
import { buildHarmony } from "../lib/harmony";
import { compile } from "../lib/compiler";
import { applyDecodedLayers, readHashState, shareUrl, writeHashState } from "../lib/share";
import {
  ensureStrudelReady,
  hushStrudel,
  playCode,
  setStrudelVolume,
} from "../lib/strudel";
import DeckPanel from "./layer-builder/DeckPanel";
import LayerItem from "./layer-builder/LayerItem";
import ZenMode from "./layer-builder/ZenMode";
import {
  ArrangeBtn,
  ArrangeRow,
  CodeHead,
  CodePanel,
  CopyBtn,
  DisplayBar,
  DisplayValue,
  Divider,
  Eyebrow,
  GlobalStyle,
  Label,
  LayerList,
  ModalActions,
  ModalCancelBtn,
  ModalError,
  ModalHint,
  ModalInput,
  ModalOverlay,
  ModalPanel,
  ModalSubmitBtn,
  ModalTitle,
  Notice,
  Panel,
  Select,
  Shell,
  Slider,
  Title,
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

function hydrateFromHash() {
  const decoded = typeof window !== "undefined" ? readHashState() : null;
  const layers = decoded
    ? applyDecodedLayers(cloneLayers(), decoded.l)
    : cloneLayers();
  const context = {
    ...DEFAULT_CONTEXT,
    ...(decoded
      ? {
          bpm: typeof decoded.b === "number" ? decoded.b : DEFAULT_CONTEXT.bpm,
          keyId: typeof decoded.k === "string" ? decoded.k : DEFAULT_CONTEXT.keyId,
          progressionId:
            typeof decoded.p === "string" ? decoded.p : DEFAULT_CONTEXT.progressionId,
        }
      : {}),
  };
  return { layers, context, hadHash: Boolean(decoded) };
}

export default function LayerBuilder({ initialNewsItems = [] }) {
  const initial = useMemo(hydrateFromHash, []);
  const [layers, setLayers] = useState(initial.layers);
  const [context, setContext] = useState(initial.context);
  const [shareCopied, setShareCopied] = useState(false);
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

  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'register'
  const [authForm, setAuthForm] = useState({ username: "", password: "", error: "", loading: false });
  const [sketchesModal, setSketchesModal] = useState(null); // null | 'save' | 'load'
  const [sketches, setSketches] = useState([]);
  const [sketchName, setSketchName] = useState("");
  const [currentSketchId, setCurrentSketchId] = useState(null);
  const [selectedSketch, setSelectedSketch] = useState(null);
  const [sketchError, setSketchError] = useState("");
  const [sketchLoading, setSketchLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

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

  useEffect(() => {
    const handle = setTimeout(() => {
      writeHashState({ context, layers });
    }, 250);
    return () => clearTimeout(handle);
  }, [context, layers]);

  function handleShare() {
    const url = shareUrl({ context, layers });
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 1400);
      });
    } else {
      window.prompt("Copy share link:", url);
    }
  }

  const sortedLayers = useMemo(() => sortByOrder(layers), [layers]);
  const derivedContext = useMemo(
    () => ({ ...context, ...buildHarmony(context.keyId, context.progressionId) }),
    [context]
  );
  const { display: generatedCode, stack: stackCode } = useMemo(
    () => compile(layers, derivedContext, { soloId }),
    [layers, derivedContext, soloId]
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

  function openAuth(mode) {
    setAuthForm({ username: "", password: "", error: "", loading: false });
    setAuthModal(mode);
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setAuthForm((current) => ({ ...current, error: "", loading: true }));

    const path = authModal === "register" ? "/api/auth/register" : "/api/auth/login";
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ username: authForm.username, password: authForm.password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setAuthForm((current) => ({
          ...current,
          error: data?.error ?? "Something went wrong",
          loading: false,
        }));
        return;
      }

      setUser({ username: data.username, userId: data.userId });
      setAuthModal(null);
      setAuthForm({ username: "", password: "", error: "", loading: false });
    } catch {
      setAuthForm((current) => ({
        ...current,
        error: "Network error",
        loading: false,
      }));
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    } catch {}
    setUser(null);
    setSketches([]);
    setCurrentSketchId(null);
    setSelectedSketch(null);
  }

  async function loadSketchList() {
    setSketchLoading(true);
    setSketchError("");
    try {
      const response = await fetch("/api/sketches", { credentials: "same-origin" });
      const data = await response.json();
      if (!response.ok) {
        setSketchError(data?.error ?? "Failed to load sketches");
        return;
      }
      setSketches(data.sketches ?? []);
    } catch {
      setSketchError("Network error");
    } finally {
      setSketchLoading(false);
    }
  }

  function openSave() {
    if (!user) {
      openAuth("login");
      return;
    }
    const current = sketches.find((s) => s.id === currentSketchId);
    setSketchName(current?.name ?? "");
    setSketchError("");
    setSketchesModal("save");
  }

  function openLoad() {
    if (!user) {
      openAuth("login");
      return;
    }
    setSketchError("");
    setSelectedSketch(null);
    setSketchesModal("load");
    loadSketchList();
  }

  async function handleSaveSketch(event) {
    event.preventDefault();
    const name = sketchName.trim();
    if (!name) {
      setSketchError("Name is required");
      return;
    }

    setSketchLoading(true);
    setSketchError("");

    const payload = { name, code: generatedCode };

    try {
      const isUpdate = Boolean(currentSketchId);
      const response = await fetch(
        isUpdate ? `/api/sketches/${currentSketchId}` : "/api/sketches",
        {
          method: isUpdate ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        setSketchError(data?.error ?? "Failed to save");
        return;
      }

      setCurrentSketchId(data.sketch.id);
      setSketches((current) => {
        const others = current.filter((s) => s.id !== data.sketch.id);
        return [data.sketch, ...others];
      });
      setSketchesModal(null);
    } catch {
      setSketchError("Network error");
    } finally {
      setSketchLoading(false);
    }
  }

  async function handleSelectSketch(id) {
    setSketchLoading(true);
    setSketchError("");
    try {
      const response = await fetch(`/api/sketches/${id}`, { credentials: "same-origin" });
      const data = await response.json();
      if (!response.ok) {
        setSketchError(data?.error ?? "Failed to load sketch");
        return;
      }
      setSelectedSketch(data.sketch);
    } catch {
      setSketchError("Network error");
    } finally {
      setSketchLoading(false);
    }
  }

  async function handleCopySelectedSketch() {
    if (!selectedSketch) return;
    try {
      await navigator.clipboard.writeText(selectedSketch.code);
      setSketchError("Copied to clipboard");
      window.setTimeout(() => setSketchError(""), 1500);
    } catch {
      setSketchError("Copy failed");
    }
  }

  async function handleDeleteSketch(id) {
    if (!window.confirm("Delete this sketch?")) return;
    setSketchLoading(true);
    setSketchError("");
    try {
      const response = await fetch(`/api/sketches/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setSketchError(data?.error ?? "Failed to delete");
        return;
      }
      setSketches((current) => current.filter((s) => s.id !== id));
      if (currentSketchId === id) setCurrentSketchId(null);
    } catch {
      setSketchError("Network error");
    } finally {
      setSketchLoading(false);
    }
  }

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

      {authModal && (
        <ModalOverlay onClick={() => setAuthModal(null)}>
          <ModalPanel onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{authModal === "register" ? "Create Account" : "Sign In"}</ModalTitle>
            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <ModalInput
                type="text"
                placeholder="username"
                autoComplete="username"
                value={authForm.username}
                onChange={(e) => setAuthForm((c) => ({ ...c, username: e.target.value }))}
                minLength={authModal === "register" ? 3 : undefined}
                maxLength={32}
                required
              />
              <ModalInput
                type="password"
                placeholder="password (8+ chars)"
                autoComplete={authModal === "register" ? "new-password" : "current-password"}
                value={authForm.password}
                onChange={(e) => setAuthForm((c) => ({ ...c, password: e.target.value }))}
                minLength={authModal === "register" ? 8 : undefined}
                required
              />
              {authForm.error && <ModalError>{authForm.error}</ModalError>}
              <ModalHint
                onClick={() => openAuth(authModal === "register" ? "login" : "register")}
              >
                {authModal === "register"
                  ? "Already have an account? Sign in"
                  : "Need an account? Register"}
              </ModalHint>
              <ModalActions>
                <ModalCancelBtn type="button" onClick={() => setAuthModal(null)}>
                  Cancel
                </ModalCancelBtn>
                <ModalSubmitBtn type="submit" disabled={authForm.loading}>
                  {authForm.loading ? "..." : authModal === "register" ? "Register" : "Sign In"}
                </ModalSubmitBtn>
              </ModalActions>
            </form>
          </ModalPanel>
        </ModalOverlay>
      )}

      {sketchesModal === "save" && (
        <ModalOverlay onClick={() => setSketchesModal(null)}>
          <ModalPanel onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{currentSketchId ? "Update Sketch" : "Save Sketch"}</ModalTitle>
            <form onSubmit={handleSaveSketch} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <ModalInput
                type="text"
                placeholder="sketch name"
                value={sketchName}
                onChange={(e) => setSketchName(e.target.value)}
                maxLength={120}
                required
                autoFocus
              />
              {sketchError && <ModalError>{sketchError}</ModalError>}
              <ModalActions>
                {currentSketchId && (
                  <ModalCancelBtn
                    type="button"
                    onClick={() => setCurrentSketchId(null)}
                    title="Save as a new sketch instead of updating"
                  >
                    Save as New
                  </ModalCancelBtn>
                )}
                <ModalCancelBtn type="button" onClick={() => setSketchesModal(null)}>
                  Cancel
                </ModalCancelBtn>
                <ModalSubmitBtn type="submit" disabled={sketchLoading}>
                  {sketchLoading ? "..." : "Save"}
                </ModalSubmitBtn>
              </ModalActions>
            </form>
          </ModalPanel>
        </ModalOverlay>
      )}

      {sketchesModal === "load" && (
        <ModalOverlay onClick={() => setSketchesModal(null)}>
          <ModalPanel onClick={(e) => e.stopPropagation()} style={{ maxWidth: "32rem" }}>
            <ModalTitle>{selectedSketch ? selectedSketch.name : "Saved Sketches"}</ModalTitle>
            {sketchError && <ModalError>{sketchError}</ModalError>}

            {!selectedSketch && (
              <>
                {sketchLoading && sketches.length === 0 && <ModalHint>Loading...</ModalHint>}
                {!sketchLoading && sketches.length === 0 && !sketchError && (
                  <ModalHint>No saved sketches yet.</ModalHint>
                )}
                {sketches.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: "20rem", overflowY: "auto" }}>
                    {sketches.map((sketch) => (
                      <div
                        key={sketch.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.5rem 0.6rem",
                          background: "#040607",
                          border: "1px solid #0d1824",
                          borderRadius: "3px",
                          fontFamily: "Share Tech Mono, monospace",
                          fontSize: "0.78rem",
                          color: "#9ad7cf",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectSketch(sketch.id)}
                          style={{
                            flex: 1,
                            textAlign: "left",
                            background: "transparent",
                            border: 0,
                            color: "inherit",
                            font: "inherit",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          {sketch.name}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSketch(sketch.id)}
                          title="Delete"
                          style={{
                            background: "transparent",
                            border: 0,
                            color: "#ff3d6b",
                            cursor: "pointer",
                            padding: "0 0.25rem",
                            fontSize: "0.9rem",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {selectedSketch && (
              <>
                <pre
                  style={{
                    margin: 0,
                    padding: "0.75rem",
                    background: "#040607",
                    border: "1px solid #0d1824",
                    borderRadius: "3px",
                    fontFamily: "Share Tech Mono, monospace",
                    fontSize: "0.75rem",
                    color: "#9ad7cf",
                    maxHeight: "22rem",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {selectedSketch.code}
                </pre>
              </>
            )}

            <ModalActions>
              {selectedSketch ? (
                <>
                  <ModalCancelBtn type="button" onClick={() => setSelectedSketch(null)}>
                    Back
                  </ModalCancelBtn>
                  <ModalSubmitBtn type="button" onClick={handleCopySelectedSketch}>
                    Copy
                  </ModalSubmitBtn>
                </>
              ) : (
                <ModalCancelBtn type="button" onClick={() => setSketchesModal(null)}>
                  Close
                </ModalCancelBtn>
              )}
            </ModalActions>
          </ModalPanel>
        </ModalOverlay>
      )}

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

            <DisplayBar style={{ marginTop: "0.4rem" }}>
              <Label>Key</Label>
              <Select
                value={context.keyId}
                onChange={(event) => {
                  const keyId = event.target.value;
                  setContext((current) => ({ ...current, keyId }));
                  resetArrangementSelection();
                }}
              >
                {KEYS.map((k) => (
                  <option key={k.id} value={k.id}>{k.name}</option>
                ))}
              </Select>
            </DisplayBar>

            <DisplayBar style={{ marginTop: "0.4rem" }}>
              <Label>Prog</Label>
              <Select
                value={context.progressionId}
                onChange={(event) => {
                  const progressionId = event.target.value;
                  setContext((current) => ({ ...current, progressionId }));
                  resetArrangementSelection();
                }}
              >
                {PROGRESSIONS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </Select>
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

            <DeckPanel
              isPlaying={isPlaying}
              engineStatus={engineStatus}
              activeCount={activeCount}
              bpm={context.bpm}
              stackCode={stackCode}
              user={user}
              onPlay={handlePlay}
              onStop={handleStop}
              onSave={openSave}
              onLoad={openLoad}
              onAccount={() => openAuth("login")}
              onLogout={handleLogout}
              onZen={() => setShowControls(false)}
              onShare={handleShare}
              shareCopied={shareCopied}
            />

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
