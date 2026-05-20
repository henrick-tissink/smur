import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";
import { KokopCaseStudy } from "@/components/work/kokop-page";

/*
  /work/kokop — KOKO.P coffee/snacks case study. Desktop only in Figma
  (frame 136:234, 1440 × 4891). The mobile layout scales the desktop down
  via zoom — same approach we use for /work and /contact when a dedicated
  mobile design doesn't exist.
*/
export default function KokopRoute() {
  return (
    <>
      <div
        className="md:hidden"
        style={{ zoom: "calc(100vw / 1440px)" }}
      >
        <MobileNav />
        <main>
          <KokopCaseStudy />
        </main>
      </div>
      <div
        className="hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <KokopCaseStudy />
        </main>
      </div>
    </>
  );
}
