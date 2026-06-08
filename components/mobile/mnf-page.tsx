"use client";

import Image from "next/image";
import { mnf } from "@/content/mnf";
import { Reveal } from "../reveal";

/*
  Mobile MNF (Manufaktura Studio) case study — full desktop parity
  (June 2026). Desktop section order: hero band (consolidated SVG) →
  intro → cascading website screens → row1 logo tiles (SVGs) → gold
  fluted card band → brand/interior grid → bottom interior with the
  wordmark (artboard 77).
*/
const SECTIONS = [
  { src: "/figma-assets/work/mnf/screens.jpg", w: 1793, h: 1180, alt: "Manufaktura website screens" },
];
const SECTIONS_B = [
  { src: "/figma-assets/work/mnf/gold-band.jpg", w: 1793, h: 1195, alt: "Manufaktura business cards on fluted brass" },
  { src: "/figma-assets/work/mnf/grid.jpg", w: 1799, h: 2480, alt: "Manufaktura brand and interior grid" },
  { src: "/figma-assets/work/mnf/bottom-full.png", w: 1791, h: 1208, alt: "Manufaktura Studio interior with the studio wordmark" },
];

export function MobileMnfCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* Hero band (consolidated SVG) — projects open on an image. */}
      <Reveal eager>
        <img
          src="/figma-assets/work/mnf/hero.svg"
          alt="Manufaktura Studio — brand hero"
          className="block h-auto w-full"
        />
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div className="px-[43px] py-[36px] text-center">
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: "26px", lineHeight: 1.05, letterSpacing: "0.01em" }}
          >
            {mnf.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {mnf.body}
          </p>
        </div>
      </Reveal>

      {/* Full-bleed visual sections in desktop order. */}
      <div className="flex flex-col gap-[12px] pb-[24px]">
        {SECTIONS.map((s) => (
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

        {/* Row 1 — M monogram tiles (consolidated SVGs). */}
        <Reveal eager>
          <img
            src="/figma-assets/work/mnf/row1-left.svg"
            alt="Manufaktura M monogram — dark ground"
            className="block h-auto w-full"
          />
        </Reveal>
        <Reveal eager>
          <img
            src="/figma-assets/work/mnf/row1-right.svg"
            alt="Manufaktura M monogram — sage ground"
            className="block h-auto w-full"
          />
        </Reveal>

        {SECTIONS_B.map((s, i) => (
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
