"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
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
  const routeLinks = [{ label: 'DEV_NOTES', href: '/notes' }];

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
          ? 'bg-black/60 backdrop-blur-md h-14 border-b border-[#adc6ff]/20 shadow-lg shadow-black/20'
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
            <div className="w-2.5 h-2.5 bg-[#adc6ff] rounded-full animate-pulse shadow-[0_0_8px_#adc6ff]" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#adc6ff] font-semibold">
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
                    ? 'text-primary-fixed font-bold border-b border-[#adc6ff]'
                    : 'text-on-surface-variant hover:text-[#adc6ff]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Global Toolbar */}
        <div className="hidden lg:flex items-center gap-4">
          {routeLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => { setMobileMenuOpen(false); router.push(link.href); }}
              className="font-mono text-[9px] uppercase tracking-[0.2em] transition-all py-1 cursor-pointer focus:outline-none text-tertiary font-bold border-b border-tertiary/60 hover:text-[#adc6ff]"
            >
              {link.label}
            </button>
          ))}

          {/* Resume Download */}
          <a
            href="/files/resume.pdf"
            download
            className="p-1.5 rounded border border-[#adc6ff]/20 bg-black/40 text-on-surface-variant hover:text-[#adc6ff] hover:-translate-y-0.5 transition-all outline-none focus:ring-1 focus:ring-primary-container cursor-pointer flex items-center gap-1"
            title="Download Resume"
          >
            <Download className="w-4 h-4" />
          </a>

          {/* Contact Fast Trigger */}
          <button
            onClick={() => handleLinkClick('#contact')}
            className="px-3 py-1.5 border border-[#adc6ff]/30 bg-[#adc6ff]/5 hover:bg-[#adc6ff]/15 text-[#adc6ff] font-mono text-[9px] uppercase font-bold tracking-[0.15em] rounded transition-all focus:outline-none focus:ring-1 focus:ring-[#adc6ff] active:scale-95 cursor-pointer"
          >
            [ LET&apos;S_TALK ]
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface-variant focus:outline-none bg-black/40 border border-[#adc6ff]/20 rounded-sm cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#1c2026]/95 border-b border-[#adc6ff]/20 backdrop-blur-xl px-4 py-6 flex flex-col gap-4 shadow-xl z-30">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.hash.substring(1);
              return (
                <button
                  key={link.hash}
                  onClick={() => handleLinkClick(link.hash)}
                  className={`py-3 text-left font-mono text-xs tracking-[0.15em] border-b border-white/5 pl-2 cursor-pointer ${
                    isActive ? 'text-[#adc6ff] font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  // {link.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => { setMobileMenuOpen(false); router.push('/notes'); }}
            className="py-3 text-left font-mono text-xs tracking-[0.15em] border-b border-white/5 pl-2 cursor-pointer text-tertiary font-bold"
          >
            // DEV_NOTES
          </button>
          <div className="flex gap-2">
            <a
              href="/files/resume.pdf"
              download
              className="flex-1 py-3 bg-black/40 text-[#adc6ff] border border-[#adc6ff]/35 font-mono text-[11px] font-bold tracking-widest hover:bg-[#adc6ff]/15 transition-all text-center rounded-sm flex items-center justify-center gap-2 uppercase"
              title="Download Resume"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
            <button
              onClick={() => handleLinkClick('#contact')}
              className="flex-1 py-3 bg-black/40 text-[#adc6ff] border border-[#adc6ff]/35 font-mono text-[11px] font-bold tracking-widest hover:bg-[#adc6ff]/15 transition-all text-center rounded-sm uppercase cursor-pointer"
            >
              [ CONTACT_FAST_SECURE ]
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
