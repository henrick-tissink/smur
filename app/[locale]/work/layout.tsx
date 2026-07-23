"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BackToTop } from "@/components/back-to-top";

/*
  Layout for /work and its case-study routes. Appends the branded "back to
  top" footer to individual project pages (/work/<slug>) but NOT to the /work
  index itself. Client component so it can read the active pathname.
*/
export default function WorkLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/work/");

  return (
    <>
      {children}
      {isProjectPage && <BackToTop />}
    </>
  );
}
