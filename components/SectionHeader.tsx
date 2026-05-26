import type { ReactNode } from 'react';

interface SectionHeaderProps {
  icon?: ReactNode;
  label: string;
  title: string;
  description: string;
}

export default function SectionHeader({ icon, label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 text-left">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-mono text-[10px] tracking-widest uppercase text-outline">{label}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold text-primary font-sans uppercase">{title}</h2>
      <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">{description}</p>
    </div>
  );
}
