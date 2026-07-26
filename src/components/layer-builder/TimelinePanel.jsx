import React from "react";
import styledImport from "styled-components";
import { ARRANGEMENTS } from "../../data/arrangements";
import { QUANTIZE_OPTIONS, TIMELINE_BAR_OPTIONS } from "../../lib/timeline";

const styled = styledImport.default ?? styledImport;

const TimelineShell = styled.section`
  margin-top: 0.7rem;
  padding: 0.6rem;
  border: 1px solid #29475a;
  border-radius: 4px;
  background: #03070c;
  box-shadow: inset 0 2px 12px rgba(0, 0, 0, 0.45);
`;

const TimelineHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const TimelineTitle = styled.span`
  margin-right: auto;
  font-family: "Share Tech Mono", monospace;
  color: #79b3c5;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  @media (max-width: 600px) {
    flex-basis: 100%;
    margin-right: 0;
  }
`;

const SmallSelect = styled.select`
  min-width: 74px;
  border: 1px solid #31566b;
  border-radius: 2px;
  background: #061019;
  color: #9ed5e3;
  padding: 0.24rem 0.35rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.58rem;
  cursor: pointer;

  @media (max-width: 1100px) { min-height: 36px; }
  @media (max-width: 600px) { min-height: 38px; }
`;

const ActionButton = styled.button`
  border: 1px solid ${({ $active }) => ($active ? "rgba(54,232,200,0.65)" : "#31566b")};
  border-radius: 2px;
  background: ${({ $active }) => ($active ? "rgba(54,232,200,0.13)" : "#061019")};
  color: ${({ $active }) => ($active ? "#36e8c8" : "#9ed5e3")};
  padding: 0.27rem 0.48rem;
  font-family: "Share Tech Mono", monospace;
  font-size: 0.56rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;

  &:hover:not(:disabled) {
    color: #d4f8fb;
    border-color: rgba(78, 205, 255, 0.72);
    background: rgba(52, 167, 212, 0.16);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  @media (max-width: 1100px) { min-height: 36px; }
`;

const Track = styled.div`
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding: 0.1rem 0 0.35rem;
  scrollbar-width: thin;
  scrollbar-color: #47758b transparent;
  scroll-snap-type: x proximity;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
`;

const SectionCard = styled.div`
  position: relative;
  width: 122px;
  min-width: 122px;
  padding: 0.45rem;
  border: 1px solid ${({ $active, $queued }) =>
    $active
      ? "rgba(54,232,200,0.7)"
      : $queued
        ? "rgba(255,157,36,0.72)"
        : "#29475a"};
  border-radius: 3px;
  background: ${({ $active, $queued }) =>
    $active
      ? "rgba(54,232,200,0.1)"
      : $queued
        ? "rgba(255,140,0,0.08)"
        : "#071019"};
  box-shadow: ${({ $active }) => ($active ? "0 0 12px rgba(54,232,200,0.14)" : "none")};
  scroll-snap-align: start;

  @media (max-width: 1100px) {
    width: 180px;
    min-width: 180px;
    padding: 0.55rem;
  }
`;

