---
title: Container Queries in Tailwind v3
excerpt: "Experimenting with @container to build truly component-driven layouts that don't rely on viewport breakpoints. Game changer for reusable UI."
date: "2023-09-12"
tags: [CSS, Tailwind]
---

Experimenting with `@container` to build truly component-driven layouts that don't rely on viewport breakpoints. Game changer for reusable UI.

The pitch: a card component should adapt to the space *it* has, not the space the browser window has. Same card renders as a list row in a narrow sidebar and as a full grid tile in the main content area.

```css title="card.css"
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 480px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}
```

```html title="usage.html"
<div class="card-wrapper">
  <article class="card">
    <!-- adapts to .card-wrapper, not the viewport -->
  </article>
</div>
```

Tailwind exposes it cleanly with the official plugin — `@container` on the wrapper, then `@md:grid-cols-[120px_1fr]` variants on the card. The mental model shift is real: stop designing pages, start designing components with their own responsive contracts.
