import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentShell } from "@/components/NotesChrome";
import Markdown from "@/components/Markdown";
import { getPost, listPosts, prettyDate } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("journal", slug);
  return { title: post?.title ?? "Journal Entry" };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("journal", slug);
  if (!post || post.draft) notFound();

  const related = listPosts("journal")
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);
  const relatedTags = [...new Set(post.tags)].slice(0, 4);

  return (
    <ContentShell>
      <article className="w-full max-w-content-width mx-auto flex flex-col gap-8">
        <div className="mb-4">
          <Link
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-body-sm text-body-sm"
            href="/notes/journal"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Journal
          </Link>
        </div>

        <header className="flex flex-col gap-4 border-b border-outline-variant pb-6">
          <h1 className="font-headline-h1 text-headline-h1 text-on-surface">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 font-body-sm text-body-sm text-on-surface-variant">
            <time dateTime={post.date}>{prettyDate(post.date)}</time>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span>{post.readTime} min read</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <div className="flex gap-2">
              {post.tags.map((t) => (
                <Link
                  className="px-2 py-1 rounded bg-surface-container-high text-on-surface border border-outline-variant/50 font-label-caps text-label-caps hover:border-primary hover:text-primary transition-colors"
                  href={`/journal?tag=${encodeURIComponent(t)}`}
                  key={t}
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <Markdown>{post.body}</Markdown>

        <div className="mt-12 pt-8 border-t border-outline-variant">
          <h4 className="font-label-caps text-label-caps text-on-surface-variant mb-4">
            Related Topics
          </h4>
          <div className="flex flex-wrap gap-3">
            {relatedTags.map((t) => (
              <Link
                className="px-3 py-1.5 rounded-full border border-outline-variant bg-surface-container hover:border-primary hover:text-primary transition-colors font-body-sm text-body-sm text-on-surface"
                href={`/journal?tag=${encodeURIComponent(t)}`}
                key={t}
              >
                #{t}
              </Link>
            ))}
          </div>
          {related.length > 0 ? (
            <div className="mt-8 flex flex-col gap-4">
              <h4 className="font-label-caps text-label-caps text-on-surface-variant">
                Continue Reading
              </h4>
              {related.map((r) => (
                <Link
                  className="group flex flex-col gap-1 border border-outline-variant rounded-lg p-4 bg-surface-container-low hover:border-primary/50 hover:bg-surface-container-high transition-all"
                  href={`/journal/${r.slug}`}
                  key={r.slug}
                >
                  <span className="font-headline-h3 text-headline-h3 text-primary text-base group-hover:underline">
                    {r.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {r.excerpt}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </ContentShell>
  );
}
