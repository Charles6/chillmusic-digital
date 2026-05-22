// Build Strudel-friendly bass / chord / arp lines from a key + progression.

import { KEYS, PROGRESSIONS } from "../data/progressions";

const NOTE_NAMES = ["c", "db", "d", "eb", "e", "f", "gb", "g", "ab", "a", "bb", "b"];

const QUALITY_INTERVALS = {
  maj:  [0, 4, 7],
  m:    [0, 3, 7],
  maj7: [0, 4, 7, 11],
  m7:   [0, 3, 7, 10],
  7:    [0, 4, 7, 10],
};

// midi=60 → "c4". Strudel uses scientific pitch (C4 = middle C = midi 60).
function midiToName(midi) {
  const pc = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[pc]}${octave}`;
}

function chordMidis(tonic, chord, baseOctave) {
  // tonic = 0..11, chord.root = semitones above tonic.
  // baseOctave = octave for the chord root (e.g., 3 → root sits in oct 3).
  const rootMidi = (baseOctave + 1) * 12 + tonic + chord.root;
  const intervals = QUALITY_INTERVALS[chord.quality] ?? QUALITY_INTERVALS.maj;
  return intervals.map((i) => rootMidi + i);
}

export function buildHarmony(keyId, progressionId) {
  const key = KEYS.find((k) => k.id === keyId) ?? KEYS[0];
  const prog = PROGRESSIONS.find((p) => p.id === progressionId) ?? PROGRESSIONS[0];

  const bassParts = [];
  const chordParts = [];
  const arpParts = [];

  for (const chord of prog.chords) {
    // Bass: root in octave 2
    const bassMidi = 36 + key.tonic + chord.root; // c2 = midi 36
    bassParts.push(midiToName(bassMidi));

    // Chord voicing in octave 3 (root, 3rd, 5th, [7th]) — keep it close
    const cm = chordMidis(key.tonic, chord, 3);
    chordParts.push(`[${cm.map(midiToName).join(",")}]`);

    // Arp: root, 3rd, 5th, 3rd — chord tones in octave 4
    const am = chordMidis(key.tonic, chord, 4);
    const arp = [am[0], am[1], am[2], am[1]];
    arpParts.push(`[${arp.map(midiToName).join(" ")}]`);
  }

  return {
    bassLine: bassParts.join(" "),
    chordStr: chordParts.join(" "),
    arpLine: arpParts.join(" "),
    leadLine: "g4 ~ ~ e4 ~ c5 ~ ~",
  };
}
