// A general-purpose background vibe music boilerplate.
//
// Eight distinct layers cover the building blocks of most chill / lofi /
// ambient compositions:
//
//   drums   — kick, snare, hats, perc      (rhythmic foundation)
//   bass    — bass                          (harmonic root)
//   harmony — chords                        (sustained pad)
//   melody  — melody                        (foreground line)
//   fx      — texture                       (atmospheric warmth)
//
// Layers route to four FX buses via .orbit():
//   1 = drums + bass (tight room)
//   2 = chords (long reverb tail)
//   3 = melody (long delay)
//   4 = texture (own space)
//
// Each layer is independent — adding or removing one should always produce
// a coherent result. Defaults aim for an 80–90 BPM background-vibe feel.

export const BUILTIN_LAYERS = [
  // ── DRUMS ───────────────────────────────────────────────────────────

  {
    id: "kick",
    name: "Kick",
    category: "drums",
    order: 0,
    enabled: false,
    muted: false,
    description: "Soft warm kick. Sparse 4-bar feel by default.",
    params: {
      gain: 0.85,
      pattern: "bd ~ ~ ~",
      bank: "RolandTR707",
      room: 0.1,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 1.5, step: 0.01 },
      { key: "pattern", label: "Pattern", type: "text" },
      { key: "bank", label: "Bank", type: "text" },
      { key: "room", label: "Room", type: "range", min: 0, max: 0.5, step: 0.01 },
    ],
    code: ({ gain, pattern, bank, room }) => `s("${pattern}")${
      bank ? `\n  .bank("${bank}")` : ""
    }
  .gain(${gain})
  .room(${room})`,
  },

  {
    id: "snare",
    name: "Snare / Rim",
    category: "drums",
    order: 1,
    enabled: false,
    muted: false,
    description: "Backbeat on 2 & 4. Try 'sd', 'rim', or 'cp' for the pattern.",
    params: {
      gain: 0.45,
      pattern: "~ rim ~ rim",
      bank: "RolandTR707",
      room: 0.25,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 1, step: 0.01 },
      { key: "pattern", label: "Pattern", type: "text" },
      { key: "bank", label: "Bank", type: "text" },
      { key: "room", label: "Room", type: "range", min: 0, max: 0.6, step: 0.01 },
    ],
    code: ({ gain, pattern, bank, room }) => `s("${pattern}")${
      bank ? `\n  .bank("${bank}")` : ""
    }
  .gain(${gain})
  .room(${room})`,
  },

  {
    id: "hats",
    name: "Hats",
    category: "drums",
    order: 2,
    enabled: false,
    muted: false,
    description: "Crushed hats with random drops for an organic, lofi feel.",
    params: {
      gain: 0.3,
      density: 8,
      bank: "RolandTR707",
      crush: 6,
      degrade: 0.2,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.6, step: 0.01 },
      { key: "density", label: "Density", type: "range", min: 4, max: 16, step: 4 },
      { key: "bank", label: "Bank", type: "text" },
      { key: "crush", label: "Crush", type: "range", min: 1, max: 16, step: 1 },
      { key: "degrade", label: "Degrade", type: "range", min: 0, max: 0.6, step: 0.05 },
    ],
    code: ({ gain, density, bank, crush, degrade }) => `s("hh*${density}")${
      bank ? `\n  .bank("${bank}")` : ""
    }
  .crush(${crush})
  .degradeBy(${degrade})
  .gain(${gain})`,
  },

  {
    id: "perc",
    name: "Percussion",
    category: "drums",
    order: 3,
    enabled: false,
    muted: false,
    description: "Euclidean shaker / rim. Adds swing and human feel without clutter.",
    params: {
      gain: 0.22,
      pulses: 5,
      sound: "sh",
      bank: "RolandTR707",
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.5, step: 0.01 },
      { key: "pulses", label: "Pulses (of 8)", type: "range", min: 1, max: 7, step: 1 },
      { key: "sound", label: "Sound", type: "text" },
      { key: "bank", label: "Bank", type: "text" },
    ],
    code: ({ gain, pulses, sound, bank }) => `s("${sound}(${pulses},8)")${
      bank ? `\n  .bank("${bank}")` : ""
    }
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
    description: "Filtered sawtooth root bass. Soft attack keeps it warm.",
    params: {
      gain: 0.5,
      sound: "sawtooth",
      slow: 2,
      lpf: 700,
      attack: 0.05,
      release: 0.4,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 1, step: 0.01 },
      { key: "sound", label: "Sound", type: "text" },
      { key: "slow", label: "Slow", type: "range", min: 0.5, max: 4, step: 0.5 },
      { key: "lpf", label: "LPF (Hz)", type: "range", min: 200, max: 2000, step: 10 },
      { key: "attack", label: "Attack", type: "range", min: 0, max: 0.5, step: 0.01 },
      { key: "release", label: "Release", type: "range", min: 0, max: 1.5, step: 0.05 },
    ],
    code: ({ gain, sound, slow, lpf, attack, release }, context) =>
      `note("<${context.bassLine}>")
  .sound("${sound}")
  .slow(${slow})
  .lpf(${lpf})
  .attack(${attack})
  .release(${release})
  .gain(${gain})
  .orbit(1)`,
  },

  // ── HARMONY ─────────────────────────────────────────────────────────

  {
    id: "chords",
    name: "Chords",
    category: "harmony",
    order: 5,
    enabled: false,
    muted: false,
    description: "Slow chord pad with reverb tail. Long attack/release breathe with the room.",
    params: {
      gain: 0.28,
      sound: "triangle",
      slow: 2,
      attack: 0.5,
      release: 1.5,
      lpf: 2200,
      room: 0.7,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.6, step: 0.01 },
      { key: "sound", label: "Sound", type: "text" },
      { key: "slow", label: "Slow", type: "range", min: 1, max: 8, step: 0.5 },
      { key: "attack", label: "Attack", type: "range", min: 0, max: 2, step: 0.05 },
      { key: "release", label: "Release", type: "range", min: 0.1, max: 4, step: 0.1 },
      { key: "lpf", label: "LPF (Hz)", type: "range", min: 500, max: 5000, step: 50 },
      { key: "room", label: "Room", type: "range", min: 0, max: 1, step: 0.01 },
    ],
    code: ({ gain, sound, slow, attack, release, lpf, room }, context) =>
      `note("<${context.chordStr}>")
  .sound("${sound}")
  .slow(${slow})
  .attack(${attack})
  .release(${release})
  .lpf(${lpf})
  .room(${room})
  .gain(${gain})
  .orbit(2)`,
  },

  // ── MELODY ──────────────────────────────────────────────────────────

  {
    id: "melody",
    name: "Melody",
    category: "melody",
    order: 6,
    enabled: false,
    muted: false,
    description: "Sparse melodic line that breathes. Random drops keep it from feeling mechanical.",
    params: {
      gain: 0.18,
      sound: "triangle",
      delay: 0.5,
      delayTime: 0.375,
      delayFeedback: 0.4,
      degrade: 0.3,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.5, step: 0.01 },
      { key: "sound", label: "Sound", type: "text" },
      { key: "delay", label: "Delay", type: "range", min: 0, max: 0.8, step: 0.01 },
      { key: "delayTime", label: "Delay Time", type: "range", min: 0.05, max: 0.75, step: 0.005 },
      { key: "delayFeedback", label: "Delay FB", type: "range", min: 0, max: 0.8, step: 0.01 },
      { key: "degrade", label: "Degrade", type: "range", min: 0, max: 0.7, step: 0.05 },
    ],
    code: ({ gain, sound, delay, delayTime, delayFeedback, degrade }, context) =>
      `note("<${context.arpLine}>")
  .sound("${sound}")
  .delay(${delay})
  .delaytime(${delayTime})
  .delayfeedback(${delayFeedback})
  .degradeBy(${degrade})
  .gain(${gain})
  .orbit(3)`,
  },

  // ── FX ──────────────────────────────────────────────────────────────

  {
    id: "texture",
    name: "Texture",
    category: "fx",
    order: 7,
    enabled: false,
    muted: false,
    description: "Vinyl crackle / atmospheric noise. Constant subtle warmth underneath everything.",
    params: {
      gain: 0.08,
      sound: "crackle*4",
      hpf: 1000,
      hpfMod: 0,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.3, step: 0.005 },
      { key: "sound", label: "Sound", type: "text" },
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
