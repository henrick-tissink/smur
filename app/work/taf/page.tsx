import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
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
      <div className="relative md:hidden">
        {/* nav at the 393 mobile scale (separate from the 1440 content zoom) —
            otherwise MobileNav's 393-width row centers inside the 1440 frame and
            the logo/menu render tiny in the middle, not at the screen edges. */}
        <div className="relative" style={{ zoom: "calc(100vw / 393px)", height: "80px", backgroundColor: "#fff7f4" }}>
          <MobileNav />
        </div>
        <div style={{ zoom: "calc(100vw / 1440px)" }}>
          <main>
            <TafCaseStudy />
          </main>
        </div>
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
