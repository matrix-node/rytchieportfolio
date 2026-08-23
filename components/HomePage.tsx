"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import GallerySection from '@/components/GallerySection';
import TimelineSection from '@/components/TimelineSection';
import ServicesSection from '@/components/ServicesSection';
import BlogSection, { type JournalTeaser } from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import ProjectDrawer from '@/components/ProjectDrawer';
import Footer from '@/components/Footer';
import type { Project } from '@/types';

export default function HomePage({ journalPosts }: { journalPosts: JournalTeaser[] }) {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'tech-life', 'timeline', 'services', 'blog', 'contact'];

    const handleScroll = () => {
      let current = 'home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 160) {
          current = id;
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
    <div className="min-h-screen relative w-full overflow-x-hidden">
      <div className="absolute inset-0 cyber-grid-bg pointer-events-none z-0" />

      <Navbar activeSection={activeSection} />

      <Hero onCtaClick={handleCtaClick} />
      <AboutSection />
      <SkillsSection />
      <ProjectsGrid onSelectProject={(p) => setSelectedProject(p)} />
      <GallerySection />
      <TimelineSection />
      <ServicesSection />
      <BlogSection posts={journalPosts} />
      <ContactSection />

      <Footer />

      <AnimatePresence>
        {selectedProject && <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </div>
  );
}
