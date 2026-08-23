export default function Footer() {
  return (
    <footer className="py-8 bg-[#07070a]/90 border-t border-[#424754]/20 select-none text-left font-mono">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-outline">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-primary-fixed font-bold tracking-widest uppercase">// DESIGNED_IN_OBSIDIAN_PROTOCOL</p>
          <p className="text-[10px] text-on-surface-variant leading-relaxed">
            &copy; {new Date().getFullYear()} Rytchie Macharia. All rights reserved. Registered location: Kenya.
          </p>
          <p className="text-[11px] text-[#e7eef1] leading-relaxed">Developed with ❤️ by Matrix</p>
        </div>
        <div className="flex items-center gap-6 text-[10px] tracking-widest">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
            BUILD: GREEN
          </span>
          <span>UPLINK_SECURE_NBO</span>
        </div>
      </div>
    </footer>
  );
}
