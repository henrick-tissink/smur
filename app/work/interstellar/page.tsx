import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { InterstellarCaseStudy } from "@/components/work/interstellar-page";

export const metadata: Metadata = {
  title: "Interstellar — SMUR",
  description: "Brand identity for a real-estate practice — celestial wordmark, considered photography, and editorial layouts.",
};

/*
  /work/interstellar — Interstellar Real Estate case study.
  Desktop only in Figma (frame 73:19115, 1440 × 5075). Mobile users see
  the desktop layout scaled proportionally via the zoom wrapper.
*/
export default function InterstellarRoute() {
  return (
    <>
      <div className="relative md:hidden">
        {/* nav at the 393 mobile scale (separate from the 1440 content zoom) —
            otherwise MobileNav's 393-width row centers inside the 1440 frame and
            the logo/menu render tiny in the middle, not at the screen edges. */}
        <div className="relative" style={{ zoom: "calc(100vw / 393px)" }}>
          <MobileNav />
        </div>
        <div style={{ zoom: "calc(100vw / 1440px)" }}>
          <main>
            <InterstellarCaseStudy />
          </main>
        </div>
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <Nav />
        <main>
          <InterstellarCaseStudy />
        </main>
      </div>
    </>
  );
}
