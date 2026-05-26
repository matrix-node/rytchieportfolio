# Rytchie Macharia Portfolio

This repository now contains a production-ready Next.js App Router migration of the original static portfolio site.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- ESLint + Prettier

## Development

Install dependencies and start the app:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Structure

- `app/` app router pages, metadata, robots, and sitemap routes
- `components/` reusable UI sections
- `lib/` shared site content
- `public/` static images and downloadable files
- `styles/` global styling and animations
- `types/` shared TypeScript types

## Notes

- The original assets were preserved and copied into `public/images` and `public/files`.
- The contact form still posts to Formspree.
- The site metadata now includes Open Graph, Twitter, canonical, robots, and sitemap support.
