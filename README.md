# Rytchie Macharia Portfolio

Personal developer portfolio for Rytchie Macharia, branded as Matrix. Built with Next.js App Router, TypeScript, and Tailwind CSS, this site presents a futuristic Obsidian Protocol aesthetic with strong performance, SEO, and recruiter-ready presentation.

## Overview

This project showcases:

- Hero section with animated 3D-inspired visuals
- About, skills, projects, gallery, experience, services, blog, and contact sections
- Responsive glassmorphism UI with dark and light theme support
- Optimized local and remote imagery through Next.js image handling
- SEO metadata, `sitemap.xml`, and `robots.txt`
- A polished footer with the required brand signature

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Motion
- Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or newer

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the project for production
- `npm run start` - Run the production server locally
- `npm run lint` - Run TypeScript validation
- `npm run clean` - Remove the Next.js build output

## Deployment

This project is ready for GitHub and Vercel deployment.

Recommended deployment steps:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` in the Vercel environment variables.
4. Deploy with the default Next.js framework settings.

The repository already includes:

- App Router pages under `app/`
- Metadata configuration in `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- Optimized local images in `public/images/`

## Project Structure

```txt
app/
components/
data/
public/images/
README.md
package.json
tsconfig.json
```

## Notes

- The design intentionally preserves the original Obsidian Protocol look and motion style.
- All image assets should remain in `public/images/` so they work reliably in production.
- The site is configured to avoid common indexing issues by exposing sitemap and robots endpoints.

