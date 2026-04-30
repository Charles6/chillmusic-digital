import styledImport, { createGlobalStyle, keyframes } from "styled-components";

const styled = styledImport.default ?? styledImport;

export const CATEGORY_COLOR = {
  drums: "#ff6b35",
  bass: "#ff3d6b",
  harmony: "#00d4b4",
  melody: "#c080ff",
  fx: "#40b4ff",
};

const glow = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

const newsCycle = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(118%, 0, 0);
  }
  14% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  76% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  100% {
    opacity: 0;
    transform: translate3d(-118%, 0, 0);
  }
`;

export const GlobalStyle = createGlobalStyle`
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }

  html, body {
    margin: 0;
    min-height: 100%;
    background: #040608;
    font-family: "Outfit", sans-serif;
    color: #c8a96a;
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.13) 3px,
      rgba(0, 0, 0, 0.13) 4px
    );
  }
`;

export const Shell = styled.main`
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1rem;
  align-items: stretch;
  padding: 1.5rem 0;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 1rem 0 2rem;
  }
`;

export const Panel = styled.section`
  position: relative;
  padding: 1.25rem;
  background: #060a10;
  border: 1px solid #1c2e3e;
  border-top-color: #2a4050;
  border-radius: 6px;
  box-shadow:
    0 0 0 1px #020406,
    inset 0 0 60px rgba(0, 0, 0, 0.5),
    0 16px 48px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  max-height: 92vh;
`;

export const Eyebrow = styled.p`
  margin: 0 0 0.3rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #ff8c00;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.55);
`;

export const Title = styled.h1`
  margin: 0;
  font-family: "Orbitron", sans-serif;
  font-size: clamp(1.1rem, 3vw, 1.65rem);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #e0c070;
  text-shadow: 0 0 24px rgba(255, 200, 80, 0.25);
  line-height: 1.1;
`;

export const Notice = styled.p`
  margin: 0.65rem 0 0;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  color: #2a4850;
  line-height: 1.6;
`;

export const Label = styled.span`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #3a6070;
`;

export const ArrangeRow = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin: 0.85rem 0 0;
`;

export const ArrangeBtn = styled.button`
  border: 1px solid ${({ $active }) =>
    $active ? "rgba(255,140,0,0.75)" : "#1a2e3a"};
  background: ${({ $active }) =>
    $active ? "rgba(255,140,0,0.12)" : "#050810"};
  color: ${({ $active }) => ($active ? "#ff8c00" : "#2e5060")};
  border-radius: 3px;
  padding: 0.28rem 0.7rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active
      ? "0 0 10px rgba(255,140,0,0.22), inset 0 0 8px rgba(255,140,0,0.06)"
      : "inset 0 1px 4px rgba(0,0,0,0.5)"};
  transition: all 120ms ease;

  &:hover {
    border-color: rgba(255, 140, 0, 0.35);
    color: #7a6030;
  }
`;

export const DisplayBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.6rem 0 0;
  padding: 0.45rem 0.75rem;
  background: #020407;
  border: 1px solid #0d1824;
  border-radius: 3px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.6);
`;

export const DisplayValue = styled.strong`
  font-family: "Share Tech Mono", monospace;
  font-size: 1rem;
  color: #ff8c00;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.65);
  min-width: 44px;
  text-align: right;
  flex-shrink: 0;
`;

export const Slider = styled.input`
  flex: 1;
  accent-color: #ff8c00;
  cursor: pointer;
`;

export const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    #1c2e3e 20%,
    #ff8c0020 50%,
    #1c2e3e 80%,
    transparent
  );
  margin: 0.75rem 0;
  flex-shrink: 0;
`;

export const LayerList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: #1c2e3e transparent;
`;

export const LayerCard = styled.div`
  border: 1px solid
    ${({ $on, $dimmed }) =>
      $dimmed ? "#0a1018" : $on ? "rgba(255,140,0,0.38)" : "#141e28"};
  border-radius: 3px;
  background: ${({ $on, $dimmed }) =>
    $dimmed ? "#040609" : $on ? "rgba(255,140,0,0.055)" : "#080c14"};
  box-shadow: ${({ $on }) =>
    $on ? "0 0 14px rgba(255,140,0,0.1)" : "none"};
  transition: border-color 140ms ease, background 140ms ease, box-shadow 140ms ease;
  overflow: hidden;
