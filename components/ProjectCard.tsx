"use client";

import Image from 'next/image';
import { Github, ExternalLink, Eye } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  statusClassName: string;
}

export default function ProjectCard({ project, onClick, statusClassName }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative h-[380px] border border-white/10 bg-[#1c2026]/50 hover:border-[#adc6ff]/35 rounded-xl overflow-hidden flex flex-col justify-end p-5 select-none transition-all cursor-pointer shadow-lg"
    >
      <div className="absolute inset-x-0 top-0 h-[190px] overflow-hidden bg-black/40 border-b border-white/[0.02]">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-60"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#262a31] to-transparent opacity-95 pointer-events-none" />
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <span className={`px-2 py-0.5 border font-mono text-[8px] uppercase font-bold rounded-sm tracking-widest ${statusClassName}`}>
          {project.status}
        </span>
      </div>

      <div className="relative space-y-3 z-10">
        <span className="font-mono text-[9px] uppercase tracking-wider text-tertiary block">// {project.category}</span>
        <h3 className="text-base font-bold text-on-surface font-sans leading-snug group-hover:text-[#adc6ff] transition-all">{project.title}</h3>
        <p className="text-xs text-on-surface-variant font-sans leading-relaxed line-clamp-2">{project.description}</p>
      </div>

      <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-outline select-none mt-3">
        <span className="group-hover:text-[#adc6ff] transition-colors flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" /> DECOMPILE_SPECS
        </span>
        <div className="flex gap-2">
          {project.githubUrl && project.githubUrl !== '#' && <Github className="w-3.5 h-3.5" />}
          {project.liveUrl && project.liveUrl !== '#' && <ExternalLink className="w-3.5 h-3.5" />}
        </div>
      </div>
    </div>
  );
}
