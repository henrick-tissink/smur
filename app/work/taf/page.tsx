import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { MobileTafCaseStudy } from "@/components/mobile/taf-page";
import { TafCaseStudy } from "@/components/work/taf-page";

export const metadata: Metadata = {
  title: "TAF — SMUR",
  description: "Brand identity for a UAE cleaning brand — fresh palette, friendly wordmark, and product packaging.",
};

/*
  /work/taf — TAF UAE cleaning brand case study.
  Desktop only in Figma (frame 73:29056, 1440 × 4942). Mobile users see
  the desktop layout scaled proportionally via the zoom wrapper.
*/
export default function TafRoute() {
  return (
    <>
      <div className="relative md:hidden" style={{ zoom: "calc(100vw / 393px)" }}>
        <MobileNav />
        <main>
          <MobileTafCaseStudy />
        </main>
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <Nav />
        <main>
          <TafCaseStudy />
        </main>
      </div>
    </>
  );
}
