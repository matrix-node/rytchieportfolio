import type { MetadataRoute } from 'next';
import { listPosts } from '@/lib/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rytchiemacharia.me';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    '',
    '/about',
    '/skills',
    '/projects',
    '/gallery',
    '/experience',
    '/services',
    '/contact',
    '/notes',
    '/notes/guides',
    '/notes/journal',
    '/notes/projects',
  ];

  const guideRoutes = listPosts('guides').map((g) => `/notes/guides/${g.slug}`);
  const journalRoutes = listPosts('journal').map((j) => `/notes/journal/${j.slug}`);

  return [...staticRoutes, ...guideRoutes, ...journalRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/notes') ? 0.7 : 0.8,
  }));
}
