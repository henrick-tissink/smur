"use client";

import Image from "next/image";
import { kabinett } from "@/content/kabinett";
import { Reveal } from "../reveal";

/*
  Mobile Kabinett case study — full desktop parity (June 2026).
  Desktop section order: hero (consolidated SVG) → intro → row1 brand
  photo → row2 poster (artboard 143) → row3 wordmark tile (SVG) → row3
  wine-glasses composition (artboard 142) → row4 logotype pattern (SVG)
  → bottom composition (artboard 148).
*/
const SECTIONS = [
  { src: "/figma-assets/work/kabinett/row1/photo.jpg", w: 2080, h: 3000, alt: "Kabinett brand photograph" },
  { src: "/figma-assets/work/kabinett/row2-poster.png", w: 1801, h: 2227, alt: "Kabinett ‘Cheese & Wine Evenings’ poster" },
];
const SECTIONS_B = [
  { src: "/figma-assets/work/kabinett/row3-right-flat.png", w: 872, h: 1257, alt: "Kabinett — wine glasses with the logotype overlay" },
];

export function MobileKabinettCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* Hero (consolidated SVG) — projects open on an image. */}
      <Reveal eager>
        <img
          src="/figma-assets/work/kabinett/hero.svg"
          alt="Kabinett Wine & Spirits — brand mark grid"
          className="block h-auto w-full"
        />
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div className="px-[43px] py-[36px] text-center">
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: "26px", lineHeight: 1.05 }}
          >
            {kabinett.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {kabinett.body}
          </p>
        </div>
      </Reveal>

      {/* Full-bleed visual sections in desktop order. */}
      <div className="flex flex-col gap-[12px] pb-[24px]">
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

        {/* Row 3 — KABINETT wordmark tile (consolidated SVG). */}
        <Reveal eager>
          <img
            src="/figma-assets/work/kabinett/row3-left.svg"
            alt="Kabinett Wine & Spirits wordmark on burgundy"
            className="block h-auto w-full"
          />
        </Reveal>

        {SECTIONS_B.map((s) => (
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

        {/* Row 4 — repeating logotype pattern (consolidated SVG). */}
        <Reveal eager>
          <img
            src="/figma-assets/work/kabinett/row4-photo.svg"
            alt="Kabinett repeating logotype pattern"
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/kabinett/bottom-flat.png"
            alt="Kabinett business cards and brand collateral"
            width={1793}
            height={1210}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
      </div>
    </div>
  );
}
