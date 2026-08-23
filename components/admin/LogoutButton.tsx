"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      className="flex items-center gap-1.5 font-label-caps text-label-caps text-on-surface-variant hover:text-error transition-colors px-3 py-1.5 rounded border border-outline-variant hover:border-error"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      type="button"
    >
      <span className="material-symbols-outlined text-[16px]">logout</span>
      Logout
    </button>
  );
}
