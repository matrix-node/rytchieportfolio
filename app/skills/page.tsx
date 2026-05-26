import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import SkillsSection from '@/components/SkillsSection';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technical stack matrix covering frontend, backend, Linux, and cybersecurity competencies.',
  alternates: { canonical: '/skills' },
};

export default function SkillsPage() {
  return (
    <PageShell activeSection="skills">
      <SkillsSection />
    </PageShell>
  );
}
