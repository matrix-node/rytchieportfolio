import { SectionHeading } from "@/components/section-heading";
import { codingSkills, professionalSkills } from "@/lib/site-content";
import type { SkillEntry } from "@/types/site";

function SkillColumn({ title, skills }: { title: string; skills: SkillEntry[] }) {
  return (
    <div>
      <h3 className="mb-6 text-3xl font-semibold text-text">{title}</h3>

      <div className="skills-panel">
        <div className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-3">
              <div className="flex items-center justify-between gap-4 text-lg font-medium text-text">
                <span>{skill.name}</span>
                <span className="text-accent">{skill.percentage}%</span>
              </div>

              <div
                className="h-9 rounded-lg border border-accent/80 p-1"
                aria-label={`${skill.name} proficiency ${skill.percentage}%`}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={skill.percentage}
              >
                <div className="h-full rounded-md bg-accent" style={{ width: `${skill.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell section-surface-alt">
      <SectionHeading prefix="My" emphasis="Skills" />

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <SkillColumn title="Coding Skills" skills={codingSkills} />
        <SkillColumn title="Professional Skills" skills={professionalSkills} />
      </div>
    </section>
  );
}