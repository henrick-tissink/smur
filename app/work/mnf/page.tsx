import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { MobileMnfCaseStudy } from "@/components/mobile/mnf-page";
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
      {/* Mobile-native reflow (Lavabo/CRISP-style): full-bleed sections +
          readable intro at the 393 mobile scale, instead of the shrunk 1440
          frame. */}
      <div
        className="relative md:hidden"
        style={{ zoom: "calc(100vw / 393px)" }}
      >
        <MobileNav />
        <main>
          <MobileMnfCaseStudy />
        </main>
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
