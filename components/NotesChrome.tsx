"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { label: "Guides", href: "/notes/guides", icon: "auto_stories" },
  { label: "Journal", href: "/notes/journal", icon: "edit_note" },
  { label: "Projects", href: "/notes/projects", icon: "inventory_2" },
];

export default function SideDrawer() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col py-8 gap-4 h-screen w-64 sticky top-16 border-r border-outline-variant bg-surface-container-low shrink-0">
      <h2 className="font-headline-h3 text-headline-h3 text-primary px-4 mb-4">
        Documentation
      </h2>
      <nav className="flex flex-col gap-2" aria-label="Documentation">
        {ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return active ? (
            <Link
              key={item.href}
              className="flex items-center gap-3 py-2 text-primary font-bold border-l-2 border-primary pl-4 bg-surface-container-highest font-label-caps text-label-caps transition-colors"
              href={item.href}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ) : (
            <Link
              key={item.href}
              className="flex items-center gap-3 py-2 text-on-surface-variant pl-4 hover:bg-surface-container-high transition-colors font-label-caps text-label-caps"
              href={item.href}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

/** Shared page scaffold: sticky sidebar + centered content column. */
export function ContentShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex max-w-container-max w-full mx-auto mt-16 px-gutter relative">
      <SideDrawer />
      <main className="flex-1 max-w-content-width py-12 lg:pl-12 w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
