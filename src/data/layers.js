// A general-purpose background vibe music boilerplate.
//
// Ten distinct layers cover the building blocks of most chill / lofi /
// ambient compositions:
//
//   drums   — kick, snare, hats, perc      (rhythmic foundation)
//   bass    — bass, drone                   (harmonic root)
//   harmony — chords                        (sustained pad)
//   melody  — melody, arp                   (foreground lines)
//   fx      — texture                       (atmospheric warmth)
//
// Layers route to four FX buses via .orbit():
//   1 = drums + bass (tight room)
//   2 = chords + drone (long reverb tail)
//   3 = melody + arp (long delay)
//   4 = texture (own space)
//
// Each layer is independent — adding or removing one should always produce
// a coherent result. Defaults aim for an 80–90 BPM background-vibe feel.
//
// Evolution: layers embed slow movement so long sessions drift instead of
// looping identically — .lastOf(8, ...) fills, sine.slow(n) LFO sweeps,
// .sometimesBy(...) ornaments. Global swing arrives via context.swing.

// Append .swingBy when the global swing control is non-zero (drums only).
function swingSuffix(context) {
  const amount = Number(context?.swing ?? 0);
  return amount > 0 ? `\n  .swingBy(${amount}, 4)` : "";
}

export const BUILTIN_LAYERS = [
  // ── DRUMS ───────────────────────────────────────────────────────────

  {
    id: "kick",
    name: "Kick",
    category: "drums",
    order: 0,
    enabled: false,
    muted: false,
    description: "Soft warm kick. Fill adds a turn every 8 bars.",
    params: {
      gain: 0.85,
      pattern: "bd ~ ~ ~",
      bank: "RolandTR707",
      punch: 0,
      room: 0.1,
      fill: "none",
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 1.5, step: 0.01 },
      {
        key: "pattern",
        label: "Pattern",
        type: "select",
        options: [
          { value: "bd ~ ~ ~", label: "Sparse (1)" },
          { value: "bd ~ [~ bd] ~", label: "Heartbeat" },
          { value: "bd ~ ~ [~ bd]", label: "Boom-bap" },
          { value: "bd ~ bd ~", label: "Steady (1+3)" },
          { value: "bd ~ [~ bd] [~ bd ~ ~]", label: "Pushed" },
        ],
      },
      { key: "bank", label: "Bank", type: "text" },
      { key: "punch", label: "Punch", type: "range", min: 0, max: 0.6, step: 0.05 },
      { key: "room", label: "Room", type: "range", min: 0, max: 0.5, step: 0.01 },
      {
        key: "fill",
        label: "Fill (bar 8)",
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "breathe", label: "Breathe (drop out)" },
          { value: "push", label: "Push (double-time)" },
        ],
      },
    ],
    code: ({ gain, pattern, bank, punch, room, fill }, context) => {
      const fillExpr =
        fill === "breathe"
          ? `\n  .lastOf(8, x => x.degradeBy(0.5))`
          : fill === "push"
            ? `\n  .lastOf(8, x => x.fast(2))`
            : "";
      return `s("${pattern}")${bank ? `\n  .bank("${bank}")` : ""}${
        punch > 0 ? `\n  .shape(${punch})` : ""
      }${fillExpr}${swingSuffix(context)}
  .gain(${gain})
  .room(${room})`;
    },
  },

  {
    id: "snare",
    name: "Snare / Rim",
    category: "drums",
    order: 1,
    enabled: false,
    muted: false,
    description: "Backbeat on 2 & 4. Laid-back drags it behind the beat for that lofi pocket.",
    params: {
      gain: 0.45,
      pattern: "~ rim ~ rim",
      bank: "RolandTR707",
      late: 0.01,
      room: 0.25,
      fill: "none",
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 1, step: 0.01 },
      {
        key: "pattern",
        label: "Pattern",
        type: "select",
        options: [
          { value: "~ rim ~ rim", label: "Rim 2 & 4" },
          { value: "~ sd ~ sd", label: "Snare 2 & 4" },
          { value: "~ cp ~ cp", label: "Clap 2 & 4" },
          { value: "~ rim ~ [rim ~ ~ rim]", label: "Rim + drag" },
          { value: "~ [~ rim] ~ rim", label: "Displaced" },
        ],
      },
      { key: "bank", label: "Bank", type: "text" },
      { key: "late", label: "Laid-back", type: "range", min: 0, max: 0.04, step: 0.002 },
      { key: "room", label: "Room", type: "range", min: 0, max: 0.6, step: 0.01 },
      {
        key: "fill",
        label: "Fill (bar 8)",
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "ghost", label: "Ghost doubles" },
          { value: "roll", label: "Roll" },
        ],
      },
    ],
    code: ({ gain, pattern, bank, late, room, fill }, context) => {
      const fillExpr =
        fill === "ghost"
          ? `\n  .lastOf(8, x => x.ply(2))`
          : fill === "roll"
            ? `\n  .lastOf(8, x => x.fast(2))`
            : "";
      return `s("${pattern}")${bank ? `\n  .bank("${bank}")` : ""}${fillExpr}${
        late > 0 ? `\n  .late(${late})` : ""
      }${swingSuffix(context)}
  .gain(${gain})
  .room(${room})`;
    },
  },

  {
    id: "hats",
    name: "Hats",
    category: "drums",
    order: 2,
    enabled: false,
    muted: false,
    description: "Crushed hats with groove accents, random drops, and a slow stereo drift.",
    params: {
      gain: 0.3,
      density: 8,
      groove: "tick",
      bank: "RolandTR707",
      crush: 6,
      degrade: 0.2,
      shimmer: 0.1,
      drift: 0.5,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.6, step: 0.01 },
      { key: "density", label: "Density", type: "range", min: 4, max: 16, step: 4 },
      {
        key: "groove",
        label: "Groove",
        type: "select",
        options: [
          { value: "flat", label: "Flat" },
          { value: "tick", label: "Downbeat accents" },
          { value: "offbeat", label: "Offbeat accents" },
        ],
      },
      { key: "bank", label: "Bank", type: "text" },
      { key: "crush", label: "Crush", type: "range", min: 1, max: 16, step: 1 },
      { key: "degrade", label: "Degrade", type: "range", min: 0, max: 0.6, step: 0.05 },
      { key: "shimmer", label: "Shimmer", type: "range", min: 0, max: 0.4, step: 0.05 },
      { key: "drift", label: "Stereo drift", type: "range", min: 0, max: 1, step: 0.1 },
    ],
    code: ({ gain, density, groove, bank, crush, degrade, shimmer, drift }, context) => {
      const accents =
        groove === "tick" ? [1, 0.55, 0.8, 0.55] : groove === "offbeat" ? [0.55, 1, 0.6, 1] : null;
      const gainExpr = accents
        ? `"${accents.map((v) => +(v * gain).toFixed(2)).join(" ")}"`
        : String(gain);
      const panExpr =
        drift > 0
          ? `\n  .pan(sine.range(${+(0.5 - drift * 0.3).toFixed(2)}, ${+(0.5 + drift * 0.3).toFixed(2)}).slow(16))`
          : "";
      return `s("hh*${density}")${bank ? `\n  .bank("${bank}")` : ""}
  .crush(${crush})
  .degradeBy(${degrade})${
    shimmer > 0 ? `\n  .sometimesBy(${shimmer}, x => x.speed(1.5))` : ""
  }${panExpr}${swingSuffix(context)}
  .gain(${gainExpr})`;
    },
  },

  {
    id: "perc",
    name: "Percussion",
    category: "drums",
    order: 3,
    enabled: false,
    muted: false,
    description: "Euclidean shaker / rim. Rotate shifts the pattern against the beat.",
    params: {
      gain: 0.22,
      pulses: 5,
      rotate: 0,
      sound: "sh",
      speed: 1,
      bank: "",
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.5, step: 0.01 },
      { key: "pulses", label: "Pulses (of 8)", type: "range", min: 1, max: 7, step: 1 },
      { key: "rotate", label: "Rotate", type: "range", min: 0, max: 7, step: 1 },
      {
        key: "sound",
        label: "Sound",
        type: "select",
        options: [
          { value: "sh", label: "Shaker" },
          { value: "rim", label: "Rim" },
          { value: "cb", label: "Cowbell" },
          { value: "perc", label: "Perc" },
          { value: "click", label: "Click" },
        ],
      },
      { key: "speed", label: "Pitch", type: "range", min: 0.5, max: 2, step: 0.05 },
      { key: "bank", label: "Bank", type: "text" },
    ],
    code: ({ gain, pulses, rotate, sound, speed, bank }, context) =>
      `s("${sound}(${pulses},8${rotate > 0 ? `,${rotate}` : ""})")${
        bank ? `\n  .bank("${bank}")` : ""
      }${speed !== 1 ? `\n  .speed(${speed})` : ""}${swingSuffix(context)}
  .gain(${gain})`,
  },

  // ── BASS ────────────────────────────────────────────────────────────

  {
    id: "bass",
    name: "Bass",
    category: "bass",
    order: 4,
    enabled: false,
    muted: false,
    description: "Filtered sawtooth bass. Sweep opens and closes the filter over 32 bars.",
    params: {
      gain: 0.5,
      style: "roots",
      sound: "sawtooth",
      slow: 2,
      lpf: 700,
      sweep: 0.3,
      attack: 0.05,
      release: 0.4,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 1, step: 0.01 },
      {
        key: "style",
        label: "Style",
        type: "select",
        options: [
          { value: "roots", label: "Whole-note roots" },
          { value: "rootFifth", label: "Root + fifth" },
          { value: "octave", label: "Octave pulse" },
        ],
      },
      { key: "sound", label: "Sound", type: "text" },
      { key: "slow", label: "Slow", type: "range", min: 0.5, max: 4, step: 0.5 },
      { key: "lpf", label: "LPF (Hz)", type: "range", min: 200, max: 2000, step: 10 },
      { key: "sweep", label: "Sweep", type: "range", min: 0, max: 1, step: 0.05 },
      { key: "attack", label: "Attack", type: "range", min: 0, max: 0.5, step: 0.01 },
      { key: "release", label: "Release", type: "range", min: 0, max: 1.5, step: 0.05 },
    ],
    code: ({ gain, style, sound, slow, lpf, sweep, attack, release }, context) => {
      const line = context.bassLines?.[style] ?? context.bassLine;
      const lpfExpr =
        sweep > 0
          ? `sine.range(${Math.round(lpf * (1 - sweep * 0.4))}, ${Math.round(lpf * (1 + sweep * 0.6))}).slow(32)`
          : String(lpf);
      return `note("<${line}>")
  .sound("${sound}")
  .slow(${slow})
  .lpf(${lpfExpr})
  .attack(${attack})
  .release(${release})
  .gain(${gain})
  .orbit(1)`;
    },
  },

  {
    id: "drone",
    name: "Drone",
    category: "bass",
    order: 5,
    enabled: false,
    muted: false,
    description: "Tonic pedal under everything. Swell makes it rise and fall like breathing.",
    params: {
      gain: 0.2,
      voicing: "rootFifth",
      sound: "sine",
      lpf: 400,
      swell: 0.5,
      attack: 1.5,
      release: 3,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.5, step: 0.01 },
      {
        key: "voicing",
        label: "Voicing",
        type: "select",
        options: [
          { value: "root", label: "Root only" },
          { value: "rootFifth", label: "Root + fifth" },
          { value: "deep", label: "Deep (sub octave)" },
        ],
      },
      {
        key: "sound",
        label: "Sound",
        type: "select",
        options: [
          { value: "sine", label: "Sine" },
          { value: "triangle", label: "Triangle" },
          { value: "sawtooth", label: "Sawtooth" },
        ],
      },
      { key: "lpf", label: "LPF (Hz)", type: "range", min: 100, max: 1200, step: 20 },
      { key: "swell", label: "Swell", type: "range", min: 0, max: 1, step: 0.05 },
      { key: "attack", label: "Attack", type: "range", min: 0, max: 4, step: 0.1 },
      { key: "release", label: "Release", type: "range", min: 0.5, max: 6, step: 0.1 },
    ],
    code: ({ gain, voicing, sound, lpf, swell, attack, release }, context) => {
      const notes = context.droneNotes?.[voicing] ?? context.droneNotes?.root ?? "[c2]";
      const gainExpr =
        swell > 0
          ? `sine.range(${+(gain * (1 - swell * 0.6)).toFixed(3)}, ${gain}).slow(24)`
          : String(gain);
      return `note("${notes}")
  .sound("${sound}")
  .slow(4)
  .lpf(${lpf})
  .attack(${attack})
  .release(${release})
  .gain(${gainExpr})
  .orbit(2)`;
    },
  },

  // ── HARMONY ─────────────────────────────────────────────────────────

  {
    id: "chords",
    name: "Chords",
    category: "harmony",
    order: 6,
    enabled: false,
    muted: false,
    description: "Voice-led chord pad — each chord glides from the last. Sweep breathes over 48 bars.",
    params: {
      gain: 0.28,
      sound: "triangle",
      movement: "sustain",
      slow: 2,
      attack: 0.5,
      release: 1.5,
      lpf: 2200,
      sweep: 0.4,
      room: 0.7,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.6, step: 0.01 },
      { key: "sound", label: "Sound", type: "text" },
      {
        key: "movement",
        label: "Movement",
        type: "select",
        options: [
          { value: "sustain", label: "Sustain" },
          { value: "pulse", label: "Pulse (3 of 8)" },
          { value: "offbeat", label: "Offbeat stabs" },
        ],
      },
      { key: "slow", label: "Slow", type: "range", min: 1, max: 8, step: 0.5 },
      { key: "attack", label: "Attack", type: "range", min: 0, max: 2, step: 0.05 },
      { key: "release", label: "Release", type: "range", min: 0.1, max: 4, step: 0.1 },
      { key: "lpf", label: "LPF (Hz)", type: "range", min: 500, max: 5000, step: 50 },
      { key: "sweep", label: "Sweep", type: "range", min: 0, max: 1, step: 0.05 },
      { key: "room", label: "Room", type: "range", min: 0, max: 1, step: 0.01 },
    ],
    code: ({ gain, sound, movement, slow, attack, release, lpf, sweep, room }, context) => {
      const structExpr =
        movement === "pulse"
          ? `\n  .struct("x(3,8)")`
          : movement === "offbeat"
            ? `\n  .struct("~ x ~ x")`
            : "";
      const lpfExpr =
        sweep > 0
          ? `sine.range(${Math.round(lpf * (1 - sweep * 0.5))}, ${Math.round(lpf * (1 + sweep * 0.5))}).slow(48)`
          : String(lpf);
      return `note("<${context.chordStr}>")
  .sound("${sound}")${structExpr}
  .slow(${slow})
  .attack(${attack})
  .release(${release})
  .lpf(${lpfExpr})
  .room(${room})
  .gain(${gain})
  .orbit(2)`;
    },
  },

  // ── MELODY ──────────────────────────────────────────────────────────

  {
    id: "melody",
    name: "Melody",
    category: "melody",
    order: 7,
    enabled: false,
    muted: false,
    description: "Diatonic line generated from the current key and chords. Echo answers an octave up.",
    params: {
      gain: 0.18,
      sound: "triangle",
      style: "wander",
      echo: 0.4,
      delay: 0.5,
      delayTime: 0.375,
      delayFeedback: 0.4,
      degrade: 0.3,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.5, step: 0.01 },
      { key: "sound", label: "Sound", type: "text" },
      {
        key: "style",
        label: "Style",
        type: "select",
        options: [
          { value: "rise", label: "Rising arpeggio" },
          { value: "fall", label: "Falling arpeggio" },
          { value: "wander", label: "Wander" },
          { value: "reply", label: "Call & response" },
          { value: "minimal", label: "Minimal" },
        ],
      },
      { key: "echo", label: "Octave echo", type: "range", min: 0, max: 0.8, step: 0.05 },
      { key: "delay", label: "Delay", type: "range", min: 0, max: 0.8, step: 0.01 },
      { key: "delayTime", label: "Delay Time", type: "range", min: 0.05, max: 0.75, step: 0.005 },
      { key: "delayFeedback", label: "Delay FB", type: "range", min: 0, max: 0.8, step: 0.01 },
      { key: "degrade", label: "Degrade", type: "range", min: 0, max: 0.7, step: 0.05 },
    ],
    code: ({ gain, sound, style, echo, delay, delayTime, delayFeedback, degrade }, context) => {
      const degrees = context.chordDegrees ?? [0];
      // Fold high chord roots down an octave so the line stays in a singable
      // register instead of chasing vi/VII chords up the scale.
      const phrase = (rawDegree, i) => {
        const d = rawDegree >= 4 ? rawDegree - 7 : rawDegree;
        switch (style) {
          case "rise":
            return `[${d} ${d + 2} ${d + 4} ${d + 7}]`;
          case "fall":
            return `[${d + 7} ${d + 4} ${d + 2} ${d}]`;
          case "reply":
            return i % 2 === 0
              ? `[${d} ${d + 2} ${d + 4} ~]`
              : `[~ ~ ${d + 7} ${d + 4}]`;
          case "minimal":
            return `[${d + 7} ~ ~ ~]`;
          case "wander":
          default: {
            const shapes = [
              `[${d + 4} ~ ${d + 2} ${d + 7}]`,
              `[~ ${d} ${d + 4} ~]`,
              `[${d + 2} ~ ~ ${d + 5}]`,
              `[${d + 7} ${d + 4} ~ ${d + 2}]`,
            ];
            return shapes[i % shapes.length];
          }
        }
      };
      const line = degrees.map(phrase).join(" ");
      return `n("<${line}>")${
        echo > 0 ? `\n  .off(0.375, x => x.add(n(7)).gain(${echo}))` : ""
      }
  .scale("${context.scaleStr}")
  .sound("${sound}")
  .delay(${delay})
  .delaytime(${delayTime})
  .delayfeedback(${delayFeedback})
  .degradeBy(${degrade})
  .gain(${gain})
  .orbit(3)`;
    },
  },

  {
    id: "arp",
    name: "Arp",
    category: "melody",
    order: 8,
    enabled: false,
    muted: false,
    description: "Steady arpeggiator over the chord tones. Sits behind the melody, in front of the pad.",
    params: {
      gain: 0.15,
      sound: "sine",
      direction: "up",
      rate: "8th",
      slow: 2,
      lpf: 3000,
      delay: 0.3,
      degrade: 0.15,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.4, step: 0.01 },
      {
        key: "sound",
        label: "Sound",
        type: "select",
        options: [
          { value: "sine", label: "Sine" },
          { value: "triangle", label: "Triangle" },
          { value: "sawtooth", label: "Sawtooth" },
          { value: "square", label: "Square" },
        ],
      },
      {
        key: "direction",
        label: "Direction",
        type: "select",
        options: [
          { value: "up", label: "Up" },
          { value: "down", label: "Down" },
          { value: "updown", label: "Up-down" },
          { value: "pinch", label: "Pinch (out-in)" },
        ],
      },
      {
        key: "rate",
        label: "Rate",
        type: "select",
        options: [
          { value: "8th", label: "8th notes" },
          { value: "16th", label: "16th notes" },
        ],
      },
      { key: "slow", label: "Slow", type: "range", min: 1, max: 4, step: 0.5 },
      { key: "lpf", label: "LPF (Hz)", type: "range", min: 500, max: 6000, step: 50 },
      { key: "delay", label: "Delay", type: "range", min: 0, max: 0.7, step: 0.01 },
      { key: "degrade", label: "Degrade", type: "range", min: 0, max: 0.6, step: 0.05 },
    ],
    code: ({ gain, sound, direction, rate, slow, lpf, delay, degrade }, context) => {
      const chords = context.arpTones ?? [["c4", "e4", "g4", "b4"]];
      const orderTones = (tones) => {
        const t = [...tones];
        while (t.length < 4) t.push(t[t.length - 1]);
        switch (direction) {
          case "down":   return [t[3], t[2], t[1], t[0]];
          case "updown": return [t[0], t[1], t[2], t[3], t[2], t[1]];
          case "pinch":  return [t[0], t[3], t[1], t[2]];
          case "up":
          default:       return [t[0], t[1], t[2], t[3]];
        }
      };
      const line = chords
        .map((tones) => {
          const seq = orderTones(tones);
          const steps = rate === "16th" ? [...seq, ...seq] : seq;
          return `[${steps.join(" ")}]`;
        })
        .join(" ");
      return `note("<${line}>")
  .sound("${sound}")
  .slow(${slow})
  .lpf(${lpf})
  .delay(${delay})
  .degradeBy(${degrade})
  .gain(${gain})
  .orbit(3)`;
    },
  },

  // ── FX ──────────────────────────────────────────────────────────────

  {
    id: "texture",
    name: "Texture",
    category: "fx",
    order: 9,
    enabled: false,
    muted: false,
    description: "Atmosphere bed — vinyl crackle, noise washes, or field-recording-style birds.",
    params: {
      gain: 0.08,
      sound: "crackle*4",
      hpf: 1000,
      hpfMod: 0,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.3, step: 0.005 },
      {
        key: "sound",
        label: "Sound",
        type: "select",
        options: [
          { value: "crackle*4", label: "Vinyl crackle" },
          { value: "pink", label: "Rain (pink noise)" },
          { value: "brown", label: "Rumble (brown noise)" },
          { value: "[birds:1 ~ birds:3 ~ birds:5 ~ birds:2 ~]/4", label: "Birds" },
        ],
      },
      { key: "hpf", label: "HPF (Hz)", type: "range", min: 100, max: 5000, step: 50 },
      { key: "hpfMod", label: "HPF Sweep", type: "range", min: 0, max: 4000, step: 100 },
    ],
    code: ({ gain, sound, hpf, hpfMod }) => {
      const hpfExpr = hpfMod > 0
        ? `sine.range(${hpf}, ${hpf + hpfMod}).slow(20)`
        : String(hpf);
      return `s("${sound}")
  .hpf(${hpfExpr})
  .gain(${gain})
  .orbit(4)`;
    },
  },
];
