"use client";

import Image from "next/image";
import { mnf, mnfFrame } from "@/content/mnf";
import { Reveal } from "../reveal";

/*
  Desktop MNF (Manufaktura Studio Architecture) case study.
  Figma 71:343, 1440 × 4367, cream #fff7f4. Desktop only.

  Deferred per CLAUDE.md rule #2:
    - Big middle (Clip path group 218:16465, 899×1239) — grid of masked
      photo cards. Many nested clip-path groups, no consolidated SVG
      export. Renders as cream gap.
*/
export function MnfCaseStudy() {
  const { width, height } = mnfFrame.desktop;
  const titleInk = "#35221a";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Hero (Group 22, 71:974)
          Frame (269, 140), 899.78×370.67. Consolidated SVG.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/mnf/hero.svg"
          alt="Manufaktura Studio hero"
          className="absolute"
          style={{ left: 270, top: 140, width: 899, height: 370.67 }}
        />
      </Reveal>

      {/* ============================================================
          Section 2 — Title + body (Group 79, 297:57100)
          Frame (504.81, 595.67), 430×199.
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 504.81, top: 595.67, width: 430, color: titleInk }}
      >
        <Reveal>
          <p
            className="italic"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: 20,
              lineHeight: 1, // Figma H3: DM Sans Italic 20 / lh normal
              margin: 0,
            }}
          >
            {mnf.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            style={{
              marginTop: 14.17, // top 34.17 - 20 eyebrow
              fontSize: 17,
              lineHeight: 1.33,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {mnf.body}
          </p>
        </Reveal>
      </div>

      {/* ============================================================
          Section 2b — Cascading website screens (MNFArtboard 70).
          This section (Figma content band ~917–1441) was missing from
          the build, leaving a void under the intro. Rendered object-
          contain on the cream field, centered. Sits at its true Figma
          position (outside the offset wrapper below).
          ============================================================ */}
      <Reveal delay={0.05}>
        <div
          className="absolute"
          style={{ left: 270, top: 900, width: 899, height: 545 }}
        >
          <Image
            src="/figma-assets/work/mnf/screens.jpg"
            alt="Manufaktura website screens"
            width={1793}
            height={1180}
            unoptimized
            className="block h-full w-full object-contain"
          />
        </div>
      </Reveal>

      {/* Sections 3–6 were transcribed ~286px too low vs Figma (Row1
          1753.63→1467, mid 2672.88→2387, bottom 3937.30→3650), opening a
          gap under the intro and overflowing the frame. Shift the group
          up; the positioned+transformed wrapper is the containing block
          for all absolute children. */}
      <div className="absolute inset-0" style={{ transform: "translateY(-286px)" }}>

      {/* ============================================================
          Section 3 — Row 1 LEFT (Group 25, 71:977)
          Frame (270, 1753.63), 437.65×299.26. Consolidated SVG.
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 270, top: 1753.63, width: 437.65, height: 299.26 }}
        >
          <Image
            src="/figma-assets/work/mnf/row1-left.png"
            alt="Manufaktura M monogram — dark ground"
            width={870}
            height={626}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 4 — Row 1 RIGHT (Group 26, 71:978)
          Frame (731.65, 1753.63), 437.65×299.26. Consolidated SVG.
          ============================================================ */}
      <Reveal eager delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 731.65, top: 1753.63, width: 437.35, height: 299.26 }}
        >
          <Image
            src="/figma-assets/work/mnf/row1-right.png"
            alt="Manufaktura M monogram — sage ground"
            width={870}
            height={626}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 4b — Gold fluted card band (Figma band ~1790–2361),
          missing from the original build. MNFArtboard 74_1, object-cover.
          ============================================================ */}
      <Reveal eager delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 270, top: 2076, width: 899, height: 571 }}
        >
          <Image
            src="/figma-assets/work/mnf/gold-band.jpg"
            alt="Manufaktura business cards on fluted brass"
            width={1793}
            height={1195}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 5 — Brand / interior grid (Clip path group 218:16465)
          Frame (270, 2672.88), 899×1239.42. The dense grid was only
          partially inlined (4 cards); now the full brand-grid artboard
          (MNFArtboard 76, matching 0.725 aspect), object-cover.
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 270, top: 2672.88, width: 899, height: 1239.42 }}
        >
          <Image
            src="/figma-assets/work/mnf/grid.jpg"
            alt="Manufaktura brand and interior grid"
            width={1799}
            height={2480}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 6 — Bottom (Group 27, 71:981)
          Frame (270, 3937.30), 899×575. Full flat artboard 77
          (1791×1208) with the "MANUFAKTURA STUDIO___" wordmark baked in,
          replacing the low-res photo + blend overlay + 18 letter vectors.
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 270, top: 3937.30, width: 899, height: 575 }}
        >
          <Image
            src="/figma-assets/work/mnf/bottom-full.png"
            alt="Manufaktura Studio interior with the studio wordmark"
            width={1791}
            height={1208}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* Floating brand vector (71:410) at frame (717.26, 4250.49), 275×88 */}
      <Reveal eager>
        <img
          src="/figma-assets/work/mnf/floating.svg"
          alt=""
          className="absolute"
          style={{
            left: 717.26,
            top: 4250.49,
            width: 275.25,
            height: 87.60,
          }}
        />
      </Reveal>
      </div>
    </div>
  );
}
