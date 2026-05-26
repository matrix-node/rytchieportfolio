import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import BlogSection from '@/components/BlogSection';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical notes and learning logs on Linux, web development, networking, and teaching.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <PageShell activeSection="blog">
      <BlogSection />
    </PageShell>
  );
}
