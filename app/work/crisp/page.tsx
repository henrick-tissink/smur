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
      <div
        className="md:hidden"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <MobileNav />
        <main>
          <CrispCaseStudy />
        </main>
      </div>
      <div
        className="hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <CrispCaseStudy />
        </main>
      </div>
    </>
  );
}
