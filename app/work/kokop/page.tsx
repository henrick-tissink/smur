import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { KokopCaseStudy } from "@/components/work/kokop-page";

export const metadata: Metadata = {
  title: "KOKO.P — SMUR",
  description: "Brand identity for a coffee brand — the kokopelli mark, warm earth tones, and menu typography.",
};

/*
  /work/kokop — KOKO.P coffee/snacks case study. Desktop only in Figma
  (frame 136:234, 1440 × 4891). Mobile users see the desktop layout
  scaled proportionally via the zoom wrapper.
*/
export default function KokopRoute() {
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
            <KokopCaseStudy />
          </main>
        </div>
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <Nav />
        <main>
          <KokopCaseStudy />
        </main>
      </div>
    </>
  );
}
