// Trance layers use one Strudel cycle as one 4/4 bar. The shared grid makes
// kick/bass interlock, bar-level fills, and 8/16-bar development predictable.

function range(key, label, min, max, step) {
  return { key, label, type: "range", min, max, step };
}

function select(key, label, options) {
  return {
    key,
    label,
    type: "select",
    options: options.map(([value, optionLabel]) => ({ value, label: optionLabel })),
  };
}

function text(key, label) {
  return { key, label, type: "text" };
}

function swingSuffix(context) {
  const amount = Number(context?.swing ?? 0);
  return amount > 0 ? `\n  .swingBy(${amount}, 4)` : "";
}

function sweptFilter(base, amount, cycles = 16) {
  if (amount <= 0) return String(base);
  const low = Math.max(80, Math.round(base * (1 - amount * 0.65)));
  const high = Math.round(base * (1 + amount * 1.1));
  return `sine.range(${low}, ${high}).slow(${cycles})`;
}

const SOUND_OPTIONS = [
  ["supersaw", "Supersaw"],
  ["sawtooth", "Saw"],
  ["square", "Square"],
  ["triangle", "Triangle"],
  ["sine", "Sine"],
];

export const BUILTIN_LAYERS = [
  {
    id: "kick",
    name: "Four-on-the-Floor Kick",
    category: "drums",
    order: 0,
    enabled: true,
    muted: false,
    description: "The fixed quarter-note pulse. It also ducks the bass, harmony, and melody buses.",
    params: {
      gain: 0.95,
      bank: "RolandTR909",
      punch: 0.2,
      room: 0.04,
      phrase: "breathe",
      duckDepth: 0.85,
      duckRelease: 0.2,
    },
    paramDefs: [
      range("gain", "Gain", 0, 1.4, 0.01),
      text("bank", "Bank"),
      range("punch", "Punch", 0, 0.7, 0.05),
      range("room", "Room", 0, 0.25, 0.01),
      select("phrase", "Bar 8", [
        ["steady", "Steady"],
        ["breathe", "Drop final beat"],
        ["push", "Double-time push"],
      ]),
      range("duckDepth", "Sidechain", 0, 1, 0.05),
      range("duckRelease", "Pump", 0.05, 0.5, 0.01),
    ],
    code: ({ gain, bank, punch, room, phrase, duckDepth, duckRelease }) => {
      const phraseExpr =
        phrase === "breathe"
          ? `\n  .lastOf(8, x => x.struct("x x x ~"))`
          : phrase === "push"
            ? `\n  .lastOf(8, x => x.fast(2).gain(0.65))`
            : "";
      return `s("bd*4")
  .bank("${bank}")${phraseExpr}
  .shape(${punch})
  .room(${room})
  .gain(${gain})
  .orbit(0)
  .duckorbit("1:2:3")
  .duckonset(0.01)
  .duckattack(${duckRelease})
  .duckdepth(${duckDepth})`;
    },
  },

  {
    id: "snare",
    name: "Clap / Snare",
    category: "drums",
    order: 1,
    enabled: true,
    muted: false,
    description: "A straight backbeat on beats 2 and 4, with deterministic phrase-ending rolls.",
    params: {
      gain: 0.5,
      voice: "layered",
      bank: "RolandTR909",
      room: 0.22,
      fill: "ghost",
    },
    paramDefs: [
      range("gain", "Gain", 0, 1, 0.01),
      select("voice", "Voice", [
        ["clap", "Clap"],
        ["snare", "Snare"],
        ["layered", "Clap + snare"],
      ]),
      text("bank", "Bank"),
      range("room", "Room", 0, 0.7, 0.01),
      select("fill", "Bar 8 fill", [
        ["none", "None"],
        ["ghost", "Ghost double"],
        ["roll", "Fast roll"],
      ]),
    ],
    code: ({ gain, voice, bank, room, fill }, context) => {
      const hit = voice === "clap" ? "cp" : voice === "snare" ? "sd" : "[cp,sd]";
      const fillExpr =
        fill === "ghost"
          ? `\n  .lastOf(8, x => x.ply(2).gain(0.72))`
          : fill === "roll"
            ? `\n  .lastOf(8, x => x.fast(4).gain(0.55))`
            : "";
      return `s("~ ${hit} ~ ${hit}")
  .bank("${bank}")${fillExpr}${swingSuffix(context)}
  .room(${room})
  .gain(${gain})
  .orbit(0)`;
    },
  },

  {
    id: "hats",
    name: "Closed Hats",
    category: "drums",
    order: 2,
    enabled: true,
    muted: false,
    description: "Sixteenth-note propulsion with a repeating velocity groove and restrained humanization.",
    params: {
      gain: 0.25,
      density: 16,
      accent: "rolling",
      bank: "RolandTR909",
      humanize: 0.04,
      brightness: 8500,
    },
    paramDefs: [
      range("gain", "Gain", 0, 0.7, 0.01),
      select("density", "Density", [[8, "8ths"], [16, "16ths"]]),
      select("accent", "Accent", [
        ["flat", "Flat"],
        ["rolling", "Rolling"],
        ["offbeat", "Offbeat lift"],
      ]),
      text("bank", "Bank"),
      range("humanize", "Humanize", 0, 0.15, 0.01),
      range("brightness", "Brightness", 2500, 12000, 100),
    ],
    code: ({ gain, density, accent, bank, humanize, brightness }, context) => {
      const accentPattern =
        accent === "rolling"
          ? `"[0.45 0.7 0.52 1]*4"`
          : accent === "offbeat"
            ? `"[0.4 1]*8"`
            : "1";
      return `s("hh*${density}")
  .bank("${bank}")
  .gain(${accentPattern})
  .degradeBy(${humanize})
  .lpf(${brightness})${swingSuffix(context)}
  .postgain(${gain})
  .orbit(0)`;
    },
  },

  {
    id: "open-hat",
    name: "Open Hat / Ride",
    category: "drums",
    order: 3,
    enabled: true,
    muted: false,
    description: "A separate lift layer: offbeat open hats for drive or quarter-note rides for peak energy.",
    params: {
      gain: 0.28,
      style: "open",
      bank: "RolandTR909",
      room: 0.12,
    },
    paramDefs: [
      range("gain", "Gain", 0, 0.8, 0.01),
      select("style", "Style", [
        ["open", "Offbeat open hat"],
        ["ride", "Quarter-note ride"],
        ["both", "Open hat + ride"],
      ]),
      text("bank", "Bank"),
      range("room", "Room", 0, 0.5, 0.01),
    ],
    code: ({ gain, style, bank, room }, context) => {
      const pattern =
        style === "ride" ? "rd*4" : style === "both" ? "[~ oh]*4,rd*4" : "[~ oh]*4";
      return `s("${pattern}")
  .bank("${bank}")${swingSuffix(context)}
  .room(${room})
  .gain(${gain})
  .orbit(0)`;
    },
  },

  {
    id: "perc",
    name: "Percussion / Fill",
    category: "drums",
    order: 4,
    enabled: false,
    muted: false,
    description: "A light 16-step supporting rhythm. Its job is groove and phrase punctuation, not density.",
    params: {
      gain: 0.18,
      pulses: 5,
      rotate: 3,
      sound: "rim",
      bank: "RolandTR909",
      phraseFill: 0.25,
    },
    paramDefs: [
      range("gain", "Gain", 0, 0.5, 0.01),
      range("pulses", "Pulses / 16", 2, 11, 1),
      range("rotate", "Rotate", 0, 15, 1),
      select("sound", "Sound", [
        ["rim", "Rim"],
        ["sh", "Shaker"],
        ["lt", "Low tom"],
        ["mt", "Mid tom"],
        ["cb", "Cowbell"],
      ]),
      text("bank", "Bank"),
      range("phraseFill", "Bar 8 fill", 0, 0.6, 0.05),
    ],
    code: ({ gain, pulses, rotate, sound, bank, phraseFill }, context) =>
      `s("${sound}(${pulses},16,${rotate})")
  .bank("${bank}")
  .lastOf(8, x => x.fast(2).gain(${phraseFill}))${swingSuffix(context)}
  .gain(${gain})
  .orbit(0)`,
  },

  {
    id: "bass",
    name: "Rolling Bass Engine",
    category: "bass",
    order: 5,
    enabled: true,
    muted: false,
    description: "Linked mono sub and short mid-bass notes occupy the spaces between the four kick hits.",
    params: {
      gain: 0.7,
      style: "rolling",
      sound: "sawtooth",
      subGain: 0.32,
      midGain: 0.42,
      lpf: 850,
      sweep: 0.18,
      release: 0.12,
      drive: 0.12,
    },
    paramDefs: [
      range("gain", "Bus Gain", 0, 1, 0.01),
      select("style", "Rhythm", [
        ["offbeat", "Offbeat 8ths"],
        ["rolling", "Rolling 16ths"],
        ["octave", "Octave roll"],
      ]),
      select("sound", "Mid Sound", SOUND_OPTIONS.slice(1)),
      range("subGain", "Sub", 0, 0.7, 0.01),
      range("midGain", "Mid", 0, 0.8, 0.01),
      range("lpf", "LPF", 180, 2400, 20),
      range("sweep", "Filter Motion", 0, 0.8, 0.05),
      range("release", "Release", 0.03, 0.45, 0.01),
      range("drive", "Drive", 0, 0.6, 0.05),
    ],
    code: ({ gain, style, sound, subGain, midGain, lpf, sweep, release, drive }, context) => {
      const midPattern = context.bassPatterns?.[style] ?? context.bassPatterns?.rolling ?? "[~ a2 a2 a2]*4";
      const subPattern = context.bassPatterns?.offbeat ?? "[~ a2]*4";
      const filter = sweptFilter(lpf, sweep, 16);
      return `stack(
  note("<${subPattern}>")
    .sound("sine")
    .release(${Math.max(0.08, release)})
    .gain(${subGain})
    .orbit(1),
  note("<${midPattern}>")
    .sound("${sound}")
    .lpf(${filter})
    .release(${release})
    .shape(${drive})
    .gain(${midGain})
    .orbit(1)
)
  .gain(${gain})`;
    },
  },

  {
    id: "chords",
    name: "Wide Trance Pad",
    category: "harmony",
    order: 6,
    enabled: true,
    muted: false,
    description: "One voice-led chord per bar. Slow filter motion creates long tension and release.",
    params: {
      gain: 0.24,
      sound: "supersaw",
      unison: 3,
      attack: 0.35,
      release: 1.4,
      lpf: 2600,
      sweep: 0.42,
      room: 0.72,
      octaveAir: 0.2,
    },
    paramDefs: [
      range("gain", "Gain", 0, 0.6, 0.01),
      select("sound", "Sound", SOUND_OPTIONS),
      range("unison", "Unison Voices", 1, 5, 1),
      range("attack", "Attack", 0.02, 2, 0.02),
      range("release", "Release", 0.2, 4, 0.1),
      range("lpf", "LPF", 400, 7000, 50),
      range("sweep", "16-bar Sweep", 0, 1, 0.05),
      range("room", "Room", 0, 1, 0.01),
      range("octaveAir", "Octave Air", 0, 0.5, 0.05),
    ],
    code: ({ gain, sound, unison, attack, release, lpf, sweep, room, octaveAir }, context) =>
      `note("<${context.chordStr}>")
  .sound("${sound}")
  .unison(${sound === "supersaw" ? unison : 1})
  .off(0, x => x.add(note(12)).gain(${octaveAir}))
  .attack(${attack})
  .release(${release})
  .lpf(${sweptFilter(lpf, sweep, 16)})
  .room(${room})
  .gain(${gain})
  .orbit(2)`,
  },

  {
    id: "drone",
    name: "Gated Chord Pluck",
    category: "harmony",
    order: 7,
    enabled: true,
    muted: false,
    description: "A rhythmic chord-tone layer that supplies syncopation without stealing the lead's register.",
    params: {
      gain: 0.2,
      rhythm: "syncopated",
      sound: "square",
      lpf: 1800,
      sweep: 0.28,
      release: 0.18,
      delay: 0.22,
    },
    paramDefs: [
      range("gain", "Gain", 0, 0.55, 0.01),
      select("rhythm", "Gate", [
        ["eighth", "Straight 8ths"],
        ["offbeat", "Offbeat"],
        ["syncopated", "Syncopated"],
      ]),
      select("sound", "Sound", SOUND_OPTIONS),
      range("lpf", "LPF", 300, 5000, 50),
      range("sweep", "Filter Motion", 0, 1, 0.05),
      range("release", "Release", 0.04, 0.7, 0.01),
      range("delay", "Delay", 0, 0.65, 0.01),
    ],
    code: ({ gain, rhythm, sound, lpf, sweep, release, delay }, context) => {
      const gate =
        rhythm === "eighth"
          ? "x*8"
          : rhythm === "offbeat"
            ? "[~ x]*4"
            : "x ~ [~ x] x ~ x [~ x]";
      return `note("<${context.chordStr}>")
  .struct("${gate}")
  .sound("${sound}")
  .release(${release})
  .lpf(${sweptFilter(lpf, sweep, 8)})
  .delay(${delay})
  .delaytime(0.375)
  .delayfeedback(0.35)
  .gain(${gain})
  .orbit(2)`;
    },
  },

  {
    id: "arp",
    name: "Sixteenth Arpeggio",
    category: "melody",
    order: 8,
    enabled: true,
    muted: false,
    description: "Chord tones provide continuous motion; every fourth bar reverses predictably for phrasing.",
    params: {
      gain: 0.16,
      sound: "sawtooth",
      direction: "updown",
      rate: 16,
      lpf: 3400,
      sweep: 0.3,
      delay: 0.28,
      phraseTurn: true,
    },
    paramDefs: [
      range("gain", "Gain", 0, 0.45, 0.01),
      select("sound", "Sound", SOUND_OPTIONS),
      select("direction", "Direction", [
        ["up", "Up"],
        ["down", "Down"],
        ["updown", "Up / down"],
        ["weave", "Octave weave"],
      ]),
      select("rate", "Rate", [[8, "8ths"], [16, "16ths"]]),
      range("lpf", "LPF", 500, 7000, 50),
      range("sweep", "Filter Motion", 0, 1, 0.05),
      range("delay", "Delay", 0, 0.7, 0.01),
      select("phraseTurn", "Bar 4 turn", [[true, "Reverse"], [false, "None"]]),
    ],
    code: ({ gain, sound, direction, rate, lpf, sweep, delay, phraseTurn }, context) => {
      const chords = context.arpTones ?? [["a4", "c5", "e5", "a5"]];
      const order = (tones) => {
        const t = [...tones];
        while (t.length < 4) t.push(t[t.length - 1]);
        if (direction === "down") return [t[3], t[2], t[1], t[0]];
        if (direction === "updown") return [t[0], t[1], t[2], t[3], t[2], t[1]];
        if (direction === "weave") return [t[0], t[2], t[1], t[3]];
        return [t[0], t[1], t[2], t[3]];
      };
      const line = chords
        .map((tones) => {
          const source = order(tones);
          const steps = Array.from({ length: rate }, (_, index) => source[index % source.length]);
          return `[${steps.join(" ")}]`;
        })
        .join(" ");
      const turn = phraseTurn === true || phraseTurn === "true"
        ? `\n  .lastOf(4, x => x.rev())`
        : "";
      return `note("<${line}>")${turn}
  .sound("${sound}")
  .release(0.1)
  .lpf(${sweptFilter(lpf, sweep, 8)})
  .delay(${delay})
  .delaytime(0.375)
  .delayfeedback(0.42)
  .gain(${gain})
  .orbit(3)`;
    },
  },

  {
    id: "melody",
    name: "Lead Hook",
    category: "melody",
    order: 9,
    enabled: true,
    muted: false,
    description: "An eight-bar A/A′/B/A″ motif: repetition supplies identity, controlled endings supply development.",
    params: {
      gain: 0.2,
      sound: "supersaw",
      unison: 3,
      style: "anthem",
      lpf: 4800,
      release: 0.28,
      room: 0.35,
      delay: 0.34,
      octaveClimax: 0.35,
    },
    paramDefs: [
      range("gain", "Gain", 0, 0.55, 0.01),
      select("sound", "Sound", SOUND_OPTIONS),
      range("unison", "Unison Voices", 1, 5, 1),
      select("style", "Motif", [
        ["anthem", "Anthem"],
        ["pulse", "Pulse"],
        ["call", "Call / response"],
      ]),
      range("lpf", "LPF", 700, 9000, 50),
      range("release", "Release", 0.08, 1.2, 0.02),
      range("room", "Room", 0, 0.8, 0.01),
      range("delay", "Delay", 0, 0.7, 0.01),
      range("octaveClimax", "Bar 8 lift", 0, 0.7, 0.05),
    ],
    code: ({ gain, sound, unison, style, lpf, release, room, delay, octaveClimax }, context) => {
      const line = context.leadLines?.[style] ?? context.leadLines?.anthem ?? "[0 ~ 2 4 ~ 2 1 ~]";
      return `n("<${line}>")
  .scale("${context.scaleStr}")
  .lastOf(8, x => x.off(0, y => y.add(n(7)).gain(${octaveClimax})))
  .sound("${sound}")
  .unison(${sound === "supersaw" ? unison : 1})
  .release(${release})
  .lpf(${lpf})
  .room(${room})
  .delay(${delay})
  .delaytime(0.375)
  .delayfeedback(0.4)
  .gain(${gain})
  .orbit(3)`;
    },
  },

  {
    id: "counter",
    name: "Countermelody",
    category: "melody",
    order: 10,
    enabled: false,
    muted: false,
    description: "Sparse answers occupy the lead's rests and move in a complementary register.",
    params: {
      gain: 0.11,
      sound: "triangle",
      octave: 1,
      lpf: 3600,
      delay: 0.24,
    },
    paramDefs: [
      range("gain", "Gain", 0, 0.35, 0.01),
      select("sound", "Sound", SOUND_OPTIONS),
      range("octave", "Octave", 0, 2, 1),
      range("lpf", "LPF", 500, 7000, 50),
      range("delay", "Delay", 0, 0.6, 0.01),
    ],
    code: ({ gain, sound, octave, lpf, delay }, context) =>
      `n("<${context.counterLine ?? "[~ ~ 7 ~ ~ ~ 4 ~]"}>")
  .scale("${context.scaleStr}")
  .add(n(${octave * 7}))
  .sound("${sound}")
  .release(0.3)
  .lpf(${lpf})
  .delay(${delay})
  .delaytime(0.5)
  .gain(${gain})
  .orbit(3)`,
  },

  {
    id: "transition",
    name: "Transitions",
    category: "fx",
    order: 11,
    enabled: true,
    muted: false,
    description: "An eight-bar noise rise and phrase-start crash make structural boundaries audible.",
    params: {
      gain: 0.11,
      rise: 0.7,
      crash: 0.32,
      length: 8,
      hpf: 900,
    },
    paramDefs: [
      range("gain", "Gain", 0, 0.35, 0.01),
      range("rise", "Riser", 0, 1, 0.05),
      range("crash", "Crash", 0, 0.7, 0.01),
      select("length", "Phrase", [[4, "4 bars"], [8, "8 bars"], [16, "16 bars"]]),
      range("hpf", "HPF", 100, 5000, 50),
    ],
    code: ({ gain, rise, crash, length, hpf }) => {
      const crashPattern = Array.from(
        { length: Number(length) },
        (_, index) => (index === 0 ? "cr" : "~"),
      ).join(" ");
      return `stack(
  s("pink")
    .hpf(${hpf})
    .lpf(saw.range(1200, 11000).slow(${length}))
    .gain(saw.range(0, ${rise}).slow(${length})),
  s("<${crashPattern}>")
    .gain(${crash})
    .room(0.75)
)
  .gain(${gain})
  .orbit(4)`;
    },
  },

  {
    id: "texture",
    name: "Atmosphere",
    category: "fx",
    order: 12,
    enabled: true,
    muted: false,
    description: "High-passed air and distant noise fill the stereo background without adding rhythmic clutter.",
    params: {
      gain: 0.045,
      sound: "pink",
      hpf: 2200,
      movement: 1200,
      width: 0.65,
    },
    paramDefs: [
      range("gain", "Gain", 0, 0.2, 0.005),
      select("sound", "Texture", [
        ["pink", "Air"],
        ["white", "Bright noise"],
        ["brown", "Dark noise"],
      ]),
      range("hpf", "HPF", 200, 7000, 50),
      range("movement", "Filter Motion", 0, 5000, 100),
      range("width", "Stereo Width", 0, 1, 0.05),
    ],
    code: ({ gain, sound, hpf, movement, width }) => {
      const high = hpf + movement;
      return `s("${sound}")
  .hpf(sine.range(${hpf}, ${high}).slow(24))
  .juxBy(${width}, x => x.rev())
  .gain(${gain})
  .orbit(4)`;
    },
  },
];
