"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface NavbarProps {
  activeSection: string;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export default function Navbar({ activeSection, theme, setTheme }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const navLinks = [
    { label: 'HOME', hash: '#home' },
    { label: 'ABOUT', hash: '#about' },
    { label: 'SKILLS', hash: '#skills' },
    { label: 'PROJECTS', hash: '#projects' },
    { label: 'TECH_LIFE', hash: '#tech-life' },
    { label: 'TIMELINE', hash: '#timeline' },
    { label: 'SERVICES', hash: '#services' },
    { label: 'BLOG_NOTES', hash: '#blog' },
    { label: 'CONTACT', hash: '#contact' },
  ];

  const handleLinkClick = (hash: string) => {
    setMobileMenuOpen(false);
    if (pathname !== '/') {
      router.push(`/${hash}`);
      return;
    }
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-md h-14 border-b border-cyan-500/20 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent h-16'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand signature */}
        <button
          onClick={() => handleLinkClick('#home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#00f5ff] rounded-full animate-pulse shadow-[0_0_8px_#00f5ff]" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#00f5ff] font-semibold">
              OBSIDIAN_PROTOCOL // NBO
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Desktop menu">
          {navLinks.map((link) => {
            const isActive = activeSection === link.hash.substring(1);
            return (
              <button
                key={link.hash}
                onClick={() => handleLinkClick(link.hash)}
                className={`font-mono text-[9px] uppercase tracking-[0.2em] transition-all relative py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-container ${
                  isActive
                    ? 'text-primary-fixed font-bold border-b border-[#00f5ff]'
                    : 'text-on-surface-variant hover:text-[#00f5ff]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Global Toolbar */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <ThemeToggle
            theme={theme}
            onToggle={toggleTheme}
            className="p-1.5 rounded border border-[#00f5ff]/20 bg-black/40 text-on-surface-variant hover:text-[#00f5ff] hover:-translate-y-0.5 transition-all outline-none focus:ring-1 focus:ring-primary-container cursor-pointer"
          />

          {/* Contact Fast Trigger */}
          <button
            onClick={() => handleLinkClick('#contact')}
            className="px-3 py-1.5 border border-[#00f5ff]/30 bg-[#00f5ff]/5 hover:bg-[#00f5ff]/15 text-[#00f5ff] font-mono text-[9px] uppercase font-bold tracking-[0.15em] rounded transition-all focus:outline-none focus:ring-1 focus:ring-[#00f5ff] active:scale-95 cursor-pointer"
          >
            [ LET&apos;S_TALK ]
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Theme toggler */}
          <ThemeToggle
            theme={theme}
            onToggle={toggleTheme}
            className="p-1.5 rounded border border-[#00f5ff]/20 bg-black/40 text-on-surface-variant focus:outline-none cursor-pointer"
          />

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface-variant focus:outline-none bg-black/40 border border-[#00f5ff]/20 rounded-sm cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#15151e]/95 border-b border-[#00f5ff]/20 backdrop-blur-xl px-4 py-6 flex flex-col gap-4 shadow-xl z-30">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.hash.substring(1);
              return (
                <button
                  key={link.hash}
                  onClick={() => handleLinkClick(link.hash)}
                  className={`py-3 text-left font-mono text-xs tracking-[0.15em] border-b border-white/5 pl-2 cursor-pointer ${
                    isActive ? 'text-[#00f5ff] font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  // {link.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => handleLinkClick('#contact')}
            className="w-full py-3 bg-black/40 text-[#00f5ff] border border-[#00f5ff]/35 font-mono text-[11px] font-bold tracking-widest hover:bg-[#00f5ff]/15 transition-all text-center rounded-sm uppercase cursor-pointer"
          >
            [ CONTACT_FAST_SECURE ]
          </button>
        </div>
      )}
    </header>
  );
}
