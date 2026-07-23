import type { Metadata } from "next";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { KabinettCaseStudy } from "@/components/sections/kabinett-page";
import { MobileKabinettCaseStudy } from "@/components/sections/mobile-kabinett-page";

export const metadata: Metadata = {
  title: "Kabinett — Wine & Spirits — SMUR",
  description: "Brand identity for a wine & spirits cabinet — geometric monogram, burgundy ground, and event-poster typography.",
};

/*
  /work/kabinett — Kabinett Wine & Spirits case study.
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage
  (desktop, Recipe A) + container-query flow (mobile, Recipe B) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default function KabinettRoute() {
  return (
    <>
      <CaseStudyJsonLd slug="kabinett" description={metadata.description as string} />
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileKabinettCaseStudy />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <KabinettCaseStudy />
        </main>
      </div>
    </>
  );
}
