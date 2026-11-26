import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { readContent, saveContent } from "@/lib/content-store";

export const runtime = "nodejs";

export async function GET() {
  const content = await readContent();
  return Response.json(
    { content },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    const body = await request.json();
    payload = body && typeof body === "object" && "content" in body
      ? (body as { content: unknown }).content
      : body;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const content = await saveContent(payload);
  revalidatePath("/");
  return Response.json({ content }, { headers: { "Cache-Control": "no-store" } });
}
