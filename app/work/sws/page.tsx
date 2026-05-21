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
      <div
        className="md:hidden"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <MobileNav />
        <main>
          <SwsCaseStudy />
        </main>
      </div>
      <div
        className="hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <SwsCaseStudy />
        </main>
      </div>
    </>
  );
}
