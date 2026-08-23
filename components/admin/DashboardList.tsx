"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Post, PostType } from "@/lib/types";

export default function DashboardList({ type, posts }: { type: PostType; posts: Post[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function onDelete(slug: string) {
    if (!window.confirm(`Delete "${slug}" permanently? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/posts/${type}/${slug}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        window.alert(body.error ?? "Delete failed");
      }
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="p-6 border border-dashed border-outline-variant rounded-lg text-center">
        <span className="font-body-sm text-body-sm text-outline">
          Nothing here yet — write your first one.
        </span>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {posts.map((p) => (
        <li
          className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 border border-outline-variant rounded-lg p-4 bg-surface-container-low hover:border-outline transition-colors"
          key={p.slug}
        >
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                className="font-headline-h3 text-headline-h3 text-on-surface hover:text-primary transition-colors truncate"
                href={`/admin/edit?type=${type}&slug=${p.slug}`}
              >
                {p.title}
              </Link>
              {p.draft ? (
                <span className="px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary border border-tertiary/30 font-label-caps text-[10px]">
                  Draft
                </span>
              ) : null}
              {p.pinned ? (
                <span className="px-2 py-0.5 rounded-full bg-status-seedling/10 text-status-seedling border border-status-seedling/30 font-label-caps text-[10px]">
                  Pinned
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-3 font-body-sm text-body-sm text-outline mt-1">
              <span className="font-code-block text-[12px]">{p.slug}.md</span>
              <span>&bull;</span>
              <span>{p.updated || p.date}</span>
              <span>&bull;</span>
              <span>{p.readTime} min read</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-outline-variant font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
              href={`/admin/edit?type=${type}&slug=${p.slug}`}
            >
              <span className="material-symbols-outlined text-[16px]">edit</span> Edit
            </Link>
            <a
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-outline-variant font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
              href={`/notes/${type}/${p.slug}`}
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span> View
            </a>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-outline-variant font-label-caps text-label-caps text-on-surface-variant hover:text-error hover:border-error transition-colors disabled:opacity-50"
              disabled={deleting === p.slug}
              onClick={() => onDelete(p.slug)}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              {deleting === p.slug ? "…" : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
