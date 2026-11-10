import crypto from "node:crypto";

function configuredUser(): string {
  return (process.env.ADMIN_USER || process.env.ADMIN_USERNAME || process.env.ADMIN_EMAIL || "").trim();
}

function configuredPassword(): string {
  return process.env.ADMIN_PASSWORD || "";
}

export const ADMIN_USER = configuredUser();
export const ADMIN_PASSWORD = configuredPassword();
export const SESSION_COOKIE = "zero_studio_admin";
export const ADMIN_CREDENTIALS_CONFIGURED = Boolean(ADMIN_USER && ADMIN_PASSWORD);

function secret(): string {
  return process.env.ADMIN_SECRET || crypto.createHash("sha256")
    .update(`${ADMIN_USER}:${ADMIN_PASSWORD}:zero-studio-session`)
    .digest("hex");
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSession(ttlMs = 1000 * 60 * 60 * 12): string {
  const expiry = String(Date.now() + ttlMs);
  return `${expiry}.${sign(expiry)}`;
}

export function verifySession(token: string | undefined | null): boolean {
  if (!token || !ADMIN_CREDENTIALS_CONFIGURED) return false;
  const [expiry, mac] = token.split(".");
  if (!expiry || !mac || !/^\d+$/.test(expiry) || Number(expiry) < Date.now()) return false;
  const expected = sign(expiry);
  if (mac.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
}

export function checkCredentials(user: string, password: string): boolean {
  if (!ADMIN_CREDENTIALS_CONFIGURED) return false;
  const safeEqual = (a: string, b: string) => {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  };
  return safeEqual(user.trim(), ADMIN_USER) && safeEqual(password, ADMIN_PASSWORD);
}
