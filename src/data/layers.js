export const BUILTIN_LAYERS = [
  {
    id: "kick",
    name: "Kick Foundation",
    category: "drums",
    order: 0,
    enabled: false,
    muted: false,
    description: "Steady 4-on-the-floor kick. The rhythmic anchor.",
    params: {
      gain: 1.05,
      pattern: "bd*4",
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0.5, max: 1.5, step: 0.01 },
      { key: "pattern", label: "Pattern", type: "text" },
    ],
    code: ({ gain, pattern }) => `sound("${pattern}")
  .gain(${gain})`,
  },

  {
    id: "closed-hats",
    name: "Closed Hats Drive",
    category: "drums",
    order: 1,
    enabled: false,
    muted: false,
    description: "Hi-hat grid. Density from 4 to 16 hits per cycle.",
    params: {
      gain: 0.18,
      density: 8,
      hpf: 9000,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.5, step: 0.01 },
      { key: "density", label: "Density", type: "range", min: 4, max: 16, step: 4 },
      { key: "hpf", label: "HPF (Hz)", type: "range", min: 5000, max: 14000, step: 100 },
    ],
    code: ({ gain, density, hpf }) => `sound("hh*${density}")
  .gain(${gain})
  .hpf(${hpf})`,
  },

  {
    id: "open-hats",
    name: "Open Hats Lift",
    category: "drums",
    order: 2,
    enabled: false,
    muted: false,
    description: "Sparse open hats on offbeats. Lifts the groove without cluttering.",
    params: {
      gain: 0.08,
      hpf: 8500,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.3, step: 0.01 },
      { key: "hpf", label: "HPF (Hz)", type: "range", min: 5000, max: 14000, step: 100 },
    ],
    code: ({ gain, hpf }) => `sound("~ ~ oh ~ ~ ~ oh ~")
  .gain(${gain})
  .hpf(${hpf})`,
  },

  {
    id: "clap",
    name: "Clap Groove",
    category: "drums",
    order: 3,
    enabled: false,
    muted: false,
    description: "2-and-4 clap backbeat with subtle room.",
    params: {
      gain: 0.14,
      room: 0.12,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.4, step: 0.01 },
      { key: "room", label: "Room", type: "range", min: 0, max: 0.5, step: 0.01 },
    ],
    code: ({ gain, room }) => `sound("~ cp ~ cp")
  .gain(${gain})
  .room(${room})`,
  },

  {
    id: "rumble",
    name: "Rumble Pulse",
    category: "drums",
    order: 4,
    enabled: false,
    muted: false,
    description: "Sub-range industrial texture. Slow LPF movement adds depth.",
    params: {
      gain: 0.1,
      lpfMin: 90,
      lpfMax: 220,
      room: 0.3,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.3, step: 0.01 },
      { key: "lpfMin", label: "LPF Min", type: "range", min: 60, max: 300, step: 5 },
      { key: "lpfMax", label: "LPF Max", type: "range", min: 100, max: 500, step: 5 },
      { key: "room", label: "Room", type: "range", min: 0, max: 0.6, step: 0.01 },
    ],
    code: ({ gain, lpfMin, lpfMax, room }) => `sound("<bd ~ ~ ~>*2")
  .slow(4)
  .lpf(sine.range(${lpfMin}, ${lpfMax}).slow(18))
  .gain(${gain})
  .room(${room})`,
  },

  {
    id: "sub-bass",
    name: "Sub Bass Pulse",
    category: "bass",
    order: 5,
    enabled: false,
    muted: false,
    description: "Sawtooth sub following the chord root. Slow filter breath.",
    params: {
      gain: 0.5,
      slow: 2,
      lpfMin: 180,
      lpfMax: 800,
      lpfSpeed: 16,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 1, step: 0.01 },
      { key: "slow", label: "Slow", type: "range", min: 1, max: 4, step: 0.5 },
      { key: "lpfMin", label: "LPF Min", type: "range", min: 80, max: 400, step: 10 },
      { key: "lpfMax", label: "LPF Max", type: "range", min: 300, max: 1400, step: 10 },
      { key: "lpfSpeed", label: "LPF Speed", type: "range", min: 4, max: 32, step: 1 },
    ],
    code: ({ gain, slow, lpfMin, lpfMax, lpfSpeed }, context) =>
      `note("<${context.bassLine}>")
  .sound("sawtooth")
  .slow(${slow})
  .lpf(sine.range(${lpfMin}, ${lpfMax}).slow(${lpfSpeed}))
  .gain(${gain})
  .orbit(1)`,
  },

  {
    id: "trance-arp",
    name: "Trance Arp",
    category: "melody",
    order: 6,
    enabled: false,
    muted: false,
    description: "Triangle arp cycling the chord tones. Light delay, hypnotic pulse.",
    params: {
      gain: 0.14,
      fast: 2,
      delay: 0.2,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.4, step: 0.01 },
      { key: "fast", label: "Speed", type: "range", min: 1, max: 4, step: 0.5 },
      { key: "delay", label: "Delay", type: "range", min: 0, max: 0.5, step: 0.01 },
    ],
    code: ({ gain, fast, delay }, context) =>
      `note("<${context.arpLine}>")
  .sound("triangle")
  .fast(${fast})
  .delay(${delay})
  .gain(${gain})
  .orbit(3)`,
  },

  {
    id: "pad",
    name: "Minor Pad Wash",
    category: "harmony",
    order: 7,
    enabled: false,
    muted: false,
    description: "Supersaw chord wash cycling through the progression. Very slow movement.",
    params: {
      gain: 0.18,
      slow: 8,
      lpfMin: 700,
      lpfMax: 3000,
      room: 0.35,
      delay: 0.25,
    },
    paramDefs: [
      { key: "gain", label: "Gain", type: "range", min: 0, max: 0.5, step: 0.01 },
      { key: "slow", label: "Slow", type: "range", min: 2, max: 16, step: 1 },
      { key: "lpfMin", label: "LPF Min", type: "range", min: 200, max: 1400, step: 50 },
      { key: "lpfMax", label: "LPF Max", type: "range", min: 1000, max: 5000, step: 50 },
      { key: "room", label: "Room", type: "range", min: 0, max: 0.8, step: 0.01 },
      { key: "delay", label: "Delay", type: "range", min: 0, max: 0.5, step: 0.01 },
    ],
    code: ({ gain, slow, lpfMin, lpfMax, room, delay }, context) =>
      `note("<${context.chordStr}>")
  .sound("supersaw")
  .slow(${slow})
  .lpf(sine.range(${lpfMin}, ${lpfMax}).slow(24))
  .room(${room})
  .delay(${delay})
  .gain(${gain})
  .orbit(2)`,
  },

  // ── LEAD ────────────────────────────────────────────────────────────

  {
    id: "ghost-lead",
    name: "Ghost Lead",
    category: "melody",
    order: 8,
    enabled: false,
    muted: false,
    description: "Triangle shimmer that slowly fades in and out. Never takes over.",
    params: {
      gainMax: 0.12,
      gainSpeed: 22,
      room: 0.45,
      delay: 0.33,
    },
    paramDefs: [
      { key: "gainMax", label: "Peak Gain", type: "range", min: 0, max: 0.3, step: 0.01 },
      { key: "gainSpeed", label: "Fade Speed", type: "range", min: 8, max: 32, step: 1 },
      { key: "room", label: "Room", type: "range", min: 0, max: 0.8, step: 0.01 },
      { key: "delay", label: "Delay", type: "range", min: 0, max: 0.6, step: 0.01 },
    ],
    code: ({ gainMax, gainSpeed, room, delay }, context) =>
      `note("<${context.leadLine}>")
  .sound("triangle")
  .slow(4)
  .gain(sine.range(0, ${gainMax}).slow(${gainSpeed}))
  .room(${room})
  .delay(${delay})
  .orbit(3)`,
  },

  // ── FX ──────────────────────────────────────────────────────────────

  {
    id: "noise-swell",
    name: "Noise Swell",
    category: "fx",
    order: 9,
    enabled: false,
    muted: false,
    description: "Filtered noise with slowly evolving HPF. Adds air and atmosphere.",
    params: {
      gainMax: 0.04,
      hpfMin: 2500,
      hpfMax: 9500,
    },
    paramDefs: [
      { key: "gainMax", label: "Peak Gain", type: "range", min: 0, max: 0.15, step: 0.005 },
      { key: "hpfMin", label: "HPF Min", type: "range", min: 500, max: 5000, step: 100 },
      { key: "hpfMax", label: "HPF Max", type: "range", min: 4000, max: 14000, step: 100 },
    ],
    code: ({ gainMax, hpfMin, hpfMax }) =>
      `sound("noise*8")
  .slow(8)
  .hpf(sine.range(${hpfMin}, ${hpfMax}).slow(24))
  .gain(sine.range(0, ${gainMax}).slow(20))
  .orbit(3)`,
  },
];
