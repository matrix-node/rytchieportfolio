import HomePage from "@/components/HomePage";
import { listPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function Page() {
  const journal = listPosts("journal").slice(0, 8);
  const journalPosts = journal.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.updated || p.date,
    readTime: p.readTime,
    tags: p.tags,
  }));
  return <HomePage journalPosts={journalPosts} />;
}
