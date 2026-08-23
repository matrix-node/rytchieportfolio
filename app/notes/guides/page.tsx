import Link from "next/link";
import { ContentShell } from "@/components/NotesChrome";
import SearchTrigger from "@/components/SearchTrigger";
import { listPosts, prettyDate } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Guides" };

const CATEGORIES = ["All", "Infrastructure", "Security", "Development"];

const CATEGORY_ICONS: Record<string, { icon: string; color: string }> = {
  Infrastructure: { icon: "dns", color: "text-status-growing" },
  Security: { icon: "shield_lock", color: "text-tertiary-container" },
  Development: { icon: "code_blocks", color: "text-status-evergreen" },
};

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && CATEGORIES.includes(category) ? category : "All";
  const all = listPosts("guides");
  const guides = active === "All" ? all : all.filter((g) => g.category === active);

  return (
    <ContentShell>
      <header className="mb-12">
        <h1 className="font-headline-h1 text-headline-h1 text-on-surface mb-4">
          Structured Guides
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Long-form technical documentation and step-by-step tutorials.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center">
        <SearchTrigger className="w-full md:w-64" placeholder="Search guides..." />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) =>
            c === active ? (
              <span
                className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-caps text-label-caps border border-primary"
                key={c}
              >
                {c}
              </span>
            ) : (
              <Link
                className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-caps text-label-caps border border-outline-variant hover:bg-surface-container-high transition-colors"
                href={c === "All" ? "/guides" : `/guides?category=${encodeURIComponent(c)}`}
                key={c}
              >
                {c}
              </Link>
            )
          )}
        </div>
      </div>

      {guides.length === 0 ? (
        <div className="p-8 border border-outline-variant rounded-lg bg-surface-container-low text-center">
          <span className="font-body-md text-body-md text-outline">
            No published guides in this category yet.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((g, i) => {
            const conf = CATEGORY_ICONS[g.category ?? ""] ?? {
              icon: "auto_stories",
              color: "text-primary",
            };
            return (
              <Link
                className={`group relative bg-surface border border-outline-variant rounded-lg p-6 hover:border-outline transition-colors duration-300 flex flex-col h-full ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
                href={`/guides/${g.slug}`}
                key={g.slug}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`material-symbols-outlined ${conf.color} text-[28px]`}>
                    {conf.icon}
                  </span>
                  <span className="px-2 py-1 rounded bg-surface-container-high font-label-caps text-label-caps text-on-surface-variant">
                    {g.category ?? "Guide"}
                  </span>
                </div>
                <h3 className="font-headline-h3 text-headline-h3 text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {g.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 flex-grow">
                  {g.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-variant">
                  <span className="font-code-block text-code-block text-outline text-xs">
                    Updated: {prettyDate(g.updated || g.date)} &bull; {g.readTime} min read
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-sm">
                    arrow_forward
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </ContentShell>
  );
}