`;

export const LayerHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.65rem;
`;

export const Toggle = styled.button`
  flex-shrink: 0;
  width: 30px;
  height: 15px;
  border-radius: 2px;
  border: 1px solid ${({ $on }) => ($on ? "rgba(255,140,0,0.8)" : "#1a2a32")};
  background: ${({ $on }) => ($on ? "rgba(255,140,0,0.18)" : "#040810")};
  position: relative;
  cursor: pointer;
  padding: 0;
  box-shadow: ${({ $on }) =>
    $on
      ? "0 0 7px rgba(255,140,0,0.45), inset 0 0 5px rgba(255,140,0,0.1)"
      : "inset 0 1px 4px rgba(0,0,0,0.6)"};
  transition: all 120ms ease;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: ${({ $on }) => ($on ? "16px" : "2px")};
    width: 9px;
    height: 9px;
    background: ${({ $on }) => ($on ? "#ff8c00" : "#1a2a32")};
    box-shadow: ${({ $on }) => ($on ? "0 0 5px #ff8c00" : "none")};
    transition: left 120ms ease, background 120ms ease, box-shadow 120ms ease;
  }
`;

export const Pip = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
  box-shadow: 0 0 5px ${({ $color }) => `${$color}88`};
`;

export const LayerName = styled.span`
  flex: 1;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ $dimmed }) => ($dimmed ? "rgba(100,130,140,0.3)" : "#c8a96a")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 140ms ease;
`;

export const Chips = styled.div`
  display: flex;
  gap: 0.2rem;
  flex-shrink: 0;
`;

export const Chip = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid ${({ $active }) => ($active ? "rgba(255,140,0,0.65)" : "#141e28")};
  background: ${({ $active }) => ($active ? "rgba(255,140,0,0.14)" : "#040810")};
  color: ${({ $active }) => ($active ? "#ff8c00" : "#1e3a48")};
  font-family: "Share Tech Mono", monospace;
  font-size: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 100ms ease;

  &:hover:not(:disabled) {
    border-color: rgba(255, 140, 0, 0.3);
    color: #5a8090;
  }

  &:disabled {
    opacity: 0.18;
    cursor: default;
  }
`;

export const Chevron = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid #141e28;
  background: #040810;
  color: #1e3a48;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transform: ${({ $open }) => ($open ? "rotate(90deg)" : "none")};
  transition: transform 160ms ease, color 120ms ease;

  &:hover {
    color: #5a8090;
  }
`;

export const LayerBody = styled.div`
  padding: 0 0.65rem 0.65rem;
  border-top: 1px solid rgba(255, 140, 0, 0.07);
`;

export const LayerHint = styled.p`
  margin: 0.45rem 0 0.65rem;
  font-size: 0.78rem;
  color: #2e5060;
  line-height: 1.5;
`;

export const ParamGrid = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export const ParamRow = styled.div`
  display: grid;
  grid-template-columns: 76px 1fr 46px;
  align-items: center;
  gap: 0.45rem;
`;

export const ParamLabel = styled.label`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.62rem;
  color: #2e5060;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const ParamVal = styled.span`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.72rem;
  color: #7a6030;
  text-align: right;
`;

export const ParamSlider = styled.input`
  width: 100%;
  accent-color: #ff8c00;
  cursor: pointer;
`;

export const ParamText = styled.input`
  grid-column: 2 / -1;
  background: #020407;
  border: 1px solid #1a2a32;
  border-radius: 2px;
  padding: 0.22rem 0.5rem;
  color: #ff8c00;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.75rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 140, 0, 0.5);
    box-shadow: 0 0 6px rgba(255, 140, 0, 0.15);
  }
