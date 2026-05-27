"use client";

import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react';
import { USER_PROFILE } from '@/data';
import Hero3DScene from '@/components/Hero3DScene';
import StatusDashboard from '@/components/StatusDashboard';

interface HeroProps {
  onCtaClick: (hash: string) => void;
  theme: 'dark' | 'light';
}

export default function Hero({ onCtaClick, theme }: HeroProps) {
  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center relative border-b border-[#3a494a]/10">
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 overflow-hidden pointer-events-none z-0">
        <Hero3DScene />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 p-1 pr-3 bg-glass-bg border border-primary-container/25 rounded-full select-none max-w-full">
              <span className="h-5 px-2 bg-[#00f5ff]/15 border border-[#00f5ff]/25 font-mono text-[9px] text-[#63f7ff] font-bold rounded-full flex items-center shrink-0 uppercase">
                ✓ Available
              </span>
              <span className="font-mono text-[9.5px] text-on-surface-variant truncate tracking-wide">
                Frontend, Web systems, Tutoring &amp; Support
              </span>
            </div>

            <div className="space-y-3.5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary font-sans leading-[1.1] tracking-tight">
                {USER_PROFILE.name}
              </h1>
              <p className="font-mono text-xs font-semibold tracking-widest text-secondary uppercase">// {USER_PROFILE.title}</p>
              <h2 className="text-lg md:text-xl font-medium text-primary font-sans leading-relaxed text-slate-200/90 max-w-2xl">
                &ldquo;{USER_PROFILE.tagline}&rdquo;
              </h2>
              <p className="text-sm text-on-surface-variant max-w-xl font-sans leading-relaxed">{USER_PROFILE.subHeadline}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onCtaClick('#projects')}
                className="px-5 py-3 bg-[#00f5ff] text-[#003739] font-mono text-xs font-bold uppercase tracking-wider rounded-sm shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:scale-[1.01] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onCtaClick('#contact')}
                className="px-5 py-3 border border-[#3a494a]/20 bg-[#12121A]/80 hover:border-[#00f5ff]/40 text-primary-fixed font-mono text-xs uppercase tracking-wider rounded-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary-container active:scale-95 cursor-pointer"
              >
                Contact Me
              </button>
              <a
                href="/files/resume.pdf"
                download
                className="inline-flex items-center gap-1.5 px-4 py-3 border border-dashed border-outline/35 text-on-surface-variant hover:text-primary-fixed hover:border-[#00f5ff]/50 font-mono text-xs uppercase text-center rounded-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download CV
              </a>
            </div>

            <div className="pt-6 max-w-xl">
              <div className="mb-3 text-left">
                <span className="font-mono text-[9px] tracking-widest uppercase text-outline">
                  System_Telemetry_Unit // Diagnostic Dashboard
                </span>
              </div>
              <StatusDashboard />
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-sm w-full">
              <div className="absolute -top-3 -left-3 w-7 h-7 border-t-2 border-l-2 border-[#00f5ff]/40" />
              <div className="absolute -top-3 -right-3 w-7 h-7 border-t-2 border-r-2 border-[#00f5ff]/40" />
              <div className="absolute -bottom-3 -left-3 w-7 h-7 border-b-2 border-l-2 border-[#00f5ff]/40" />
              <div className="absolute -bottom-3 -right-3 w-7 h-7 border-b-2 border-r-2 border-[#00f5ff]/40" />

              <div className="absolute left-0 top-0 w-full h-0.5 bg-[#00f5ff] shadow-[0_0_12px_#00f5ff] z-10 pointer-events-none animate-bounce duration-[10000ms]" />

              <div className="glass-panel border-2 border-white/[0.03] overflow-hidden rounded relative p-2 bg-[#0e0e12]">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={USER_PROFILE.avatarUrl}
                    alt="Rytchie Macharia Headshot"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className={`object-cover rounded-sm transition-all duration-700 pointer-events-none ${
                      theme === 'dark'
                        ? 'saturate-105 contrast-100 brightness-100 group-hover:saturate-110'
                        : 'saturate-110 contrast-100 brightness-100'
                    }`}
                    priority
                    quality={82}
                  />
                </div>

                <div className="absolute left-4 top-4 bg-slate-950/90 border border-[#3a494a]/30 px-2 py-1 space-y-0.5 rounded backdrop-blur-sm pointer-events-none">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="font-mono text-[8px] text-outline uppercase tracking-wider">SEC_REF: RM_879</span>
                  </div>
                </div>

                <div className="absolute inset-x-4 bottom-4 bg-[#0e0e12]/95 border border-[#3a494a]/40 p-3 rounded backdrop-blur-md text-left select-none pointer-events-none">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-secondary mb-1">// ACTIVE_BRAND_MOTTO</p>
                  <p className="font-sans text-xs text-slate-200 leading-snug font-medium italic">&ldquo;{USER_PROFILE.vibe}&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
