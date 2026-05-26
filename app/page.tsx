import { About } from "@/components/about";
import { Hero } from "@/components/hero";
import { MobileLayout } from "@/components/mobile";
import { Nav } from "@/components/nav";
import { PhotoStrip } from "@/components/photo-strip";
import { ServiceCard } from "@/components/service-card";
import { ServicesList } from "@/components/services-list";
import { Testimonial } from "@/components/testimonial";
import { services } from "@/content/home";

/*
  Renders BOTH mobile and desktop layouts; CSS visibility toggles which one
  the user sees based on viewport. Server-rendered so no FOUC.

  Each layout is wrapped in a CSS `zoom` container so it scales proportionally
  with the viewport (instead of overflowing or sitting with awkward margins
  at non-design widths):
    - Desktop (designed at 1440 wide): zoom = min(1, viewport / 1440)
      Caps at 1.0 so the layout doesn't grow beyond its native size on
      ultra-wide displays; scales down between the breakpoint (768) and 1440.
    - Mobile (designed at 393 wide): zoom = viewport / 393
      No cap — the design scales freely to fill the viewport from 0 to 767.

  Why `zoom` and not `transform: scale`: `zoom` actually changes the
  effective box size (no need to manually compute container heights),
  preserves position: fixed semantics for the nav, and is supported in all
  modern browsers (Chrome, Safari, Firefox 126+).
*/
export default function Home() {
  return (
    <>
      <div
        className="relative md:hidden"
        style={{ zoom: "calc(100vw / 393px)" }}
      >
        <MobileLayout />
      </div>
      <div
        className="relative hidden md:block"
        style={{ zoom: "min(1, calc(100vw / 1440px))" }}
      >
        <Nav scheme="light" />
        <main>
          <Hero />
          <ServiceCard service={services[0]} />
          <ServiceCard service={services[1]} />
          <ServicesList />
          <Testimonial />
          <PhotoStrip />
          <About />
        </main>
      </div>
    </>
  );
}
