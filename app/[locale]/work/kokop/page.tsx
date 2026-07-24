import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { KokopCaseStudy } from "@/components/sections/kokop-page";
import { MobileKokopCaseStudy } from "@/components/sections/mobile-kokop-page";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/work/kokop", "kokop");
}

/*
  /work/kokop — KOKO.P coffee/snacks case study. Desktop only in Figma
  (frame 136:234, 1440 × 4891).
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage
  (desktop, Recipe A) + container-query flow (mobile, Recipe B) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default async function KokopRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // opt into static rendering for this locale
  return (
    <>
      <CaseStudyJsonLd slug="kokop" />
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
