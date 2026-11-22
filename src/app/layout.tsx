import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  alternates: { canonical: "https://mahmoudsalem.dev/" },
  title: "Mahmoud Salem | Full-stack Developer",
  description: "Full-stack Developer working with Next.js and Node.js, using AI-assisted development workflows with Codex and Claude to build web applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
