"use client";

import { useState, useEffect } from 'react';
import { Terminal, Activity, Wifi, Disc, Shield, Settings } from 'lucide-react';

export default function StatusDashboard() {
  const [logs, setLogs] = useState<string[]>([
    'systemd[1]: Starting Rytchie Web Portfolio Services...',
    'coffee.service: active (hot) - 64% capacity',
    'security: scanning local user rules... safe',
    'sudo fix-layout --before-deadline... executed',
    'git push origin confidence... fully deployed'
  ]);

  const fallbackLogs = [
    'DNS propagation: emotionally testing on port 53...',
    'kernel: loaded Wayland display environment...',
    'bugs detected: manageable (4 hidden targets found)',
    'bash: alias system-refresh="find . -name *.css"',
    'gcc: compiled index.ts successfully in 12ms',
    'pacman: system ricing modules up to date.'
  ];

  // Rotate log feeds humorously
  useEffect(() => {
    const logInterval = setInterval(() => {
      const randomLog = fallbackLogs[Math.floor(Math.random() * fallbackLogs.length)];
      setLogs(prev => [...prev.slice(1), randomLog]);
    }, 4500);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="w-full text-left font-mono space-y-4">
      {/* Outer Dashboard Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Metric 1: Build Health */}
        <div className="p-4 bg-[#1c2026]/50 border border-white/10 rounded-xl hover:border-[#adc6ff]/30 transition-all text-xs">
          <p className="text-[9px] uppercase text-outline mb-1.5">// Build Health</p>
          <p className="text-xl font-mono text-[#adc6ff] font-bold tracking-tight">99.8%</p>
        </div>

        {/* Metric 2: Experience */}
        <div className="p-4 bg-[#1c2026]/50 border border-white/10 rounded-xl hover:border-[#adc6ff]/30 transition-all text-xs">
          <p className="text-[9px] uppercase text-outline mb-1.5">// Experience</p>
          <p className="text-xl font-mono text-[#ffb786] font-bold tracking-tight">4+ YRS</p>
        </div>

        {/* Metric 3: Latency */}
        <div className="p-4 bg-[#1c2026]/50 border border-white/10 rounded-xl hover:border-[#adc6ff]/30 transition-all text-xs">
          <p className="text-[9px] uppercase text-outline mb-1.5">// Latency</p>
          <p className="text-xl font-mono text-[#ffb786] font-bold tracking-tight">14ms</p>
        </div>

        {/* Metric 4: Uptime */}
        <div className="p-4 bg-[#1c2026]/50 border border-white/10 rounded-xl hover:border-[#adc6ff]/30 transition-all text-xs">
          <p className="text-[9px] uppercase text-outline mb-1.5">// Uptime</p>
          <p className="text-xl font-mono text-[#10B981] font-bold tracking-tight">365D</p>
        </div>

      </div>

      {/* Terminal Log Output Feed */}
      <div className="p-4 bg-black/60 border border-[#adc6ff]/20 rounded-xl flex flex-col justify-between min-h-[145px] relative overflow-hidden backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        {/* Absolute design aesthetic decoration matching mockup signature */}
        <div className="absolute top-0 right-4 flex gap-1">
          <div className="w-8 h-[1px] bg-[#adc6ff]/30"></div>
          <div className="w-4 h-[1px] bg-[#adc6ff]/30 ml-2"></div>
        </div>

        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3 select-none">
          <div className="flex items-center gap-2 text-[9px] text-[#849495] uppercase font-bold tracking-widest">
            <Terminal className="w-3.5 h-3.5 text-[#adc6ff]" />
            zsh — PORT_3000 // CORE_DAEMON_FEED
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]/80" />
          </div>
        </div>

        {/* Actual Log items scrolling */}
        <div className="space-y-1.5 flex-1 font-mono text-[10px] text-[#849495] overflow-y-auto">
          {logs.map((log, idx) => {
            const matchesService = log.includes('coffee.service') || log.includes('systemd') || log.includes('pass') || log.includes('PASS');
            const isStatusColor = matchesService ? 'text-[#10B981]' : log.includes('sudo') ? 'text-[#adc6ff]' : 'text-[#849495]';
            return (
              <div key={idx} className="flex gap-2">
                <span className="text-[#adc6ff]/40 select-none">$</span>
                <span className={isStatusColor}>{log}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-1">
            <span className="text-[#adc6ff]/40 select-none">$</span>
            <span className="w-1.5 h-3 bg-[#adc6ff] terminal-cursor inline-block" />
          </div>
        </div>
      </div>
    </div>
  );
}
