import type { Metadata } from "next";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { KokopCaseStudy } from "@/components/sections/kokop-page";
import { MobileKokopCaseStudy } from "@/components/sections/mobile-kokop-page";

export const metadata: Metadata = {
  title: "KOKO.P — SMUR",
  description: "Brand identity for a coffee brand — the kokopelli mark, warm earth tones, and menu typography.",
};

/*
  /work/kokop — KOKO.P coffee/snacks case study. Desktop only in Figma
  (frame 136:234, 1440 × 4891).
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage
  (desktop, Recipe A) + container-query flow (mobile, Recipe B) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default function KokopRoute() {
  return (
    <>
      <CaseStudyJsonLd slug="kokop" description={metadata.description as string} />
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileKokopCaseStudy />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <KokopCaseStudy />
        </main>
      </div>
    </>
  );
}
