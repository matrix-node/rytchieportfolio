"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Incorrect password. Try again.");
      }
    } catch {
      setError("Login failed — is the server running?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
          key
        </span>
        <input
          aria-label="Admin password"
          autoComplete="current-password"
          autoFocus
          className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-3 pl-12 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          type="password"
          value={password}
        />
      </div>
      {error ? (
        <span className="font-body-sm text-body-sm text-error flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">error</span> {error}
        </span>
      ) : null}
      <button
        className="px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-label-caps text-label-caps uppercase hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        disabled={busy || !password}
        type="submit"
      >
        <span className="material-symbols-outlined text-[18px]">login</span>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
