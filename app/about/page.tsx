import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import AboutSection from '@/components/AboutSection';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Rytchie Macharia, skills, engineering focus, and teaching mindset.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <PageShell activeSection="about">
      <AboutSection />
    </PageShell>
  );
}
