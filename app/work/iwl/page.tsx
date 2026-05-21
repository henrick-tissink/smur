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
      <div
        className="md:hidden"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <MobileNav />
        <main>
          <IwlCaseStudy />
        </main>
      </div>
      <div
        className="hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <IwlCaseStudy />
        </main>
      </div>
    </>
  );
}
