import type { Metadata } from "next";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { WorkPage } from "@/components/sections/work-page";
import { MobileWorkPage } from "@/components/sections/mobile-work-page";

export const metadata: Metadata = {
  title: "Selected Work — SMUR",
  description:
    "Selected branding and design projects by SMUR — case studies in naming, identity, packaging, and editorial systems.",
};

/*
  /work — Selected Work page. Faithful-fluid: render-both, CSS-toggled at the
  md breakpoint, no zoom/scale/fixed-canvas wrapper (same pattern as the home
  route, app/page.tsx). Nav/MobileNav default to scheme="dark" (cream bg
  #fff7f4, ink text) which matches the work page's data-nav-scheme="dark".
*/
export default function WorkRoute() {
  return (
    <>
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileWorkPage />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <WorkPage />
        </main>
      </div>
    </>
  );
}