`;

export const Footer = styled.div`
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
`;

const Btn = styled.button`
  border-radius: 3px;
  padding: 0.55rem 1rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 140ms ease;
  border: 1px solid;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const PlayBtn = styled(Btn)`
  background: rgba(255, 140, 0, 0.14);
  color: #ff8c00;
  border-color: rgba(255, 140, 0, 0.55);
  box-shadow: 0 0 12px rgba(255, 140, 0, 0.18);

  &:hover:not(:disabled) {
    background: rgba(255, 140, 0, 0.22);
    box-shadow: 0 0 20px rgba(255, 140, 0, 0.3);
  }
`;

export const StopBtn = styled(Btn)`
  background: rgba(0, 212, 180, 0.07);
  color: #00d4b4;
  border-color: rgba(0, 212, 180, 0.22);

  &:hover {
    background: rgba(0, 212, 180, 0.13);
    box-shadow: 0 0 10px rgba(0, 212, 180, 0.15);
  }
`;

export const ZenBtn = styled(Btn)`
  margin-left: auto;
  background: transparent;
  color: #1e3a48;
  border-color: #141e28;
  padding: 0.55rem 0.75rem;

  &:hover {
    color: #00d4b4;
    border-color: rgba(0, 212, 180, 0.3);
    box-shadow: 0 0 8px rgba(0, 212, 180, 0.12);
  }
`;

export const StatusText = styled.span`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: #2a4850;
`;

export const CopyBtn = styled(Btn)`
  background: transparent;
  color: ${({ $done }) => ($done ? "#00d4b4" : "#2a4850")};
  border-color: ${({ $done }) =>
    $done ? "rgba(0,212,180,0.4)" : "#141e28"};
  padding: 0.4rem 0.75rem;
  font-size: 0.65rem;

  &:hover {
    color: #00d4b4;
    border-color: rgba(0, 212, 180, 0.3);
  }
`;

export const CodeHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  flex-shrink: 0;
`;

export const CodePanel = styled.pre`
  flex: 1;
  margin: 0;
  padding: 1rem;
  background: #020407;
  border: 1px solid #0d1824;
  border-radius: 3px;
  box-shadow: inset 0 2px 20px rgba(0, 0, 0, 0.65);
  color: #2d8a60;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.78rem;
  line-height: 1.7;
  overflow: auto;
  white-space: pre;
  min-height: 0;
  text-shadow: 0 0 5px rgba(45, 138, 96, 0.45);
`;

export const ZenScreen = styled.div`
  position: fixed;
  inset: 0;
  background: #040608;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 50;
  user-select: none;
  overflow: hidden;
  padding: 2rem 1rem;
`;

export const ZenTime = styled.div`
  font-family: "Orbitron", sans-serif;
  font-size: clamp(5rem, 20vw, 15rem);
  font-weight: 900;
  color: #ff8c00;
  text-shadow:
    0 0 30px rgba(255, 140, 0, 0.7),
    0 0 80px rgba(255, 140, 0, 0.3),
    0 0 160px rgba(255, 140, 0, 0.12);
  letter-spacing: 0.04em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;

export const ZenDate = styled.div`
  margin-top: 1.5rem;
  font-family: "Share Tech Mono", monospace;
  font-size: clamp(0.7rem, 1.8vw, 1rem);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #2a5050;
  text-shadow: 0 0 14px rgba(0, 180, 140, 0.25);
`;

export const ZenWeather = styled.div`
  margin-top: 1rem;
  min-height: 4.4rem;
  display: grid;
  place-items: center;
  gap: 0.25rem;
  text-align: center;
`;

export const ZenWeatherSummary = styled.div`
  font-family: "Orbitron", sans-serif;
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9ad7cf;
  text-shadow: 0 0 14px rgba(143, 208, 194, 0.2);
`;

export const ZenWeatherLocation = styled.div`
  font-family: "Share Tech Mono", monospace;
  font-size: clamp(0.62rem, 1.5vw, 0.8rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #5c8c91;
  line-height: 1.55;
`;

export const ZenWeatherMeta = styled.div`
  font-family: "Share Tech Mono", monospace;
  font-size: clamp(0.58rem, 1.4vw, 0.72rem);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #31525a;
  line-height: 1.6;
`;

export const ZenPlaying = styled.div`
  position: absolute;
  top: 2rem;
  right: 2.5rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ff8c00;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.6);
  animation: ${glow} 1.8s ease-in-out infinite;
`;

