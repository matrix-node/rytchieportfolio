import SearchOverlay from "@/components/SearchOverlay";

export const metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <main className="flex-grow pt-24 px-gutter max-w-content-width mx-auto pb-12 opacity-50 select-none pointer-events-none">
      <h1 className="font-headline-h1 text-headline-h1 mb-6 text-on-surface">Search</h1>
      <div className="space-y-6">
        <div className="p-6 border border-outline-variant rounded-lg bg-surface-container-low">
          <h3 className="font-headline-h3 text-headline-h3 mb-2">Searching the notes…</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Use the overlay to find guides, journal entries, and projects.
          </p>
        </div>
      </div>
      <SearchOverlay autoOpen />
    </main>
  );
}
