"use client";

import { useState } from 'react';
import { FileText, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface JournalTeaser {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
}

export default function BlogSection({ posts }: { posts: JournalTeaser[] }) {
  const [activeTag, setActiveTag] = useState<string>('ALL');
  const tags = ['ALL', ...Array.from(new Set(posts.flatMap((p) => p.tags))).sort()];
  const visible = activeTag === 'ALL' ? posts : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="blog" className="py-20 border-b border-outline-variant/20 relative text-left">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-tertiary" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-outline">
                DIAGNOSTIC_PAPERS // ARCHIVES
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-on-surface font-sans uppercase">
              Technical Logs &amp; Notes
            </h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">
              Field briefings. Inside thoughts on system configurations, frontend architectures, CCNA subnets, and explanation frameworks.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-start">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all rounded-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-container ${
                  activeTag === tag
                    ? 'border border-tertiary/80 bg-tertiary/10 text-tertiary'
                    : 'border border-outline-variant/40 text-on-surface-variant hover:border-tertiary/50 hover:text-primary-fixed'
                }`}
              >
                [ {tag} ]
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.slice(0, 6).map((post) => (
            <Link
              key={post.slug}
              href={`/notes/journal/${post.slug}`}
              className="group border border-white/10 hover:border-tertiary/40 transition-all text-left flex flex-col justify-between overflow-hidden bg-surface-container/50 p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-[0_0_15px_rgba(255,183,134,0.05)]"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-outline px-2 py-0.5 border border-white/5 bg-black/40 rounded-sm">
                    {post.tags[0] ?? 'Note'}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[9px] text-tertiary">
                    <Clock className="w-3 h-3" /> {post.readTime} min
                  </div>
                </div>

                <h3 className="text-base font-bold text-on-surface font-sans leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.03] flex justify-between items-center text-[10px] font-mono select-none text-tertiary/80 font-semibold uppercase">
                <span>Read full entry</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/notes/journal"
            className="px-5 py-2.5 border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary font-mono text-[10px] uppercase font-bold tracking-[0.15em] rounded transition-all focus:outline-none focus:ring-1 focus:ring-primary"
          >
            [ OPEN_THE_FULL_ARCHIVE ]
          </Link>
        </div>

      </div>
    </section>
  );
}
