import React from "react";
import {
  CATEGORY_COLOR,
  Chevron,
  Chip,
  Chips,
  LayerBody,
  LayerCard,
  LayerHead,
  LayerHint,
  LayerName,
  ParamGrid,
  ParamLabel,
  ParamRow,
  ParamSlider,
  ParamText,
  ParamVal,
  Pip,
  Toggle,
} from "./styles";

export default function LayerItem({
  layer,
  isExpanded,
  isSoloed,
  isEffectivelyMuted,
  isFirst,
  isLast,
  onToggle,
  onMute,
  onSolo,
  onMoveUp,
  onMoveDown,
  onParamChange,
  onExpand,
}) {
  const color = CATEGORY_COLOR[layer.category] ?? "#3a6070";
  const dimmed = !layer.enabled || isEffectivelyMuted;

  return (
    <LayerCard $on={layer.enabled} $dimmed={dimmed}>
      <LayerHead>
        <Toggle
          $on={layer.enabled}
          onClick={onToggle}
          aria-label={layer.enabled ? "Disable" : "Enable"}
        />
        <Pip $color={color} />
        <LayerName $dimmed={dimmed}>{layer.name}</LayerName>
        <Chips>
          <Chip $active={layer.muted} onClick={onMute} title="Mute">M</Chip>
          <Chip $active={isSoloed} onClick={onSolo} title="Solo">S</Chip>
          <Chip onClick={onMoveUp} disabled={isFirst} title="Move up">▲</Chip>
          <Chip onClick={onMoveDown} disabled={isLast} title="Move down">▼</Chip>
          <Chevron $open={isExpanded} onClick={onExpand}>›</Chevron>
        </Chips>
      </LayerHead>

      {isExpanded && (
        <LayerBody>
          <LayerHint>{layer.description}</LayerHint>
          <ParamGrid>
            {layer.paramDefs.map((def) => (
              <ParamRow key={def.key}>
                <ParamLabel htmlFor={`${layer.id}-${def.key}`}>{def.label}</ParamLabel>
                {def.type === "range" ? (
                  <>
                    <ParamSlider
                      id={`${layer.id}-${def.key}`}
                      type="range"
                      min={def.min}
                      max={def.max}
                      step={def.step}
                      value={layer.params[def.key]}
                      onChange={(event) => onParamChange(def.key, Number(event.target.value))}
                    />
                    <ParamVal>{layer.params[def.key]}</ParamVal>
                  </>
                ) : (
                  <ParamText
                    id={`${layer.id}-${def.key}`}
                    type="text"
                    value={layer.params[def.key]}
                    onChange={(event) => onParamChange(def.key, event.target.value)}
                    spellCheck={false}
                  />
                )}
              </ParamRow>
            ))}
          </ParamGrid>
        </LayerBody>
      )}
    </LayerCard>
  );
}
