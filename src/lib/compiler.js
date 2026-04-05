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
    const expr =
      typeof layer.code === "function"
        ? layer.code(layer.params, context)
        : layer.code;

    const indented = expr
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n");

    return `  // ${layer.name}\n${indented}`;
  });

  const stackExpr = `stack(\n${parts.join(",\n\n")}\n)`;
  const display = `setcps(${context.bpm}/60)\n\n${stackExpr}`;

  return { display, stack: stackExpr };
}
