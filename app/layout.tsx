import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rytchiamacharia.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rytchie Macharia | Frontend Developer Portfolio',
    template: '%s | Rytchie Macharia',
  },
  description:
    'Personal developer portfolio of Rytchie Macharia, showcasing frontend engineering, Linux systems, cybersecurity learning, and high-performance web experiences.',
  keywords: [
    'Rytchie Macharia',
    'Matrix portfolio',
    'Frontend Developer Kenya',
    'Next.js portfolio',
    'TypeScript',
    'React developer',
    'Linux',
    'Cybersecurity',
  ],
  authors: [{ name: 'Rytchie Macharia' }],
  creator: 'Rytchie Macharia',
  publisher: 'Matrix',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/icon.svg'],
  },
  openGraph: {
    title: 'Rytchie Macharia | Frontend Developer Portfolio',
    description:
      'Obsidian Protocol portfolio: futuristic, high-performance frontend engineering with polished UI and smooth 3D-inspired interactions.',
    url: siteUrl,
    siteName: 'Matrix Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/rytchie.jpg',
        width: 1200,
        height: 630,
        alt: 'Rytchie Macharia portfolio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rytchie Macharia | Frontend Developer Portfolio',
    description:
      'Futuristic, recruiter-ready developer portfolio with high-performance UI, 3D-inspired visuals, and strong frontend engineering.',
    images: ['/images/rytchie.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>{children}</body>
    </html>
  );
}
