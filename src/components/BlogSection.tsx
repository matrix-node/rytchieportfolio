import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, BookOpen, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data';

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const categories = ['ALL', 'Web Development', 'Linux', 'Cybersecurity', 'Teaching', 'Networking'];

  const filteredPosts = activeCategory === 'ALL'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(b => b.category === activeCategory);

  const toggleExpand = (id: string, status: string) => {
    if (status === 'Coming Soon') return;
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  return (
    <section id="blog" className="py-20 border-b border-[#3a494a]/10 relative text-left">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title details */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-[#fbffbb]" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-outline">
                DIAGNOSTIC_PAPERS // ARCHIVES
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary font-sans uppercase">
              Technical Logs &amp; Notes
            </h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-xl mt-2 leading-relaxed">
              Field briefings. Inside thoughts on system configurations, frontend architectures, CCNA subnets, and explanation frameworks.
            </p>
          </div>

          {/* Filtering buttons pills */}
          <div className="flex flex-wrap gap-2 justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedPostId(null);
                }}
                className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all rounded-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-container ${
                  activeCategory === cat
                    ? 'border border-[#fbffbb]/80 bg-[#fbffbb]/10 text-[#fbffbb]'
                    : 'border border-[#3a494a]/25 text-on-surface-variant hover:border-[#fbffbb]/50 hover:text-primary-fixed'
                }`}
              >
                [ {cat} ]
              </button>
            ))}
          </div>
        </div>

        {/* Blog layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => {
            const isExpanded = expandedPostId === post.id;
            const isComingSoon = post.status === 'Coming Soon';

            return (
              <div
                key={post.id}
                className={`border transition-all text-left flex flex-col justify-between overflow-hidden bg-[#15151e]/50 p-6 rounded-xl shadow-lg ${
                  isComingSoon
                    ? 'border-white/5 opacity-60'
                    : isExpanded
                      ? 'border-[#fbffbb]/40 hover:border-[#fbffbb]/60'
                      : 'border-white/10 hover:border-[#fbffbb]/30 cursor-pointer hover:shadow-[0_0_15px_rgba(251,255,187,0.04)]'
                }`}
                onClick={() => toggleExpand(post.id, post.status)}
              >
                <div className="space-y-3">
                  {/* Category, Status, Time */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-outline px-2 py-0.5 border border-white/5 bg-black/40 rounded-sm">
                      {post.category}
                    </span>

                    <div className="flex items-center gap-3 font-mono text-[9px]">
                      <span className="flex items-center gap-1 text-[#fbffbb]">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                      {isComingSoon ? (
                        <span className="px-1.5 py-0.5 border border-amber-400/25 text-amber-300 bg-amber-400/5 uppercase rounded-sm font-semibold tracking-wider">
                          Coming Soon
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 border border-[#10B981]/25 text-[#10B981] bg-[#10B981]/5 uppercase rounded-sm font-semibold tracking-wider">
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-primary font-sans leading-snug">
                    {post.title}
                  </h3>

                  {/* Short excerpt */}
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Interactive Expandable Post Body */}
                  <AnimatePresence>
                    {isExpanded && post.content && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 border-t border-[#3a494a]/20 mt-4 overflow-hidden"
                        onClick={(e) => e.stopPropagation() /* prevent collapse trigger */}
                      >
                        <p className="text-xs text-[#b9caca] whitespace-pre-line leading-relaxed font-sans">
                          {post.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card action indicator */}
                {!isComingSoon && (
                  <div className="mt-4 pt-3 border-t border-white/[0.03] flex justify-between items-center text-[10px] font-mono select-none text-[#fbffbb]/80 font-semibold uppercase">
                    <span>
                      {isExpanded ? 'Collapse technical archive' : 'Decompile full entry'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
