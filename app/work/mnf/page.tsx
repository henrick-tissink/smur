import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { MnfCaseStudy } from "@/components/work/mnf-page";

export const metadata: Metadata = {
  title: "Manufaktura Studio Architecture — SMUR",
  description: "Brand identity for an architecture studio — restrained typography and the studio's portfolio of spatial concepts.",
};

/*
  /work/mnf — MNF / Manufaktura Studio Architecture case study.
  Desktop only in Figma (frame 71:343, 1440 × 4367). Mobile users see
  the desktop layout scaled proportionally via the zoom wrapper.
*/
export default function MnfRoute() {
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
            <MnfCaseStudy />
          </main>
        </div>
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <Nav />
        <main>
          <MnfCaseStudy />
        </main>
      </div>
    </>
  );
}
