import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { IwlCaseStudy } from "@/components/work/iwl-page";

export const metadata: Metadata = {
  title: "IWL — Harvard Institute For World Literature — SMUR",
  description: "Brand identity for the Harvard Institute For World Literature — a Möbius mark and editorial system anchored in literary heritage.",
};

/*
  /work/iwl — Harvard Institute for World Literature case study.
  Desktop only in Figma (frame 71:4377, 1440 × 5081). Mobile users see
  the desktop layout scaled proportionally via the zoom wrapper.
*/
export default function IwlRoute() {
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
            <IwlCaseStudy />
          </main>
        </div>
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <Nav />
        <main>
          <IwlCaseStudy />
        </main>
      </div>
    </>
  );
}
