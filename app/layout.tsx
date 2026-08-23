import type { Metadata } from 'next';
import { Geist, Inter, JetBrains_Mono } from 'next/font/google';
import SearchOverlay from '@/components/SearchOverlay';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rytchiemacharia.me';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rytchie Macharia | Frontend Developer & Dev Notes',
    template: '%s | Rytchie Macharia',
  },
  description:
    'Portfolio and digital garden of Rytchie Macharia — frontend engineering, Linux systems, cybersecurity learning, plus in-depth technical guides and journal notes.',
  keywords: [
    'Rytchie Macharia',
    'Frontend Developer Kenya',
    'Next.js portfolio',
    'TypeScript',
    'React developer',
    'Linux',
    'Cybersecurity',
    'Dev Notes',
    'developer blog',
  ],
  authors: [{ name: 'Rytchie Macharia' }],
  creator: 'Rytchie Macharia',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: ['/icon.svg'],
  },
  openGraph: {
    title: 'Rytchie Macharia | Frontend Developer & Dev Notes',
    description:
      'One site: a polished engineering portfolio and a private-by-default digital garden of technical guides and notes.',
    url: siteUrl,
    siteName: 'Rytchie Macharia',
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
    title: 'Rytchie Macharia | Frontend Developer & Dev Notes',
    description: 'Portfolio plus a digital garden of technical guides and notes.',
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
    <html className="dark" lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geist.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
        <SearchOverlay />
      </body>
    </html>
  );
}
