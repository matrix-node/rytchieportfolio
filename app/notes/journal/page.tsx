import Link from "next/link";
import { ContentShell } from "@/components/NotesChrome";
import SearchTrigger from "@/components/SearchTrigger";
import { listPosts, monthLabel } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Learning Journal" };

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const all = listPosts("journal");
  const allTags = [...new Set(all.flatMap((p) => p.tags))].sort();
  const entries = tag ? all.filter((p) => p.tags.includes(tag)) : all;

  const groups: { month: string; posts: typeof all }[] = [];
  for (const post of entries) {
    const label = monthLabel(post.updated || post.date);
    const last = groups[groups.length - 1];
    if (last && last.month === label) last.posts.push(post);
    else groups.push({ month: label, posts: [post] });
  }

  return (
    <ContentShell>
      <header className="mb-12">
        <h1 className="font-headline-h1 text-headline-h1 text-on-surface mb-4 tracking-tight">
          Learning Journal
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Quick snippets, TILs, and technical experiments.
        </p>
      </header>

      <div className="mb-12 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-6 bg-surface-container-low border border-outline-variant rounded-lg">
        <SearchTrigger className="w-full md:w-64" placeholder="Search entries..." />
        <div className="flex flex-wrap gap-2">
          <Link
            className={`px-3 py-1 rounded-full border font-label-caps text-label-caps transition-colors ${
              !tag
                ? "border-primary text-primary bg-primary/10"
                : "border-outline-variant text-on-surface-variant hover:border-outline hover:text-on-surface"
            }`}
            href="/notes/journal"
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              className={`px-3 py-1 rounded-full border font-label-caps text-label-caps transition-colors ${
                tag === t
                  ? "border-primary text-primary bg-primary/10"
                  : "border-outline-variant text-on-surface-variant hover:border-outline hover:text-on-surface"
              }`}
              href={`/notes/journal?tag=${encodeURIComponent(t)}`}
              key={t}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="p-8 border border-outline-variant rounded-lg bg-surface-container-low text-center">
          <span className="font-body-md text-body-md text-outline">
            No entries{tag ? ` tagged &quot;${tag}&quot;` : ""} yet.
          </span>
        </div>
      ) : (
        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.month}>
              <h2 className="font-headline-h3 text-headline-h3 text-on-surface-variant mb-6 pb-2 border-b border-outline-variant/50">
                {group.month}
              </h2>
              <div className="space-y-6">
                {group.posts.map((post) => (
                  <article
                    className="group relative p-6 bg-surface-container hover:bg-surface-container-high border border-outline-variant hover:border-outline rounded-lg transition-all duration-200"
                    key={post.slug}
                  >
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <time
                        className="font-code-block text-code-block text-primary"
                        dateTime={post.updated || post.date}
                      >
                        {post.updated || post.date}
                      </time>
                      <span className="font-label-caps text-label-caps text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>{" "}
                        {post.readTime} min read
                      </span>
                    </div>
                    <h3 className="font-headline-h2 text-headline-h2 text-on-surface mb-3 group-hover:text-primary transition-colors">
                      <Link href={`/notes/journal/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((t) => (
                        <Link
                          className="px-2 py-0.5 bg-surface-container-highest text-secondary font-label-caps text-[10px] rounded border border-outline-variant hover:border-primary hover:text-primary transition-colors"
                          href={`/notes/journal?tag=${encodeURIComponent(t)}`}
                          key={t}
                        >
                          {t}
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </ContentShell>
  );
}
