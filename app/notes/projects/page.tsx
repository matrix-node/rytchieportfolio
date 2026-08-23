import Link from "next/link";
import { getProjects, PROJECT_STATUS_LABEL } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Projects Lab" };

const STATUS_CONF: Record<string, { icon: string; cls: string; gradient: string }> = {
  active: {
    icon: "psychiatry",
    cls: "text-status-growing",
    gradient: "from-primary/5 to-transparent",
  },
  completed: {
    icon: "check_circle",
    cls: "text-status-seedling",
    gradient: "from-status-seedling/5 to-transparent",
  },
  "on-hold": { icon: "pause_circle", cls: "text-outline", gradient: "from-outline/5 to-transparent" },
};

const FILTERS = ["all", "active", "completed", "on-hold"] as const;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeFilter = FILTERS.includes((status ?? "all") as (typeof FILTERS)[number])
    ? (status ?? "all")
    : "all";
  const projects = getProjects();
  const visible =
    activeFilter === "all" ? projects : projects.filter((p) => p.status === activeFilter);

  return (
    <main className="flex-grow pt-24 px-gutter max-w-container-max mx-auto w-full pb-16">
      <div className="max-w-content-width mx-auto">
        <div className="mb-12">
          <h1 className="font-headline-h1 text-headline-h1 mb-4">Projects Lab</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Active and experimental builds with technical context.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {FILTERS.map((f) =>
            f === activeFilter ? (
              <span
                className="px-4 py-2 bg-surface-container-high rounded-full border border-primary text-primary font-label-caps text-label-caps"
                key={f}
              >
                {f === "all" ? "All" : PROJECT_STATUS_LABEL[f]}
              </span>
            ) : (
              <Link
                className="px-4 py-2 bg-surface-container rounded-full border border-outline-variant text-on-surface-variant font-label-caps text-label-caps hover:bg-surface-container-high transition-colors"
                href={f === "all" ? "/notes/projects" : `/notes/projects?status=${f}`}
                key={f}
              >
                {f === "all" ? "All" : PROJECT_STATUS_LABEL[f]}
              </Link>
            )
          )}
        </div>

        {visible.length === 0 ? (
          <div className="p-8 border border-outline-variant rounded-lg bg-surface-container-low text-center">
            <span className="font-body-md text-body-md text-outline">
              No projects with this status yet.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((p, i) => {
              const conf = STATUS_CONF[p.status] ?? STATUS_CONF.active;
              return (
                <div
                  className={`bg-surface-container-low border border-outline-variant hover:border-outline transition-colors p-6 flex flex-col gap-4 rounded-xl group relative overflow-hidden ${
                    i === 0 ? "md:col-span-2" : ""
                  }`}
                  key={p.slug}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${conf.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <div className="flex justify-between items-start z-10 gap-4">
                    <h3 className="font-headline-h3 text-headline-h3">{p.title}</h3>
                    <span
                      className={`px-2 py-1 bg-surface-container-high border border-outline-variant rounded ${conf.cls} font-label-caps text-label-caps flex items-center gap-1 whitespace-nowrap`}
                    >
                      <span className="material-symbols-outlined text-[14px]">{conf.icon}</span>{" "}
                      {PROJECT_STATUS_LABEL[p.status]}
                    </span>
                  </div>
                  <p
                    className={`font-body-sm text-body-sm text-on-surface-variant flex-grow z-10 ${
                      i === 0 ? "max-w-2xl" : ""
                    }`}
                  >
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 z-10">
                    {p.tech.map((t) => (
                      <span
                        className="font-code-block text-code-block text-xs bg-surface-container px-2 py-1 rounded text-secondary"
                        key={t}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {(p.repo || p.demo) && (
                    <div className="flex gap-4 mt-2 border-t border-outline-variant pt-4 z-10">
                      {p.repo ? (
                        <a
                          className="font-label-caps text-label-caps text-primary hover:text-primary-container transition-colors flex items-center gap-1"
                          href={p.repo}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <span className="material-symbols-outlined text-[16px]">code</span> Repo
                        </a>
                      ) : null}
                      {p.demo ? (
                        <a
                          className="font-label-caps text-label-caps text-primary hover:text-primary-container transition-colors flex items-center gap-1"
                          href={p.demo}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <span className="material-symbols-outlined text-[16px]">open_in_new</span>{" "}
                          Live Demo
                        </a>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
