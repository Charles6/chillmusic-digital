export const DEFAULT_CONTEXT = {
  bpm: 85,
  // Cmaj7 — Am7 — Fmaj7 — G7   (I7 — vi7 — IV7 — V7 in C major)
  bassLine: "c2 a1 f1 g1",
  arpLine: "[c4 e4 g4 e4] [a3 c4 e4 c4] [f3 a3 c4 a3] [g3 b3 d4 b3]",
  chordStr: "[c4,e4,g4,b4] [a3,c4,e4,g4] [f3,a3,c4,e4] [g3,b3,d4,f4]",
  leadLine: "g4 ~ ~ e4 ~ c5 ~ ~",
};

export const ARRANGEMENTS = [
  {
    id: "lofi-beats",
    name: "Lofi Beats",
    description: "Drums + bass + chords. The classic study-beats stack.",
    enabledLayers: ["kick", "snare", "hats", "bass", "chords"],
  },
  {
    id: "ambient-wash",
    name: "Ambient Wash",
    description: "No drums. Slow chords with melody and texture floating overhead.",
    enabledLayers: ["chords", "melody", "texture"],
  },
  {
    id: "full-vibe",
    name: "Full Vibe",
    description: "Every layer engaged. Background music for long sessions.",
    enabledLayers: [
      "kick",
      "snare",
      "hats",
      "perc",
      "bass",
      "chords",
      "melody",
      "texture",
    ],
  },
];
