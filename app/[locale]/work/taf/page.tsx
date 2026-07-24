import type { Metadata } from "next";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { TafCaseStudy } from "@/components/sections/taf-page";
import { MobileTafCaseStudy } from "@/components/sections/mobile-taf-page";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/work/taf", "taf");
}

/*
  /work/taf — TAF UAE cleaning brand case study.
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage
  (desktop, Recipe A) + container-query flow (mobile, Recipe B) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default function TafRoute() {
  return (
    <>
      <CaseStudyJsonLd slug="taf" />
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileTafCaseStudy />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <TafCaseStudy />
        </main>
      </div>
    </>
  );
}
