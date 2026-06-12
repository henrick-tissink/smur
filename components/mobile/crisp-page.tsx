"use client";

import Image from "next/image";
import { crisp } from "@/content/crisp";
import { Reveal } from "../reveal";

/*
  Mobile CRISP case study — full desktop parity (June 2026).
  Sections mirror the desktop order using the designer's flat artboards
  (EXPORTS SMUR WEBSITE 2/PROJECTS/CRISP):
    hero (artboard 89) → intro → café (91) → badges (91_1) → pattern band
    (93) → instagram (95) → cards (96) → band w/ baked CRISP overlay (97)
    → row3 icon tile (99) → row3 pastry photo + circular-stamp overlay
    (composite) → "now open" poster (100).
*/
const SECTIONS_A = [
  { src: "/figma-assets/work/crisp/row1-cafe.jpg", w: 851, h: 1044, alt: "CRISP café interior with logotype" },
  { src: "/figma-assets/work/crisp/row1-badges.png", w: 848, h: 1045, alt: "CRISP — artisanal patisserie marks" },
  { src: "/figma-assets/work/crisp/band-pattern.png", w: 1771, h: 1208, alt: "CRISP pattern — wordmark, croissant marks and ‘artisanal patisserie’ stamps" },
  { src: "/figma-assets/work/crisp/instagram-mockup.png", w: 867, h: 1045, alt: "CRISP Instagram feed on a phone" },
  { src: "/figma-assets/work/crisp/business-cards.png", w: 847, h: 1045, alt: "CRISP business cards on a sage background" },
  { src: "/figma-assets/work/crisp/band-full.png", w: 1786, h: 1214, alt: "CRISP brand showcase — pastry with the CRISP wordmark" },
  { src: "/figma-assets/work/crisp/row3-icons.png", w: 869, h: 1045, alt: "CRISP icon set — croissant, coffee and heart line marks" },
];
const POSTER = { src: "/figma-assets/work/crisp/now-open-poster.png", w: 1796, h: 2228, alt: "CRISP ‘We are now open!’ folded poster" };

export function MobileCrispCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* Hero brand mark (artboard 89) — projects open on an image. */}
      <Reveal eager>
        <Image
          src="/figma-assets/work/crisp/hero-flat.png"
          alt="CRISP — artisanal patisserie brand mark"
          width={1766}
          height={1218}
          unoptimized
          priority
          className="block h-auto w-full"
        />
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div className="px-[43px] py-[36px] text-center">
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: "40px", lineHeight: 1, letterSpacing: "0.01em" }}
          >
            {crisp.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {crisp.body}
          </p>
        </div>
      </Reveal>

      {/* Full-bleed visual sections in desktop order. */}
      <div className="flex flex-col gap-[12px] pb-[24px]">
        {SECTIONS_A.map((s, i) => (
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

        {/* Row 3 right — pastry photo with the circular croissant stamp,
            using the designer's flat artboard (99_1, stamp baked in). */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/crisp/row3-right-flat.png"
            alt="CRISP pastry photograph with circular croissant stamp"
            width={857}
            height={1044}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src={POSTER.src}
            alt={POSTER.alt}
            width={POSTER.w}
            height={POSTER.h}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
      </div>
    </div>
  );
}
