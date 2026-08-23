"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { label: "Guides", href: "/notes/guides" },
  { label: "Journal", href: "/notes/journal" },
  { label: "Lab", href: "/notes/projects" },
  { label: "About", href: "/about" },
];

export default function NotesHeader() {
  const pathname = usePathname();
  return (
    <header className="bg-background/80 backdrop-blur-md fixed top-0 w-full z-40 border-b border-outline-variant">
      <div className="flex items-center justify-between px-gutter max-w-container-max mx-auto h-16">
        <Link className="flex items-center gap-4 hover:opacity-80 transition-opacity" href="/notes">
          <span className="material-symbols-outlined text-primary">terminal</span>
          <span className="font-headline-h2 text-headline-h2 font-bold text-on-surface">
            Rytchie&apos;s Dev Notes
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 font-body-md text-body-md" aria-label="Primary">
            {ITEMS.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`h-16 flex items-center transition-colors ${
                    active
                      ? "text-primary border-b-2 border-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            aria-label="Search"
            className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-high"
            onClick={() => window.dispatchEvent(new CustomEvent("rdn:open-search"))}
            type="button"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </header>
  );
}
