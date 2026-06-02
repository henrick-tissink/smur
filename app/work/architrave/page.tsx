import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { ArchitraveCaseStudy } from "@/components/work/architrave-page";

export const metadata: Metadata = {
  title: "ARCHITRAVE Studio — SMUR",
  description: "A brand identity for an interior architecture practice rooted in minimalism, clarity of form, and the quiet dialogue between light and structure.",
};

/*
  /work/architrave — Architrave Studio interior architecture case study.
  Desktop only in Figma (frame 71:982, 1440 × 4593). Mobile users see
  the desktop layout scaled proportionally via the zoom wrapper.
*/
export default function ArchitraveRoute() {
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
            <ArchitraveCaseStudy />
          </main>
        </div>
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <Nav />
        <main>
          <ArchitraveCaseStudy />
        </main>
      </div>
    </>
  );
}
