"use client";

import { useRef, useState } from "react";

function legacyCopy(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy") ? resolve() : reject(new Error("copy denied"));
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(ta);
    }
  });
}

export default function CodeBlock({
  children,
  filename,
  language,
}: {
  children: React.ReactNode;
  filename?: string;
  language?: string;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const label = filename || language || "code";

  async function onCopy() {
    const text = preRef.current?.innerText ?? "";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
      } else {
        await legacyCopy(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — leave button unchanged */
    }
  }

  return (
    <div className="my-6 rounded-lg border border-outline-variant bg-surface-container overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-surface-container-highest border-b border-outline-variant">
        <span className="font-code-block text-[12px] text-on-surface-variant uppercase tracking-wider truncate">
          {label}
        </span>
        <button
          onClick={onCopy}
          className={`flex items-center gap-1 font-label-caps text-[10px] transition-colors ${
            copied ? "text-status-seedling" : "text-on-surface-variant hover:text-primary"
          }`}
          title="Copy code"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">content_copy</span>
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre
          ref={preRef}
          className="font-code-block text-code-block text-on-surface whitespace-pre"
        >
          {children}
        </pre>
      </div>
    </div>
  );
}
