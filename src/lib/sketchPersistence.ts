const MAX_SETTINGS_LENGTH = 100_000;

export function parseStoredSettings(settings: string | null): unknown | null {
  if (!settings) return null;
  try {
    return JSON.parse(settings);
  } catch {
    return null;
  }
}

export function serializeSettings(settings: unknown): string | null {
  if (settings === undefined || settings === null) return null;
  if (typeof settings !== "object" || Array.isArray(settings)) {
    throw new Error("Settings must be an object");
  }

  const serialized = JSON.stringify(settings);
  if (serialized === undefined || serialized.length > MAX_SETTINGS_LENGTH) {
    throw new Error("Settings are too large");
  }
  return serialized;
}
