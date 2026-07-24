import type { Metadata } from "next";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { ArchitraveCaseStudy } from "@/components/sections/architrave-page";
import { MobileArchitraveCaseStudy } from "@/components/sections/mobile-architrave-page";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/work/architrave", "architrave");
}

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
      <CaseStudyJsonLd slug="architrave" />
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
