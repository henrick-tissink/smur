import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { SwsCaseStudy } from "@/components/work/sws-page";

export const metadata: Metadata = {
  title: "Sassy Woman Society — SMUR",
  description: "Brand identity for the Sassy Woman Society — bold typography and an editorial system for membership and events.",
};

/*
  /work/sws — Sassy Woman Society case study.
  Desktop only in Figma (frame 73:40179, 1440 × 4053). Mobile users see
  the desktop layout scaled proportionally via the zoom wrapper.
*/
export default function SwsRoute() {
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
            <SwsCaseStudy />
          </main>
        </div>
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <Nav />
        <main>
          <SwsCaseStudy />
        </main>
      </div>
    </>
  );
}
