import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Mahmoud Salem | Full-stack Developer",
  description: "Full-stack Developer working with Next.js and Node.js, using AI-assisted development workflows with Codex and Claude to build web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.variable} font-sans antialiased min-h-screen bg-[#0C0C0C] text-white overflow-x-clip`}>
        {children}
      </body>
    </html>
  );
}
