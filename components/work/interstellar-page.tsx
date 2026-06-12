"use client";

import Image from "next/image";
import { interstellar, interstellarFrame } from "@/content/interstellar";
import { Reveal } from "../reveal";
import { InterstellarRow5Content } from "./interstellar-extras/row5-full";

/*
  Desktop INTERSTELLAR (Interstellar Real Estate) case study.
  Figma 73:19115, 1440 × 5075, cream #fff7f4. Desktop only.

  Per CLAUDE.md rules: every element at frame-absolute pixel coordinates;
  Layer_N consolidated SVGs used where available; all <Image> uses
  `unoptimized`; wrapper has `overflow-hidden` for frame clipping.

  Deferred per CLAUDE.md rule #2 (vector-dense compositions):
    - Row 3 Layer_2 inner letter overlays (~36 vectors). Outer bg vectors
      and masked photo render.
    - Row 5 Layer_1 inner masked composition (~37 vectors). Outer
      photo + bg + overlay groups + final thumbnail render.
*/
export function InterstellarCaseStudy() {
  const { width, height } = interstellarFrame.desktop;
  const titleInk = "#35221a";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Hero (Group 106, 297:57904)
          Frame (276.95, 140), 887.54×487.78. Masked bg photo + 11
          letterform SVGs spelling "INTERSTELLAR" + mix-blend-color
          overlay vector.
          ============================================================ */}
      {/* Background photo — clipped by overflow:hidden to section bounds */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 283, top: 140, width: 887.2, height: 487.78 }}
        >
          <Image
            src="/figma-assets/work/interstellar/hero/photo.jpg"
            alt="Interstellar Real Estate hero"
            width={1728}
            height={2304}
            unoptimized
            priority
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* 11 letter SVGs (INTERSTELLAR wordmark + tagline) */}
      {interstellar.heroLetters.map((c) => (
        <div key={c.src} className="absolute" style={{ inset: c.inset }}>
          <img
            src={`/figma-assets/work/interstellar/hero/${c.src}`}
            alt=""
            className="absolute inset-0 block h-full w-full"
            style={{ maxWidth: "none" }}
          />
        </div>
      ))}

      {/* Mix-blend-color overlay covering the whole hero region.
          Horizontal insets snapped to the hero's grid footprint [283, 1170.2]. */}
      <div
        className="absolute"
        style={{ inset: "2.76% 18.736% 87.63% 19.653%", mixBlendMode: "color" }}
      >
        <img
          src="/figma-assets/work/interstellar/hero/blend.svg"
          alt=""
          className="absolute inset-0 block h-full w-full"
          style={{ maxWidth: "none" }}
        />
      </div>

      {/* ============================================================
          Section 2 — Title + intro body (Group 79, 297:57912)
          Frame (512.01, 712.78), 430×242. Eyebrow "INTERSTELLAR" +
          body, color #35221a.
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 512.01, top: 712.78, width: 430, color: titleInk }}
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
            {interstellar.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            style={{
              marginTop: 16.4, // 36.4 (Figma top inside group) − 20 (eyebrow)
              fontSize: 17,
              lineHeight: 1.33,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {interstellar.body}
          </p>
        </Reveal>
      </div>

      {/* Sub-intro content was transcribed ~330px too low vs Figma
          (mapped each section's top to the Figma content bands), opening
          a large gap under the intro and overflowing the frame. Shift the
          group up; the positioned+transformed wrapper is the containing
          block for all absolute children (incl. the inline Row5 component). */}
      <div className="absolute inset-0" style={{ transform: "translateY(-330px)" }}>

      {/* ============================================================
          Section 3 — Row 1 (Group 101, 297:57899)
          Frame (283, 1367.62), 887×310. Top row of the 2×2 logo-lockup
          grid: original artboard exports (116_1 charcoal, 117 sage),
          replacing the former vector reconstructions.
          ============================================================ */}
      {/* Top-left — charcoal #212121 lockup, white wordmark (artboard 116_1) */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 283, top: 1369.05, width: 429.46, height: 308.87 }}
        >
          <Image
            src="/figma-assets/work/interstellar/lockup-charcoal.png"
            alt="Interstellar wordmark in white on a charcoal ground"
            width={870}
            height={626}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      {/* Top-right — sage #B6B6AC lockup, white wordmark + gold star (artboard 117) */}
      <Reveal eager delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 740.7, top: 1367.62, width: 429.5, height: 308.87 }}
        >
          <Image
            src="/figma-assets/work/interstellar/lockup-sage.png"
            alt="Interstellar wordmark in white with a gold star on a sage ground"
            width={870}
            height={626}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 4 — Row 2 (Group 107, 297:57906)
          Frame (283, 1702.92), 887×309. Bottom row of the 2×2 logo-lockup
          grid. Figma's two background vectors are #D6D2C9 (left) and
          #B08039 (right) — NOT the artboard numeric order. Original
          artboard exports (119 light LEFT, 118 gold RIGHT) replace the
          former single full-width gold band + floated wordmark overlays
          (which mis-painted the left panel gold).
          ============================================================ */}
      {/* Bottom-left — light #D6D2C9 lockup, black wordmark + gold star (artboard 119) */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 283, top: 1702.92, width: 429.457, height: 308.869 }}
        >
          <Image
            src="/figma-assets/work/interstellar/lockup-light.png"
            alt="Interstellar wordmark in black with a gold star on a light warm-grey ground"
            width={870}
            height={626}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      {/* Bottom-right — gold #B08039 lockup, white wordmark (artboard 118) */}
      <Reveal eager delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 740.704, top: 1702.92, width: 429.457, height: 308.869 }}
        >
          <Image
            src="/figma-assets/work/interstellar/lockup-gold.png"
            alt="Interstellar wordmark in white on a gold ground"
            width={870}
            height={626}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 5 — Row 3 (Group 108, 297:57907)
          Frame (285, 2037.59), 884×556. LEFT bg vector + RIGHT bg vector
          + masked photo composition.
          TODO: defer Layer_2 inner letter overlays (~36 vectors).
          ============================================================ */}
      {/* LEFT bg vector */}
      <Reveal eager>
        <img
          src="/figma-assets/work/interstellar/row3-left-bg.svg"
          alt=""
          className="absolute"
          style={{ left: 283, top: 2037.59, width: 429, height: 556 }}
        />
      </Reveal>
      {/* RIGHT panel (artboard 121) — flat export of the "WE DEAL LEGACY,
          NOT PROPERTY." sage poster; replaces the former bg vector and
          completes the deferred Layer_2 lettering. Frame 428×556
          (artboard 870×1140, Δ0.9%). */}
      <Reveal eager delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 741, top: 2037.59, width: 429.2, height: 556 }}
        >
          <Image
            src="/figma-assets/work/interstellar/row3-right.png"
            alt="Interstellar poster — ‘We deal legacy, not property.’ over a carved stone facade"
            width={870}
            height={1140}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      {/* Masked photo (mask is a rectangle = overflow:hidden at section) */}
      <Reveal eager delay={0.1}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 283, top: 2037.59, width: 429, height: 556 }}
        >
          <img
            src="/figma-assets/work/interstellar/row3-photo.svg"
            alt="Interstellar brand photo"
            className="absolute max-w-none"
            style={{
              left: -357.45,
              top: -36.14,
              width: 913.18,
              height: 636.19,
            }}
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 6 — Row 4 property page (artboard 122). Flat export of
          the full INTERSTELLAR listing page (nav + hero + property grid +
          "The Path to Your Residence" + footer); replaces the former
          Layer_1 dark-gray rect plus the overlaid hero/band/6-card photo
          composition (which the artboard already bakes in).
          Frame (283, 2618.59), 887.53×1456.24 (artboard 1798×2950, Δ0.01%).
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 283, top: 2618.59, width: 887.2, height: 1456.24 }}
        >
          <Image
            src="/figma-assets/work/interstellar/row4-full.png"
            alt="Interstellar property listing page — hero villa, property cards, and ‘The Path to Your Residence’ section"
            width={1798}
            height={2950}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 7 — Row 5 (Group 105, 297:57903)
          Frame (282, 4099.84), 889×564. Full composition inlined via
          ./interstellar-extras/row5-full: LEFT photo + RIGHT bg vector +
          3 overlay graphics + Layer_2 thumbnail + inner Layer_1
          masked composition (47 vectors at offset chain).
          ============================================================ */}
      <Reveal eager>
        <InterstellarRow5Content />
      </Reveal>

      {/* ============================================================
          Section 8 — Row 6 (Group 109, 297:57911)
          Frame (278, 4688.84), 898×520. Single consolidated SVG.
          ============================================================ */}
      <Reveal eager>
        <img
          src="/figma-assets/work/interstellar/row6.svg"
          alt="Interstellar bottom composition"
          className="absolute"
          style={{ left: 283, top: 4688.84, width: 887.2, height: 520.62 }}
        />
      </Reveal>

      {/* Floating brand vector (73:19120) at frame (717.26, 4250.49), 275×87 */}
      <Reveal eager>
        <img
          src="/figma-assets/work/interstellar/floating.svg"
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
