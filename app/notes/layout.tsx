import type { ReactNode } from "react";
import NotesHeader from "@/components/NotesHeader";
import Footer from "@/components/Footer";

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NotesHeader />
      {children}
      <Footer />
    </>
  );
}
