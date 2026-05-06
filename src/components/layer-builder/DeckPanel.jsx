import React from "react";
import styledImport, { css, keyframes } from "styled-components";

const styled = styledImport.default ?? styledImport;

// ── Animations ───────────────────────────────────────────────────────────────

const flowFwd = keyframes`to { stroke-dashoffset: -24; }`;

const padPulse = keyframes`
  0%, 100% { opacity: 0.85; }
  50%       { opacity: 0.18; }
`;

// ── Deck shell ───────────────────────────────────────────────────────────────

const Deck = styled.div`
  margin-top: 0.75rem;
  background: #060810;
  border: 1px solid #192638;
  border-top: 2px solid #253a50;
  border-radius: 5px;
  overflow: hidden;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5),
    0 4px 16px rgba(0, 0, 0, 0.7);
  flex-shrink: 0;
`;

// ── Top section: circuit + LCD ───────────────────────────────────────────────

const DeckTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px;
  border-bottom: 1px solid #0f1820;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const CircuitSection = styled.div`
  padding: 0.55rem 0.75rem 0.5rem;
  border-right: 1px solid #0f1820;
  background: #030508;
  min-height: 72px;

  @media (max-width: 520px) {
    border-right: none;
    border-bottom: 1px solid #0f1820;
  }
`;

const SectionLabel = styled.div`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.46rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: #151f2a;
  margin-bottom: 0.3rem;
  user-select: none;
`;

// Animated SVG trace — $playing controls animation-play-state
const FlowPath = styled.path`
  fill: none;
  stroke-linecap: round;
  stroke-dasharray: 5 19;
  animation: ${flowFwd} ${({ $speed }) => $speed || "2.2s"} linear infinite;
  animation-play-state: ${({ $playing }) => ($playing ? "running" : "paused")};
`;

const StaticTrace = styled.path`
  fill: none;
`;

// Pad circles at circuit junctions
const Pad = styled.circle`
  ${({ $playing, $delay }) =>
    $playing
      ? css`animation: ${padPulse} 1.8s ease-in-out infinite ${$delay || "0s"};`
      : ""}
`;

// ── LCD status panel ─────────────────────────────────────────────────────────

const LcdSection = styled.div`
  padding: 0.5rem 0.65rem;
  background: #020407;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.22rem;
`;

const LcdRow = styled.div`
  font-family: "Share Tech Mono", monospace;
  font-size: ${({ $big }) => ($big ? "0.8rem" : "0.62rem")};
  letter-spacing: ${({ $big }) => ($big ? "0.06em" : "0.1em")};
  color: ${({ $active }) => ($active ? "#ff8c00" : "#1e3040")};
  text-shadow: ${({ $active }) =>
    $active ? "0 0 8px rgba(255,140,0,0.55)" : "none"};
  transition: color 250ms ease, text-shadow 250ms ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// ── Bottom section: transport + utility buttons ───────────────────────────────

const DeckBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.7rem;
  background: linear-gradient(180deg, #09010f 0%, #060810 100%);
  flex-wrap: wrap;
`;

const Groove = styled.div`
  width: 1px;
  height: 18px;
  background: linear-gradient(
    180deg,
    transparent,
    #1c2e3a 30%,
    #1c2e3a 70%,
    transparent
  );
  margin: 0 0.1rem;
  flex-shrink: 0;
`;

// Big 3D transport buttons (Play, Stop)
const TransBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  padding: 0.42rem 0.9rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    inset 0 -2px 0 rgba(0, 0, 0, 0.4),
    0 3px 7px rgba(0, 0, 0, 0.65);
  transition: all 80ms ease;

  &:active:not(:disabled) {
    box-shadow:
      inset 0 2px 5px rgba(0, 0, 0, 0.55),
      0 1px 2px rgba(0, 0, 0, 0.5);
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.28;
    cursor: not-allowed;
  }
`;

const PlayTransBtn = styled(TransBtn)`
  background: linear-gradient(
    180deg,
    rgba(255, 140, 0, 0.18) 0%,
    rgba(200, 100, 0, 0.1) 100%
  );
  color: #ff8c00;
  border-color: rgba(255, 140, 0, 0.52);

  &:hover:not(:disabled) {
    background: linear-gradient(
      180deg,
      rgba(255, 140, 0, 0.26) 0%,
      rgba(200, 100, 0, 0.16) 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.07),
      inset 0 -2px 0 rgba(0, 0, 0, 0.4),
      0 0 16px rgba(255, 140, 0, 0.28),
      0 3px 7px rgba(0, 0, 0, 0.65);
  }
`;

const StopTransBtn = styled(TransBtn)`
  background: linear-gradient(
    180deg,
    rgba(0, 212, 180, 0.09) 0%,
    rgba(0, 160, 135, 0.05) 100%
  );
  color: #00c4a8;
  border-color: rgba(0, 212, 180, 0.22);

  &:hover {
    background: linear-gradient(
      180deg,
      rgba(0, 212, 180, 0.15) 0%,
      rgba(0, 160, 135, 0.08) 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.07),
      0 0 10px rgba(0, 212, 180, 0.14),
      0 3px 7px rgba(0, 0, 0, 0.65);
  }
`;

// Small utility buttons (Save, Load, Account, Zen)
const UtilBtn = styled.button`
  padding: 0.32rem 0.55rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid #141e28;
  background: linear-gradient(180deg, #0d1420 0%, #080c18 100%);
  color: #2a4050;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.03),
    0 1px 3px rgba(0, 0, 0, 0.5);
  transition: all 100ms ease;

  &:active {
    transform: translateY(1px);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.45);
  }

  &:hover:not(:disabled) {
    color: #9ad7cf;
    border-color: rgba(154, 215, 207, 0.22);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.03),
      0 0 6px rgba(154, 215, 207, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    opacity: 0.18;
    cursor: not-allowed;
  }
`;

const ZenUtilBtn = styled(UtilBtn)`
  margin-left: auto;

  &:hover {
    color: #00d4b4;
    border-color: rgba(0, 212, 180, 0.28);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.03),
      0 0 8px rgba(0, 212, 180, 0.12),
      0 1px 3px rgba(0, 0, 0, 0.5);
  }
`;

// ── Circuit visualization ─────────────────────────────────────────────────────

const TRACE_ORANGE = "rgba(255,140,0,";
const TRACE_TEAL = "rgba(0,212,180,";

function CircuitViz({ isPlaying: P }) {
  const dim = P ? "0.42)" : "0.15)";
  const flow = "0.82)";

  // Pad positions: top row, bottom row, mid-row nodes
  const pads = [
    [12, 12], [76, 12], [148, 12], [212, 12], [268, 12],
    [12, 42], [76, 42], [148, 42], [212, 42], [268, 42],
    [76, 27], [148, 27],
  ];

  return (
    <svg
      viewBox="0 0 280 54"
      style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      {/* ── Static background traces ── */}
      {/* Outer rectangle */}
      <StaticTrace d="M 12 12 H 268" stroke={TRACE_ORANGE + dim} strokeWidth="1" />
      <StaticTrace d="M 268 12 V 42" stroke={TRACE_ORANGE + dim} strokeWidth="1" />
      <StaticTrace d="M 268 42 H 12" stroke={TRACE_ORANGE + dim} strokeWidth="1" />
      <StaticTrace d="M 12 42 V 12" stroke={TRACE_ORANGE + dim} strokeWidth="1" />
      {/* Internal bridges */}
      <StaticTrace d="M 76 12 V 42"  stroke={TRACE_ORANGE + dim} strokeWidth="1" />
      <StaticTrace d="M 148 12 V 42" stroke={TRACE_ORANGE + dim} strokeWidth="1" />
      <StaticTrace d="M 212 12 V 42" stroke={TRACE_ORANGE + dim} strokeWidth="1" />
      {/* Mid cross */}
      <StaticTrace d="M 76 27 H 148" stroke={TRACE_TEAL + (P ? "0.28)" : "0.1)")} strokeWidth="1" />

      {/* ── Animated current flow ── */}
      {/* Main outer loop — clockwise */}
      <FlowPath
        d="M 12 12 H 268 V 42 H 12 V 12"
        stroke={TRACE_ORANGE + flow}
        strokeWidth="1.5"
        $playing={P}
        $speed="2.6s"
      />
      {/* Bridge down at 76 */}
      <FlowPath
        d="M 76 12 V 42"
        stroke={TRACE_ORANGE + flow}
        strokeWidth="1.2"
        $playing={P}
        $speed="1.5s"
        style={{ animationDelay: "-0.4s" }}
      />
      {/* Bridge up at 148 */}
      <FlowPath
        d="M 148 42 V 12"
        stroke={TRACE_ORANGE + flow}
        strokeWidth="1.2"
        $playing={P}
        $speed="1.9s"
        style={{ animationDelay: "-0.9s" }}
      />
      {/* Bridge down at 212 */}
      <FlowPath
        d="M 212 12 V 42"
        stroke={TRACE_ORANGE + flow}
        strokeWidth="1.2"
        $playing={P}
        $speed="1.2s"
        style={{ animationDelay: "-0.2s" }}
      />
      {/* Mid cross — teal accent */}
      <FlowPath
        d="M 76 27 H 148"
        stroke={TRACE_TEAL + "0.75)"}
        strokeWidth="1.2"
        $playing={P}
        $speed="1.7s"
        style={{ animationDelay: "-0.7s" }}
      />

      {/* ── Junction pads ── */}
      {pads.map(([cx, cy], i) => (
        <Pad
          key={i}
          cx={cx}
          cy={cy}
          r={2.8}
          fill={TRACE_ORANGE + (P ? "0.65)" : "0.22)")}
          style={{
            filter: P ? "drop-shadow(0 0 3px rgba(255,140,0,0.6))" : "none",
            transition: "filter 300ms ease, fill 300ms ease",
          }}
          $playing={P}
          $delay={`${((i * 0.18) % 1.6).toFixed(2)}s`}
        />
      ))}

      {/* ── Side LED indicators ── */}
      <circle
        cx={12}
        cy={27}
        r={4}
        fill={P ? "#ff8c00" : "rgba(255,140,0,0.12)"}
        style={{
          filter: P ? "drop-shadow(0 0 6px rgba(255,140,0,1))" : "none",
          transition: "all 300ms ease",
        }}
      />
      <circle
        cx={268}
        cy={27}
        r={4}
        fill={P ? "#00d4b4" : "rgba(0,212,180,0.12)"}
        style={{
          filter: P ? "drop-shadow(0 0 6px rgba(0,212,180,1))" : "none",
          transition: "all 300ms ease",
        }}
      />
    </svg>
  );
}

// ── DeckPanel ─────────────────────────────────────────────────────────────────

export default function DeckPanel({
  isPlaying,
  engineStatus,
  activeCount,
  bpm,
  stackCode,
  user,
  onPlay,
  onStop,
  onSave,
  onLoad,
  onAccount,
  onLogout,
  onZen,
}) {
  const statusIcon = isPlaying ? "▶" : engineStatus === "STOPPED" ? "■" : "○";

  return (
    <Deck>
      <DeckTop>
        <CircuitSection>
          <SectionLabel>Signal Monitor</SectionLabel>
          <CircuitViz isPlaying={isPlaying} />
        </CircuitSection>

        <LcdSection>
          <SectionLabel>Status</SectionLabel>
          <LcdRow $big $active={isPlaying}>
            {statusIcon} {engineStatus}
          </LcdRow>
          <LcdRow>
            {bpm} BPM · {activeCount} LAYER{activeCount !== 1 ? "S" : ""}
          </LcdRow>
        </LcdSection>
      </DeckTop>

      <DeckBottom>
        <PlayTransBtn onClick={onPlay} disabled={!stackCode}>
          ▶ {isPlaying ? "RESTART" : "PLAY"}
        </PlayTransBtn>
        <StopTransBtn onClick={onStop}>■ STOP</StopTransBtn>

        <Groove />

        {user ? (
          <>
            <UtilBtn onClick={onSave}>SAVE</UtilBtn>
            <UtilBtn onClick={onLoad}>LOAD</UtilBtn>
            <UtilBtn onClick={onLogout} title={`Signed in as ${user.username}`}>
              {user.username.slice(0, 10)}
            </UtilBtn>
          </>
        ) : (
          <UtilBtn onClick={onAccount}>ACCOUNT</UtilBtn>
        )}

        <ZenUtilBtn onClick={onZen}>ZEN</ZenUtilBtn>
      </DeckBottom>
    </Deck>
  );
}
