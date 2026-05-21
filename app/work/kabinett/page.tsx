import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { KabinettCaseStudy } from "@/components/work/kabinett-page";

/*
  /work/kabinett — Kabinett Wine & Spirits case study.
  Desktop only in Figma (frame 73:36625, 1440 × 4985). Mobile users see
  the desktop layout scaled proportionally via the zoom wrapper.
*/
export default function KabinettRoute() {
  return (
    <>
      <div
        className="md:hidden"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <MobileNav />
        <main>
          <KabinettCaseStudy />
        </main>
      </div>
      <div
        className="hidden md:block"
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
