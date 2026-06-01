"use client";

import Image from "next/image";
import { lavaboFrame } from "@/content/lavabo";
import { Reveal } from "../reveal";

/*
  Mobile LAVABO case study (Figma 282:38869). 393 × 2499, cream #fff7f4.
  Visual-only — Figma's mobile design has no title/body block (intentional;
  see content/lavabo.ts).

  Layout (absolute children at exact Figma y-coords):
    y=104   2×2 logotype grid (190 × 137 each, no gap)
    y=735   sink-photo.png (392 × 262, shared asset with desktop)
    y=1008  logotype-band.svg (393 × 155)
    y=1175  letterforms-grid.svg (393 × 222)
    y=1409  sink-hero.png with white overlay (391 × 392, shared asset)
    y=1813  mark.svg (393 × 126)
    y=1951  brand-book.png (vector-composed screenshot, 393 × 545)

  sink-photo.png + sink-hero.png are byte-identical to the desktop assets,
  so we reference the desktop paths instead of duplicating files.
*/
export function MobileLavaboCaseStudy() {
  const { width, height } = lavaboFrame.mobile;
  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* 2x2 logotype grid */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 1.38, top: 104.43, width: 189.99, height: 136.65 }}
        >
          <Image
            src="/figma-assets/work/lavabo/mobile/grid-1.svg"
            alt="LAVABO logotype — black ground"
            width={190}
            height={137}
            unoptimized
            priority
            className="block h-full w-full"
          />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <div
          className="absolute"
          style={{ left: 202.01, top: 104, width: 189.99, height: 136.65 }}
        >
          <Image
            src="/figma-assets/work/lavabo/mobile/grid-2.svg"
            alt="LAVABO logotype — sand ground"
            width={190}
            height={137}
            unoptimized
            priority
            className="block h-full w-full"
          />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div
          className="absolute"
          style={{ left: 0, top: 250.55, width: 189.99, height: 136.65 }}
        >
          <Image
            src="/figma-assets/work/lavabo/mobile/grid-3.svg"
            alt="LAVABO logotype — blush ground"
            width={190}
            height={137}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div
          className="absolute"
          style={{ left: 201.4, top: 251.78, width: 189.99, height: 136.65 }}
        >
          <Image
            src="/figma-assets/work/lavabo/mobile/grid-4.svg"
            alt="LAVABO logotype — slate ground"
            width={190}
            height={137}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Sink editorial photo at y=735 */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 0, top: 735, width: 392.2, height: 261.5 }}
        >
          <Image
            src="/figma-assets/work/lavabo/sink-photo.png"
            alt="LAVABO concrete sink — editorial photograph"
            width={392}
            height={262}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* Logotype band at y=1008 */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 0, top: 1008.5, width: 392.56, height: 154.96 }}
        >
          <Image
            src="/figma-assets/work/lavabo/mobile/logotype-band.svg"
            alt=""
            width={393}
            height={155}
            unoptimized
            className="block h-auto w-full"
          />
        </div>
      </Reveal>

      {/* Letterforms grid at y=1175 */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 0, top: 1175.47, width: 392.56, height: 222.06 }}
        >
          <Image
            src="/figma-assets/work/lavabo/mobile/letterforms-grid.svg"
            alt=""
            width={393}
            height={222}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Sink hero with overlay at y=1409 */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 1, top: 1409.53, width: 390.94, height: 391.6 }}
        >
          <Image
            src="/figma-assets/work/lavabo/sink-hero.png"
            alt="LAVABO sink lifestyle photo"
            width={391}
            height={392}
            unoptimized
            className="block h-full w-full object-cover"
          />
          <Image
            src="/figma-assets/work/lavabo/mobile/sink-overlay.svg"
            alt=""
            width={273}
            height={112}
            unoptimized
            className="absolute"
            style={{ left: 59, top: 142, width: 272.93, height: 112.3 }}
          />
        </div>
      </Reveal>

      {/* Mark icons at y=1813 */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 0, top: 1813.12, width: 392.56, height: 126.28 }}
        >
          <Image
            src="/figma-assets/work/lavabo/mobile/mark.svg"
            alt=""
            width={393}
            height={126}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Brand book mockup at y=1951 — flat "The art of sink" artboard, same
         as desktop (the mobile frame shares the desktop's 0.721 aspect ratio). */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 0, top: 1951.4, width: 392.94, height: 544.91 }}
        >
          <Image
            src="/figma-assets/work/lavabo/brand-book.png"
            alt="LAVABO ‘The art of sink’ website page"
            width={1798}
            height={2493}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
    </div>
  );
}
