import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Terminal, Eye, Layers } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';

interface ProjectsGridProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectsGrid({ onSelectProject }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Accessibility Tech', 'System Administration', 'Education Platform', 'System Engineering', 'Creative Development', 'Cybersecurity', 'Teaching Tools'];

  const filteredProjects = activeCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(proj => proj.category === activeCategory);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const getStatusBadgeStyle = (status: Project['status']) => {
    switch (status) {
      case 'Live':
        return 'border-[#10B981]/25 text-[#10B981] bg-[#10B981]/5';
      case 'In Progress':
        return 'border-[#00f5ff]/25 text-[#63f7ff] bg-[#00f5ff]/5';
      case 'Concept':
        return 'border-amber-400/25 text-amber-300 bg-amber-400/5';
      case 'Case Study':
        return 'border-secondary/20 text-secondary bg-secondary/5';
      default:
        return 'border-outline/20 text-outline bg-white/[0.02]';
    }
  };

  return (
    <section id="projects" className="py-20 border-b border-[#3a494a]/10 relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title sections */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-[#00f5ff]" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-outline">
                SYSTEM_BENTO_COMPILER // RUNTIME
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary font-sans uppercase">
              Bento Project Grid
            </h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">
              Engineered proofs-of-concept. Click any cell to decompile full structural schemas, lessons learned, and active terminal snippets.
            </p>
          </div>

          {/* Filtering buttons pills */}
          <div className="flex flex-wrap gap-1.5 justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider transition-all rounded-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-container ${
                  activeCategory === cat
                    ? 'border border-[#00f5ff] bg-[#00f5ff]/10 text-[#00f5ff]'
                    : 'border border-[#3a494a]/25 text-on-surface-variant hover:border-[#00f5ff]/40 hover:text-primary-fixed'
                }`}
              >
                [ {cat} ]
              </button>
            ))}
          </div>
        </div>

        {/* Apple style bento list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.45) }}
              onMouseMove={handleMouseMove}
              onClick={() => onSelectProject(p)}
              className="group relative h-[380px] border border-white/10 bg-[#15151e]/50 hover:border-[#00f5ff]/35 rounded-xl overflow-hidden flex flex-col justify-end p-5 select-none transition-all cursor-pointer shadow-lg"
              style={{
                background: 'radial-gradient(140px circle at var(--mouse-x, -100px) var(--mouse-y, -100px), rgba(0, 245, 255, 0.09), transparent 85%)'
              }}
            >
              {/* Cover Screenshot Image or CSS Overlay placeholder */}
              <div className="absolute inset-x-0 top-0 h-[190px] overflow-hidden bg-black/40 border-b border-white/[0.02]">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60 group-hover:scale-101 group-hover:opacity-85 transition-all duration-700 pointer-events-none"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-[#12121A] to-[#00f5ff]/15 flex items-center justify-center">
                    <Terminal className="w-6 h-6 text-outline/30" />
                  </div>
                )}
                {/* Visual scanner gradient shroud */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] to-transparent opacity-95 pointer-events-none" />
              </div>

              {/* Status node labels */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <span className={`px-2 py-0.5 border font-mono text-[8px] uppercase font-bold rounded-sm tracking-widest ${getStatusBadgeStyle(p.status)}`}>
                  {p.status}
                </span>
              </div>

              {/* Copy Context fields */}
              <div className="relative space-y-3 z-10">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-secondary block">
                    // {p.category}
                  </span>
                  <h3 className="text-base font-bold text-primary font-sans leading-snug group-hover:text-[#63f7ff] transition-all">
                    {p.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant font-sans leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </div>

                {/* Badges of tech */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-white/[0.02] border border-white/[0.05] text-[#b9caca] font-mono text-[8px] uppercase rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="px-2 py-0.5 bg-white/[0.02] border border-white/[0.05] text-[#849495] font-mono text-[8px] uppercase rounded-sm">
                      +{p.tech.length - 3} MORE
                    </span>
                  )}
                </div>

                {/* Tactile Footer diagnostics */}
                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-outline select-none">
                  <span className="group-hover:text-[#63f7ff] transition-colors flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> DECOMPILE_SPECS
                  </span>
                  <div className="flex gap-2">
                    {p.githubUrl && p.githubUrl !== '#' && <Github className="w-3.5 h-3.5 hover:text-primary transition-colors" />}
                    {p.liveUrl && p.liveUrl !== '#' && <ExternalLink className="w-3.5 h-3.5 hover:text-primary transition-colors" />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
