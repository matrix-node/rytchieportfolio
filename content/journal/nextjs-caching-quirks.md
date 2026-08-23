---
title: Next.js 14 App Router Caching Quirks
excerpt: "TIL: fetch caching, Router Cache, and full route caching are three different layers — and they bite independently."
date: "2024-10-24"
tags: [Nextjs, React]
---

TIL that Next.js 14's App Router has **three independent caching layers**, and debugging "stale data" requires knowing which one is lying to you.

1. **Fetch cache** — `fetch()` results are cached by default in server components. Opt out per-call with `{ cache: 'no-store' }`.
2. **Full route cache** — statically-rendered routes are cached at build time. Passing `searchParams` or using `cookies()` makes the route dynamic.
3. **Client Router Cache** — the browser back/forward cache for RSC payloads. `router.refresh()` busts it, a plain `<Link>` click might not.

```ts title="no-stale.ts"
// This page reads fresh data on every request:
// 1. the fetch opts out of the data cache,
// 2. reading searchParams marks the route dynamic.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const res = await fetch(`${BASE}/entries?tag=${tag}`, { cache: "no-store" });
  return <List entries={await res.json()} />;
}
```

> [!INFO]
> `export const dynamic = "force-dynamic"` on a route skips static generation entirely — the blunt but honest instrument when per-request freshness matters.
