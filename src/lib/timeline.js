import { ARRANGEMENTS } from "../data/arrangements";

export const TIMELINE_BAR_OPTIONS = [4, 8, 16, 32, 64];
export const QUANTIZE_OPTIONS = [0, 1, 4, 8];

export const DEFAULT_TIMELINE = [
  { id: "intro", arrangementId: "dj-intro", bars: 16 },
  { id: "drive", arrangementId: "progressive-drive", bars: 32 },
  { id: "breakdown", arrangementId: "breakdown", bars: 16 },
  { id: "build", arrangementId: "tension-build", bars: 8 },
  { id: "peak", arrangementId: "anthem-peak", bars: 32 },
  { id: "outro", arrangementId: "afterglow", bars: 16 },
];

export function createDefaultTimeline() {
  return DEFAULT_TIMELINE.map((section) => ({ ...section }));
}

export function hydrateTimeline(value) {
  if (!Array.isArray(value)) return createDefaultTimeline();
  const arrangementIds = new Set(ARRANGEMENTS.map((arrangement) => arrangement.id));
  const seenIds = new Set();
  const sections = value
    .slice(0, 24)
    .map((section, index) => {
      if (!section || typeof section !== "object") return null;
      const arrangementId = section.arrangementId ?? section.a;
      if (!arrangementIds.has(arrangementId)) return null;
      const savedId = section.id ?? section.i;
      const rawId = typeof savedId === "string" && savedId
        ? savedId.slice(0, 48)
        : `section-${index + 1}`;
      let id = rawId;
      let suffix = 2;
      while (seenIds.has(id)) {
        id = `${rawId}-${suffix}`;
        suffix += 1;
      }
      seenIds.add(id);
      const savedBars = section.bars ?? section.b;
      const bars = Number.isFinite(savedBars)
        ? Math.min(64, Math.max(1, Math.round(savedBars)))
        : 16;
      return { id, arrangementId, bars };
    })
    .filter(Boolean);
  return sections.length > 0 ? sections : createDefaultTimeline();
}

export function compactTimeline(timeline) {
  return timeline.map((section) => ({
    i: section.id,
    a: section.arrangementId,
    b: section.bars,
  }));
}

export function nextSectionId() {
  return `section-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
