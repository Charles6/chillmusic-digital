import { ARRANGEMENTS, DEFAULT_CONTEXT } from "../data/arrangements";
import { BUILTIN_LAYERS } from "../data/layers";
import { KEYS, PROGRESSIONS } from "../data/progressions";

const SETTINGS_VERSION = 1;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function cloneBuiltinLayers() {
  return BUILTIN_LAYERS.map((layer) => ({
    ...layer,
    params: { ...layer.params },
  }));
}

function sanitizeParam(definition, fallback, value) {
  if (definition?.type === "range") {
    if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
    return clamp(value, definition.min, definition.max);
  }

  if (definition?.type === "select") {
    return definition.options?.some((option) => option.value === value)
      ? value
      : fallback;
  }

  if (definition?.type === "text") {
    return typeof value === "string" ? value : fallback;
  }

  return typeof value === typeof fallback ? value : fallback;
}

export function createSketchSettings({
  context,
  layers,
  volume,
  soloId,
  activeArrangementId,
}) {
  return {
    version: SETTINGS_VERSION,
    context: {
      bpm: context.bpm,
      swing: context.swing,
      keyId: context.keyId,
      progressionId: context.progressionId,
    },
    layers: layers.map((layer) => ({
      id: layer.id,
      enabled: layer.enabled,
      muted: layer.muted,
      order: layer.order,
      params: { ...layer.params },
    })),
    volume,
    soloId,
    activeArrangementId,
  };
}

// Treat saved settings as untrusted input. Merge known fields onto the current
// built-ins so older saves survive new layers/parameters and malformed saves
// cannot poison the builder state.
export function hydrateSketchSettings(settings) {
  if (!isRecord(settings) || settings.version !== SETTINGS_VERSION) return null;

  const savedContext = isRecord(settings.context) ? settings.context : {};
  const context = {
    bpm:
      typeof savedContext.bpm === "number" && Number.isFinite(savedContext.bpm)
        ? clamp(savedContext.bpm, 80, 180)
        : DEFAULT_CONTEXT.bpm,
    swing:
      typeof savedContext.swing === "number" && Number.isFinite(savedContext.swing)
        ? clamp(savedContext.swing, 0, 0.45)
        : DEFAULT_CONTEXT.swing,
    keyId: KEYS.some((key) => key.id === savedContext.keyId)
      ? savedContext.keyId
      : DEFAULT_CONTEXT.keyId,
    progressionId: PROGRESSIONS.some(
      (progression) => progression.id === savedContext.progressionId,
    )
      ? savedContext.progressionId
      : DEFAULT_CONTEXT.progressionId,
  };

  const savedLayers = Array.isArray(settings.layers) ? settings.layers : [];
  const savedById = new Map(
    savedLayers
      .filter((layer) => isRecord(layer) && typeof layer.id === "string")
      .map((layer) => [layer.id, layer]),
  );
  const layers = cloneBuiltinLayers().map((layer) => {
    const saved = savedById.get(layer.id);
    if (!saved) return layer;

    const savedParams = isRecord(saved.params) ? saved.params : {};
    const definitions = new Map(
      (layer.paramDefs ?? []).map((definition) => [definition.key, definition]),
    );
    const params = Object.fromEntries(
      Object.entries(layer.params).map(([key, fallback]) => [
        key,
        sanitizeParam(definitions.get(key), fallback, savedParams[key]),
      ]),
    );

    return {
      ...layer,
      enabled: typeof saved.enabled === "boolean" ? saved.enabled : layer.enabled,
      muted: typeof saved.muted === "boolean" ? saved.muted : layer.muted,
      order:
        typeof saved.order === "number" && Number.isFinite(saved.order)
          ? saved.order
          : layer.order,
      params,
    };
  });

  const layerIds = new Set(layers.map((layer) => layer.id));
  const arrangementIds = new Set(ARRANGEMENTS.map((arrangement) => arrangement.id));

  return {
    context,
    layers,
    volume:
      typeof settings.volume === "number" && Number.isFinite(settings.volume)
        ? clamp(settings.volume, 0, 1)
        : 0.8,
    soloId:
      typeof settings.soloId === "string" && layerIds.has(settings.soloId)
        ? settings.soloId
        : null,
    activeArrangementId:
      typeof settings.activeArrangementId === "string" &&
      arrangementIds.has(settings.activeArrangementId)
        ? settings.activeArrangementId
        : null,
  };
}
