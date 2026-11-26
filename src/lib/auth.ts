import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "portfolio_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const dataDir = process.env.PORTFOLIO_DATA_DIR
  ? path.resolve(process.env.PORTFOLIO_DATA_DIR)
  : path.join(process.cwd(), "data");
const authFile = process.env.PORTFOLIO_AUTH_FILE
  ? path.resolve(process.env.PORTFOLIO_AUTH_FILE)
  : path.join(dataDir, "admin.json");
const secretFile = path.join(dataDir, "session-secret");

type AuthRecord = { salt: string; hash: string };

function isMissing(error: unknown): boolean {
  return (error as NodeJS.ErrnoException)?.code === "ENOENT";
}

function derive(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (error, key) => {
      if (error) reject(error);
      else resolve(key as Buffer);
    });
  });
}

async function hashPassword(password: string): Promise<AuthRecord> {
  const salt = randomBytes(16).toString("hex");
  const hash = await derive(password, salt);
  return { salt, hash: hash.toString("hex") };
}

async function readAuthRecord(): Promise<AuthRecord | null> {
  try {
    const raw = await fs.readFile(authFile, "utf8");
    const parsed = JSON.parse(raw) as Partial<AuthRecord>;
    if (typeof parsed.salt === "string" && typeof parsed.hash === "string") {
      return { salt: parsed.salt, hash: parsed.hash };
    }
    return null;
  } catch (error) {
    if (isMissing(error)) return null;
    throw error;
  }
}

async function writeAuthRecord(record: AuthRecord): Promise<void> {
  await fs.mkdir(path.dirname(authFile), { recursive: true });
  const temp = `${authFile}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(temp, `${JSON.stringify(record, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
  await fs.rename(temp, authFile);
}

async function getAuthRecord(): Promise<AuthRecord | null> {
  const existing = await readAuthRecord();
  if (existing) return existing;

  const initialPassword = process.env.ADMIN_PASSWORD;
  if (!initialPassword) return null;

  const record = await hashPassword(initialPassword);
  await writeAuthRecord(record);
  return record;
}

export async function verifyPassword(password: string): Promise<boolean> {
  const record = await getAuthRecord();
  if (!record) return false;
  const candidate = await derive(password, record.salt);
  const stored = Buffer.from(record.hash, "hex");
  return stored.length === candidate.length && timingSafeEqual(stored, candidate);
}

export async function setPassword(password: string): Promise<void> {
  await writeAuthRecord(await hashPassword(password));
}

async function getSecret(): Promise<Buffer> {
  if (process.env.SESSION_SECRET) {
    return Buffer.from(process.env.SESSION_SECRET, "utf8");
  }

  try {
    return await fs.readFile(secretFile);
  } catch (error) {
    if (!isMissing(error)) throw error;
    const secret = randomBytes(32).toString("base64url");
    await fs.mkdir(path.dirname(secretFile), { recursive: true });
    await fs.writeFile(secretFile, secret, { encoding: "utf8", mode: 0o600 });
    return Buffer.from(secret, "utf8");
  }
}

function sign(payload: string, secret: Buffer): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export async function createSessionToken(): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = Buffer.from(JSON.stringify({ exp: expiresAt })).toString("base64url");
  return `${payload}.${sign(payload, await getSecret())}`;
}

export async function isValidSessionToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload, await getSecret());
  const received = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (received.length !== wanted.length || !timingSafeEqual(received, wanted)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: unknown };
    return typeof parsed.exp === "number" && parsed.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}
