import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import GallerySection from '@/components/GallerySection';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Tech life snapshots from development sessions, events, collaboration, and creative moments.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <PageShell activeSection="tech-life">
      <GallerySection />
    </PageShell>
  );
}
