import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { TafCaseStudy } from "@/components/work/taf-page";

/*
  /work/taf — TAF UAE cleaning brand case study.
  Desktop only in Figma (frame 73:29056, 1440 × 4942). Mobile users see
  the desktop layout scaled proportionally via the zoom wrapper.
*/
export default function TafRoute() {
  return (
    <>
      <div
        className="md:hidden"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <MobileNav />
        <main>
          <TafCaseStudy />
        </main>
      </div>
      <div
        className="hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <TafCaseStudy />
        </main>
      </div>
    </>
  );
}
