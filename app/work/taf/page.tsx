import type { Metadata } from "next";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { TafCaseStudy } from "@/components/sections/taf-page";
import { MobileTafCaseStudy } from "@/components/sections/mobile-taf-page";

export const metadata: Metadata = {
  title: "TAF — SMUR",
  description: "Brand identity for a UAE cleaning brand — fresh palette, friendly wordmark, and product packaging.",
};

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
