import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ServicesSection from '@/components/ServicesSection';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Service offerings including web development, frontend implementation, Linux setup, and advisory.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <PageShell activeSection="services">
      <ServicesSection />
    </PageShell>
  );
}
