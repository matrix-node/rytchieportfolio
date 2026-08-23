"use client";

import Image from 'next/image';
import { motion } from 'motion/react';
import { User, ShieldCheck, Cpu, Terminal, Sparkles, BookOpen } from 'lucide-react';

interface AboutSectionProps {
}

export default function AboutSection({}: AboutSectionProps) {
  const cards = [
    {
      title: 'Frontend Development',
      desc: 'Obsessed with FPS metrics, responsive fluidity, layout shifts, typography, and crafting interfaces that load before the system sighs.',
      icon: Sparkles,
      color: 'text-[#adc6ff]'
    },
    {
      title: 'Full Stack & APIS',
      desc: 'Formulating databases, robust proxy nodes on Express, Next routing, and server middleware flows keeping key assets safe and quiet.',
      icon: Cpu,
      color: 'text-tertiary'
    },
    {
      title: 'Linux & Core Systems',
      desc: 'Desktop ricing as modular engineering. Managing terminal environments, configuration stowage, and automating chores via customized bash commands.',
      icon: Terminal,
      color: 'text-[#ffb786]'
    },
    {
      title: 'Cybersecurity & Networking',
      desc: 'Tracing packets on WireShark, designing tight subnets, implementing strict firewall boundaries, and treating all data streams as potentially hazardous.',
      icon: ShieldCheck,
      color: 'text-red-400'
    },
    {
      title: 'Teaching & Digital Literacy',
      desc: 'Demystifying technology. Translating dry engineering protocols into friendly analogies that accelerate retention for beginners.',
      icon: BookOpen,
      color: 'text-[#dae80f]'
    }
  ];

  return (
    <section id="about" className="py-20 border-b border-[#424754]/10 relative">
      {/* Decorative Blur Ambient circles */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#adc6ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-14 text-left">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-primary-fixed" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#849495]">
              System_Decryption_Log_02 // Who I Am
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-on-surface font-sans leading-tight">
            Who behind the code?
          </h2>
          <p className="text-on-surface-variant max-w-xl text-sm leading-relaxed mt-2 font-sans">
            I care about clean UI, fast websites, practical systems, and explaining technology in a way humans can actually understand.
          </p>
        </div>

        {/* About Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left panel: Photo with technical decorations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group max-w-md mx-auto lg:mx-0">
              {/* Tactical brackets frame */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#adc6ff]/60" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#adc6ff]/60" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#adc6ff]/60" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#adc6ff]/60" />

              {/* Holographic scanner effect line */}
              <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#adc6ff]/40 to-transparent shadow-[0_0_10px_rgba(173,198,255,0.8)] z-10 pointer-events-none animate-bounce duration-[5000ms]" />

              <div className="overflow-hidden rounded-md border border-[#424754]/30 bg-[#262a31] relative shadow-2xl">
                <div className="relative w-full h-[380px]">
                  <Image
                    src="/images/rytchie_work.jpg"
                    alt="Rytchie Macharia thinking visual mode"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-all duration-700 saturate-110 contrast-100 opacity-95 group-hover:saturate-115 group-hover:opacity-100"
                    priority={false}
                    quality={80}
                  />
                </div>
                
                {/* Floating digital status tags */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0a0e14]/90 border border-[#adc6ff]/30 p-2 text-[10px] font-mono rounded backdrop-blur-md">
                  <div className="flex justify-between items-center text-[#adc6ff] uppercase">
                    <span>// SYSTEM_USER: RM_754</span>
                    <span className="animate-pulse">Active_State</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core personal quote */}
            <div className="bg-[#181c22] border border-[#424754]/30 p-6 rounded-lg text-left max-w-md mx-auto lg:mx-0 relative overflow-hidden">
              <div className="absolute right-0 top-0 text-[70px] leading-none font-mono text-outline/5 select-none pointer-events-none">
                &rdquo;
              </div>
              <p className="font-mono text-sm text-[#e9feff] italic">
                &ldquo;Linux didn’t break me. It trained me.&rdquo;
              </p>
              <span className="text-[10px] font-mono text-outline block mt-2 tracking-wider">
                — RYTCHIE MACHARIA // THE LINUX EXPERIENCE
              </span>
            </div>
          </div>

          {/* Right panel: Core Capabilities in Bento style */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <h3 className="text-xl font-bold font-sans text-[#e9feff] mb-1">
                A modern generalist for technical execution
              </h3>
              <p className="text-xs font-mono text-on-surface-variant tracking-wider uppercase mb-5">
                // COMPILING_CORE_MODULES // STABLE
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 border border-white/10 bg-[#1c2026]/50 hover:border-[#adc6ff]/35 rounded-xl transition-all select-none gap-4 flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-5 h-5 ${card.color}`} />
                        <h4 className="font-sans font-semibold text-on-surface text-sm">
                          {card.title}
                        </h4>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                        {card.desc}
                      </p>
                    </div>
                    <div className="text-[9px] font-mono text-outline select-none flex justify-between uppercase pt-3 border-t border-white/5">
                      <span>Module_{(idx + 1).toString().padStart(2, '0')}</span>
                      <span className="text-[#10B981]">OK</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
