import type { Metadata } from "next";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { InterstellarCaseStudy } from "@/components/sections/interstellar-page";
import { MobileInterstellarCaseStudy } from "@/components/sections/mobile-interstellar-page";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/work/interstellar", "interstellar");
}

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
      <CaseStudyJsonLd slug="interstellar" />
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
