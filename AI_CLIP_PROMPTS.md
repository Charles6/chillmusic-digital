# AI Clip Prompt Pack

Use these prompts in Udio or Suno to generate the clip files expected by the app.

Why this workflow:
- Udio officially supports instrumental generation, remixing, extending, and MP3 download.
- Udio also supports extending songs into longer structures and exporting stems for later editing.
- Short, focused instrumental prompts generally give more controllable results than trying to force a full finished hour in one shot.

Useful official references:
- Prompting and instrumental/manual mode: https://help.udio.com/en/articles/10716541-prompt-like-a-master
- Extending songs into longer arrangements: https://help.udio.com/en/articles/10732568-extend-your-song
- Downloading MP3/WAV/stems: https://help.udio.com/en/articles/10736664-export-your-music-for-further-editing

## Global Settings

Use these defaults unless a track prompt overrides them:

- Instrumental only
- 2 to 5 minutes
- 90 to 102 BPM
- No vocals
- Deep sub bass
- Warm analog pads
- Sparse delayed melody
- No aggressive supersaw lead
- No huge festival drop
- Background music for coding and focus

## Workflow

1. Generate 3 to 6 versions per prompt.
2. Keep the versions with the best bass tone and least cheesy lead.
3. If the structure is weak, use `Extend` to add intro/outro or smooth transitions.
4. Download the best result as MP3.
5. Rename the file to the exact filename listed below.
6. Put it in `public/audio/clips/`.

## Clip Prompts

### `midnight-cache.mp3`
`instrumental, deep synth focus music, c minor, 94 bpm, warm sub bass, muted kick, soft analog pads, sparse delayed melody, nocturnal coding atmosphere, minimal trance pulse, no vocals, no big drop`

### `quiet-bus.mp3`
`instrumental, low-key electronic background music, f minor, 96 bpm, thick sub bass, restrained drums, cold synth chords, subtle melodic fragments, late night city bus feeling, no vocals, no bright hook`

### `after-hours-loop.mp3`
`instrumental, dark ambient trance for working, d minor, 98 bpm, rounded bass groove, soft kick, distant pads, evolving melody with restraint, after-hours office mood, no vocals, no EDM drop`

### `glass-terminal.mp3`
`instrumental, soft analog synth background, a minor, 92 bpm, deep dubby bass, warm pads, glassy but infrequent melodic notes, calm terminal glow, no vocals, no busy drums`

### `night-shift.mp3`
`instrumental, night drive coding music, g minor, 100 bpm, deep bass pulse, hypnotic drum loop, dark synth atmosphere, sparse lead accents, focused and steady, no vocals`

### `rain-memory.mp3`
`instrumental, rainy electronic focus music, e minor, 95 bpm, low sub bass, muted percussion, hazy analog pads, gentle delayed motif, introspective and repetitive, no vocals`

### `coal-lights.mp3`
`instrumental, deep minor-key synth track, bb minor, 97 bpm, heavy bass foundation, warm saturation, dim pads, wider melodic phrasing but still subtle, work-friendly, no vocals`

### `soft-router.mp3`
`instrumental, warehouse haze electronic background, c sharp minor, 101 bpm, controlled sub bass, sparse hats, low synth pulse, angular but minimal melody, no vocals, no anthem chorus`

### `underpass-lights.mp3`
`instrumental, late-night underpass synth ambience, f sharp minor, 93 bpm, dubby bass, soft kick, blooming pads, light emotional melody, focused but warm, no vocals`

### `mercury-hall.mp3`
`instrumental, industrial ambient techno for coding, e flat minor, 99 bpm, deep rolling bass, dark room reverb, restrained synth motif, slow mechanical elegance, no vocals`

### `phantom-lane.mp3`
`instrumental, nocturnal analog synth groove, b minor, 102 bpm, sub-heavy bassline, muted drums, repetitive pulse, occasional high note, smooth and hypnotic, no vocals`

### `archive-rain.mp3`
`instrumental, reflective synth closer, c minor, 90 bpm, warm low bass, soft pads, lyrical but sparse melody, end-of-session calm, no vocals, no dramatic climax`

## If Results Still Sound Bad

Try these prompt edits:

- To reduce cheese: `understated`, `restrained melody`, `no anthem lead`, `background music`
- To improve bass: `deep sub bass`, `dubby low end`, `warm analog bass`, `minimal bass movement`
- To reduce busyness: `sparse arrangement`, `few elements`, `repetitive and hypnotic`
- To make it smoother: `gentle transitions`, `soft intro`, `clean outro`

## Recommended Next Step

Generate only 3 clips first:
- `midnight-cache.mp3`
- `rain-memory.mp3`
- `underpass-lights.mp3`

Test those in the player before filling the full 12-track set.
