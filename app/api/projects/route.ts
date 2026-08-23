import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { getProjects, saveProjects } from "@/lib/content";
import type { Project } from "@/lib/types";

const STATUSES = new Set(["active", "completed", "on-hold"]);

function sanitizeProjects(input: unknown): Project[] | string {
  if (!Array.isArray(input)) return "projects must be an array";
  const seen = new Set<string>();
  for (const p of input) {
    if (typeof p !== "object" || p === null) return "each project must be an object";
    const proj = p as Record<string, unknown>;
    if (typeof proj.title !== "string" || !proj.title.trim()) return "project.title is required";
    if (typeof proj.slug !== "string" || !proj.slug.trim()) {
      return `project "${proj.title}" needs a slug`;
    }
    if (seen.has(proj.slug)) return `duplicate slug: ${proj.slug}`;
    seen.add(proj.slug);
    if (typeof proj.status !== "string" || !STATUSES.has(proj.status)) {
      return `project "${proj.title}": status must be active | completed | on-hold`;
    }
    if (typeof proj.description !== "string") return `project "${proj.title}" needs a description`;
    if (!Array.isArray(proj.tech)) return `project "${proj.title}": tech must be an array`;
  }
  return input as Project[];
}

export async function GET() {
  return NextResponse.json({ projects: getProjects() });
}

export async function PUT(req: NextRequest) {
  const denied = await requireSession();
  if (denied) return denied;
  let payload: { projects?: unknown };
  try {
    payload = (await req.json()) as { projects?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const result = sanitizeProjects(payload.projects);
  if (typeof result === "string") return NextResponse.json({ error: result }, { status: 400 });
  saveProjects(result);
  return NextResponse.json({ ok: true, count: result.length });
}