const SectionLaunch = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  color: #dec680;
  padding: 0;
  text-align: left;
  font-family: "Outfit", sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover { color: #fff0b8; }

  @media (max-width: 600px) {
    min-height: 30px;
    font-size: 0.78rem;
  }
`;

const PresetSelect = styled(SmallSelect)`
  width: 100%;
  min-width: 0;
  margin-top: 0.35rem;
  padding: 0.18rem 0.2rem;
  font-size: 0.52rem;
  text-overflow: ellipsis;
`;

const SectionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.35rem;
`;

const BarsSelect = styled(SmallSelect)`
  min-width: 52px;
  width: 52px;
  padding: 0.18rem 0.2rem;
`;

const MoveButton = styled.button`
  width: 18px;
  height: 18px;
  padding: 0;
  border: 1px solid #29475a;
  background: #040a10;
  color: #79a9b8;
  border-radius: 2px;
  font-size: 0.48rem;
  cursor: pointer;

  &:hover:not(:disabled) { color: #d4f8fb; border-color: #4ecfff; }
  &:disabled { opacity: 0.2; cursor: default; }

  @media (max-width: 1100px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 600px) {
    width: 32px;
    height: 32px;
    font-size: 0.62rem;
  }
`;

const Progress = styled.div`
  height: 2px;
  margin-top: 0.4rem;
  background: #10202b;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    width: ${({ $value }) => `${Math.min(100, Math.max(0, $value * 100))}%`};
    height: 100%;
    background: #36e8c8;
    box-shadow: 0 0 5px rgba(54, 232, 200, 0.55);
  }
`;

const TransportReadout = styled.span`
  font-family: "Share Tech Mono", monospace;
  color: #79a9b8;
  font-size: 0.56rem;
  white-space: nowrap;

  @media (max-width: 600px) { margin-right: auto; }
`;

export default function TimelinePanel({
  timeline,
  timelineRunning,
  timelineIndex,
  sectionBar,
  transportBar,
  queuedArrangementId,
  quantizeBars,
  onQuantizeChange,
  onRun,
  onStopSequence,
  onLaunch,
  onChangeSection,
  onMoveSection,
  onRemoveSection,
  onAddSection,
}) {
  return (
    <TimelineShell>
      <TimelineHead>
        <TimelineTitle>Song Timeline</TimelineTitle>
        <TransportReadout>BAR {transportBar + 1}</TransportReadout>
        <SmallSelect
          aria-label="Switch quantization"
          value={quantizeBars}
          onChange={(event) => onQuantizeChange(Number(event.target.value))}
        >
          {QUANTIZE_OPTIONS.map((bars) => (
            <option key={bars} value={bars}>
              {bars === 0 ? "NOW" : `${bars} BAR${bars === 1 ? "" : "S"}`}
            </option>
          ))}
        </SmallSelect>
        <ActionButton $active={timelineRunning} onClick={timelineRunning ? onStopSequence : onRun}>
          {timelineRunning ? "Stop Seq" : "Run"}
        </ActionButton>
      </TimelineHead>

      <Track>
        {timeline.map((section, index) => {
          const arrangement = ARRANGEMENTS.find((item) => item.id === section.arrangementId);
          const active = timelineRunning && timelineIndex === index;
          const progress = active ? sectionBar / section.bars : 0;
          return (
            <SectionCard
              key={section.id}
              $active={active}
              $queued={queuedArrangementId === section.arrangementId}
            >
              <SectionLaunch onClick={() => onLaunch(section.arrangementId)} title={arrangement?.description}>
                {index + 1}. {arrangement?.name ?? section.arrangementId}
              </SectionLaunch>
              <PresetSelect
                aria-label={`Preset for section ${index + 1}`}
                value={section.arrangementId}
                disabled={timelineRunning}
                onChange={(event) => onChangeSection(section.id, { arrangementId: event.target.value })}
              >
                {ARRANGEMENTS.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </PresetSelect>
              <SectionMeta>
                <BarsSelect
                  aria-label={`Bars for section ${index + 1}`}
                  value={section.bars}
                  disabled={timelineRunning}
                  onChange={(event) => onChangeSection(section.id, { bars: Number(event.target.value) })}
                >
                  {TIMELINE_BAR_OPTIONS.map((bars) => <option key={bars} value={bars}>{bars}b</option>)}
                </BarsSelect>
                <MoveButton disabled={timelineRunning || index === 0} onClick={() => onMoveSection(section.id, -1)}>◀</MoveButton>
                <MoveButton disabled={timelineRunning || index === timeline.length - 1} onClick={() => onMoveSection(section.id, 1)}>▶</MoveButton>
                <MoveButton disabled={timelineRunning || timeline.length === 1} onClick={() => onRemoveSection(section.id)}>×</MoveButton>
              </SectionMeta>
              <Progress $value={progress} />
            </SectionCard>
          );
        })}
        <ActionButton disabled={timelineRunning} onClick={onAddSection}>+ Section</ActionButton>
      </Track>
    </TimelineShell>
  );
}
