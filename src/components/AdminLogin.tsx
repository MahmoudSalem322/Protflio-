"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Could not sign in.");
        setLoading(false);
        return;
      }
      setPassword("");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-shell">
      <div className="admin-login-card">
        <span className="admin-login-icon"><LockKeyhole size={26} aria-hidden="true" /></span>
        <p className="eyebrow">Portfolio dashboard</p>
        <h1>Sign in</h1>
        <p className="admin-muted">Enter the dashboard password to manage the site content.</p>

        <form onSubmit={submit} className="admin-form">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button type="submit" className="admin-button" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <a className="admin-back" href="/"><ArrowLeft size={16} aria-hidden="true" /> Back to site</a>
      </div>
    </main>
  );
}
