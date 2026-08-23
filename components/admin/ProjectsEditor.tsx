"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectsEditor({ initial }: { initial: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSave() {
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch (e) {
      setStatus({ ok: false, msg: `Invalid JSON: ${(e as Error).message}` });
      return;
    }
    if (!Array.isArray(parsed)) {
      setStatus({ ok: false, msg: "Top-level value must be an array of projects." });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects: parsed }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ ok: true, msg: "Projects saved." });
        router.refresh();
      } else {
        setStatus({ ok: false, msg: body.error ?? "Save failed" });
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <textarea
        className="w-full h-72 bg-surface-container-lowest border border-outline-variant rounded-lg p-4 font-code-block text-[13px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
        value={value}
      />
      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 bg-primary-container text-on-primary-container rounded-lg font-label-caps text-label-caps uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={busy}
          onClick={onSave}
          type="button"
        >
          {busy ? "Saving…" : "Save Projects"}
        </button>
        {status ? (
          <span
            className={`font-body-sm text-body-sm flex items-center gap-1 ${
              status.ok ? "text-status-seedling" : "text-error"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {status.ok ? "check_circle" : "error"}
            </span>
            {status.msg}
          </span>
        ) : null}
      </div>
    </div>
  );
}
