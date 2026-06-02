import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { CrispCaseStudy } from "@/components/work/crisp-page";
import { MobileScaledCaseStudy } from "@/components/work/mobile-scaled-case-study";
import { crisp, crispFrame } from "@/content/crisp";

export const metadata: Metadata = {
  title: "CRISP — SMUR",
  description: "Brand identity for an artisanal patisserie — refined simplicity, contemporary craft, and an international sensibility.",
};

/*
  /work/crisp — CRISP artisanal pastry brand identity. Desktop only in
  Figma (frame 71:3160, 1440 × 5340). Mobile users see the desktop layout
  scaled proportionally via the zoom wrapper.
*/
export default function CrispRoute() {
  return (
    <>
      <div className="relative md:hidden">
        {/* nav at the 393 mobile scale (separate from the 1440 content zoom) —
            otherwise MobileNav's 393-width row centers inside the 1440 frame and
            the logo/menu render tiny in the middle, not at the screen edges. */}
        <div className="relative" style={{ zoom: "calc(100vw / 393px)", height: "80px", backgroundColor: "#fff7f4" }}>
          <MobileNav />
        </div>
        <div style={{ backgroundColor: "#fff7f4" }}>
          <main>
            {/* PROTOTYPE: readable intro + scaled visual showcase, so the body
                copy isn't shrunk to ~5px. Intro spans y846–1038, first visual
                at y1125 (measured). */}
            <MobileScaledCaseStudy
              eyebrow={crisp.eyebrow}
              body={crisp.body}
              introY={846}
              visualsY={1125}
              frameHeight={crispFrame.desktop.height}
            >
              <CrispCaseStudy />
            </MobileScaledCaseStudy>
          </main>
        </div>
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <Nav />
        <main>
          <CrispCaseStudy />
        </main>
      </div>
    </>
  );
}
