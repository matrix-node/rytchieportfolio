import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { deletePost, getPost, savePost } from "@/lib/content";
import type { PostMeta, PostType } from "@/lib/types";

function parseType(value: string): PostType | null {
  return value === "guides" || value === "journal" ? value : null;
}

function sanitizeMeta(input: unknown, fallbackSlug: string): PostMeta | null {
  if (typeof input !== "object" || input === null) return null;
  const m = input as Record<string, unknown>;
  const title = typeof m.title === "string" ? m.title.trim() : "";
  if (!title) return null;
  // Slug stays fixed to the file being edited (renaming = create new + delete).
  return {
    title,
    slug: fallbackSlug,
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

type Ctx = { params: Promise<{ type: string; slug: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const denied = await requireSession();
  if (denied) return denied;
  const { type, slug } = await ctx.params;
  const t = parseType(type);
  if (!t) return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  const post = getPost(t, slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const denied = await requireSession();
  if (denied) return denied;
  const { type, slug } = await ctx.params;
  const t = parseType(type);
  if (!t) return NextResponse.json({ error: "Invalid type" }, { status: 400 });

  let payload: { meta?: unknown; body?: unknown };
  try {
    payload = (await req.json()) as { meta?: unknown; body?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const meta = sanitizeMeta(payload.meta, slug);
  if (!meta) return NextResponse.json({ error: "meta.title is required" }, { status: 400 });
  if (typeof payload.body !== "string") {
    return NextResponse.json({ error: "body (markdown string) is required" }, { status: 400 });
  }

  try {
    savePost({ type: t, meta, body: payload.body });
    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const denied = await requireSession();
  if (denied) return denied;
  const { type, slug } = await ctx.params;
  const t = parseType(type);
  if (!t) return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  const removed = deletePost(t, slug);
  if (!removed) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
