"use client";

import Image from "next/image";
import { taf, tafFrame } from "@/content/taf";
import { Reveal } from "../reveal";

/*
  Desktop TAF (UAE cleaning brand) case study.
  Figma 73:29056, 1440 × 4942, cream #fff7f4. Desktop only.

  Per CLAUDE.md rules: every element at frame-absolute pixel coordinates;
  all <Image> uses `unoptimized`; wrapper has `overflow-hidden`.

  Deferred per CLAUDE.md rule #2:
    - Middle section (Group 112) inner Layer_2 (~900×1474 vector-dense
      composition). Renders as flat #D5CDC2 tan rect (1676 tall) — same
      pattern as INTERSTELLAR Row 4. Highest-impact follow-up.
*/
export function TafCaseStudy() {
  const { width, height } = tafFrame.desktop;
  const titleInk = "#35221a";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Hero (Layer_2, 73:30561)
          Frame (273, 140), 896.24×649.13. Consolidated SVG.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 273, top: 140, width: 900, height: 649.13 }}
        >
          {/* Four quadrant artboards mapped by background color (matches
             hero.svg quadrant fills): TL #2D2D2D dark (126), TR #EAB5BA
             pink (127), BR #FF8A80 coral (129), BL #DFD8CE tan (128). */}
          <div
            className="absolute overflow-hidden"
            style={{ left: 1.38, top: 0, width: 434.52, height: 312.51 }}
          >
            <Image
              src="/figma-assets/work/taf/hero-q-dark.png"
              alt="TAF brand mark — dark"
              width={870}
              height={626}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
          <div
            className="absolute overflow-hidden"
            style={{ left: 461.72, top: 1.67, width: 434.52, height: 312.51 }}
          >
            <Image
              src="/figma-assets/work/taf/hero-q-pink.png"
              alt="TAF brand mark — pink"
              width={870}
              height={626}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
          <div
            className="absolute overflow-hidden"
            style={{ left: 461.72, top: 336.61, width: 434.52, height: 312.51 }}
          >
            <Image
              src="/figma-assets/work/taf/hero-q-coral.png"
              alt="TAF brand mark — coral"
              width={870}
              height={626}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
          <div
            className="absolute overflow-hidden"
            style={{ left: 0, top: 336.61, width: 434.52, height: 312.51 }}
          >
            <Image
              src="/figma-assets/work/taf/hero-q-tan.png"
              alt="TAF brand mark — tan"
              width={870}
              height={626}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </div>
      </Reveal>

      {/* ============================================================
          Section 2 — Title + body (Group 79, 297:57920)
          Frame (503, 874.13), 430×295. Two body paragraphs.
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 503, top: 874.13, width: 430, color: titleInk }}
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
            {taf.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div
            style={{
              marginTop: 22, // 42 (Figma top 916-874) − 20 (eyebrow)
              fontSize: 17,
              lineHeight: 1.33,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {taf.body.map((p, i) => (
              <p key={i} style={{ margin: 0, marginTop: i === 0 ? 0 : "1em" }}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ============================================================
          Section 3 — Row 1 LEFT (Group 111, 297:57917)
          Frame (273, 1254), 434.52×587.37. Masked photo + masked overlay.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 273, top: 1254, width: 434.52, height: 587.37 }}
        >
          <Image
            src="/figma-assets/work/taf/row1-left-flat.png"
            alt="TAF — cleaning product photo with the logotype overlay"
            width={867}
            height={1176}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 4 — Row 1 RIGHT (Group 110, 297:57916)
          Frame (738.52, 1254.66), 434.52×587.37. Consolidated SVG.
          ============================================================ */}
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 738.52, top: 1254.66, width: 434.48, height: 587.37 }}
        >
          <Image
            src="/figma-assets/work/taf/row1-right.png"
            alt="TAF brand application"
            width={870}
            height={1176}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 4b — Fabric band (artboard 134, node 73:33177).
          Flat export of the orange TAF logo printed on textile; sits
          directly below Row 1. Frame (273, 1867), 900×609
          (artboard 1783×1206, ratio 1.478 — exact, no crop).
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 273, top: 1867, width: 900, height: 609 }}
        >
          <Image
            src="/figma-assets/work/taf/band-fabric.png"
            alt="TAF logo printed on fabric"
            width={1783}
            height={1206}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 5 — Website mockup (artboard 134_1, Group 112).
          Flat export of the full TAF landing page; replaces the former
          tan placeholder rect + 2 inset photos. Frame (273, 2501.03),
          900×1676 (artboard 1798×3348, ratio 0.537 — exact, no crop).
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 273, top: 2501.03, width: 900, height: 1676 }}
        >
          <Image
            src="/figma-assets/work/taf/website.png"
            alt="TAF cleaning-services website landing page"
            width={1798}
            height={3348}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 6 — Bottom (Group 113, 297:57919)
          Frame (273, 4202.03), 899×600. Background photo + 7 vector
          marks forming the TAF wordmark + decorations.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 273, top: 4202.03, width: 900, height: 600 }}
        >
          <Image
            src="/figma-assets/work/taf/bottom-full.png"
            alt="TAF brand campaign — hands holding product with the logotype"
            width={1794}
            height={1196}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
    </div>
  );
}
