import type { Metadata } from "next";
import { CaseStudyJsonLd } from "@/components/case-study-jsonld";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { LavaboCaseStudy } from "@/components/sections/lavabo-page";
import { MobileLavaboCaseStudy } from "@/components/sections/mobile-lavabo-page";
import { buildPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/work/lavabo", "lavabo");
}

/*
  /work/lavabo — LAVABO concrete-washbasin case study.
  Faithful-fluid: render-both CSS-toggled at md, aspect-ratio stage for
  BOTH trees (lavabo is the one case study where mobile is ALSO Recipe A,
  not the usual container-query flow) — no zoom.
  data-nav-scheme="dark" on both trees, so both navs use the default
  scheme="dark".
*/
export default function LavaboRoute() {
  return (
    <>
      <CaseStudyJsonLd slug="lavabo" />
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileLavaboCaseStudy />
        </main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main>
          <LavaboCaseStudy />
        </main>
      </div>
    </>
  );
}
