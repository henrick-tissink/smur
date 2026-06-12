"use client";

import Image from "next/image";
import { architrave } from "@/content/architrave";
import { Reveal } from "../reveal";

/*
  Mobile ARCHITRAVE (Architrave Studio) case study. ARCHITRAVE has no
  dedicated mobile Figma design, so this is a mobile-native reflow
  (Lavabo/CRISP-style): a readable native-size intro, then the desktop
  flat-image showcase sections re-stacked full-bleed at the 393 mobile
  width. Rendered inside the route's 393 zoom wrapper. (The vector-dense
  Group 80 / Big-middle compositions have no clean flat export, so the
  case study reflows the flat raster sections only.)

  The four hero-grid quadrants are the logo on its four background
  colours, so they read as a 2×2 brand-mark grid at the top rather than
  four stacked full-bleed shots.
*/
const HERO_GRID = [
  { src: "/figma-assets/work/architrave/hero-grid-tl.png", alt: "Architrave Studio logo — white on charcoal" },
  { src: "/figma-assets/work/architrave/hero-grid-tr.png", alt: "Architrave Studio logo — white on sage" },
  { src: "/figma-assets/work/architrave/hero-grid-bl.png", alt: "Architrave Studio logo — charcoal on white" },
  { src: "/figma-assets/work/architrave/hero-grid-br.png", alt: "Architrave Studio logo — white on taupe" },
];

const SECTIONS = [
  { src: "/figma-assets/work/architrave/row2-left.png", w: 1055, h: 1199, alt: "Architrave Studio business cards — contact details and logotype on charcoal" },
  { src: "/figma-assets/work/architrave/row2-right.png", w: 912, h: 1040, alt: "Architrave Studio Instagram profile shown on a phone" },
  { src: "/figma-assets/work/architrave/bottom-pattern.png", w: 1796, h: 989, alt: "Architrave Studio repeating logotype pattern on sage" },
];

export function MobileArchitraveCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* 2×2 hero brand-mark grid. */}
      <Reveal eager>
        <div className="grid grid-cols-2 gap-[2px] pb-[24px]">
          {HERO_GRID.map((q) => (
            <Image
              key={q.src}
              src={q.src}
              alt={q.alt}
              width={870}
              height={626}
              unoptimized
              priority
              className="block h-auto w-full"
            />
          ))}
        </div>
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div className="px-[43px] pb-[36px] text-center">
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: "26px", lineHeight: 1.05, letterSpacing: "0.01em" }}
          >
            {architrave.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {architrave.body}
          </p>
        </div>
      </Reveal>

      {/* Full-bleed visual sections in desktop order (June 2026 parity):
          group80 magazine spread (artboard 83) → row1 banner (SVG) →
          row2 tiles → big-middle presentation (artboard 87) → pattern. */}
      <div className="flex flex-col gap-[12px] pb-[24px]">
        <Reveal eager>
          <Image
            src="/figma-assets/work/architrave.png"
            alt="Architrave Studio — ‘Designing the reflection of you’ spread"
            width={1791}
            height={1294}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
        <Reveal eager>
          <Image
            src="/figma-assets/work/architrave/row1.png"
            alt="Architrave Studio logotype banner"
            width={1794}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
        {SECTIONS.slice(0, 2).map((s, i) => (
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
        <Reveal eager>
          <Image
            src="/figma-assets/work/architrave-anim/frame-presentation.png"
            alt="Architrave Studio editorial presentation spread"
            width={1798}
            height={2217}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
        {SECTIONS.slice(2).map((s) => (
          <Reveal key={s.src} eager>
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
