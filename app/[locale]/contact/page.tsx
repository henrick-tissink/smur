import type { Metadata } from "next";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { ContactHero } from "@/components/sections/contact-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactFAQ } from "@/components/sections/contact-faq";
import { MobileContactHero } from "@/components/sections/mobile-contact-hero";
import { MobileContactForm } from "@/components/sections/mobile-contact-form";
import { MobileContactFAQ } from "@/components/sections/mobile-contact-faq";

export const metadata: Metadata = {
  title: "Let's Work Together — SMUR",
  description:
    "Tell me about your project — naming, branding, packaging, or editorial design. SMUR collaborates with founders and small teams shaping new ventures.",
};

/*
  Renders BOTH mobile and desktop trees; CSS visibility (`md:hidden` /
  `hidden md:block`) toggles which one the user sees. Server-rendered so no
  FOUC. No `zoom`, no `transform: scale`, no fixed 1440px/393px canvas —
  every section is fluid/responsive on its own (faithful-fluid rebuild).
  Same pattern as `app/page.tsx`.

  Both mobile and desktop Contact sections (Form, FAQ) already carry their
  own internal vertical padding (`var(--space-section)`), so `<main>` stacks
  them with correct rhythm with zero extra gap needed here — unlike the home
  mobile tree, which needed explicit `clamp()` margin wrappers because its
  mobile sections were fixed-height Figma blocks with no self-padding.
*/
export default function ContactRoute() {
  return (
    <>
      {/* Mobile tree — shown < md */}
      <div className="md:hidden">
        <MobileNav scheme="light" />
        <main>
          <MobileContactHero />
          <MobileContactForm />
          <MobileContactFAQ />
        </main>
      </div>
      {/* Desktop tree — shown >= md */}
      <div className="hidden md:block">
        <Nav scheme="light" />
        <main>
          <ContactHero />
          <ContactForm />
          <ContactFAQ />
        </main>
      </div>
    </>
  );
}
