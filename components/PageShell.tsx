"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PageShellProps {
  activeSection: string;
  children: React.ReactNode;
}

export default function PageShell({ activeSection, children }: PageShellProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('rytch-theme') as 'dark' | 'light' | null;
    setTheme(savedTheme || 'dark');
  }, []);

  const handleSetTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('rytch-theme', newTheme);
  };

  return (
    <div className={`min-h-screen relative w-full overflow-x-hidden ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <div className="absolute inset-0 cyber-grid-bg pointer-events-none z-0" />
      <Navbar activeSection={activeSection} theme={theme} setTheme={handleSetTheme} />
      <main className="relative z-10 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
