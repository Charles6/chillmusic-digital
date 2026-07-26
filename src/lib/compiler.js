export function compile(layers, context, { soloId = null } = {}) {
  let active;

  if (soloId) {
    active = layers.filter((l) => l.id === soloId && l.enabled);
  } else {
    active = layers.filter((l) => l.enabled && !l.muted);
  }

  active = [...active].sort((a, b) => a.order - b.order);

  if (active.length === 0) {
    return {
      display: "// No active layers — enable some layers to generate code.",
      stack: null,
    };
  }

  const parts = active.map((layer) => {
    const sourceExpr =
      typeof layer.code === "function"
        ? layer.code(layer.params, context)
        : layer.code;
    const mixGain = typeof layer.mixGain === "number" ? layer.mixGain : 1;
    const pan = typeof layer.pan === "number"
      ? Math.min(1, Math.max(-1, layer.pan))
      : 0;
    const mixerEffects = [];

    // Keep the mixer completely out of the signal path at its neutral values.
    // In particular, a trailing center pan collapses stereo effects such as juxBy.
    if (Math.abs(mixGain - 1) > 0.0001) {
      mixerEffects.push(`  .postgain(${Number(mixGain.toFixed(3))})`);
    }

    if (Math.abs(pan) > 0.0001) {
      const panPosition = Number(((pan + 1) / 2).toFixed(3));
      mixerEffects.push(`  .pan(${panPosition})`);
    }

    const expr = mixerEffects.length
      ? `(${sourceExpr})\n${mixerEffects.join("\n")}`
      : sourceExpr;

    const indented = expr
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n");

    return `  // ${layer.name}\n${indented}`;
  });

  const stackExpr = `stack(\n${parts.join(",\n\n")}\n)`;
  const display = `setcps(${context.bpm}/240) // one cycle = one 4/4 bar\n\n${stackExpr}`;

  return { display, stack: stackExpr };
}
