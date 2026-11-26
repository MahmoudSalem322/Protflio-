import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultContent, normalizeContent, type SiteContent } from "./content-types";

const dataDir = process.env.PORTFOLIO_DATA_DIR
  ? path.resolve(process.env.PORTFOLIO_DATA_DIR)
  : path.join(process.cwd(), "data");
const contentFile = process.env.PORTFOLIO_CONTENT_FILE
  ? path.resolve(process.env.PORTFOLIO_CONTENT_FILE)
  : path.join(dataDir, "content.json");

let writeQueue: Promise<void> = Promise.resolve();

function isMissing(error: unknown): boolean {
  return (error as NodeJS.ErrnoException)?.code === "ENOENT";
}

export async function readContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(contentFile, "utf8");
    return normalizeContent(JSON.parse(raw));
  } catch (error) {
    if (isMissing(error)) return normalizeContent(defaultContent);
    throw error;
  }
}

export async function saveContent(value: unknown): Promise<SiteContent> {
  const normalized = normalizeContent(value);
  await fs.mkdir(path.dirname(contentFile), { recursive: true });
  const temp = `${contentFile}.${process.pid}.${Date.now()}.tmp`;
  const operation = writeQueue.then(async () => {
    await fs.writeFile(temp, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
    await fs.rename(temp, contentFile);
  });
  writeQueue = operation.catch(() => undefined);
  await operation;
  return normalized;
}
