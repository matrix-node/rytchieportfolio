import { SectionHeading } from "@/components/section-heading";
import { educationEntries, experienceEntries } from "@/lib/site-content";
import type { TimelineEntry } from "@/types/site";

function TimelineColumn({ title, entries }: { title: string; entries: TimelineEntry[] }) {
  return (
    <div>
      <h3 className="mb-6 text-3xl font-semibold text-text">{title}</h3>

      <div className="space-y-5 border-l-2 border-accent/90 pl-6">
        {entries.map((entry) => (
          <article key={`${title}-${entry.year}-${entry.title}`} className="timeline-card">
            <span className="timeline-dot" aria-hidden="true" />
            <div className="text-sm font-medium tracking-wide text-accent">
              <i className="bx bxs-calendar mr-2 align-middle text-lg" aria-hidden="true" />
              {entry.year}
            </div>
            <h4 className="mt-2 text-2xl font-semibold text-text">{entry.title}</h4>
            <p className="mt-3 text-base leading-8 text-muted">{entry.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function TimelineSection() {
  return (
    <section id="education" className="section-shell">
      <SectionHeading prefix="My" emphasis="Journey" />

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <TimelineColumn title="Education" entries={educationEntries} />
        <TimelineColumn title="Experience" entries={experienceEntries} />
      </div>
    </section>
  );
}