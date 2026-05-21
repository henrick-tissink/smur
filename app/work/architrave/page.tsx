import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { ArchitraveCaseStudy } from "@/components/work/architrave-page";

/*
  /work/architrave — Architrave Studio interior architecture case study.
  Desktop only in Figma (frame 71:982, 1440 × 4593). Mobile users see
  the desktop layout scaled proportionally via the zoom wrapper.
*/
export default function ArchitraveRoute() {
  return (
    <>
      <div
        className="md:hidden"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <MobileNav />
        <main>
          <ArchitraveCaseStudy />
        </main>
      </div>
      <div
        className="hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <ArchitraveCaseStudy />
        </main>
      </div>
    </>
  );
}
