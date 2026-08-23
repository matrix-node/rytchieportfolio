import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostMeta, PostType, Project, ProjectStatus, SearchHit } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled"
  );
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]*$/.test(slug);
}

function readTime(body: string): number {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200));
}

function typeDir(type: PostType): string {
  return path.join(CONTENT_DIR, type === "guides" ? "guides" : "journal");
}

function parseFile(file: string, type: PostType): Post {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const slug = path.basename(file, ".md");
  const m = data as Partial<PostMeta>;
  return {
    slug,
    title: typeof m.title === "string" ? m.title : slug,
    excerpt: typeof m.excerpt === "string" ? m.excerpt : "",
    date: typeof m.date === "string" ? m.date : "",
    updated: typeof m.updated === "string" ? m.updated : undefined,
    tags: Array.isArray(m.tags) ? m.tags.map(String) : [],
    draft: m.draft === true,
    pinned: m.pinned === true,
    category: typeof m.category === "string" ? m.category : undefined,
    badge: typeof m.badge === "string" ? m.badge : undefined,
    body: content.trim(),
    readTime: readTime(content),
  };
}

function sortPosts(posts: Post[]): Post[] {
  return posts.sort((a, b) =>
    (b.updated || b.date).localeCompare(a.updated || a.date)
  );
}

export function listPosts(type: PostType, includeDrafts = false): Post[] {
  const dir = typeDir(type);
  if (!fs.existsSync(dir)) return [];
  const posts = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseFile(path.join(dir, f), type));
  const visible = includeDrafts ? posts : posts.filter((p) => !p.draft);
  return sortPosts(visible);
}

export function getPost(type: PostType, slug: string): Post | null {
  const file = path.join(typeDir(type), `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return parseFile(file, type);
}

export interface SavePostInput {
  type: PostType;
  meta: PostMeta;
  body: string;
}

export function savePost({ type, meta, body }: SavePostInput): void {
  if (!isValidSlug(meta.slug)) {
    throw new Error("Invalid slug: use lowercase letters, digits and dashes.");
  }
  const data: Record<string, unknown> = { title: meta.title };
  if (meta.excerpt) data.excerpt = meta.excerpt;
  if (meta.date) data.date = meta.date;
  if (meta.updated) data.updated = meta.updated;
  if (meta.tags?.length) data.tags = meta.tags;
  if (meta.category) data.category = meta.category;
  if (meta.badge) data.badge = meta.badge;
  if (meta.pinned) data.pinned = true;
  if (meta.draft) data.draft = true;
  const file = path.join(typeDir(type), `${meta.slug}.md`);
  fs.mkdirSync(typeDir(type), { recursive: true });
  fs.writeFileSync(file, matter.stringify(body.trim() + "\n", data), "utf8");
}

export function deletePost(type: PostType, slug: string): boolean {
  const file = path.join(typeDir(type), `${slug}.md`);
  if (!fs.existsSync(file)) return false;
  fs.unlinkSync(file);
  return true;
}

export function getProjects(): Project[] {
  const file = path.join(CONTENT_DIR, "projects.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as Project[];
}

export function saveProjects(projects: Project[]): void {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(CONTENT_DIR, "projects.json"),
    JSON.stringify(projects, null, 2) + "\n",
    "utf8"
  );
}

export function monthLabel(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export function prettyDate(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function searchAll(q: string): {
  guides: SearchHit[];
  journal: SearchHit[];
  projects: SearchHit[];
} {
  const query = q.trim().toLowerCase();
  if (!query) return { guides: [], journal: [], projects: [] };
  const hit = (haystacks: string[]) =>
    haystacks.some((h) => h.toLowerCase().includes(query));

  const toHit = (p: Post, type: PostType): SearchHit => ({
    title: p.title,
    excerpt: p.excerpt,
    href: `/notes/${type}/${p.slug}`,
  });

  const guides = listPosts("guides")
    .filter((p) => hit([p.title, p.excerpt, p.tags.join(" "), p.body]))
    .slice(0, 5)
    .map((p) => toHit(p, "guides"));

  const journal = listPosts("journal")
    .filter((p) => hit([p.title, p.excerpt, p.tags.join(" "), p.body]))
    .slice(0, 5)
    .map((p) => toHit(p, "journal"));

  const projects = getProjects()
    .filter((p) => hit([p.title, p.description, p.tech.join(" ")]))
    .slice(0, 5)
    .map((p) => ({
      title: p.title,
      excerpt: p.description,
      href: "/notes/projects",
    }));

  return { guides, journal, projects };
}

export const PROJECT_STATUS_LABEL: Record<ProjectStatus, string> = {
  active: "Active",
  completed: "Completed",
  "on-hold": "On Hold",
};
