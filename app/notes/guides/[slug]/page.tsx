import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentShell } from "@/components/NotesChrome";
import Markdown from "@/components/Markdown";
import FeedbackWidget from "@/components/FeedbackWidget";
import { getPost, listPosts, prettyDate } from "@/lib/content";

export const dynamic = "force-dynamic";

const BADGES: Record<string, { icon: string; cls: string; label: string }> = {
  growing: { icon: "psychiatry", cls: "text-status-growing", label: "Growing" },
  seedling: { icon: "grass", cls: "text-status-seedling", label: "Seedling" },
  evergreen: { icon: "park", cls: "text-status-evergreen", label: "Evergreen" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("guides", slug);
  return { title: post?.title ?? "Guide" };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("guides", slug);
  if (!post || post.draft) notFound();

  const all = listPosts("guides");
  const idx = all.findIndex((g) => g.slug === slug);
  const prev = idx < all.length - 1 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;
  const badge = BADGES[post.badge ?? ""];

  return (
    <ContentShell>
      <article className="max-w-content-width w-full">
        <nav aria-label="Breadcrumb" className="flex text-on-surface-variant font-label-caps text-label-caps mb-8">
          <ol className="flex items-center space-x-2 flex-wrap">
            <li>
              <Link className="hover:text-primary transition-colors" href="/notes/guides">
                Guides
              </Link>
            </li>
            <li className="flex items-center">
              <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
            </li>
            {post.category ? (
              <>
                <li>
                  <Link
                    className="hover:text-primary transition-colors"
                    href={`/notes/guides?category=${encodeURIComponent(post.category)}`}
                  >
                    {post.category}
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
                </li>
              </>
            ) : null}
            <li aria-current="page" className="text-on-surface">
              {post.title}
            </li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="font-headline-h1 text-headline-h1 text-on-surface mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-body-sm text-body-sm">
            <time dateTime={post.updated || post.date}>
              Last updated: {prettyDate(post.updated || post.date)}
            </time>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span>{post.readTime} min read</span>
            {badge ? (
              <>
                <span className="w-1 h-1 rounded-full bg-outline-variant" />
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container ${badge.cls} border border-outline-variant/30 font-label-caps text-label-caps tracking-wider`}
                >
                  <span className="material-symbols-outlined text-[14px]">{badge.icon}</span>
                  {badge.label}
                </span>
              </>
            ) : null}
          </div>
        </header>

        <Markdown>{post.body}</Markdown>

        <hr className="border-outline-variant my-12" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            {prev ? (
              <Link
                className="group flex flex-col border border-outline-variant rounded-lg p-4 hover:border-primary hover:bg-surface-container-low transition-all w-32 sm:w-40"
                href={`/notes/guides/${prev.slug}`}
              >
                <span className="text-outline-variant font-label-caps text-[10px] uppercase mb-1">
                  Previous
                </span>
                <span className="text-on-surface font-semibold text-body-sm group-hover:text-primary line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span className="w-32 sm:w-40" />
            )}
            {next ? (
              <Link
                className="group flex flex-col border border-outline-variant rounded-lg p-4 hover:border-primary hover:bg-surface-container-low transition-all w-32 sm:w-40 text-right"
                href={`/notes/guides/${next.slug}`}
              >
                <span className="text-outline-variant font-label-caps text-[10px] uppercase mb-1">
                  Next
                </span>
                <span className="text-on-surface font-semibold text-body-sm group-hover:text-primary line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span className="w-32 sm:w-40" />
            )}
          </div>
          <FeedbackWidget />
        </div>
      </article>
    </ContentShell>
  );
}
