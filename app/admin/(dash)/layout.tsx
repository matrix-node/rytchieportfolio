import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import { isAuthed } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await isAuthed())) redirect("/admin/login");

  return (
    <div className="flex-grow flex flex-col">
      <header className="bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-40">
        <div className="flex items-center justify-between px-gutter max-w-container-max mx-auto h-16">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-status-seedling">edit_document</span>
            <span className="font-headline-h2 text-headline-h2 font-bold text-on-surface">
              Dev Notes <span className="text-status-seedling">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="flex items-center gap-1.5 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded border border-outline-variant"
              href="/"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              View Site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="flex-1 px-gutter max-w-container-max mx-auto w-full py-10">{children}</div>
    </div>
  );
}
