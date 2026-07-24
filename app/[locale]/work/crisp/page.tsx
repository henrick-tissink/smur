import type { Metadata } from "next";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { CrispCaseStudy } from "@/components/sections/crisp-page";
import { MobileCrispCaseStudy } from "@/components/sections/mobile-crisp-page";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/work/crisp", "crisp");
}

/*
  /work/crisp — CRISP artisanal pastry brand identity. Desktop only in
  Figma (frame 71:3160, 1440 × 5340).
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage
  (desktop, Recipe A) + container-query flow (mobile, Recipe B) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default function CrispRoute() {
  return (
    <>
      <CaseStudyJsonLd slug="crisp" />
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileCrispCaseStudy />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <CrispCaseStudy />
        </main>
      </div>
    </>
  );
}
