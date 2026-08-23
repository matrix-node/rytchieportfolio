import { redirect } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";
import { isAuthed } from "@/lib/auth";

export const metadata = { title: "Admin Login" };

export default async function AdminLoginPage() {
  if (await isAuthed()) redirect("/admin");
  return (
    <main className="flex-grow flex items-center justify-center px-gutter py-24">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container-high border border-outline-variant text-primary">
            <span className="material-symbols-outlined text-3xl">terminal</span>
          </div>
          <div>
            <h1 className="font-headline-h1 text-headline-h1 text-on-surface">Writer&apos;s Room</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Private area for Rytchie. The public never sees drafts.
            </p>
          </div>
        </div>
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6">
          <LoginForm />
        </div>
        <Link
          className="text-center font-body-sm text-body-sm text-outline hover:text-on-surface transition-colors"
          href="/"
        >
          &larr; Back to the site
        </Link>
      </div>
    </main>
  );
}
