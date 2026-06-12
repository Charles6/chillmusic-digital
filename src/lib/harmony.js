// Build Strudel-friendly bass / chord / arp / melody material from a
// key + progression.
//
// Chord voicings are voice-led: each chord picks the inversion that moves
// the least distance from the previous chord, so pads glide between chords
// instead of jumping between parallel root positions.

import { KEYS, PROGRESSIONS } from "../data/progressions";

const NOTE_NAMES = ["c", "db", "d", "eb", "e", "f", "gb", "g", "ab", "a", "bb", "b"];

const QUALITY_INTERVALS = {
  maj:  [0, 4, 7],
  m:    [0, 3, 7],
  maj7: [0, 4, 7, 11],
  m7:   [0, 3, 7, 10],
  7:    [0, 4, 7, 10],
  maj9: [0, 4, 7, 11, 14],
  m9:   [0, 3, 7, 10, 14],
  9:    [0, 4, 7, 10, 14],
  add9: [0, 4, 7, 14],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  6:    [0, 4, 7, 9],
  m6:   [0, 3, 7, 9],
};

// Scale degree (0-6) for each semitone offset above the tonic, per mode.
// Non-diatonic roots fall back to the nearest degree below.
const MAJOR_DEGREES = { 0: 0, 2: 1, 4: 2, 5: 3, 7: 4, 9: 5, 11: 6 };
const MINOR_DEGREES = { 0: 0, 2: 1, 3: 2, 5: 3, 7: 4, 8: 5, 10: 6 };

// midi=60 → "c4". Strudel uses scientific pitch (C4 = middle C = midi 60).
function midiToName(midi) {
  const pc = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[pc]}${octave}`;
}

function chordTones(tonic, chord, baseOctave) {
  const rootMidi = (baseOctave + 1) * 12 + tonic + chord.root;
  const intervals = QUALITY_INTERVALS[chord.quality] ?? QUALITY_INTERVALS.maj;
  return intervals.map((i) => rootMidi + i);
}

// ── Voice leading ─────────────────────────────────────────────────────
// Generate candidate voicings (inversions ± octave shifts) and pick the
// one whose notes move the least from the previous voicing.

function invert(tones, times) {
  const out = [...tones];
  for (let i = 0; i < times; i += 1) {
    out.push(out.shift() + 12);
  }
  return out;
}

function candidates(tones) {
  const result = [];
  for (let inv = 0; inv < tones.length; inv += 1) {
    const base = invert(tones, inv);
    for (const shift of [-12, 0, 12]) {
      result.push(base.map((t) => t + shift));
    }
  }
  return result;
}

function movementCost(prev, next) {
  const a = [...prev].sort((x, y) => x - y);
  const b = [...next].sort((x, y) => x - y);
  const len = Math.min(a.length, b.length);
  let cost = 0;
  for (let i = 0; i < len; i += 1) {
    cost += Math.abs(a[i] - b[i]);
  }
  return cost;
}

function centerCost(voicing, center) {
  const mean = voicing.reduce((sum, t) => sum + t, 0) / voicing.length;
  return Math.abs(mean - center);
}

function voiceLeadProgression(tonic, chords, baseOctave, center) {
  const voicings = [];
  let prev = null;

  for (const chord of chords) {
    const tones = chordTones(tonic, chord, baseOctave);
    let best = tones;
    let bestCost = Infinity;

    for (const cand of candidates(tones)) {
      // Always gravitate toward the register center; once a previous chord
      // exists, minimizing motion from it dominates the choice.
      const cost = centerCost(cand, center) + (prev ? movementCost(prev, cand) * 3 : 0);
      if (cost < bestCost) {
        bestCost = cost;
        best = cand;
      }
    }

    voicings.push(best);
    prev = best;
  }

  return voicings;
}

// ── Public API ────────────────────────────────────────────────────────

export function buildHarmony(keyId, progressionId) {
  const key = KEYS.find((k) => k.id === keyId) ?? KEYS[0];
  const prog = PROGRESSIONS.find((p) => p.id === progressionId) ?? PROGRESSIONS[0];
  const mode = prog.mode ?? "major";
  const degreeMap = mode === "minor" ? MINOR_DEGREES : MAJOR_DEGREES;

  // Chords: voice-led around the octave-3/4 boundary (midi ≈ 57).
  const voicings = voiceLeadProgression(key.tonic, prog.chords, 3, 57);
  const chordStr = voicings
    .map((v) => `[${[...v].sort((a, b) => a - b).map(midiToName).join(",")}]`)
    .join(" ");

  // Bass: roots wrapped into octave 2 (c2–b2) so the line stays low instead
  // of climbing with the chord roots, plus per-style lines for the layer.
  const roots = prog.chords.map((c) => 36 + ((key.tonic + c.root) % 12));
  const fifths = roots.map((r) => r + 7);
  const bassLine = roots.map(midiToName).join(" ");
  const bassLines = {
    roots: bassLine,
    rootFifth: roots
      .map((r, i) => `[${midiToName(r)} ~ ${midiToName(fifths[i] - 12)} ~]`)
      .join(" "),
    octave: roots
      .map((r) => `[${midiToName(r)} ~ ~ ${midiToName(r + 12)}]`)
      .join(" "),
  };

  // Arp: chord tones an octave above the pad, in voice-led order.
  const arpVoicings = voiceLeadProgression(key.tonic, prog.chords, 4, 69);
  const arpTones = arpVoicings.map((v) =>
    [...v].sort((a, b) => a - b).slice(0, 4).map(midiToName)
  );
  const arpLine = arpTones
    .map((tones) => `[${[tones[0], tones[1], tones[2] ?? tones[0], tones[1]].join(" ")}]`)
    .join(" ");

  // Melody material: scale + per-chord root degrees, so melodic layers can
  // generate diatonic lines with n(...).scale(...).
  const tonicName = NOTE_NAMES[((key.tonic % 12) + 12) % 12];
  const scaleStr = `${tonicName}4:${mode}`;
  const chordDegrees = prog.chords.map((c) => {
    if (c.root in degreeMap) return degreeMap[c.root];
    // Non-diatonic root: use the degree just below it.
    for (let s = c.root - 1; s >= 0; s -= 1) {
      if (s in degreeMap) return degreeMap[s];
    }
    return 0;
  });

  // Drone: tonic pedal under everything.
  const droneRoot = midiToName(24 + key.tonic); // c1-based
  const droneNotes = {
    root: `[${midiToName(36 + key.tonic)}]`,
    rootFifth: `[${midiToName(36 + key.tonic)},${midiToName(43 + key.tonic)}]`,
    deep: `[${droneRoot},${midiToName(36 + key.tonic)}]`,
  };

  return {
    mode,
    bassLine,
    bassLines,
    chordStr,
    arpLine,
    arpTones,
    scaleStr,
    chordDegrees,
    droneNotes,
  };
}
