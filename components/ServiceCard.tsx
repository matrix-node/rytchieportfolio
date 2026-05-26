import type { ReactNode } from 'react';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  icon: ReactNode;
  onCtaClick: () => void;
}

export default function ServiceCard({ service, icon, onCtaClick }: ServiceCardProps) {
  return (
    <div className="p-6 border border-white/10 bg-[#15151e]/50 hover:border-[#00f5ff]/35 rounded-xl flex flex-col justify-between group transition-all h-full shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border border-white/[0.04] bg-[#0e0e12] flex items-center justify-center text-[#00f5ff] group-hover:border-[#00f5ff]/40 transition-colors">
            {icon}
          </div>
          <h3 className="font-sans font-bold text-[#e9feff] text-sm tracking-tight leading-snug">{service.title}</h3>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">{service.description}</p>
      </div>
      <button
        onClick={onCtaClick}
        className="w-full mt-6 py-2.5 border border-[#3a494a]/20 bg-black/35 hover:bg-[#00f5ff]/10 hover:border-[#00f5ff]/30 text-primary-fixed hover:text-primary font-mono text-[9px] uppercase font-bold text-center tracking-widest rounded transition-all"
      >
        {service.ctaText}
      </button>
    </div>
  );
}
