import { DesktopContactPage } from "@/components/contact/page";
import { MobileContactPage } from "@/components/mobile/contact-page";
import { MobileNav } from "@/components/mobile/nav";
import { Nav } from "@/components/nav";

/*
  /contact — "Work With Me" inquiry page. Same dual-layout + viewport-zoom
  pattern as /work. Figma frames:
    desktop 193:1383 (WORK WE ME), 1440 × 3093, sage hero + cream form + brown FAQ
    mobile  282:39442 (work w me), 393 × 2683
*/
export default function ContactRoute() {
  return (
    <>
      <div
        className="md:hidden"
        style={{ zoom: "calc(100vw / 393px)" }}
      >
        <MobileNav />
        <main>
          <MobileContactPage />
        </main>
      </div>
      <div
        className="hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav />
        <main>
          <DesktopContactPage />
        </main>
      </div>
    </>
  );
}
