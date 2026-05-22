import React from "react";
import styledImport, { keyframes } from "styled-components";

const styled = styledImport.default ?? styledImport;

// ── Animations ───────────────────────────────────────────────────────────────

// Pill perimeter ≈ 160 + π·22 + 160 + π·22 ≈ 458.23
const TAPE_PATH = "M 60 13 H 220 A 22 22 0 0 1 220 57 H 60 A 22 22 0 0 1 60 13 Z";
const TAPE_LEN = 458.23;

const tapeFlow = keyframes`to { stroke-dashoffset: -${TAPE_LEN}; }`;

const reelSpin = keyframes`to { transform: rotate(360deg); }`;

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
  min-height: 92px;
  display: flex;
  flex-direction: column;

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

// Worm-shaped tape segment that flows around the pill
const TapeWorm = styled.path`
  fill: none;
  stroke-linecap: round;
  /* dash + gap = TAPE_LEN so exactly one worm is visible at any time */
  stroke-dasharray: 90 368.23;
  animation: ${tapeFlow} ${({ $duration }) => $duration || "2.6s"} linear infinite;
  animation-play-state: ${({ $playing }) => ($playing ? "running" : "paused")};
`;

// Reel group spins around its own center
const SpinningReel = styled.g`
  transform-origin: ${({ $cx, $cy }) => `${$cx}px ${$cy}px`};
  animation: ${reelSpin} ${({ $duration }) => $duration || "3s"} linear infinite;
  animation-play-state: ${({ $playing }) => ($playing ? "running" : "paused")};
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

// ── Reel-to-reel visualization ────────────────────────────────────────────────

function Reel({ cx, cy, isPlaying, duration, rim, ring, spoke, hub }) {
  const r = 22;
  const innerR = 14;
  const sx = r * 0.5;        // ≈ 11
  const sy = r * 0.866025;   // ≈ 19.05

  return (
    <SpinningReel
      $cx={cx}
      $cy={cy}
      $playing={isPlaying}
      $duration={duration}
    >
      {/* Outer rim */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={rim} strokeWidth="1.4" />
      {/* Inner decorative ring */}
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke={ring} strokeWidth="0.8" />
      {/* Three crossing spokes (= 6 visible spokes) */}
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy}
            stroke={spoke} strokeWidth="1" strokeLinecap="round" />
      <line x1={cx - sx} y1={cy - sy} x2={cx + sx} y2={cy + sy}
            stroke={spoke} strokeWidth="1" strokeLinecap="round" />
      <line x1={cx + sx} y1={cy - sy} x2={cx - sx} y2={cy + sy}
            stroke={spoke} strokeWidth="1" strokeLinecap="round" />
      {/* Hub */}
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={hub}
        style={{
          filter: isPlaying ? "drop-shadow(0 0 3px rgba(255,140,0,0.7))" : "none",
          transition: "filter 300ms ease, fill 300ms ease",
        }}
      />
      {/* Hub recess (dark dot) */}
      <circle cx={cx} cy={cy} r={1.4} fill="rgba(0,0,0,0.55)" />
    </SpinningReel>
  );
}

function ReelToReel({ isPlaying: P, bpm }) {
  // Reference: 120 BPM matches the original hand-tuned speeds.
  const scale = 120 / Math.max(bpm || 120, 1);
  const tapeDur = `${(2.6 * scale).toFixed(2)}s`;
  const reelADur = `${(3.0 * scale).toFixed(2)}s`;
  const reelBDur = `${(3.4 * scale).toFixed(2)}s`;

  const tapeStatic = P ? "rgba(255,140,0,0.18)" : "rgba(255,140,0,0.08)";
  const tapeFlow   = P ? "rgba(255,140,0,0.9)"  : "rgba(255,140,0,0.25)";
  const rim        = P ? "rgba(255,140,0,0.55)" : "rgba(255,140,0,0.22)";
  const ring       = P ? "rgba(255,140,0,0.32)" : "rgba(255,140,0,0.13)";
  const spoke      = P ? "rgba(255,140,0,0.5)"  : "rgba(255,140,0,0.18)";
  const hub        = P ? "#ff8c00"              : "rgba(255,140,0,0.3)";

  return (
    <svg
      viewBox="0 0 280 70"
      style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      {/* Static tape track (background) */}
      <path
        d={TAPE_PATH}
        fill="none"
        stroke={tapeStatic}
        strokeWidth="2.6"
        style={{ transition: "stroke 300ms ease" }}
      />

      {/* Animated tape worm */}
      <TapeWorm
        d={TAPE_PATH}
        stroke={tapeFlow}
        strokeWidth="2.6"
        $playing={P}
        $duration={tapeDur}
        style={{
          filter: P ? "drop-shadow(0 0 4px rgba(255,140,0,0.55))" : "none",
          transition: "filter 300ms ease, stroke 300ms ease",
        }}
      />

      {/* Spinning reels */}
      <Reel cx={60}  cy={35} isPlaying={P} duration={reelADur}
            rim={rim} ring={ring} spoke={spoke} hub={hub} />
      <Reel cx={220} cy={35} isPlaying={P} duration={reelBDur}
            rim={rim} ring={ring} spoke={spoke} hub={hub} />
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
  onShare,
  shareCopied,
}) {
  const statusIcon = isPlaying ? "▶" : engineStatus === "STOPPED" ? "■" : "○";

  return (
    <Deck>
      <DeckTop>
        <CircuitSection>
          <SectionLabel>Tape Transport</SectionLabel>
          <ReelToReel isPlaying={isPlaying} bpm={bpm} />
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

        {onShare && (
          <UtilBtn onClick={onShare} title="Copy shareable link">
            {shareCopied ? "COPIED ✓" : "SHARE"}
          </UtilBtn>
        )}

        <ZenUtilBtn onClick={onZen}>ZEN</ZenUtilBtn>
      </DeckBottom>
    </Deck>
  );
}