export const ZenHint = styled.div`
  position: absolute;
  bottom: 2rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #141e28;
`;

export const ZenNewsRail = styled.div`
  position: relative;
  width: min(42rem, calc(100vw - 2rem));
  min-height: 11rem;
  margin-bottom: clamp(1.25rem, 3vh, 2rem);
  pointer-events: none;

  @media (max-width: 700px) {
    width: calc(100vw - 1.5rem);
    min-height: 11.5rem;
  }
`;

export const ZenNewsCard = styled.a`
  position: absolute;
  inset: 0;
  display: grid;
  gap: 0.75rem;
  padding: 1rem 1.1rem 1rem 1.15rem;
  border-radius: 8px;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
  pointer-events: auto;
  animation: ${newsCycle} 7s ease-in-out forwards;
  text-decoration: none;
  transition: background 180ms ease, transform 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.025);
  }
`;

export const ZenNewsMeta = styled.div`
  font-family: "Share Tech Mono", monospace;
  font-size: 0.6rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #ff8c00;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.35);
`;

export const ZenNewsHeadline = styled.h2`
  margin: 0;
  font-family: "Orbitron", sans-serif;
  font-size: clamp(0.95rem, 2.3vw, 1.2rem);
  line-height: 1.35;
  color: #f2d8a0;
  text-shadow: 0 0 12px rgba(255, 190, 110, 0.12);
`;

export const ZenNewsDescription = styled.p`
  margin: 0;
  color: #7c9ca0;
  font-family: "Outfit", sans-serif;
  font-size: 0.92rem;
  line-height: 1.55;
`;

// --- Account / Auth modal ---------------------------------------------------

export const AccountBtn = styled(Btn)`
  background: transparent;
  color: #2a4850;
  border-color: #141e28;
  padding: 0.55rem 0.75rem;
  font-size: 0.65rem;

  &:hover {
    color: #9ad7cf;
    border-color: rgba(154, 215, 207, 0.3);
    box-shadow: 0 0 8px rgba(154, 215, 207, 0.1);
  }
`;

export const SaveBtn = styled(Btn)`
  background: transparent;
  color: #2a4850;
  border-color: #141e28;
  padding: 0.55rem 0.75rem;
  font-size: 0.65rem;

  &:hover {
    color: #00d4b4;
    border-color: rgba(0, 212, 180, 0.3);
    box-shadow: 0 0 8px rgba(0, 212, 180, 0.12);
  }

  &:disabled {
    opacity: 0.2;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
`;

export const ModalPanel = styled.div`
  background: #070c12;
  border: 1px solid #0d1824;
  border-radius: 6px;
  padding: 1.75rem 2rem;
  width: 100%;
  max-width: 22rem;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-family: "Orbitron", sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ff8c00;
  text-shadow: 0 0 14px rgba(255, 140, 0, 0.35);
`;

export const ModalInput = styled.input`
  width: 100%;
  background: #040607;
  border: 1px solid #0d1824;
  border-radius: 3px;
  padding: 0.6rem 0.75rem;
  color: #9ad7cf;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  outline: none;

  &::placeholder { color: #1e3a48; }

  &:focus {
    border-color: rgba(0, 212, 180, 0.3);
    box-shadow: 0 0 8px rgba(0, 212, 180, 0.1);
  }
`;

export const ModalError = styled.p`
  margin: 0;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: #ff3d6b;
`;

export const ModalHint = styled.p`
  margin: 0;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: #2a4850;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: #1e3a48;

  &:hover { color: #5c8c91; }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const ModalSubmitBtn = styled(Btn)`
  background: rgba(255, 140, 0, 0.1);
  color: #ff8c00;
  border-color: rgba(255, 140, 0, 0.35);

  &:hover:not(:disabled) {
    background: rgba(255, 140, 0, 0.18);
    box-shadow: 0 0 14px rgba(255, 140, 0, 0.25);
  }

  &:disabled { opacity: 0.35; }
`;

export const ModalCancelBtn = styled(Btn)`
  background: transparent;
  color: #2a4850;
  border-color: #141e28;

  &:hover { color: #5c8c91; }
`;
