"use client";

import { useEffect, useState } from "react";

import { navigation } from "@/lib/site-content";

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const sectionIds = navigation.map((item) => item.sectionId);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.1,
      },
    );

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);

      if (element) {
        observer.observe(element);
      }
    });

    const handleScroll = () => {
      setSticky(window.scrollY > 80);
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");

      if (hash) {
        setActiveSection(hash);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    handleScroll();
    handleHashChange();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="site-header" data-sticky={isSticky}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <a href="#home" className="text-2xl font-semibold tracking-tight text-text">
          Rytchie Macharia.
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent text-3xl text-text transition hover:border-accent/40 hover:text-accent md:hidden"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <i className={isMenuOpen ? "bx bx-x" : "bx bx-menu"} aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav ${isMenuOpen ? "site-nav-open" : ""}`.trim()}
          aria-label="Primary"
        >
          <div className="site-nav-panel" />
          {navigation.map((item) => (
            <a
              key={item.sectionId}
              href={item.href}
              className="site-nav-link"
              data-active={activeSection === item.sectionId}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}