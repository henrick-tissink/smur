"use client";

import Image from "next/image";
import { iwl, iwlFrame } from "@/content/iwl";
import { Reveal } from "../reveal";

/*
  Desktop IWL (Harvard Institute for World Literature) case study.
  Figma 71:4377, 1440 × 5081, cream #fff7f4. Desktop only.

  Per CLAUDE.md rules: every element at frame-absolute pixel coordinates;
  Layer_N consolidated SVGs positioned at their own bounds; all <Image>
  uses `unoptimized`. Wrapper has `overflow-hidden` to mirror Figma's
  frame-clipping behavior.

  Three sub-sections deferred per CLAUDE.md rule #2 (vector-dense, defer
  pattern same as KOKOP/CRISP):
    - Row 2 Layer_2 inline overlay (~114 vectors). Layer_1 consolidated
      bg renders, so the section visually still reads correctly.
    - Row 4 LEFT (Group 91, ~hundreds of vectors). Renders as empty
      panel beside the consolidated RIGHT (Group 90).
    - Bottom section (Group 297:57128, ~1080×897 — vector-dense composition
      with no consolidated SVG export). Renders as empty space.
*/
export function IwlCaseStudy() {
  const { width, height } = iwlFrame.desktop;
  const titleInk = "#35221a";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Hero (Frame 60, 71:18794)
          Frame (272, 140), 898×389. Consolidated bg + Layer_2 wordmark
          overlay (Layer_2 at frame (534.57, 292.92), 367.39×75.06).
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/iwl/hero-bg.svg"
          alt=""
          className="absolute"
          style={{ left: 271, top: 140, width: 898.64, height: 389 }}
        />
      </Reveal>
      <Reveal delay={0.05}>
        <img
          src="/figma-assets/work/iwl/hero-wordmark.svg"
          alt="Harvard Institute for World Literature"
          className="absolute"
          style={{
            left: 534.57, // 272 + 262.57
            top: 292.92, // 140 + 152.92
            width: 367.39,
            height: 75.06,
          }}
        />
      </Reveal>

      {/* ============================================================
          Section 2 — Title + intro body (Group 79, 297:57892)
          Frame (514.36, 614), 430×268. DM Sans italic eyebrow +
          DM Sans regular body, color #35221a.
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 514.37, top: 614, width: 430, color: titleInk }}
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
            {iwl.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            style={{
              marginTop: 19, // 39 (Figma top 653-614) − 20 (eyebrow line)
              fontSize: 17,
              lineHeight: 1.33,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {iwl.body}
          </p>
        </Reveal>
      </div>

      {/* ============================================================
          Section 3 — Row 1 (Group 95, 297:57126)
          Frame (271, 967), 899×521. LEFT photo + RIGHT panel with
          Möbius brand mark overlay.
          ============================================================ */}
      {/* LEFT — rounded-rectangle photo at (271, 967), 431×520 */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{
            left: 271,
            top: 967.04,
            width: 431,
            height: 518.98,
            borderRadius: 0,
          }}
        >
          <Image
            src="/figma-assets/work/iwl/row1-photo.jpg"
            alt="IWL editorial photograph"
            width={1964}
            height={2946}
            unoptimized
            className="absolute max-w-none"
            style={{
              width: "109.36%",
              height: "135.97%",
              left: "-3.94%",
              top: "-4.81%",
            }}
          />
        </div>
      </Reveal>

      {/* RIGHT — burgundy panel with Möbius mark */}
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 734, top: 967, width: 435.64, height: 521.96 }}
        >
          <Image
            src="/figma-assets/work/iwl/row1-right.png"
            alt="IWL Möbius mark"
            width={874}
            height={1045}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 3b — Welcome banner (artboard 105, node 71:5756
          "NEW_BANNER"). Flat export of the red "Welcome to the Institute"
          banner; sits directly below Row 1. Frame (270.64, 1514), 899×595.8
          (artboard 1798×1195, ratio 1.505 — exact).
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 271, top: 1514, width: 898.64, height: 595.8 }}
        >
          <Image
            src="/figma-assets/work/iwl/banner.png"
            alt="Welcome to the Institute for World Literature banner"
            width={1798}
            height={1195}
            unoptimized
            className="absolute block max-w-none object-cover"
            /* baked-in light columns on the artboard's right edge; oversize
               past the clip box so they're cropped out */
            style={{ left: 0, top: 0, width: "calc(100% + 2.5px)", height: "100%" }}
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 4 — Row 2 (Group 93, 297:57124)
          Frame (274.64, 2134.75), 895×491. Layer_1 consolidated bg +
          Layer_2 inlined 114 vectors via ./iwl-extras/row2-content.
          The MCP JSX uses root-frame-relative percent insets so the
          children mount cleanly inside the case study root with no
          positioning wrapper needed.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 271, top: 2134.75, width: 898.64, height: 491 }}
        >
          <Image
            src="/figma-assets/work/iwl/row2-band.png"
            alt="IWL business card band — burgundy seal and Delia Ungureanu card"
            width={1793}
            height={985}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 5 — Row 3 IWL pattern (artboard 107_1, Group 92).
          Flat export of the tan repeating Möbius / "Institute for World
          Literature" pattern; replaces the masked SVG. Frame (276.64, 2656),
          893×608.34 (artboard 1789×1216, ratio 1.471 — exact).
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 271, top: 2656, width: 898.64, height: 608.34 }}
        >
          <Image
            src="/figma-assets/work/iwl/pattern.png"
            alt="IWL repeating logotype pattern"
            width={1789}
            height={1216}
            unoptimized
            className="absolute block max-w-none object-cover"
            /* the exported artboard has ~4 baked-in white columns on its left
               edge; oversize past the clip box so they're cropped out */
            style={{ left: -2.2, top: 0, width: "calc(100% + 2.2px)", height: "100%" }}
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 6 — Row 4 (Group 96, 297:57127) as flat artboards.
          LEFT  = artboard 110 (Group 91) — multi-panel program spread;
                  fills the formerly-deferred left placeholder.
          RIGHT = artboard 109 (Group 90) — reading photo with Möbius
                  logo; replaces the consolidated SVG.
          ============================================================ */}
      {/* LEFT — Group 91 (273.64, 3289.34), 434.57×522.42
         (artboard 871×1046, ratio 0.833 — exact). */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 271, top: 3289.34, width: 434.57, height: 522.42 }}
        >
          <Image
            src="/figma-assets/work/iwl/row4-left.png"
            alt="IWL programme brochure spread"
            width={871}
            height={1046}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      {/* RIGHT — Group 90 (742.64, 3289.34), 427×522
         (artboard 871×1042, ratio 0.836). */}
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 742.64, top: 3289.34, width: 427, height: 522 }}
        >
          <Image
            src="/figma-assets/work/iwl/row4-right.png"
            alt="IWL — a participant reading, with the Möbius logo overlay"
            width={871}
            height={1042}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 7 — Bottom poster (artboard 112, Group 297:57128).
          Flat export of the Harvard 2023 session poster; replaces the
          4 inlined photo cards. Frame (270, 3836.76), 897.6×1080.9
          (artboard 1790×2159, ratio 0.829 — exact).
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 271, top: 3836.76, width: 898.64, height: 1080.9 }}
        >
          <Image
            src="/figma-assets/work/iwl/poster.png"
            alt="IWL Harvard University 2023 session poster"
            width={1790}
            height={2159}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* Floating Möbius brand vector (71:4382) at frame (717, 4242), 275×87 */}
      <Reveal>
        <img
          src="/figma-assets/work/iwl/floating.svg"
          alt=""
          className="absolute"
          style={{ left: 717.26, top: 4242.14, width: 275.25, height: 87.43 }}
        />
      </Reveal>
    </div>
  );
}
