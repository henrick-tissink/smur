"use client";

import Image from "next/image";
import { interstellar, interstellarFrame } from "@/content/interstellar";
import { Reveal } from "../reveal";

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

      {/* ============================================================
          Section 3 — Row 1 (Group 101, 297:57899)
          Frame (283, 1367.62), 887×310. Two side-by-side consolidated
          SVGs.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/interstellar/row1-left.svg"
          alt="Interstellar brand composition"
          className="absolute"
          style={{ left: 283, top: 1369.05, width: 429.46, height: 308.87 }}
        />
      </Reveal>
      <Reveal delay={0.05}>
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
      <Reveal>
        <img
          src="/figma-assets/work/interstellar/row2-bg.svg"
          alt="Interstellar brand application"
          className="absolute"
          style={{ left: 283, top: 1702.92, width: 887.16, height: 308.87 }}
        />
      </Reveal>
      <Reveal delay={0.05}>
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
      <Reveal delay={0.05}>
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
      <Reveal>
        <img
          src="/figma-assets/work/interstellar/row3-left-bg.svg"
          alt=""
          className="absolute"
          style={{ left: 285, top: 2037.59, width: 429, height: 556 }}
        />
      </Reveal>
      {/* RIGHT bg vector */}
      <Reveal delay={0.05}>
        <img
          src="/figma-assets/work/interstellar/row3-right-bg.svg"
          alt=""
          className="absolute"
          style={{ left: 741, top: 2037.59, width: 428, height: 556 }}
        />
      </Reveal>
      {/* Masked photo (mask is a rectangle = overflow:hidden at section) */}
      <Reveal delay={0.1}>
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
          Frame (283, 2618.59), 887×1456. Layer_1 (73:27395) consolidated
          SVG covers the entire section — biggest single-element render
          in the project. Layer_2 inner overlay TODO defer.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/interstellar/row4-layer1.svg"
          alt="Interstellar brand book composition"
          className="absolute"
          style={{ left: 283, top: 2618.59, width: 887.53, height: 1456.24 }}
        />
      </Reveal>

      {/* ============================================================
          Section 7 — Row 5 (Group 105, 297:57903)
          Frame (282, 4099.84), 889×564. LEFT photo + RIGHT bg vector +
          3 overlay graphics + Layer_2 preview thumbnail.
          TODO: defer Layer_1 inner masked composition (~37 vectors).
          ============================================================ */}
      {/* LEFT photo (with Figma crop: w=256.29% h=295.79% left=-77.94% top=-132.95%) */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 282, top: 4099.84, width: 435, height: 564 }}
        >
          <Image
            src="/figma-assets/work/interstellar/row5-photo.jpg"
            alt="Interstellar interior photograph"
            width={1385}
            height={2077}
            unoptimized
            className="absolute max-w-none"
            style={{
              width: "256.29%",
              height: "295.79%",
              left: "-77.94%",
              top: "-132.95%",
            }}
          />
        </div>
      </Reveal>
      {/* RIGHT bg vector */}
      <Reveal delay={0.05}>
        <img
          src="/figma-assets/work/interstellar/row5-right-bg.svg"
          alt=""
          className="absolute"
          style={{ left: 739, top: 4099.84, width: 432, height: 564 }}
        />
      </Reveal>
      {/* 3 overlay graphics */}
      <Reveal delay={0.08}>
        <img
          src="/figma-assets/work/interstellar/row5-overlay1.svg"
          alt=""
          className="absolute"
          style={{
            left: 858.13, // 282 + 576.13
            top: 4325.93, // 4099.84 + 226.09
            width: 195.51,
            height: 99.91,
          }}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <img
          src="/figma-assets/work/interstellar/row5-overlay2.svg"
          alt=""
          className="absolute"
          style={{
            left: 910.88, // 282 + 628.88
            top: 4481.37, // 4099.84 + 381.53
            width: 90.00,
            height: 113.60,
          }}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <img
          src="/figma-assets/work/interstellar/row5-overlay3.svg"
          alt=""
          className="absolute"
          style={{
            left: 929.20, // 282 + 647.20
            top: 4195.35, // 4099.84 + 95.51
            width: 53.35,
            height: 68.41,
          }}
        />
      </Reveal>
      {/* Layer_2 final preview thumbnail */}
      <Reveal delay={0.12}>
        <img
          src="/figma-assets/work/interstellar/row5-thumbnail.svg"
          alt="Interstellar property thumbnail"
          className="absolute"
          style={{
            left: 421.61, // 282 + 139.61
            top: 4241.55, // 4099.84 + 141.71
            width: 152.93,
            height: 260.79,
          }}
        />
      </Reveal>

      {/* ============================================================
          Section 8 — Row 6 (Group 109, 297:57911)
          Frame (278, 4688.84), 898×520. Single consolidated SVG.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/interstellar/row6.svg"
          alt="Interstellar bottom composition"
          className="absolute"
          style={{ left: 278, top: 4688.84, width: 898.39, height: 520.62 }}
        />
      </Reveal>

      {/* Floating brand vector (73:19120) at frame (717.26, 4250.49), 275×87 */}
      <Reveal>
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
  );
}
