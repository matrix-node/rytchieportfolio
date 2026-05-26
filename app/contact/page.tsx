import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Rytchie Macharia for frontend projects, consultations, and technical collaboration.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <PageShell activeSection="contact">
      <ContactSection />
    </PageShell>
  );
}
