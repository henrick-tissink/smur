"use client";

import Image from "next/image";
import { taf } from "@/content/taf";
import { Reveal } from "../reveal";

/*
  Mobile TAF case study — full desktop parity (June 2026).
  Desktop section order: hero brand grid (consolidated SVG) → intro →
  row1 (product photo with logo overlay, artboard 130) → row1 right pink
  tile (SVG) → fabric band (134) → website (134_1) → bottom campaign
  shot with the logotype (artboard 135).
*/
const SECTIONS = [
  { src: "/figma-assets/work/taf/row1-left-flat.png", w: 867, h: 1176, alt: "TAF — cleaning product photo with the logotype overlay" },
];
const SECTIONS_B = [
  { src: "/figma-assets/work/taf/band-fabric.png", w: 1783, h: 1206, alt: "TAF logo printed on fabric" },
  { src: "/figma-assets/work/taf/website.png", w: 1798, h: 3348, alt: "TAF cleaning-services website landing page" },
  { src: "/figma-assets/work/taf/bottom-full.png", w: 1794, h: 1196, alt: "TAF brand campaign — hands holding product with the logotype" },
];

export function MobileTafCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* Hero brand grid — four quadrant artboards mapped by color:
         TL #2D2D2D dark (126), TR #EAB5BA pink (127), BR #FF8A80 coral
         (129), BL #DFD8CE tan (128). */}
      <Reveal eager>
        <div className="grid grid-cols-2">
          <Image
            src="/figma-assets/work/taf/hero-q-dark.png"
            alt="TAF brand mark — dark"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
          <Image
            src="/figma-assets/work/taf/hero-q-pink.png"
            alt="TAF brand mark — pink"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
          <Image
            src="/figma-assets/work/taf/hero-q-tan.png"
            alt="TAF brand mark — tan"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
          <Image
            src="/figma-assets/work/taf/hero-q-coral.png"
            alt="TAF brand mark — coral"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
        </div>
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div className="px-[43px] py-[36px] text-center">
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: "40px", lineHeight: 1, letterSpacing: "0.01em" }}
          >
            {taf.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {taf.body}
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

        {/* Row 1 right — pink icon tile (flat artboard 132). */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/taf/row1-right.png"
            alt="TAF brand icons on pink"
            width={870}
            height={1176}
            unoptimized
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
