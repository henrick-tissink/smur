import type { Metadata } from "next";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { MnfCaseStudy } from "@/components/sections/mnf-page";
import { MobileMnfCaseStudy } from "@/components/sections/mobile-mnf-page";

export const metadata: Metadata = {
  title: "Manufaktura Studio Architecture — SMUR",
  description: "Brand identity for an architecture studio — restrained typography and the studio's portfolio of spatial concepts.",
};

/*
  /work/mnf — MNF / Manufaktura Studio Architecture case study.
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage
  (desktop, Recipe A) + container-query flow (mobile, Recipe B) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default function MnfRoute() {
  return (
    <>
      <CaseStudyJsonLd slug="mnf" description={metadata.description as string} />
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileMnfCaseStudy />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <MnfCaseStudy />
        </main>
      </div>
    </>
  );
}
