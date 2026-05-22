import { DEFAULT_KEY_ID, DEFAULT_PROGRESSION_ID } from "./progressions";

// Key + progression drive bassLine / chordStr / arpLine at runtime via
// src/lib/harmony.js. Only the source-of-truth fields live here.
export const DEFAULT_CONTEXT = {
  bpm: 85,
  keyId: DEFAULT_KEY_ID,
  progressionId: DEFAULT_PROGRESSION_ID,
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
