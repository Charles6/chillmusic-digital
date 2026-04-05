export const DEFAULT_CONTEXT = {
  bpm: 138,
  bassLine: "c2 c2 eb2 g1",
  arpLine: "c4 eb4 g4 bb4",
  chordStr: "[c4 eb4 g4 bb4] [ab3 c4 eb4 g4] [eb4 g4 bb4 d5] [bb3 d4 f4 ab4]",
  leadLine: "g4 ~ bb4 ~ eb5 ~ d5 ~",
};

export const ARRANGEMENTS = [
  {
    id: "build-up",
    name: "Build Up",
    description: "Drums and bass only — a clean starting point.",
    enabledLayers: ["kick", "closed-hats", "clap", "sub-bass"],
  },
  {
    id: "deep-focus",
    name: "Deep Focus",
    description: "Minimal and hypnotic. Good for long coding sessions.",
    enabledLayers: ["kick", "closed-hats", "sub-bass", "pad"],
  },
  {
    id: "night-trance",
    name: "Night Trance",
    description: "Full arrangement with arp, pad, ghost lead, and atmosphere.",
    enabledLayers: [
      "kick",
      "closed-hats",
      "open-hats",
      "clap",
      "sub-bass",
      "trance-arp",
      "pad",
      "ghost-lead",
      "noise-swell",
    ],
  },
];
