import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { KabinettCaseStudy } from "@/components/sections/kabinett-page";
import { MobileKabinettCaseStudy } from "@/components/sections/mobile-kabinett-page";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/work/kabinett", "kabinett");
}

/*
  /work/kabinett — Kabinett Wine & Spirits case study.
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage
  (desktop, Recipe A) + container-query flow (mobile, Recipe B) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default async function KabinettRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // opt into static rendering for this locale
  return (
    <>
      <CaseStudyJsonLd slug="kabinett" />
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
