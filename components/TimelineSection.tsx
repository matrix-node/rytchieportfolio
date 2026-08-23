import { Briefcase, Calendar, GraduationCap } from 'lucide-react';
import { TIMELINE } from '../data';

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-20 border-b border-[#424754]/10 relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[#adc6ff]" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-outline">
              ORCHESTRATION_TIMELINE // HISTORY
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-on-surface font-sans uppercase">
            Experience &amp; Education
          </h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">
            The chronological runtime. Tracking academic qualifications and active engineering logs across Kenyan tutoring spaces and local solutions.
          </p>
        </div>

        {/* Timelines container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          
          {/* Vertical dividing line between segments on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-[#424754]/20 -translate-x-1/2" />

          {/* Left Column: Technical Experience */}
          <div className="space-y-8 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded border border-secondary/20 bg-secondary/5 flex items-center justify-center text-tertiary">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold font-sans text-on-surface uppercase tracking-wide">
                Engineering Experience
              </h3>
            </div>

            <div className="space-y-6">
              {TIMELINE.filter(item => item.type === 'Experience').map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 border border-white/10 bg-[#1c2026]/50 hover:border-secondary/35 rounded-xl transition-all space-y-3 relative group shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-1.5">
                    <div>
                      <h4 className="font-sans font-bold text-[#e1e0ff] text-sm">
                        {exp.title}
                      </h4>
                      <p className="text-xs font-mono text-outline block mt-0.5">
                        {exp.organization}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-secondary/10 text-tertiary border border-secondary/20 font-mono text-[9px] rounded-sm uppercase tracking-wide shrink-0 h-fit w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {exp.skillsGained.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-white/[0.02] border border-white/[0.05] text-[#c2c6d6] font-mono text-[9px] rounded-sm uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic & Formal Education */}
          <div className="space-y-8 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded border-[#adc6ff]/20 bg-[#adc6ff]/5 flex items-center justify-center text-[#adc6ff]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold font-sans text-on-surface uppercase tracking-wide">
                Education &amp; Credentials
              </h3>
            </div>

            <div className="space-y-6">
              {TIMELINE.filter(item => item.type === 'Education').map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 border border-white/10 bg-[#1c2026]/50 hover:border-[#adc6ff]/35 rounded-xl transition-all space-y-3 relative group shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-1.5">
                    <div>
                      <h4 className="font-sans font-bold text-[#e9feff] text-sm">
                        {edu.title}
                      </h4>
                      <p className="text-xs font-mono text-outline block mt-0.5">
                        {edu.organization}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-[#adc6ff]/10 text-[#adc6ff] border border-[#adc6ff]/20 font-mono text-[9px] rounded-sm uppercase tracking-wide shrink-0 h-fit w-fit">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                    {edu.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {edu.skillsGained.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-white/[0.02] border border-white/[0.05] text-[#c2c6d6] font-mono text-[9px] rounded-sm uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
