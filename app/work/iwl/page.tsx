import type { Metadata } from "next";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { IwlCaseStudy } from "@/components/sections/iwl-page";
import { MobileIwlCaseStudy } from "@/components/sections/mobile-iwl-page";

export const metadata: Metadata = {
  title: "IWL — Harvard Institute For World Literature — SMUR",
  description: "Brand identity for the Harvard Institute For World Literature — a Möbius mark and editorial system anchored in literary heritage.",
};

/*
  /work/iwl — Harvard Institute for World Literature case study.
  Faithful-fluid: aspect-ratio stage (desktop) + container-query flow
  (mobile), render-both CSS-toggled at md, new nav. No zoom.
*/
export default function IwlRoute() {
  return (
    <>
      <CaseStudyJsonLd slug="iwl" description={metadata.description as string} />
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileIwlCaseStudy />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <IwlCaseStudy />
        </main>
      </div>
    </>
  );
}
