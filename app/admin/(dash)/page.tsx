import Link from "next/link";
import DashboardList from "@/components/admin/DashboardList";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import { listPosts, getProjects, slugify } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin Dashboard" };

export default function AdminDashboard() {
  const guides = listPosts("guides", true);
  const journal = listPosts("journal", true);
  const projects = getProjects();
  const drafts = [...guides, ...journal].filter((p) => p.draft).length;

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline-h1 text-headline-h1 text-on-surface mb-2">
            Writer&apos;s Room
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {guides.length} guides &bull; {journal.length} journal entries &bull; {drafts} draft
            {drafts === 1 ? "" : "s"} &bull; {projects.length} projects
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-lg font-label-caps text-label-caps uppercase hover:opacity-90 transition-opacity"
            href="/admin/edit?type=guides"
          >
            <span className="material-symbols-outlined text-[18px]">add</span> New Guide
          </Link>
          <Link
            className="flex items-center gap-2 px-4 py-2 bg-tertiary-container/20 text-tertiary border border-tertiary/40 rounded-lg font-label-caps text-label-caps uppercase hover:bg-tertiary-container/30 transition-colors"
            href="/admin/edit?type=journal"
          >
            <span className="material-symbols-outlined text-[18px]">add</span> New Journal Entry
          </Link>
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">auto_stories</span>
          <h2 className="font-headline-h3 text-headline-h3 text-on-surface">Guides</h2>
        </div>
        <DashboardList posts={guides} type="guides" />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">edit_note</span>
          <h2 className="font-headline-h3 text-headline-h3 text-on-surface">Journal</h2>
        </div>
        <DashboardList posts={journal} type="journal" />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-status-evergreen">inventory_2</span>
          <h2 className="font-headline-h3 text-headline-h3 text-on-surface">
            Projects <span className="font-body-sm text-body-sm text-outline">(JSON)</span>
          </h2>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant -mt-2">
          Each project: title, slug, status (active | completed | on-hold), description, tech[],
          repo, demo.
        </p>
        <ProjectsEditor initial={JSON.stringify(projects, null, 2)} />
      </section>
    </div>
  );
}
