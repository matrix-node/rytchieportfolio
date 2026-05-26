import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import TimelineSection from '@/components/TimelineSection';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional timeline covering tutoring, freelancing, and ICT educational background.',
  alternates: { canonical: '/experience' },
};

export default function ExperiencePage() {
  return (
    <PageShell activeSection="timeline">
      <TimelineSection />
    </PageShell>
  );
}
