import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { KabinettCaseStudy } from "@/components/work/kabinett-page";

export const metadata: Metadata = {
  title: "Kabinett — Wine & Spirits — SMUR",
  description: "Brand identity for a wine & spirits cabinet — geometric monogram, burgundy ground, and event-poster typography.",
};

/*
  /work/kabinett — Kabinett Wine & Spirits case study.
  Desktop only in Figma (frame 73:36625, 1440 × 4985). Mobile users see
  the desktop layout scaled proportionally via the zoom wrapper.
*/
export default function KabinettRoute() {
  return (
    <>
      <div
        className="relative md:hidden"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <MobileNav />
        <main>
          <KabinettCaseStudy />
        </main>
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <KabinettCaseStudy />
        </main>
      </div>
    </>
  );
}
