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
          style={{ left: 276.95, top: 140, width: 887.54, height: 487.78 }}
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

      {/* Mix-blend-color overlay covering the whole hero region */}
      <div
        className="absolute"
        style={{ inset: "2.76% 19.13% 87.63% 19.26%", mixBlendMode: "color" }}
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
            className="font-heading italic"
            style={{ fontSize: 20, lineHeight: 1, margin: 0 }}
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
          Frame (283, 1367.62), 887×310. Two side-by-side consolidated
          SVGs.
          ============================================================ */}
      <Reveal eager>
        <img
          src="/figma-assets/work/interstellar/row1-left.svg"
          alt="Interstellar brand composition"
          className="absolute"
          style={{ left: 283, top: 1369.05, width: 429.46, height: 308.87 }}
        />
      </Reveal>
      <Reveal eager delay={0.05}>
        <img
          src="/figma-assets/work/interstellar/row1-right.svg"
          alt="Interstellar brand composition"
          className="absolute"
          style={{ left: 740.70, top: 1367.62, width: 429.46, height: 308.87 }}
        />
      </Reveal>

      {/* ============================================================
          Section 4 — Row 2 (Group 107, 297:57906)
          Frame (283, 1702.92), 887×309. Full-width bg + 2 centered
          overlay graphics.
          ============================================================ */}
      <Reveal eager>
        <img
          src="/figma-assets/work/interstellar/row2-bg.svg"
          alt="Interstellar brand application"
          className="absolute"
          style={{ left: 283, top: 1702.92, width: 887.16, height: 308.87 }}
        />
      </Reveal>
      <Reveal eager delay={0.05}>
        <img
          src="/figma-assets/work/interstellar/row2-overlay1.svg"
          alt=""
          className="absolute"
          style={{
            left: 393.98, // 283 + 110.98
            top: 1829.59, // 1702.92 + 126.67
            width: 198.19,
            height: 49.35,
          }}
        />
      </Reveal>
      <Reveal eager delay={0.05}>
        <img
          src="/figma-assets/work/interstellar/row2-overlay2.svg"
          alt=""
          className="absolute"
          style={{
            left: 856.32, // 283 + 573.32
            top: 1829.59,
            width: 198.20,
            height: 49.34,
          }}
        />
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
          style={{ left: 285, top: 2037.59, width: 429, height: 556 }}
        />
      </Reveal>
      {/* RIGHT bg vector */}
      <Reveal eager delay={0.05}>
        <img
          src="/figma-assets/work/interstellar/row3-right-bg.svg"
          alt=""
          className="absolute"
          style={{ left: 741, top: 2037.59, width: 428, height: 556 }}
        />
      </Reveal>
      {/* Masked photo (mask is a rectangle = overflow:hidden at section) */}
      <Reveal eager delay={0.1}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 285, top: 2037.59, width: 429, height: 556 }}
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
          Section 6 — Row 4 (Group 104, 297:57902)
          Frame (283, 2618.59), 887×1456. Layer_1 (73:27395) is a
          287-byte dark-gray fill rect. Layer_2 (73:27397) contains the
          actual property-card grid composition — too vector-dense to
          consolidate as a whole, but each inner Clip path group does
          consolidate as a single masked photo. We render Layer_1 as bg
          + 8 substantive Clip path groups (top hero + narrow band +
          6 property cards in a 2x3 grid).
          ============================================================ */}
      <Reveal eager>
        <img
          src="/figma-assets/work/interstellar/row4-layer1.svg"
          alt=""
          className="absolute"
          style={{ left: 283, top: 2618.59, width: 887.53, height: 1456.24 }}
        />
      </Reveal>
      {/* Top hero photo (601×371 at frame y=2730.41). Original photo is
         1788×2679 (tall), masked to the wide bounds via overflow:hidden.
         Mask-position offset (0, 290) → photo's top crop is at y=-290. */}
      <Reveal eager delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 427.70, top: 2730.41, width: 601.55, height: 371.20 }}
        >
          <Image
            src="/figma-assets/work/interstellar/row4/hero.jpg"
            alt="Interwar architecture photograph"
            width={1788}
            height={2679}
            unoptimized
            className="absolute max-w-none"
            style={{ left: 0, top: -290, width: 601.27, height: 901.14 }}
          />
        </div>
      </Reveal>
      {/* Narrow band (600×73 at y=2879.09) — likely small navigation/label */}
      <Reveal eager delay={0.06}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 427.20, top: 2879.09, width: 600.24, height: 72.71 }}
        >
          <img
            src="/figma-assets/work/interstellar/row4/band.svg"
            alt=""
            className="absolute max-w-none"
            style={{ left: -96.09, top: 15.86, width: 811.46, height: 40.99 }}
          />
        </div>
      </Reveal>
      {/* Row 1 of property cards (3 × 173, at y=3175.96) */}
      {[
        { src: "r1c1.png", left: 451.83, photoLeft: -39.56, photoTop: -1.78, photoW: 268.66, photoH: 179.16 },
        { src: "r1c2.png", left: 641.96, photoLeft: -55.92, photoTop: -16.95, photoW: 311.13, photoH: 207.00 },
        { src: "r1c3.png", left: 830.96, photoLeft: -30.80, photoTop: 0, photoW: 266.68, photoH: 177.94 },
      ].map((c) => (
        <Reveal key={c.src} eager delay={0.08}>
          <div
            className="absolute overflow-hidden"
            style={{ left: c.left, top: 3175.96, width: 173, height: 173 }}
          >
            <img
              src={`/figma-assets/work/interstellar/row4/${c.src}`}
              alt="Interstellar property card"
              className="absolute max-w-none"
              style={{ left: c.photoLeft, top: c.photoTop, width: c.photoW, height: c.photoH }}
            />
          </div>
        </Reveal>
      ))}
      {/* Row 2 of property cards (3 × 173, at y=3601.80) */}
      {[
        { src: "r2c1.png", left: 451.83, photoLeft: -70.67, photoTop: -6.36, photoW: 276.56, photoH: 184.26 },
        { src: "r2c2.jpg", left: 641.05, photoLeft: -0.48, photoTop: -28.36, photoW: 190.87, photoH: 286.29 },
        { src: "r2c3.jpg", left: 830.96, photoLeft: -108.25, photoTop: -6.43, photoW: 266.68, photoH: 177.88 },
      ].map((c) => (
        <Reveal key={c.src} eager delay={0.08}>
          <div
            className="absolute overflow-hidden"
            style={{ left: c.left, top: 3601.80, width: 173, height: 173 }}
          >
            <img
              src={`/figma-assets/work/interstellar/row4/${c.src}`}
              alt="Interstellar property card"
              className="absolute max-w-none"
              style={{ left: c.photoLeft, top: c.photoTop, width: c.photoW, height: c.photoH }}
            />
          </div>
        </Reveal>
      ))}

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
          style={{ left: 278, top: 4688.84, width: 898.39, height: 520.62 }}
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
