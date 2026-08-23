"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Markdown from "@/components/Markdown";
import type { PostMeta, PostType } from "@/lib/types";

export interface EditorInitial {
  type: PostType;
  isNew: boolean;
  meta: PostMeta;
  body: string;
}

const FIELD =
  "w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
const LABEL = "font-label-caps text-label-caps text-on-surface-variant";

const SAMPLE_BODY = `Start writing in **Markdown**.

> [!TIP]
> Blockquote callouts work: INFO, TIP, WARNING, DANGER.

\`\`\`bash title="hello.sh"
echo "Code blocks get copy buttons and filenames."
\`\`\`
`;

export default function PostEditor({ initial }: { initial: EditorInitial }) {
  const router = useRouter();
  const { type, isNew } = initial;
  const isGuide = type === "guides";

  const [meta, setMeta] = useState<PostMeta>(initial.meta);
  const [body, setBody] = useState(initial.body || SAMPLE_BODY);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const slugLocked = !isNew;
  const set = <K extends keyof PostMeta>(key: K, value: PostMeta[K]) =>
    setMeta((m) => ({ ...m, [key]: value }));

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const wordCount = useMemo(() => body.trim().split(/\s+/).filter(Boolean).length, [body]);

  async function onSave() {
    if (!meta.title.trim() || !meta.slug.trim()) {
      setStatus({ ok: false, msg: "Title and slug are required." });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch(
        slugLocked ? `/api/posts/${type}/${initial.meta.slug}` : `/api/posts?type=${type}`,
        {
          method: slugLocked ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            meta: {
              ...meta,
              slug: meta.slug.trim(),
              updated: new Date().toISOString().slice(0, 10),
              tags: meta.tags.map((t) => t.trim()).filter(Boolean),
            },
            body,
          }),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setStatus({ ok: false, msg: `HTTP ${res.status}: ${data.error ?? "no error body"}` });
      }
    } catch (err) {
      setStatus({ ok: false, msg: `NETERR: ${(err as Error).message}` });
    } finally {
      setBusy(false);
    }
  }

  async function onDelete() {
    if (!window.confirm(`Delete "${meta.slug}" permanently?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/posts/${type}/${initial.meta.slug}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus({ ok: false, msg: data.error ?? "Delete failed" });
        setBusy(false);
      }
    } catch {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors font-body-sm text-body-sm"
            href="/admin"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span> Dashboard
          </Link>
          <span className="text-outline-variant">&bull;</span>
          <span className={LABEL}>
            {isNew ? `New ${isGuide ? "Guide" : "Journal Entry"}` : "Editing"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isNew ? (
            <button
              className="px-4 py-2 rounded-lg border border-outline-variant font-label-caps text-label-caps text-on-surface-variant hover:text-error hover:border-error transition-colors"
              disabled={busy}
              onClick={onDelete}
              type="button"
            >
              Delete
            </button>
          ) : null}
          <button
            className="px-5 py-2 bg-primary-container text-on-primary-container rounded-lg font-label-caps text-label-caps uppercase hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            disabled={busy}
            onClick={onSave}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            {busy ? "Saving…" : isNew ? "Publish" : "Save"}
          </button>
        </div>
      </div>

      {status ? (
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border font-body-sm text-body-sm ${
            status.ok
              ? "border-status-seedling/40 text-status-seedling bg-status-seedling/10"
              : "border-error/40 text-error bg-error/10"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {status.ok ? "check_circle" : "error"}
          </span>
          {status.msg}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={LABEL}>Title</span>
          <input
            className={FIELD}
            onChange={(e) => {
              const title = e.target.value;
              setMeta((m) => ({
                ...m,
                title,
                slug: isNew ? autoSlug(title) : m.slug,
              }));
            }}
            placeholder="Quick Fix: Git Rebase vs Merge Cheatsheet"
            type="text"
            value={meta.title}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={LABEL}>Slug (URL)</span>
          <input
            className={`${FIELD} font-code-block ${slugLocked ? "opacity-70" : ""}`}
            onChange={(e) => set("slug", autoSlug(e.target.value))}
            placeholder="git-rebase-vs-merge-cheatsheet"
            readOnly={slugLocked}
            type="text"
            value={meta.slug}
          />
        </label>
        <label className="flex flex-col gap-1.5 md:col-span-2">
          <span className={LABEL}>Excerpt (used in listings &amp; search)</span>
          <input
            className={FIELD}
            onChange={(e) => set("excerpt", e.target.value)}
            placeholder="A mental model for when to rebase vs merge…"
            type="text"
            value={meta.excerpt}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={LABEL}>Tags (comma separated)</span>
          <input
            className={FIELD}
            onChange={(e) =>
              set(
                "tags",
                e.target.value.split(",").map((t) => t.replace(/^#/, ""))
              )
            }
            placeholder="git, workflow"
            type="text"
            value={meta.tags.join(", ")}
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className={LABEL}>Published date</span>
            <input
              className={FIELD}
              onChange={(e) => set("date", e.target.value)}
              type="date"
              value={meta.date}
            />
          </label>
          {isGuide ? (
            <label className="flex flex-col gap-1.5">
              <span className={LABEL}>Category</span>
              <select
                className={FIELD}
                onChange={(e) => set("category", e.target.value)}
                value={meta.category ?? ""}
              >
                <option value="Infrastructure">Infrastructure</option>
                <option value="Security">Security</option>
                <option value="Development">Development</option>
              </select>
            </label>
          ) : (
            <span className="hidden md:block" />
          )}
        </div>
        {isGuide ? (
          <label className="flex flex-col gap-1.5">
            <span className={LABEL}>Status badge</span>
            <select
              className={FIELD}
              onChange={(e) => set("badge", e.target.value)}
              value={meta.badge ?? ""}
            >
              <option value="">None</option>
              <option value="seedling">Seedling</option>
              <option value="growing">Growing</option>
              <option value="evergreen">Evergreen</option>
            </select>
          </label>
        ) : null}
        <div className="flex items-end gap-6 pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              checked={!!meta.draft}
              className="accent-primary-container w-4 h-4"
              onChange={(e) => set("draft", e.target.checked)}
              type="checkbox"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Draft (hidden from public)
            </span>
          </label>
          {isGuide ? (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                checked={!!meta.pinned}
                className="accent-primary-container w-4 h-4"
                onChange={(e) => set("pinned", e.target.checked)}
                type="checkbox"
              />
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Pin to homepage
              </span>
            </label>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-outline-variant">
        <div className="flex gap-1">
          {(["write", "preview"] as const).map((t) => (
            <button
              className={`px-4 py-2 font-label-caps text-label-caps transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "text-primary border-primary"
                  : "text-on-surface-variant border-transparent hover:text-on-surface"
              }`}
              key={t}
              onClick={() => setTab(t)}
              type="button"
            >
              {t === "write" ? "Write" : "Preview"}
            </button>
          ))}
        </div>
        <span className="font-code-block text-[12px] text-outline">
          {wordCount} words &bull; ~{Math.max(1, Math.ceil(wordCount / 200))} min read &bull; Markdown + GFM tables + [!INFO] callouts
        </span>
      </div>

      {tab === "write" ? (
        <textarea
          aria-label="Body markdown"
          className="w-full h-[480px] bg-surface-container-lowest border border-outline-variant rounded-lg p-4 font-code-block text-[14px] leading-7 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(e) => setBody(e.target.value)}
          placeholder={SAMPLE_BODY}
          spellCheck={false}
          value={body}
        />
      ) : (
        <div className="w-full min-h-[480px] bg-surface-container-lowest border border-outline-variant rounded-lg p-6">
          {body.trim() ? (
            <Markdown>{body}</Markdown>
          ) : (
            <span className="font-body-sm text-body-sm text-outline">Nothing to preview yet.</span>
          )}
        </div>
      )}
    </div>
  );
}
