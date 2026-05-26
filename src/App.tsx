import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Terminal, Download, ArrowRight, CheckCircle, Shield, Award, Sparkles } from 'lucide-react';

// Core imports
import { USER_PROFILE, PROJECTS } from './data';
import { Project } from './types';
import Navbar from './components/Navbar';
import Hero3DScene from './components/Hero3DScene';
import StatusDashboard from './components/StatusDashboard';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectDrawer from './components/ProjectDrawer';
import GallerySection from './components/GallerySection';
import TimelineSection from './components/TimelineSection';
import ServicesSection from './components/ServicesSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync theme to local storage and document class
  useEffect(() => {
    const savedTheme = localStorage.getItem('rytch-theme') as 'dark' | 'light';
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
  }, []);

  const handleSetTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('rytch-theme', newTheme);
  };

  // Observe scroll metrics to update active navigation tabs
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'tech-life', 'timeline', 'services', 'blog', 'contact'];
    
    const handleScroll = () => {
      let current = 'home';
      // Find which section is currently active
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = (hash: string) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen relative w-full overflow-x-hidden ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      {/* Background Cyber Dot Grid overlay */}
      <div className="absolute inset-0 cyber-grid-bg pointer-events-none z-0" />

      {/* Sticky navigation bar */}
      <Navbar activeSection={activeSection} theme={theme} setTheme={handleSetTheme} />

      {/* 1. HERO SECTION */}
      <section id="home" className="min-h-screen pt-28 pb-16 flex items-center relative border-b border-[#3a494a]/10">
        
        {/* Dynamic Canvas Background behind/beside */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 overflow-hidden pointer-events-none z-0">
          <Hero3DScene />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Context */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Hiring/Contractor Badge */}
              <div className="inline-flex items-center gap-2 p-1 pr-3 bg-glass-bg border border-primary-container/25 rounded-full select-none max-w-full">
                <span className="h-5 px-2 bg-[#00f5ff]/15 border border-[#00f5ff]/25 font-mono text-[9px] text-[#63f7ff] font-bold rounded-full flex items-center shrink-0 uppercase">
                  ✓ Available
                </span>
                <span className="font-mono text-[9.5px] text-on-surface-variant truncate tracking-wide">
                  Frontend, Web systems, Tutoring &amp; Support
                </span>
              </div>

              {/* Headline & Title */}
              <div className="space-y-3.5">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary font-sans leading-[1.1] tracking-tight">
                  {USER_PROFILE.name}
                </h1>
                <p className="font-mono text-xs font-semibold tracking-widest text-secondary uppercase">
                  // {USER_PROFILE.title}
                </p>
                <h2 className="text-lg md:text-xl font-medium text-primary font-sans leading-relaxed text-slate-200/90 max-w-2xl">
                  &ldquo;{USER_PROFILE.tagline}&rdquo;
                </h2>
                <p className="text-sm text-on-surface-variant max-w-xl font-sans leading-relaxed">
                  {USER_PROFILE.subHeadline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => handleCtaClick('#projects')}
                  className="px-5 py-3 bg-[#00f5ff] text-[#003739] font-mono text-xs font-bold uppercase tracking-wider rounded-sm shadow-[0_0_20px_rgba(0,245,255,0.2)] hover:scale-[1.01] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  View Projects <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleCtaClick('#contact')}
                  className="px-5 py-3 border border-[#3a494a]/20 bg-[#12121A]/80 hover:border-[#00f5ff]/40 text-primary-fixed font-mono text-xs uppercase tracking-wider rounded-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary-container active:scale-95 cursor-pointer"
                >
                  Contact Me
                </button>
                <a
                  href={USER_PROFILE.cvLink}
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Rytchie Macharia's Portfolio CV System Compiled // Available on Contact Dispatch.");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-3 border border-dashed border-outline/35 text-on-surface-variant hover:text-primary-fixed hover:border-[#00f5ff]/50 font-mono text-xs uppercase text-center rounded-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download CV
                </a>
              </div>

              {/* Animated Live Status Dashboard embedded */}
              <div className="pt-6 max-w-xl">
                <div className="mb-3 text-left">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-outline">
                    System_Telemetry_Unit // Diagnostic Dashboard
                  </span>
                </div>
                <StatusDashboard />
              </div>

            </div>

            {/* Right Hero Image in HUD tactical frame */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group max-w-sm w-full">
                
                {/* Outer Glass HUD Border and Corners */}
                <div className="absolute -top-3 -left-3 w-7 h-7 border-t-2 border-l-2 border-[#00f5ff]/40" />
                <div className="absolute -top-3 -right-3 w-7 h-7 border-t-2 border-r-2 border-[#00f5ff]/40" />
                <div className="absolute -bottom-3 -left-3 w-7 h-7 border-b-2 border-l-2 border-[#00f5ff]/40" />
                <div className="absolute -bottom-3 -right-3 w-7 h-7 border-b-2 border-r-2 border-[#00f5ff]/40" />

                {/* Laser scan horizontal line */}
                <div className="absolute left-0 top-0 w-full h-0.5 bg-[#00f5ff] shadow-[0_0_12px_#00f5ff] z-10 pointer-events-none animate-bounce duration-[10000ms]" />

                <div className="glass-panel border-2 border-white/[0.03] overflow-hidden rounded relative p-2 bg-[#0e0e12]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVhxlNp0gYtgmaBW-ZX6OrN2Oum_0HKC_kFNIzGBqVsBo0fnOxltepXqkwcSeoPtJztLurplbW51Vj0YN9oU5SQMFQYroQcog7K5und5CjLZTErAiFfxrqfqV3gM4erIk6EO6AtjiZNzCzw2P8k9Y7JESRp-DC2641Ke_LZfjy68k-fNMz85houXWfMMZgBnQed5xXfSIcgA5zDvOkZgWuHpi55zClWuO5gex2jYgSbtKSnmvnTPOaD8Drzk78wK8sBvWy2twr68Qi"
                    alt="Rytchie Macharia Headshot"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-[400px] object-fit-override object-cover rounded-sm filter grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 pointer-events-none"
                  />

                  {/* Technical Coordinates overlay badge */}
                  <div className="absolute left-4 top-4 bg-slate-950/90 border border-[#3a494a]/30 px-2 py-1 space-y-0.5 rounded backdrop-blur-sm pointer-events-none">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="font-mono text-[8px] text-outline uppercase tracking-wider">SEC_REF: RM_879</span>
                    </div>
                  </div>

                  {/* Vibe pill */}
                  <div className="absolute inset-x-4 bottom-4 bg-[#0e0e12]/95 border border-[#3a494a]/40 p-3 rounded backdrop-blur-md text-left select-none pointer-events-none">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-secondary mb-1">
                      // ACTIVE_BRAND_MOTTO
                    </p>
                    <p className="font-sans text-xs text-slate-200 leading-snug font-medium italic">
                      &ldquo;{USER_PROFILE.vibe}&rdquo;
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. ABOUT SECTION */}
      <AboutSection theme={theme} />

      {/* 3. SKILLS SECTION */}
      <SkillsSection />

      {/* 4. PROJECTS BENTO GRID */}
      <ProjectsGrid onSelectProject={(p) => setSelectedProject(p)} />

      {/* 5. TECH LIFE GALLERY FILTERABLE */}
      <GallerySection />

      {/* 6. TIMELINE HISTORY */}
      <TimelineSection />

      {/* 7. SERVICES SHEET */}
      <ServicesSection />

      {/* 8. BLOG & NOTES LOG */}
      <BlogSection />

      {/* 9. CONTACT TRANSMISSION */}
      <ContactSection />

      {/* 10. FOOTER STATUS BAR */}
      <footer className="py-8 bg-[#07070a]/90 border-t border-[#3a494a]/20 select-none text-left font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-outline">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-primary-fixed font-bold tracking-widest uppercase">
              // DESIGNED_IN_OBSIDIAN_PROTOCOL
            </p>
            <p className="text-[10px] text-on-surface-variant leading-relaxed">
              &copy; {new Date().getFullYear()} Rytchie Macharia. All rights reserved. Registered location: Kenya.
            </p>
          </div>
          <div className="flex items-center gap-6 text-[10px] tracking-widest">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
              BUILD: GREEN
            </span>
            <span>UPLINK_SECURE_NBO</span>
          </div>
        </div>
      </footer>

      {/* Premium Technical Project Details Slide-Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDrawer
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
