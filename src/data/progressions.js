// Chord progressions expressed as relative scale degrees so they can be
// transposed to any key. Each chord = { root, quality } where:
//   root    = semitones above the key tonic (0=I, 2=ii, 4=iii, 5=IV, 7=V,
//             9=vi, 11=vii)
//   quality = one of the QUALITY_INTERVALS keys in src/lib/harmony.js
//
// `mode` tells melodic layers which scale to draw from ("major" | "minor").

export const KEYS = [
  { id: "C",  name: "C",       tonic: 0 },
  { id: "Db", name: "C♯ / D♭", tonic: 1 },
  { id: "D",  name: "D",       tonic: 2 },
  { id: "Eb", name: "D♯ / E♭", tonic: 3 },
  { id: "E",  name: "E",       tonic: 4 },
  { id: "F",  name: "F",       tonic: 5 },
  { id: "Gb", name: "F♯ / G♭", tonic: 6 },
  { id: "G",  name: "G",       tonic: 7 },
  { id: "Ab", name: "G♯ / A♭", tonic: 8 },
  { id: "A",  name: "A",       tonic: 9 },
  { id: "Bb", name: "A♯ / B♭", tonic: 10 },
  { id: "B",  name: "B",       tonic: 11 },
];

const LEGACY_KEY_ALIASES = { Am: "A", Em: "E", Dm: "D" };

export function normalizeKeyId(keyId) {
  return LEGACY_KEY_ALIASES[keyId] ?? keyId;
}

export const PROGRESSIONS = [
  {
    id: "i-VI-III-VII",
    name: "i · VI · III · VII  (uplifting trance)",
    mode: "minor",
    chords: [
      { root: 0, quality: "m" },
      { root: 8, quality: "maj" },
      { root: 3, quality: "maj" },
      { root: 10, quality: "maj" },
    ],
  },
  {
    id: "i-III-VII-VI",
    name: "i · III · VII · VI  (anthemic)",
    mode: "minor",
    chords: [
      { root: 0, quality: "m" },
      { root: 3, quality: "maj" },
      { root: 10, quality: "maj" },
      { root: 8, quality: "maj" },
    ],
  },
  {
    id: "i-VII-VI-VII",
    name: "i · VII · VI · VII  (driving)",
    mode: "minor",
    chords: [
      { root: 0, quality: "m" },
      { root: 10, quality: "maj" },
      { root: 8, quality: "maj" },
      { root: 10, quality: "maj" },
    ],
  },
  {
    id: "i-VI-iv-V",
    name: "i · VI · iv · V  (harmonic-minor lift)",
    mode: "minor",
    scale: "harmonic minor",
    chords: [
      { root: 0, quality: "m" },
      { root: 8, quality: "maj" },
      { root: 5, quality: "m" },
      { root: 7, quality: "maj" },
    ],
  },
  {
    id: "VI-VII-i-i",
    name: "VI · VII · i · i  (resolved)",
    mode: "minor",
    chords: [
      { root: 8, quality: "maj" },
      { root: 10, quality: "maj" },
      { root: 0, quality: "m" },
      { root: 0, quality: "m" },
    ],
  },
  {
    id: "i-v-VI-IV",
    name: "i · v · VI · IV  (progressive trance)",
    mode: "minor",
    chords: [
      { root: 0, quality: "m" },
      { root: 7, quality: "m" },
      { root: 8, quality: "maj" },
      { root: 5, quality: "maj" },
    ],
  },
  {
    id: "Imaj7-vi7-IVmaj7-V7",
    name: "Imaj7 · vi7 · IVmaj7 · V7  (classic lofi)",
    mode: "major",
    chords: [
      { root: 0, quality: "maj7" },
      { root: 9, quality: "m7" },
      { root: 5, quality: "maj7" },
      { root: 7, quality: "7" },
    ],
  },
  {
    id: "Imaj9-iii7-vi9-IVmaj9",
    name: "Imaj9 · iii7 · vi9 · IVmaj9  (dreamy neo-soul)",
    mode: "major",
    chords: [
      { root: 0, quality: "maj9" },
      { root: 4, quality: "m7" },
      { root: 9, quality: "m9" },
      { root: 5, quality: "maj9" },
    ],
  },
  {
    id: "ii7-V7-Imaj7",
    name: "ii7 · V7 · Imaj7 · Imaj7  (jazz turnaround)",
    mode: "major",
    chords: [
      { root: 2, quality: "m7" },
      { root: 7, quality: "7" },
      { root: 0, quality: "maj7" },
      { root: 0, quality: "maj7" },
    ],
  },
  {
    id: "I-V-vi-IV",
    name: "I · V · vi · IV  (pop / axis)",
    mode: "major",
    chords: [
      { root: 0, quality: "maj" },
      { root: 7, quality: "maj" },
      { root: 9, quality: "m" },
      { root: 5, quality: "maj" },
    ],
  },
  {
    id: "vi-IV-I-V",
    name: "vi · IV · I · V  (sentimental)",
    mode: "major",
    chords: [
      { root: 9, quality: "m" },
      { root: 5, quality: "maj" },
      { root: 0, quality: "maj" },
      { root: 7, quality: "maj" },
    ],
  },
  {
    id: "im7-iv7-VImaj7-V7",
    name: "i7 · iv7 · VImaj7 · V7  (minor lofi)",
    mode: "minor",
    chords: [
      { root: 0, quality: "m7" },
      { root: 5, quality: "m7" },
      { root: 8, quality: "maj7" },
      { root: 7, quality: "7" },
    ],
  },
  {
    id: "im9-VImaj7-IIImaj7-VII7",
    name: "i9 · VImaj7 · IIImaj7 · VII7  (cinematic minor)",
    mode: "minor",
    chords: [
      { root: 0, quality: "m9" },
      { root: 8, quality: "maj7" },
      { root: 3, quality: "maj7" },
      { root: 10, quality: "7" },
    ],
  },
  {
    id: "Imaj7-IVmaj7",
    name: "Imaj7 · IVmaj7  (slow drift)",
    mode: "major",
    chords: [
      { root: 0, quality: "maj7" },
      { root: 5, quality: "maj7" },
    ],
  },
  {
    id: "Isus2-IVadd9",
    name: "Isus2 · IVadd9  (open ambient)",
    mode: "major",
    chords: [
      { root: 0, quality: "sus2" },
      { root: 5, quality: "add9" },
    ],
  },
];

export const DEFAULT_KEY_ID = "A";
export const DEFAULT_PROGRESSION_ID = "i-VI-III-VII";
