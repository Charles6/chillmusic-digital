// Password hashing uses the Web Crypto API (available in Cloudflare Workers).
// Sessions are opaque random tokens stored in KV with a TTL — no JWTs, no secret keys needed.

export interface SessionData {
  userId: string;
  email: string;
  expiresAt: number;
}

// --- Password hashing ---------------------------------------------------------

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const hashBits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    keyMaterial,
    256,
  );

  const toHex = (buf: ArrayBuffer) =>
    Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return `${toHex(salt.buffer)}:${toHex(hashBits)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, expectedHex] = stored.split(":");
  if (!saltHex || !expectedHex) return false;

  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
  const encoder = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const hashBits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    keyMaterial,
    256,
  );

  const actualHex = Array.from(new Uint8Array(hashBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return actualHex === expectedHex;
}

// --- Session tokens -----------------------------------------------------------

function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSession(
  kv: KVNamespace,
  userId: string,
  email: string,
  ttlSeconds: number,
): Promise<string> {
  const token = randomToken();
  const data: SessionData = {
    userId,
    email,
    expiresAt: Date.now() + ttlSeconds * 1000,
  };
  await kv.put(`session:${token}`, JSON.stringify(data), { expirationTtl: ttlSeconds });
  return token;
}

export async function getSession(
  kv: KVNamespace,
  token: string | null | undefined,
): Promise<SessionData | null> {
  if (!token) return null;
  const raw = await kv.get(`session:${token}`);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as SessionData;
    if (data.expiresAt < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function deleteSession(kv: KVNamespace, token: string): Promise<void> {
  await kv.delete(`session:${token}`);
}

// --- Cookie helpers -----------------------------------------------------------

export function sessionCookieName() {
  return "chm_session";
}

export function buildSetCookie(token: string, ttlSeconds: number): string {
  const maxAge = ttlSeconds;
  return `${sessionCookieName()}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}

export function buildClearCookie(): string {
  return `${sessionCookieName()}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

export function parseCookieToken(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${sessionCookieName()}=([^;]+)`));
  return match?.[1] ?? null;
}
