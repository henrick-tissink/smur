import type { Metadata } from "next";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { ArchitraveCaseStudy } from "@/components/sections/architrave-page";
import { MobileArchitraveCaseStudy } from "@/components/sections/mobile-architrave-page";

export const metadata: Metadata = {
  title: "ARCHITRAVE Studio — SMUR",
  description: "A brand identity for an interior architecture practice rooted in minimalism, clarity of form, and the quiet dialogue between light and structure.",
};

/*
  /work/architrave — Architrave Studio interior architecture case study.
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage
  (desktop, Recipe A) + container-query flow (mobile, Recipe B) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default function ArchitraveRoute() {
  return (
    <>
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileArchitraveCaseStudy />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <ArchitraveCaseStudy />
        </main>
      </div>
    </>
  );
}
