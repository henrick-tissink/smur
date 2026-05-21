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
      <div
        className="md:hidden"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <MobileNav />
        <main>
          <InterstellarCaseStudy />
        </main>
      </div>
      <div
        className="hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <InterstellarCaseStudy />
        </main>
      </div>
    </>
  );
}
