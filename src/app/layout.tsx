import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  alternates: { canonical: "https://mahmoudsalem.dev/" },
  title: "Mahmoud Salem | Full-stack Developer",
  description: "Full-stack Developer working with Next.js and Node.js, using AI-assisted development workflows with Codex and Claude to build web applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
