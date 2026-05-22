// Chord progressions expressed as relative scale degrees so they can be
// transposed to any key. Each chord = { root, quality } where:
//   root    = semitones above the key tonic (0=I, 2=ii, 4=iii, 5=IV, 7=V,
//             9=vi, 11=vii)
//   quality = one of the QUALITY_INTERVALS keys in src/lib/harmony.js

export const KEYS = [
  { id: "C",  name: "C major",  tonic: 0 },
  { id: "Db", name: "Db major", tonic: 1 },
  { id: "D",  name: "D major",  tonic: 2 },
  { id: "Eb", name: "Eb major", tonic: 3 },
  { id: "E",  name: "E major",  tonic: 4 },
  { id: "F",  name: "F major",  tonic: 5 },
  { id: "Gb", name: "Gb major", tonic: 6 },
  { id: "G",  name: "G major",  tonic: 7 },
  { id: "Ab", name: "Ab major", tonic: 8 },
  { id: "A",  name: "A major",  tonic: 9 },
  { id: "Bb", name: "Bb major", tonic: 10 },
  { id: "B",  name: "B major",  tonic: 11 },
  // Minor keys reuse the same tonic — the progression itself determines mode
  { id: "Am", name: "A minor",  tonic: 9 },
  { id: "Em", name: "E minor",  tonic: 4 },
  { id: "Dm", name: "D minor",  tonic: 2 },
];

export const PROGRESSIONS = [
  {
    id: "Imaj7-vi7-IVmaj7-V7",
    name: "Imaj7 · vi7 · IVmaj7 · V7  (classic lofi)",
    chords: [
      { root: 0, quality: "maj7" },
      { root: 9, quality: "m7" },
      { root: 5, quality: "maj7" },
      { root: 7, quality: "7" },
    ],
  },
  {
    id: "ii7-V7-Imaj7",
    name: "ii7 · V7 · Imaj7 · Imaj7  (jazz turnaround)",
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
    chords: [
      { root: 0, quality: "m7" },
      { root: 5, quality: "m7" },
      { root: 8, quality: "maj7" },
      { root: 7, quality: "7" },
    ],
  },
  {
    id: "Imaj7-IVmaj7",
    name: "Imaj7 · IVmaj7  (slow drift)",
    chords: [
      { root: 0, quality: "maj7" },
      { root: 5, quality: "maj7" },
    ],
  },
];

export const DEFAULT_KEY_ID = "C";
export const DEFAULT_PROGRESSION_ID = "Imaj7-vi7-IVmaj7-V7";
