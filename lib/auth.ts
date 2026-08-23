import { createHmac, createHash, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "rdn_session";
const SESSION_DAYS = 7;
export const SESSION_MAX_AGE = SESSION_DAYS * 24 * 3600;

/**
 * Fail-closed: if ADMIN_PASSWORD is not configured, no password works.
 * (Dev convenience only: `ADMIN_PASSWORD=dev` in .env.local.)
 */
export function getAdminPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  return pw && pw.length > 0 ? pw : null;
}

/**
 * SESSION_SECRET must be set in production. Outside production we fall back to
 * an ephemeral random secret: sessions can't be forged from the public repo
 * source, they simply don't survive a process restart.
 */
let ephemeralSecret: string | undefined;

function sessionSecret(): string {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET is not configured");
  }
  return (ephemeralSecret ??= randomBytes(32).toString("hex"));
}

function hmac(value: string): string {
  return createHmac("sha256", sessionSecret()).update(value).digest("hex");
}

/** Opaque session token: "<expiry-ms>.<hmac(expiry)>" — no DB needed. */
export function createSessionToken(): string {
  const exp = Date.now() + SESSION_DAYS * 24 * 3600 * 1000;
  return `${exp}.${hmac(String(exp))}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const expRaw = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(expRaw) || !/^[a-f0-9]{64}$/.test(sig)) return false;
  let expected: Buffer;
  try {
    expected = Buffer.from(hmac(expRaw));
  } catch {
    // SESSION_SECRET missing in production: no session can be valid.
    return false;
  }
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return false;
  }
  return Number(expRaw) > Date.now();
}

/** Constant-time string comparison via equal-length hashes. */
export function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Returns a 401 response when the caller is not authenticated, else null. */
export async function requireSession(): Promise<NextResponse | null> {
  if (await isAuthed()) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
