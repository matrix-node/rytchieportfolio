import type { TimelineItem as TimelineItemType } from '@/types';

interface TimelineItemProps {
  item: TimelineItemType;
  accentClass: string;
}

export default function TimelineItem({ item, accentClass }: TimelineItemProps) {
  return (
    <div className={`p-5 border border-white/10 bg-[#1c2026]/50 rounded-xl transition-all space-y-3 relative group shadow-lg ${accentClass}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-1.5">
        <div>
          <h4 className="font-sans font-bold text-[#e9feff] text-sm">{item.title}</h4>
          <p className="text-xs font-mono text-outline block mt-0.5">{item.organization}</p>
        </div>
        <span className="px-2 py-0.5 bg-[#adc6ff]/10 text-[#adc6ff] border border-[#adc6ff]/20 font-mono text-[9px] rounded-sm uppercase tracking-wide shrink-0 h-fit w-fit">
          {item.period}
        </span>
      </div>
      <p className="text-xs text-on-surface-variant font-sans leading-relaxed">{item.description}</p>
    </div>
  );
}
