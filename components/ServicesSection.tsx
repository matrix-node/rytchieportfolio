"use client";

import { motion } from 'motion/react';
import { Globe, Palette, Cpu, Terminal, School, ShieldCheck, ChevronRight } from 'lucide-react';
import { Service } from '../types';
import { SERVICES } from '../data';

const iconMap: Record<string, any> = {
  Globe,
  Palette,
  Cpu,
  Terminal,
  School,
  ShieldAlert: ShieldCheck
};

export default function ServicesSection() {
  const handleCtaClick = () => {
    const contactForm = document.getElementById('contact');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-20 border-b border-[#424754]/10 relative text-left">
      <div className="max-w-7xl mx-auto px-6">
                {/* Section title */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-[#adc6ff]" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-outline">
              SERVICE_PROVISION_CHANNELS // OFFERINGS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-on-surface font-sans uppercase">
            Services &amp; Deliverables
          </h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">
            Targeted custom solutions. Translating ideas into robust codebases, optimized system configurations, and practical digital literacy curriculums.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((serv) => {
            const IconComp = iconMap[serv.iconName] || Cpu;

            return (
              <div
                key={serv.id}
                className="p-6 border border-white/10 bg-[#1c2026]/50 hover:border-[#adc6ff]/35 rounded-xl flex flex-col justify-between group transition-all h-full shadow-lg"
              >
                <div className="space-y-4">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg border border-white/[0.04] bg-[#181c22] flex items-center justify-center text-[#adc6ff] group-hover:border-[#adc6ff]/40 transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-sans font-bold text-[#e9feff] text-sm tracking-tight leading-snug">
                      {serv.title}
                    </h3>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {serv.description}
                  </p>

                  {/* Bulleted deliverables */}
                  <div className="space-y-1.5 pt-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-outline block mb-1">
                      [ DELIVERABLES ]
                    </span>
                    {serv.deliverables.map((del) => (
                      <div key={del} className="flex items-start gap-2 text-xs text-[#c2c6d6] font-sans">
                        <span className="text-[#adc6ff] font-mono select-none mt-0.5">&gt;</span>
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tactile Button */}
                <button
                  onClick={handleCtaClick}
                  className="w-full mt-6 py-2.5 border border-[#424754]/20 bg-black/35 hover:bg-[#adc6ff]/10 hover:border-[#adc6ff]/30 text-primary-fixed hover:text-on-surface font-mono text-[9px] uppercase font-bold text-center tracking-widest rounded transition-all flex items-center justify-center gap-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-container"
                >
                  {serv.ctaText} <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
