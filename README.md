# Rytchie Macharia — Portfolio & Dev Notes

One Next.js site: the Obsidian-engineered portfolio **and** a private-by-default digital garden of technical notes, merged onto a single design system.

## Structure

- `/` — portfolio one-pager (hero, about, skills, projects, gallery, timeline, services, contact)
- `/about /skills /projects /gallery /experience /services /contact` — portfolio pages
- `/notes` — Dev Notes landing (pinned guide, recently updated, tag cloud)
- `/notes/guides`, `/notes/journal`, `/notes/projects` — notes indexes; `/notes/{guides,journal}/[slug]` — articles
- `/search` + **Ctrl/Cmd+K** anywhere — full-text search across notes and projects
- `/admin` — the Writer's Room (password-protected editor; writes `content/**/*.md`)
- `/blog` — legacy redirect to `/notes/journal`

## Writing

Sign in at `/admin/login` (password = `ADMIN_PASSWORD` in `.env.local`). Create/edit/publish guides and journal entries in Markdown — code blocks with `title="file"` headers, GFM tables, and `> [!INFO] / [!TIP] / [!WARNING] / [!DANGER]` callouts. Drafts are invisible publicly. The homepage "Technical Logs & Notes" section and the journal are the same content — one writing system.

## Design system

Tailwind CSS v4 tokens in `app/globals.css` (Material-3-inspired dark palette: `#10141a` background, `#adc6ff` primary, `#ffb786` tertiary), Geist (headlines) / Inter (body) / JetBrains Mono (code), plus the portfolio's signature grid/glass/glow effects recolored onto the same palette. Dark-only by design.

## Run

```bash
npm install
npm run build && npm start   # port 3000
```

Deploy on a host with a writable filesystem (VPS, homelab, Docker) — the admin writes Markdown files to disk, so serverless platforms like Vercel can't persist edits. Terminate TLS with Caddy/Traefik and point `rytchiemacharia.me` (and optionally `doc.rytchiemacharia.me` → `/notes`) at it.

## Env

```
ADMIN_PASSWORD=...        # writer's room password
SESSION_SECRET=...        # signs the 7-day session cookie
NEXT_PUBLIC_SITE_URL=https://rytchiemacharia.me
```
