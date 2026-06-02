import type { Metadata } from "next";
import { MobileLavaboCaseStudy } from "@/components/mobile/lavabo-page";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { LavaboCaseStudy } from "@/components/work/lavabo-page";

export const metadata: Metadata = {
  title: "LAVABO — SMUR",
  description: "Brand identity for a concrete washbasin maker — a quiet logotype, natural materials, and editorial photography.",
};

/*
  /work/lavabo — LAVABO concrete-washbasin case study. Same dual-layout +
  viewport-zoom pattern as /work and /contact. Figma frames:
    desktop 70:6705 (1440 × 5336)
    mobile  282:38869 (393 × 2499)
*/
export default function LavaboRoute() {
  return (
    <>
      <div
        className="relative md:hidden"
        style={{ zoom: "calc(100vw / 393px)" }}
      >
        <MobileNav />
        <main>
          <MobileLavaboCaseStudy />
        </main>
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <Nav />
        <main>
          <LavaboCaseStudy />
        </main>
      </div>
    </>
  );
}
