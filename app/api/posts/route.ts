import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { listPosts, savePost } from "@/lib/content";
import type { PostMeta, PostType } from "@/lib/types";

function parseType(value: string): PostType | null {
  return value === "guides" || value === "journal" ? value : null;
}

function sanitizeMeta(input: unknown): PostMeta | null {
  if (typeof input !== "object" || input === null) return null;
  const m = input as Record<string, unknown>;
  if (typeof m.title !== "string" || !m.title.trim()) return null;
  if (typeof m.slug !== "string" || !m.slug.trim()) return null;
  return {
    title: m.title.trim(),
    slug: m.slug.trim(),
    excerpt: typeof m.excerpt === "string" ? m.excerpt : "",
    date: typeof m.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(m.date) ? m.date : "",
    updated: typeof m.updated === "string" ? m.updated : undefined,
    tags: Array.isArray(m.tags) ? m.tags.map(String).filter(Boolean) : [],
    draft: m.draft === true,
    pinned: m.pinned === true,
    category: typeof m.category === "string" ? m.category : undefined,
    badge: typeof m.badge === "string" ? m.badge : undefined,
  };
}

export async function GET(req: NextRequest) {
  const denied = await requireSession();
  if (denied) return denied;
  const type = parseType(req.nextUrl.searchParams.get("type") ?? "");
  if (!type) return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  return NextResponse.json({ posts: listPosts(type, true) });
}

export async function POST(req: NextRequest) {
  const denied = await requireSession();
  if (denied) return denied;
  const type = parseType(req.nextUrl.searchParams.get("type") ?? "");
  if (!type) return NextResponse.json({ error: "Invalid type" }, { status: 400 });

  let payload: { meta?: unknown; body?: unknown };
  try {
    payload = (await req.json()) as { meta?: unknown; body?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const meta = sanitizeMeta(payload.meta);
  if (!meta) return NextResponse.json({ error: "meta.title and meta.slug are required" }, { status: 400 });
  if (typeof payload.body !== "string") {
    return NextResponse.json({ error: "body (markdown string) is required" }, { status: 400 });
  }

  try {
    savePost({ type, meta, body: payload.body });
    return NextResponse.json({ ok: true, slug: meta.slug });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
