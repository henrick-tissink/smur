"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { iwl } from "@/content/iwl";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid mobile IWL case study — full desktop parity (June 2026).
  Ported from components/mobile/iwl-page.tsx (MobileIwlCaseStudy) to
  Recipe B (container-query flow): the legacy root was a fixed
  `width: "393px"` canvas scaled by the route's `zoom` wrapper; here the
  root is a fluid `w-full` box with `containerType: "inline-size"` and
  every fixed px value (paddingTop, section padding/margin/gap, font
  sizes) expressed as `mcqw(N)` on the 393-wide legacy basis, so `1cqw`
  == 1% of the root's rendered width — reproducing the old zoom's
  proportional scaling without a transform.

  content/iwl.ts has no `iwlFrame.mobile`, so M_W = 393 (the legacy
  mobile canvas width) per the task brief.

  Desktop section order: hero band (artboard 101) -> intro -> row1 (arch
  photo + Möbius panel, artboard 104) -> banner (105) -> red business-card
  band (107) -> pattern (107_1) -> row4 tiles (110/109) -> poster (112).

  Images are already fluid in the legacy component (w-full h-auto,
  intrinsic aspect ratio via width/height props) and need no positional
  conversion — only the surrounding fixed-px spacing/typography does.
*/

const M_W = 393; // legacy mobile canvas width

function mcqw(px: number) {
  return `${(px / M_W) * 100}cqw`;
}

const SECTIONS = [
  { src: "/figma-assets/work/iwl/row1-photo.jpg", w: 1964, h: 2946, alt: "IWL editorial photograph" },
  { src: "/figma-assets/work/iwl/row1-right.png", w: 874, h: 1045, alt: "IWL — Möbius marks on the Institute red panel" },
  { src: "/figma-assets/work/iwl/banner.png", w: 1798, h: 1195, alt: "Welcome to the Institute for World Literature banner" },
  { src: "/figma-assets/work/iwl/row2-band.png", w: 1793, h: 985, alt: "IWL business cards on the Institute red band" },
  { src: "/figma-assets/work/iwl/pattern.png", w: 1789, h: 1216, alt: "IWL repeating logotype pattern" },
  { src: "/figma-assets/work/iwl/row4-left.png", w: 871, h: 1046, alt: "IWL programme brochure spread" },
  { src: "/figma-assets/work/iwl/row4-right.png", w: 871, h: 1042, alt: "IWL — a participant reading, with the Möbius logo overlay" },
  { src: "/figma-assets/work/iwl/poster.png", w: 1790, h: 2159, alt: "IWL Harvard University 2023 session poster" },
];

export function MobileIwlCaseStudy() {
  const t = useTranslations("CaseStudies.iwl");
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto w-full"
      style={{
        containerType: "inline-size",
        backgroundColor: "#fff7f4",
        paddingTop: mcqw(100), // was 100px
      }}
    >
      {/* Hero band (artboard 101) — projects open on an image. */}
      <Reveal eager>
        <Image
          src="/figma-assets/work/iwl/hero-flat.png"
          alt="The Institute for World Literature — brand hero"
          width={1788}
          height={776}
          unoptimized
          priority
          className="block h-auto w-full"
        />
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div
          className="text-center"
          style={{ paddingLeft: mcqw(43), paddingRight: mcqw(43), paddingTop: mcqw(36), paddingBottom: mcqw(36) }}
        >
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: mcqw(22), lineHeight: 1.1, letterSpacing: "0.01em" }}
          >
            {t("eyebrow")}
          </p>
          <p
            className="text-ink"
            style={{ marginTop: mcqw(20), fontSize: mcqw(15), lineHeight: 1.45 }}
          >
            {t("body")}
          </p>
        </div>
      </Reveal>

      {/* Full-bleed visual sections in desktop order. */}
      <div className="flex flex-col" style={{ gap: mcqw(12), paddingBottom: mcqw(24) }}>
        {SECTIONS.map((s, i) => (
          <Reveal key={s.src} eager delay={0.03 * i}>
            <Image
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              unoptimized
              className="block h-auto w-full"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
