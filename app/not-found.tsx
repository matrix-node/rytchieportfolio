import Link from "next/link";
import ErrorTime from "@/components/ErrorTime";

export const metadata = { title: "404 Page Not Found" };

export default function NotFound() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-gutter pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-gradient-to-br from-primary-container/30 to-error/20 rounded-full blur-3xl" />
      </div>
      <div className="max-w-content-width w-full relative z-10 flex flex-col items-center text-center space-y-12">
        <div className="space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant text-error">
            <span
              className="material-symbols-outlined text-5xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              terminal
            </span>
          </div>
          <div>
            <h1 className="font-headline-h1 text-headline-h1 text-on-surface mb-4">404</h1>
            <h2 className="font-headline-h2 text-headline-h2 text-on-surface-variant">
              Page Not Found.
            </h2>
          </div>
          <p className="font-body-md text-body-md text-secondary max-w-md mx-auto">
            The requested resource could not be located on this server. It might have been
            removed, renamed, or temporarily unavailable.
          </p>
        </div>

        <div className="w-full max-w-lg mx-auto">
          <form action="/search" className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              aria-label="Search documentation"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-4 pl-12 pr-4 text-on-surface font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline/70"
              name="q"
              placeholder="Search documentation, guides, or projects..."
              type="text"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 font-label-caps text-label-caps bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded border border-outline-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors"
              type="submit"
            >
              Ctrl+K
            </button>
          </form>
        </div>

        <div className="w-full max-w-2xl mx-auto pt-8 border-t border-outline-variant/50">
          <h3 className="font-label-caps text-label-caps text-outline mb-6">Quick Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "/", icon: "home", label: "Homepage" },
              { href: "/notes/guides", icon: "auto_stories", label: "Guides" },
              { href: "/notes/journal", icon: "edit_note", label: "Journal" },
            ].map((item) => (
              <Link
                className="group flex flex-col items-center justify-center p-6 bg-surface-container-low border border-outline-variant rounded-lg hover:border-primary hover:bg-surface-container transition-all"
                href={item.href}
                key={item.href}
              >
                <span className="material-symbols-outlined text-secondary mb-3 group-hover:text-primary transition-colors">
                  {item.icon}
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full max-w-lg mx-auto mt-8 text-left">
          <div className="bg-surface-container-highest rounded-t border border-outline-variant border-b-0 px-4 py-2 flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-outline">error_log.txt</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-b p-4 overflow-x-auto">
            <pre className="font-code-block text-code-block text-error/80">
              <code>{`Error: 404
Path: /user/requested/path
Timestamp: `}
<ErrorTime />
{`
Status: Resource unavailable
Recommendation: Check syntax or return home.`}</code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
