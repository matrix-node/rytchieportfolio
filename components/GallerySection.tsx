"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Compass, Info } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filters = ['ALL', 'Development', 'Workspace', 'Community', 'Tech Events', 'Creative Moments', 'Human Side'];

  // Map filters with technical category terms stored in GALLERY_ITEMS
  const getMappedCategory = (filter: string) => {
    switch (filter) {
      case 'Development': return 'development';
      case 'Workspace': return 'workspace'; // returns empty to trigger the funny state
      case 'Community': return 'community';
      case 'Tech Events': return 'tech-events';
      case 'Creative Moments': return 'creative-moments';
      case 'Human Side': return 'human-side';
      default: return 'all';
    }
  };

  const filteredItems = activeFilter === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === getMappedCategory(activeFilter));

  return (
    <section id="tech-life" className="py-20 border-b border-[#3a494a]/10 relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title configuration */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-[#00f5ff]" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-outline">
                SECURE_IMAGE_STORAGE // TECH_LIFE
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary font-sans uppercase">
              Tech Life Gallery
            </h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">
              Real world environment footprints. Capturing stickers, community collabs under American Spaces, and workspace computing sessions in Nakuru.
            </p>
          </div>

          {/* Filtering buttons pills */}
          <div className="flex flex-wrap gap-1.5 justify-start">
            {filters.map((flt) => (
              <button
                key={flt}
                onClick={() => setActiveFilter(flt)}
                className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider transition-all rounded-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-container ${
                  activeFilter === flt
                    ? 'border border-[#00f5ff] bg-[#00f5ff]/10 text-[#00f5ff]'
                    : 'border border-[#3a494a]/25 text-on-surface-variant hover:border-[#00f5ff]/40 hover:text-primary-fixed'
                }`}
              >
                [ {flt} ]
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Bento Grid / Empty State container */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="py-16 border border-dashed border-[#3a494a]/30 rounded-lg flex flex-col items-center justify-center p-6 bg-[#12121A]/50 text-center"
            >
              <Info className="w-8 h-8 text-outline mb-3 animate-pulse" />
              <h3 className="font-mono text-sm uppercase text-primary tracking-widest mb-1">
                // GALLERY_LOG: SHY_MODULE_DETECTED
              </h3>
              <p className="font-mono text-xs text-on-surface-variant italic max-w-md">
                &ldquo;No screenshots here yet. The code was shy.&rdquo;
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid-gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-lg overflow-hidden border border-[#3a494a]/25 bg-[#12121A] aspect-[4/3] flex flex-col justify-end"
                >
                  {/* Photo with Obsidian overlay */}
                  <Image
                    src={item.imageUrl}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="absolute inset-0 object-cover opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 pointer-events-none"
                  />
                  
                  {/* Digital overlay masking */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950/30 to-transparent opacity-85 pointer-events-none" />
                  
                  {/* Glowing neon spot indicator inside card */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 bg-black/75 border border-[#3a494a]/30 px-2 py-0.5 rounded font-mono text-[8px] uppercase text-outline">
                      <Eye className="w-2.5 h-2.5 text-[#63f7ff]" /> VIEWPORT
                    </span>
                  </div>

                  {/* Caption HUD interface */}
                  <div className="relative p-5 z-10 text-left space-y-1 mt-auto">
                    <span className="font-mono text-[8.5px] uppercase font-bold tracking-widest text-secondary block">
                      // {item.category}
                    </span>
                    <h4 className="font-sans font-bold text-sm text-primary tracking-tight">
                      {item.caption}
                    </h4>
                    {item.metadata && (
                      <span className="font-mono text-[9px] text-[#849495] block pt-1.5 border-t border-white/5 uppercase">
                        LOC: {item.metadata}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
