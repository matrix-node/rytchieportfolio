import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ProjectsPageClient from '@/components/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio projects across accessibility tech, Linux systems, education tools, and web engineering.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return (
    <PageShell activeSection="projects">
      <ProjectsPageClient />
    </PageShell>
  );
}
