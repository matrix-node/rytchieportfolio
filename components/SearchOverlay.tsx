"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SearchResults } from "@/lib/types";

const EMPTY: SearchResults = { guides: [], journal: [], projects: [] };

function Highlight({ text, q }: { text: string; q: string }) {
  const query = q.trim();
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="search-highlight">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function Group({
  label,
  icon,
  items,
  q,
  emptyText,
  onNavigate,
}: {
  label: string;
  icon: string;
  items: { title: string; excerpt: string; href: string }[];
  q: string;
  emptyText: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="px-4 pb-2 mb-2 border-b border-surface-variant">
        <span className="font-label-caps text-label-caps text-outline tracking-wider uppercase flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">{icon}</span>
          {label}
        </span>
      </div>
      <ul className="flex flex-col">
        {items.length === 0 ? (
          q.trim() ? (
            <li className="px-4 py-4 text-center">
              <span className="font-body-sm text-body-sm text-outline italic">{emptyText}</span>
            </li>
          ) : null
        ) : (
          items.map((item, i) => (
            <li key={`${label}-${i}`}>
              <a
                className="flex flex-col px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-colors group relative border-l-2 border-transparent hover:border-primary"
                href={item.href}
                onClick={onNavigate}
              >
                <span className="font-body-md text-body-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                  <Highlight text={item.title} q={q} />
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-1">
                  <Highlight text={item.excerpt} q={q} />
                </span>
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default function SearchOverlay({ autoOpen = false }: { autoOpen?: boolean }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
      const params = new URLSearchParams(window.location.search);
      const initial = params.get("q") ?? "";
      setQ(initial);
    }
  }, [autoOpen]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail ?? {};
      if (typeof detail.q === "string") setQ(detail.q);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("rdn:open-search", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("rdn:open-search", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        inputRef.current?.focus();
        const len = inputRef.current?.value.length ?? 0;
        inputRef.current?.setSelectionRange(len, len);
      }, 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!q.trim()) {
      setResults(EMPTY);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (res.ok) setResults((await res.json()) as SearchResults);
      } catch {
        /* network hiccup: keep previous results */
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  if (!open) return null;

  return (
    <div
      aria-label="Search site"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col items-center pt-24 px-4 sm:px-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      style={{
        backgroundColor: "rgba(10, 14, 20, 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div className="w-full max-w-content-width bg-surface-container-high border border-outline-variant rounded-xl shadow-2xl flex flex-col overflow-hidden">
        <div className="relative flex items-center border-b border-outline-variant px-4 py-4 bg-surface-container-lowest">
          <span className="material-symbols-outlined text-outline absolute left-6 pointer-events-none text-[24px]">
            {loading ? "progress_activity" : "search"}
          </span>
          <input
            aria-label="Search"
            className="w-full bg-transparent border-none pl-12 pr-20 py-2 font-headline-h3 text-headline-h3 text-on-surface placeholder-on-surface-variant focus:ring-0 focus:outline-none"
            id="search-input"
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guides, journal, projects..."
            ref={inputRef}
            type="text"
            value={q}
          />
          <div className="absolute right-6 flex items-center gap-2 pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 bg-surface border border-outline-variant rounded font-code-block text-[12px] text-on-surface-variant">
              Esc
            </kbd>
          </div>
        </div>

        <div className="max-h-[530px] overflow-y-auto overscroll-contain py-4 flex flex-col gap-6 px-2">
          {!q.trim() ? (
            <div className="px-4 py-8 text-center">
              <span className="font-body-sm text-body-sm text-outline">
                Type to search across guides, journal entries and projects.
              </span>
            </div>
          ) : (
            <>
              <Group
                emptyText="No matching guides found."
                icon="auto_stories"
                items={results.guides}
                label="Guides"
                onNavigate={close}
                q={q}
              />
              <Group
                emptyText="No matching journal entries found."
                icon="edit_note"
                items={results.journal}
                label="Journal"
                onNavigate={close}
                q={q}
              />
              <Group
                emptyText="No matching projects found."
                icon="inventory_2"
                items={results.projects}
                label="Projects"
                onNavigate={close}
                q={q}
              />
            </>
          )}
        </div>

        <div className="bg-surface-container-lowest border-t border-outline-variant px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-code-block text-[12px]">
                <kbd className="px-1.5 py-0.5 bg-surface border border-outline-variant rounded text-on-surface">&uarr;</kbd>
                <kbd className="px-1.5 py-0.5 bg-surface border border-outline-variant rounded text-on-surface">&darr;</kbd>
              </span>
              <span className="font-body-sm text-body-sm text-[12px]">to navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-code-block text-[12px]">
                <kbd className="px-1.5 py-0.5 bg-surface border border-outline-variant rounded text-on-surface">&#8629;</kbd>
              </span>
              <span className="font-body-sm text-body-sm text-[12px]">to select</span>
            </div>
          </div>
          <div className="font-label-caps text-[10px] text-outline">Powered by local search</div>
        </div>
      </div>
    </div>
  );
}
