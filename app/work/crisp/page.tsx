import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { CrispCaseStudy } from "@/components/work/crisp-page";

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
        <div style={{ zoom: "calc(100vw / 1440px)" }}>
          <main>
            <CrispCaseStudy />
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
