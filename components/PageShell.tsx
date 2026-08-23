"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PageShellProps {
  activeSection: string;
  children: React.ReactNode;
}

export default function PageShell({ activeSection, children }: PageShellProps) {
  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      <div className="absolute inset-0 cyber-grid-bg pointer-events-none z-0" />
      <Navbar activeSection={activeSection} />
      <main className="relative z-10 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
