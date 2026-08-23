import type { ReactNode } from 'react';
import type { Skill } from '@/types';

interface SkillCardProps {
  skill: Skill;
  icon: ReactNode;
  comfortStyle: string;
}

export default function SkillCard({ skill, icon, comfortStyle }: SkillCardProps) {
  return (
    <div className="group relative p-5 border border-white/10 bg-[#1c2026]/50 hover:border-[#adc6ff]/35 rounded-xl overflow-hidden transition-all text-left flex flex-col justify-between h-[180px] shadow-lg">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border border-white/[0.04] bg-[#181c22] flex items-center justify-center text-primary-fixed">{icon}</div>
            <span className="font-sans font-semibold text-on-surface text-sm tracking-tight">{skill.name}</span>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-wider text-outline px-1.5 py-0.5 bg-white/[0.03] border border-white/5 rounded-sm">
            {skill.category}
          </span>
        </div>
        <p className="text-xs text-on-surface-variant font-sans leading-relaxed">{skill.description}</p>
      </div>
      <span className={`inline-block w-full text-center font-mono text-[9px] uppercase tracking-wider py-1 border rounded-sm font-semibold transition-colors mt-4 shrink-0 ${comfortStyle}`}>
        {skill.comfortLevel}
      </span>
    </div>
  );
}
