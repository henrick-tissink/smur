"use client";

import Image from "next/image";
import { lavabo, lavaboFrame } from "@/content/lavabo";
import { Reveal } from "../reveal";
import { LavaboBrandBook } from "./lavabo-brand-book";

/*
  Desktop LAVABO case study (Figma 70:6705). 1440 × 5336, cream #fff7f4.

  Layout (absolute children at exact Figma y-coords per CLAUDE.md rule #8):
    y=140  2×2 LAVABO logotype grid (SVG vectors on color blocks)
    y=875  "LAVABO" eyebrow + body paragraph
    y=1180 sink-photo.png (concrete sink hero, 896×598)
    y=1803 logotype-band.svg ("LAVABO" on grey, 897×354)
    y=2182 letterforms-grid.svg (type-spec block, 897×507)
    y=2715 sink-hero.png with white logotype overlay (894×895)
    y=3635 mark.svg (icon row, 897×288)
    y=3949 Frame 54 brand-book — structurally rebuilt as real HTML in
      <LavaboBrandBook> per CLAUDE.md rule #2 option (c). Used 4 real
      product photos + ~150 lines of structured JSX. Shipped 2026-05-21
      in commit 4eae517.

  Per CLAUDE.md rule #2, image fills come from get_design_context asset URLs
  (NOT screenshots).
*/
export function LavaboCaseStudy() {
  const { width, height } = lavaboFrame.desktop;
  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* 2x2 logotype grid at y=140 (4 cells of 434.52 × 312.51) */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 273, top: 140, width: 434.52, height: 312.51 }}
        >
          <Image
            src="/figma-assets/work/lavabo/grid-1.svg"
            alt="LAVABO logotype — black ground"
            width={435}
            height={313}
            unoptimized
            priority
            className="block h-full w-full"
          />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <div
          className="absolute"
          style={{ left: 731.52, top: 140, width: 434.52, height: 312.51 }}
        >
          <Image
            src="/figma-assets/work/lavabo/grid-2.svg"
            alt="LAVABO logotype — sand ground"
            width={435}
            height={313}
            unoptimized
            priority
            className="block h-full w-full"
          />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div
          className="absolute"
          style={{ left: 273, top: 478.51, width: 434.52, height: 312.51 }}
        >
          <Image
            src="/figma-assets/work/lavabo/grid-3.svg"
            alt="LAVABO logotype — blush ground"
            width={435}
            height={313}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div
          className="absolute"
          style={{ left: 731.52, top: 477.51, width: 434.52, height: 312.51 }}
        >
          <Image
            src="/figma-assets/work/lavabo/grid-4.svg"
            alt="LAVABO logotype — slate ground"
            width={435}
            height={313}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Title + body at y=875 (Group 297:57945, w=898.71 centered at left=271) */}
      <div
        className="absolute text-center"
        style={{ left: 505, top: 875, width: 430, color: "#35221a" }}
      >
        <Reveal>
          <p
            className="italic"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: 20,
              lineHeight: 1, // Figma H3: DM Sans Italic 20 / lh normal
            }}
          >
            {lavabo.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-[35px]" style={{ fontSize: 17, lineHeight: 1.33 }}>
            {lavabo.body}
          </p>
        </Reveal>
      </div>

      {/* Sink editorial hero (lavabo_2_1.psd) at y=1180 */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 271, top: 1180, width: 896.89, height: 598 }}
        >
          <Image
            src="/figma-assets/work/lavabo/sink-photo.png"
            alt="LAVABO concrete sink — editorial photograph"
            width={897}
            height={598}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* Logotype band (Frame 50) at y=1803 */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 272, top: 1803, width: 897.71, height: 354.37 }}
        >
          <Image
            src="/figma-assets/work/lavabo/logotype-band.svg"
            alt=""
            width={898}
            height={355}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Letterforms grid (Frame 51) at y=2182 */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 272, top: 2182, width: 897.71, height: 507.81 }}
        >
          <Image
            src="/figma-assets/work/lavabo/letterforms-grid.svg"
            alt=""
            width={898}
            height={508}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Sink hero with overlay (Frame 52) at y=2715 */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 274, top: 2715, width: 894, height: 895.5 }}
        >
          <Image
            src="/figma-assets/work/lavabo/sink-hero.png"
            alt="LAVABO sink lifestyle photo"
            width={894}
            height={896}
            unoptimized
            className="block h-full w-full object-cover"
          />
          <Image
            src="/figma-assets/work/lavabo/sink-overlay.svg"
            alt=""
            width={624}
            height={257}
            unoptimized
            className="absolute"
            style={{ left: 135, top: 325, width: 624.14, height: 256.81 }}
          />
        </div>
      </Reveal>

      {/* Mark icons (Frame 53) at y=3635 */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 272, top: 3635, width: 897.71, height: 288.77 }}
        >
          <Image
            src="/figma-assets/work/lavabo/mark.svg"
            alt=""
            width={898}
            height={289}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Brand book mockup (Frame 54) at y=3949 — structural rebuild via
         <LavaboBrandBook> with real product photos + HTML/CSS layout. */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 271, top: 3949, width: 898.58, height: 1246.09 }}
        >
          <LavaboBrandBook width={898.58} height={1246.09} />
        </div>
      </Reveal>
    </div>
  );
}
