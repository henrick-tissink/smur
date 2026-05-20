import { MobileLavaboCaseStudy } from "@/components/mobile/lavabo-page";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { LavaboCaseStudy } from "@/components/work/lavabo-page";

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
        className="md:hidden"
        style={{ zoom: "calc(100vw / 393px)" }}
      >
        <MobileNav />
        <main>
          <MobileLavaboCaseStudy />
        </main>
      </div>
      <div
        className="hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <LavaboCaseStudy />
        </main>
      </div>
    </>
  );
}
