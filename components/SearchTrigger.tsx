"use client";

/** Input-styled trigger that opens the global search overlay. */
export default function SearchTrigger({
  placeholder = "Search notes, code snippets...",
  className = "",
  value,
}: {
  placeholder?: string;
  className?: string;
  value?: string;
}) {
  return (
    <form
      className={`relative w-full ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        const q = value ?? "";
        window.dispatchEvent(new CustomEvent("rdn:open-search", { detail: { q } }));
      }}
    >
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
        search
      </span>
      <input
        aria-label="Search notes"
        autoComplete="off"
        className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-3 pl-12 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
        name="q"
        onClick={(e) => {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("rdn:open-search"));
        }}
        onFocus={(e) => {
          e.preventDefault();
          e.target.blur();
          window.dispatchEvent(new CustomEvent("rdn:open-search"));
        }}
        placeholder={placeholder}
        readOnly
        type="text"
      />
    </form>
  );
}
