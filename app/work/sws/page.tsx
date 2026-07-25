import type { Metadata } from "next";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { SwsCaseStudy } from "@/components/sections/sws-page";
import { MobileSwsCaseStudy } from "@/components/sections/mobile-sws-page";

export const metadata: Metadata = {
  title: "Sassy Woman Society — SMUR",
  description: "Brand identity for the Sassy Woman Society — bold typography and an editorial system for membership and events.",
};

/*
  /work/sws — Sassy Woman Society case study.
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage
  (desktop, Recipe A) + container-query flow (mobile, Recipe B) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default function SwsRoute() {
  return (
    <>
      <CaseStudyJsonLd slug="sws" description={metadata.description as string} />
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileSwsCaseStudy />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <SwsCaseStudy />
        </main>
      </div>
    </>
  );
}
