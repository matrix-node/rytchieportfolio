import Link from "next/link";
import { ContentShell } from "@/components/NotesChrome";
import SearchTrigger from "@/components/SearchTrigger";
import { listPosts, getProjects, prettyDate } from "@/lib/content";

export const dynamic = "force-dynamic";

const CATEGORY_ICONS: Record<string, { icon: string; color: string; bg: string }> = {
  Infrastructure: { icon: "dns", color: "text-status-growing", bg: "bg-status-growing/20" },
  Security: { icon: "shield_lock", color: "text-tertiary", bg: "bg-tertiary-container/20" },
  Development: { icon: "code_blocks", color: "text-status-evergreen", bg: "bg-status-evergreen/20" },
};

export default function HomePage() {
  const guides = listPosts("guides");
  const journal = listPosts("journal");
  const pinned = guides.find((g) => g.pinned) ?? guides[0];
  const recent = [...guides, ...journal]
    .sort((a, b) => (b.updated || b.date).localeCompare(a.updated || a.date))
    .slice(0, 3);
  const tagCounts = new Map<string, number>();
  for (const p of journal) for (const t of p.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  const tags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <ContentShell>
      <section className="flex flex-col gap-6 pt-8">
        <h1 className="font-headline-h1 text-headline-h1 text-on-surface">
          Technical notes, guides, and things I&apos;m learning.
        </h1>
        <SearchTrigger className="max-w-md" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Link
          className="group flex flex-col p-6 rounded-xl border border-outline-variant bg-surface-container-low hover:border-primary/50 transition-colors gap-4"
          href="/notes/guides"
        >
          <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary group-hover:bg-primary-container/30 transition-colors">
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <div>
            <h3 className="font-headline-h3 text-headline-h3 text-on-surface mb-2">
              Structured Guides
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              In-depth tutorials and complete walk-throughs for complex technical setups.
            </p>
          </div>
        </Link>
        <Link
          className="group flex flex-col p-6 rounded-xl border border-outline-variant bg-surface-container-low hover:border-primary/50 transition-colors gap-4"
          href="/notes/journal"
        >
          <div className="w-12 h-12 rounded-lg bg-tertiary-container/20 flex items-center justify-center text-tertiary group-hover:bg-tertiary-container/30 transition-colors">
            <span className="material-symbols-outlined">edit_note</span>
          </div>
          <div>
            <h3 className="font-headline-h3 text-headline-h3 text-on-surface mb-2">
              TIL / Journal
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Daily learnings, quick fixes, and undocumented API quirks.
            </p>
          </div>
        </Link>
        <Link
          className="group flex flex-col p-6 rounded-xl border border-outline-variant bg-surface-container-low hover:border-primary/50 transition-colors gap-4"
          href="/notes/projects"
        >
          <div className="w-12 h-12 rounded-lg bg-status-evergreen/20 flex items-center justify-center text-status-evergreen group-hover:bg-status-evergreen/30 transition-colors">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <div>
            <h3 className="font-headline-h3 text-headline-h3 text-on-surface mb-2">
              Projects Lab
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Ongoing experiments, open-source contributions, and side-project architecture.
            </p>
          </div>
        </Link>
      </section>

      {pinned ? (
        <section className="flex flex-col gap-4 mt-12">
          <div className="flex items-center gap-2 text-tertiary mb-2">
            <span className="material-symbols-outlined text-sm">keep</span>
            <span className="font-label-caps text-label-caps">Pinned Guide</span>
          </div>
          <Link
            className="rounded-xl border border-outline-variant bg-surface-container-high p-8 relative overflow-hidden group hover:border-primary/30 transition-colors block"
            href={`/notes/guides/${pinned.slug}`}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <span className="material-symbols-outlined text-9xl">architecture</span>
            </div>
            <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
              <h2 className="font-headline-h2 text-headline-h2 text-on-surface group-hover:text-primary transition-colors">
                {pinned.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {pinned.excerpt}
              </p>
              <div className="flex items-center gap-4 mt-4 flex-wrap">
                {pinned.tags.slice(0, 1).map((t) => (
                  <span
                    className="font-label-caps text-label-caps text-outline bg-surface-container-highest px-3 py-1 rounded-full"
                    key={t}
                  >
                    #{t}
                  </span>
                ))}
                <span className="font-body-sm text-body-sm text-outline flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>{" "}
                  {pinned.readTime} min read
                </span>
              </div>
            </div>
          </Link>
        </section>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
        <section className="md:col-span-2 flex flex-col gap-6">
          <h3 className="font-headline-h3 text-headline-h3 text-on-surface border-b border-outline-variant pb-2">
            Recently Updated
          </h3>
          <ul className="flex flex-col gap-4">
            {recent.map((p) => {
              const isGuide = guides.includes(p);
              return (
                <li
                  className="group border border-outline-variant rounded-lg p-4 bg-surface-container-low hover:border-primary/50 hover:bg-surface-container-high transition-all"
                  key={`${p.slug}`}
                >
                  <Link
                    className="flex flex-col gap-2"
                    href={`/notes/${isGuide ? "guides" : "journal"}/${p.slug}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-headline-h3 text-headline-h3 text-primary text-base group-hover:underline">
                        {p.title}
                      </h4>
                      <span className="font-label-caps text-label-caps text-outline whitespace-nowrap">
                        {prettyDate(p.updated || p.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span
                          className={`material-symbols-outlined text-sm ${
                            isGuide ? "text-primary" : "text-tertiary"
                          }`}
                        >
                          {isGuide ? "auto_stories" : "edit_note"}
                        </span>{" "}
                        {isGuide ? "Guide" : "TIL"}
                      </span>
                      <span>&bull;</span>
                      <span>{p.readTime} min read</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-6">
          <h3 className="font-headline-h3 text-headline-h3 text-on-surface border-b border-outline-variant pb-2">
            Common Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(([tag, count]) => (
              <Link
                className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container-high border border-outline-variant px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-colors"
                href={`/notes/journal?tag=${encodeURIComponent(tag)}`}
                key={tag}
              >
                #{tag} <span className="text-outline">({count})</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ContentShell>
  );
}
