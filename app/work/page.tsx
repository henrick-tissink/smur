import type { Metadata } from "next";
import { MobileNav } from "@/components/mobile/nav";
import { MobileWorkPage } from "@/components/mobile/work-page";
import { Nav } from "@/components/nav";
import { DesktopWorkPage } from "@/components/work/page";

export const metadata: Metadata = {
  title: "Selected Work — SMUR",
  description:
    "Selected branding and design projects by SMUR — case studies in naming, identity, packaging, and editorial systems.",
};

/*
  /work — Selected Work page. Same nav + viewport-zoom + dual-layout pattern
  as the home page. The two layouts have the same nav (which is adaptive per
  data-nav-scheme on the page section), so we render the matching Nav inside
  each scaled wrapper so it scales with the layout.

  Desktop frame (Figma 1:243): 1440 × 5187, bg #fff7f4
  Mobile frame  (Figma 268:37131): 393 × 2309, bg #fff7f4
*/
export default function WorkRoute() {
  return (
    <>
      <div
        className="md:hidden"
        style={{ zoom: "calc(100vw / 393px)" }}
      >
        <MobileNav />
        <main>
          <MobileWorkPage />
        </main>
      </div>
      <div
        className="hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <DesktopWorkPage />
        </main>
      </div>
    </>
  );
}
