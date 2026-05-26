import { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ExternalLink, Github, Cpu, Terminal, ShieldAlert, Award, FileCode } from 'lucide-react';
import { Project } from '../types';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Black Backdrop Blend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />

      {/* Slide-out Terminal Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 24, stiffness: 220 }}
        className="relative w-full max-w-2xl h-full bg-[#12121A] border-l border-[#3a494a]/30 shadow-2xl flex flex-col z-10"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e0e12] border-b border-[#3a494a]/30">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose}></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            <span className="font-mono text-xs text-on-surface-variant font-medium ml-4 tracking-widest uppercase">
              // PROJECT_PROFILE_MANIFEST: {project.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-on-surface-variant hover:text-primary-fixed hover:bg-white/5 transition-all outline-none focus:ring-1 focus:ring-primary-container"
            aria-label="Close manifest"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Panel Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 select-text text-left">
          {/* Cover Image or Glowing Gradient */}
          <div className="relative w-full h-[220px] rounded-lg border border-[#3a494a]/20 overflow-hidden bg-[#0e0e12]">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-[#12121A] to-[#006c71]/20 flex items-center justify-center">
                <span className="font-mono text-xs text-outline">{project.title} IMAGE MANIFEST</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="px-2 py-0.5 bg-[#00f5ff]/15 text-[#63f7ff] border border-[#00f5ff]/25 font-mono text-[9px] rounded-sm tracking-wider uppercase mb-1.5 inline-block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-semibold text-primary tracking-tight font-sans">
                  {project.title}
                </h3>
              </div>
              <span className="font-mono text-[10px] text-primary-fixed border border-[#00f5ff]/20 bg-[#12121A]/90 px-2 py-1 uppercase rounded-sm">
                Status: {project.status}
              </span>
            </div>
          </div>

          {/* Action trigger links */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-primary border border-[#3a494a]/20 rounded font-mono text-xs hover:bg-[#00f5ff]/10 hover:border-[#00f5ff]/40 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" /> REPOSITORY_PATH
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#00f5ff] text-[#003739] font-mono text-xs font-bold rounded shadow-[0_0_15px_rgba(0,245,255,0.25)] hover:scale-[1.01] transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" /> TRANSMIT_URL
              </a>
            )}
          </div>

          {/* Overview Statement */}
          <div className="space-y-2">
            <h4 className="font-mono text-[10px] text-on-surface-variant font-bold tracking-widest uppercase flex items-center gap-1.5 border-b border-[#3a494a]/20 pb-1">
              <Terminal className="w-3.5 h-3.5 text-[#63f7ff]" /> 01 // OVERVIEW
            </h4>
            <p className="text-[#b9caca] text-[14px] leading-relaxed font-sans">
              {project.extendedDescription || project.description}
            </p>
          </div>

          {/* Technology Vector Spec */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-on-surface-variant font-bold tracking-widest uppercase flex items-center gap-1.5 border-b border-[#3a494a]/20 pb-1">
              <Cpu className="w-3.5 h-3.5 text-[#63f7ff]" /> 02 // TECHNICAL_STACK_COMPILED
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-[#1f1f23] text-[#e4e1e7] border border-[#3a494a]/35 font-mono text-[10px] uppercase font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Notes Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0e0e12]/80 p-5 rounded border border-[#3a494a]/20">
            <div className="space-y-1">
              <h5 className="font-mono text-[9px] text-[#fbffbb] uppercase tracking-wider font-semibold">
                [ ARCHITECTURE_NOTES ]
              </h5>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {project.architectureNotes || 'Modular setup implementing optimal client-side caching states and performant asset loading algorithms.'}
              </p>
              <span className="text-[9px] font-mono text-[#849495] block italic pt-2">
                &ldquo;Architecture notes, because vibes alone don’t scale.&rdquo;
              </span>
            </div>
            <div className="space-y-1">
              <h5 className="font-mono text-[9px] text-red-400 uppercase tracking-wider font-semibold">
                [ SYSTEM_CHALLENGES ]
              </h5>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {project.challenges || 'Optimizing async query frames without causing hydration flickering or rendering blockages.'}
              </p>
            </div>
          </div>

          {/* Core Lessons Learned */}
          {project.lessons && (
            <div className="space-y-2">
              <h4 className="font-mono text-[10px] text-on-surface-variant font-bold tracking-widest uppercase flex items-center gap-1.5 border-b border-[#3a494a]/20 pb-1">
                <Award className="w-3.5 h-3.5 text-[#63f7ff]" /> 03 // CRITICAL_INTELLIGENCE_GAINED
              </h4>
              <p className="text-[#b9caca] text-[13px] leading-relaxed font-sans">
                {project.lessons}
              </p>
            </div>
          )}

          {/* Source Code Container Block */}
          {project.codeSnippet && (
            <div className="space-y-3">
              <h4 className="font-mono text-[10px] text-on-surface-variant font-bold tracking-widest uppercase flex items-center gap-1.5 border-b border-[#3a494a]/20 pb-1">
                <FileCode className="w-3.5 h-3.5 text-[#63f7ff]" /> 04 // ACTIVE_SOURCE_HIGHLIGHT
              </h4>
              <div className="relative text-left bg-black p-4 rounded-lg border border-[#3a494a]/40 overflow-x-auto text-xs font-mono text-[#dae80f] leading-relaxed max-h-[300px]">
                <div className="absolute right-3 top-2.5 font-mono text-[8px] text-outline select-none">
                  TYPESCRIPT // BASH
                </div>
                <pre><code>{project.codeSnippet}</code></pre>
              </div>
            </div>
          )}
        </div>

        {/* Tactical Footer status */}
        <div className="px-6 py-4 bg-[#0e0e12] border-t border-[#3a494a]/30 flex justify-between items-center text-[10px] font-mono text-outline">
          <span>REGION // NBO-KEM</span>
          <span className="text-[#10B981]">SEC_DECRYPT: HIGH_CONFIDENCE</span>
        </div>
      </motion.div>
    </div>
  );
}
