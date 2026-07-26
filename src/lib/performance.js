function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function paramBounds(layer, key) {
  const definition = layer.paramDefs?.find((item) => item.key === key);
  return definition?.type === "range"
    ? [definition.min, definition.max]
    : [0, Number.POSITIVE_INFINITY];
}

function setParam(layer, params, key, value) {
  if (typeof params[key] !== "number") return;
  const [min, max] = paramBounds(layer, key);
  params[key] = Number(clamp(value, min, max).toFixed(4));
}

function scaleParam(layer, params, key, bipolar, amount) {
  if (typeof params[key] !== "number") return;
  setParam(layer, params, key, params[key] * (1 + bipolar * amount));
}

function shiftParam(layer, params, key, bipolar, amount) {
  if (typeof params[key] !== "number") return;
  setParam(layer, params, key, params[key] + bipolar * amount);
}

// Energy is deliberately non-destructive: 50% reproduces the layer settings
// exactly, while lower/higher values darken or intensify the rendered copy.
export function applyEnergyToLayers(layers, energy) {
  const normalized = clamp(Number.isFinite(energy) ? energy : 0.5, 0, 1);
  const bipolar = (normalized - 0.5) * 2;

  return layers.map((layer) => {
    const params = { ...layer.params };

    if (layer.id === "kick") {
      scaleParam(layer, params, "gain", bipolar, 0.08);
      shiftParam(layer, params, "punch", bipolar, 0.08);
    }

    if (["snare", "hats", "open-hat", "perc"].includes(layer.id)) {
      scaleParam(layer, params, "gain", bipolar, layer.id === "perc" ? 0.4 : 0.25);
    }
    if (layer.id === "hats") {
      scaleParam(layer, params, "brightness", bipolar, 0.35);
    }

    if (layer.id === "bass") {
      scaleParam(layer, params, "midGain", bipolar, 0.24);
      scaleParam(layer, params, "lpf", bipolar, 0.55);
      shiftParam(layer, params, "sweep", bipolar, 0.18);
      shiftParam(layer, params, "drive", bipolar, 0.1);
    }

    if (layer.id === "chords") {
      scaleParam(layer, params, "gain", bipolar, 0.15);
      scaleParam(layer, params, "lpf", bipolar, 0.45);
      shiftParam(layer, params, "sweep", bipolar, 0.18);
      shiftParam(layer, params, "octaveAir", bipolar, 0.1);
    }

    if (layer.id === "drone") {
      scaleParam(layer, params, "gain", bipolar, 0.2);
      scaleParam(layer, params, "lpf", bipolar, 0.5);
      shiftParam(layer, params, "sweep", bipolar, 0.16);
    }

    if (layer.id === "arp") {
      scaleParam(layer, params, "gain", bipolar, 0.25);
      scaleParam(layer, params, "lpf", bipolar, 0.55);
      shiftParam(layer, params, "sweep", bipolar, 0.2);
    }

    if (["melody", "counter"].includes(layer.id)) {
      scaleParam(layer, params, "gain", bipolar, 0.22);
      scaleParam(layer, params, "lpf", bipolar, 0.4);
    }
    if (layer.id === "melody") {
      shiftParam(layer, params, "octaveClimax", bipolar, 0.12);
    }

    if (layer.id === "transition") {
      shiftParam(layer, params, "rise", bipolar, 0.24);
      shiftParam(layer, params, "crash", bipolar, 0.14);
    }

    if (layer.id === "texture") {
      scaleParam(layer, params, "gain", bipolar, -0.18);
    }

    return { ...layer, params };
  });
}

export function estimateMixLoad(layers, volume, soloId = null) {
  const total = layers
    .filter((layer) =>
      layer.enabled &&
      (soloId ? layer.id === soloId : !layer.muted),
    )
    .reduce((sum, layer) => {
      const sourceGain = typeof layer.params?.gain === "number" ? layer.params.gain : 0.5;
      const channelGain = typeof layer.mixGain === "number" ? layer.mixGain : 1;
      return sum + sourceGain * channelGain;
    }, 0);
  return clamp((total * volume) / 3.5, 0, 1.25);
}
