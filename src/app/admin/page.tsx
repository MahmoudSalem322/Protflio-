import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { isAuthenticated } from "@/lib/auth";
import { readContent } from "@/lib/content-store";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Portfolio dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) return <AdminLogin />;

  const content = await readContent();
  return <AdminDashboard initialContent={content} />;
}
