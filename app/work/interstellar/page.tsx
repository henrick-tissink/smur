import type { Metadata } from "next";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { InterstellarCaseStudy } from "@/components/sections/interstellar-page";
import { MobileInterstellarCaseStudy } from "@/components/sections/mobile-interstellar-page";

export const metadata: Metadata = {
  title: "Interstellar — SMUR",
  description: "Brand identity for a real-estate practice — celestial wordmark, considered photography, and editorial layouts.",
};

/*
  /work/interstellar — Interstellar Real Estate case study.
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage
  (desktop, Recipe A) + container-query flow (mobile, Recipe B) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default function InterstellarRoute() {
  return (
    <>
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileInterstellarCaseStudy />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <InterstellarCaseStudy />
        </main>
      </div>
    </>
  );
}
