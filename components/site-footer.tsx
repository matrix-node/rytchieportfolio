export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-accent/20 bg-surface/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <p className="text-base text-text/90">Copyright &copy; {year} by Rytchie | All Rights Reserved</p>

        <a
          href="#home"
          className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-accent bg-accent text-2xl text-page transition hover:bg-transparent hover:text-accent"
          aria-label="Back to top"
        >
          <i className="bx bx-up-arrow-alt" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}