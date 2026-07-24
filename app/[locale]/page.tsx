import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata } from "@/lib/page-metadata";
import { services } from "@/content/home";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { Hero } from "@/components/sections/hero";
import { MobileHero } from "@/components/sections/mobile-hero";
import { ServiceSection } from "@/components/sections/service-section";
import { MobileServiceSection } from "@/components/sections/mobile-service-section";
import { ServicesListSection } from "@/components/sections/services-list-section";
import { MobileServicesListSection } from "@/components/sections/mobile-services-list-section";
import { Testimonial } from "@/components/sections/testimonial";
import { MobileTestimonial } from "@/components/sections/mobile-testimonial";
import { PhotoStrip } from "@/components/sections/photo-strip";
import { MobilePhotoStrip } from "@/components/sections/mobile-photo-strip";
import { About } from "@/components/sections/about";
import { MobileAbout } from "@/components/sections/mobile-about";

/*
  Renders BOTH mobile and desktop trees; CSS visibility (`md:hidden` /
  `hidden md:block`) toggles which one the user sees. Server-rendered so no
  FOUC. No `zoom`, no `transform: scale`, no fixed 1440px/393px canvas —
  every section is fluid/responsive on its own (faithful-fluid rebuild).

  Desktop sections carry their own internal vertical padding
  (`--space-section`) baked in, so `<main>` stacks them with correct rhythm
  with zero extra gap needed here.

  Mobile sections do NOT carry inter-section spacing (each is a
  fixed-content block sized to its own Figma height), so the legacy
  mobile rhythm (marginTop 71/71/71/53/0/0, see former
  `components/mobile/index.tsx`) is reproduced here fluidly: `clamp()` holds
  the exact Figma px value at the 393 design width and the mobile breakpoint
  ceiling (767px), while easing down proportionally on narrower phones
  instead of collapsing abruptly.
*/
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "", "home");
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale); // opt into static rendering for this locale
  return (
    <>
      {/* Mobile tree — m- ids, shown < md */}
      <div className="md:hidden">
        <MobileNav />
        <main>
          <MobileHero />
          <div style={{ marginTop: "clamp(48px, 18.07vw, 71px)" }}>
            <MobileServiceSection service={services[0]} />
          </div>
          <div style={{ marginTop: "clamp(48px, 18.07vw, 71px)" }}>
            <MobileServiceSection service={services[1]} />
          </div>
          <div style={{ marginTop: "clamp(48px, 18.07vw, 71px)" }}>
            <MobileServicesListSection />
          </div>
          <div style={{ marginTop: "clamp(36px, 13.49vw, 53px)" }}>
            <MobileTestimonial />
          </div>
          <MobilePhotoStrip />
          <MobileAbout />
        </main>
      </div>
      {/* Desktop tree — canonical ids, shown >= md */}
      <div className="hidden md:block">
        <Nav scheme="light" />
        <main>
          <Hero />
          <ServiceSection service={services[0]} />
          <ServiceSection service={services[1]} />
          <ServicesListSection />
          <Testimonial />
          <PhotoStrip />
          <About />
        </main>
      </div>
    </>
  );
}
