import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { WorkPage } from "@/components/sections/work-page";
import { MobileWorkPage } from "@/components/sections/mobile-work-page";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/work", "work");
}

/*
  /work — Selected Work page. Faithful-fluid: render-both, CSS-toggled at the
  md breakpoint, no zoom/scale/fixed-canvas wrapper (same pattern as the home
  route, app/page.tsx). Nav/MobileNav default to scheme="dark" (cream bg
  #fff7f4, ink text) which matches the work page's data-nav-scheme="dark".
*/
export default async function WorkRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // opt into static rendering for this locale
  return (
    <>
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileWorkPage />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <WorkPage />
        </main>
      </div>
    </>
  );
}
