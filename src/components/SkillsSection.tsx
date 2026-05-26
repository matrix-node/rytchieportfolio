import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code,
  FileCode,
  Palette,
  Play,
  ShieldAlert,
  Globe,
  GitBranch,
  Terminal,
  Cpu,
  Activity,
  Network,
  Lock,
  FileSpreadsheet,
  AppWindow,
  Layout,
  Layers
} from 'lucide-react';
import { Skill } from '../types';
import { SKILLS } from '../data';

const iconMap: Record<string, any> = {
  FileCode,
  Palette,
  Play,
  ShieldAlert,
  Globe,
  Code,
  GitBranch,
  Terminal,
  Cpu,
  Activity,
  Network,
  Lock,
  FileSpreadsheet,
  AppWindow,
  Layout
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Frontend', 'Backend', 'Linux & SysAdmin', 'Cybersecurity', 'Teaching & Tools', 'Creative'];

  const filteredSkills = activeCategory === 'ALL'
    ? SKILLS
    : SKILLS.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase().substring(0, 5)));

  // Custom comfort colors mapping
  const getComfortStyle = (level: Skill['comfortLevel']) => {
    switch (level) {
      case 'Teaching-ready':
        return 'text-[#10B981] border-[#10B981]/25 bg-[#10B981]/5';
      case 'Building with it':
        return 'text-[#63f7ff] border-[#00f5ff]/25 bg-[#00f5ff]/5';
      case 'Comfortable':
        return 'text-secondary border-secondary/25 bg-secondary/5';
      case 'Learning actively':
        return 'text-amber-400 border-amber-400/25 bg-amber-400/5';
      case 'Debugging relationship: complicated':
        return 'text-rose-400 border-rose-400/25 bg-rose-400/5';
      default:
        return 'text-outline border-outline/20';
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="skills" className="py-20 border-b border-[#3a494a]/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-[#63f7ff]" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-outline">
                SYSTEM_UTILITY_COMPILER // SKILLS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary font-sans uppercase">
              Tech Stack Matrix
            </h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">
              Granular technical tooling. Hover on individual nodes to query details. Real performance and comfort diagnostics provided.
            </p>
          </div>

          {/* Filtering buttons pills */}
          <div className="flex flex-wrap gap-2 justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all rounded-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-container ${
                  activeCategory === cat
                    ? 'border border-[#00f5ff] bg-[#00f5ff]/10 text-[#00f5ff]'
                    : 'border border-[#3a494a]/25 text-on-surface-variant hover:border-[#00f5ff]/50 hover:text-primary-fixed'
                }`}
              >
                [ {cat} ]
              </button>
            ))}
          </div>
        </div>

        {/* BENTO SKILLS GRID WITH SPOTLIGHT EFFECTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            // Get proper icon
            let IconComp = iconMap[skill.iconName] || Code;
            if (skill.name === 'React') {
              // Custom React SVG or represent with Layers
              IconComp = Layers;
            }

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
                onMouseMove={(e) => handleCardMouseMove(e, skill.name)}
                className="group relative p-5 border border-white/10 bg-[#15151e]/50 hover:border-[#00f5ff]/35 rounded-xl overflow-hidden transition-all text-left flex flex-col justify-between h-[180px] shadow-lg"
                style={{
                  background: 'radial-gradient(120px circle at var(--mouse-x, -100px) var(--mouse-y, -100px), rgba(0, 245, 255, 0.08), transparent 85%)'
                }}
              >
                <div>
                  {/* Skill header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded border border-white/[0.04] bg-[#0e0e12] flex items-center justify-center text-primary-fixed group-hover:border-[#00f5ff]/40 transition-colors">
                        <IconComp className="w-4 h-4 text-[#63f7ff]" />
                      </div>
                      <span className="font-sans font-semibold text-primary text-sm tracking-tight">
                        {skill.name}
                      </span>
                    </div>

                    <span className="font-mono text-[8px] uppercase tracking-wider text-outline px-1.5 py-0.5 bg-white/[0.03] border border-white/5 rounded-sm">
                      {skill.category}
                    </span>
                  </div>

                  {/* Skill text description */}
                  <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Comfort Level indicator pill */}
                <span className={`inline-block w-full text-center font-mono text-[9px] uppercase tracking-wider py-1 border rounded-sm font-semibold transition-colors mt-4 shrink-0 ${getComfortStyle(skill.comfortLevel)}`}>
                  {skill.comfortLevel}
                </span>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
