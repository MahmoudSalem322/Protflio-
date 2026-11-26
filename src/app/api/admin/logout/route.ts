import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const store = await cookies();
  store.delete({ name: SESSION_COOKIE, path: "/" });
  return Response.json({ ok: true });
}
