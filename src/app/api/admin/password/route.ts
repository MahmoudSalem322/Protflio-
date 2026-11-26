import { isAuthenticated, setPassword, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let currentPassword: unknown;
  let newPassword: unknown;
  try {
    const body = await request.json();
    currentPassword = body?.currentPassword;
    newPassword = body?.newPassword;
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (typeof currentPassword !== "string" || !(await verifyPassword(currentPassword))) {
    return Response.json({ error: "Current password is incorrect" }, { status: 403 });
  }
  if (typeof newPassword !== "string" || newPassword.length < 8) {
    return Response.json({ error: "New password must be at least 8 characters" }, { status: 400 });
  }

  await setPassword(newPassword);
  return Response.json({ ok: true });
}
