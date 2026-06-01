"use client";

import Image from "next/image";
import { iwl, iwlFrame } from "@/content/iwl";
import { Reveal } from "../reveal";
import { IwlRow2Content } from "./iwl-extras/row2-content";

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
          style={{ left: 272, top: 140, width: 898, height: 389 }}
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
          className="absolute"
          style={{ left: 734, top: 967, width: 436.14, height: 521.96 }}
        >
          <img
            src="/figma-assets/work/iwl/row1-panel-bg.svg"
            alt=""
            className="absolute inset-0 block h-full w-full"
            style={{ maxWidth: "none" }}
          />
          {/* Möbius brand mark — Layer_2 inside the burgundy panel.
             Inset within the 436.14 × 521.96 panel:
               top 8.5% = 44.37, left 35.01% = 152.69,
               width = 100-35.11-35.01% × 436.14 = 130.32,
               height = 100-8.5-8.29% × 521.96 = 434.32 */}
          <img
            src="/figma-assets/work/iwl/row1-mobius.svg"
            alt="IWL Möbius mark"
            className="absolute"
            style={{
              left: 152.69,
              top: 44.37,
              width: 130.32,
              height: 434.32,
            }}
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
        <IwlRow2Content />
      </Reveal>

      {/* ============================================================
          Section 5 — Row 3 (Group 92, 297:57123)
          Frame (276.64, 2656), 893×608. Single masked composition.
          The "photo" is actually an SVG with viewBox 1046×697 that
          extends past the section bounds by inset[-2.93% -5.81% -11.73% -11.36%].
          Section overflow-hidden replicates the rectangular mask.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 276.64, top: 2656, width: 893, height: 608.34 }}
        >
          <img
            src="/figma-assets/work/iwl/row3-photo.svg"
            alt="IWL editorial layout"
            className="absolute max-w-none"
            style={{
              /* Position the 1046×697 image so its inset-negative offsets
                 from Figma map to absolute pixels in the 893×608 frame. */
              left: -101.4, // -11.36% × 893
              top: -17.82, // -2.93% × 608.34
              width: 1046.26,
              height: 697.51,
            }}
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 6 — Row 4 (Group 96, 297:57127)
          Frame (273.64, 3289.34), 896×522. LEFT (Group 91, deferred)
          + RIGHT (Group 90, consolidated SVG).
          ============================================================ */}
      {/* LEFT — Group 91 deferred (vector-dense composition).
         TODO: inline. Placeholder gap renders cream. */}
      <div
        className="absolute"
        style={{ left: 273.64, top: 3289.34, width: 434.57, height: 522.42 }}
        aria-hidden
      />
      {/* RIGHT — Group 90 consolidated SVG */}
      <Reveal delay={0.05}>
        <img
          src="/figma-assets/work/iwl/row4-right.svg"
          alt="IWL brand application"
          className="absolute"
          style={{ left: 742.64, top: 3289.34, width: 427, height: 522 }}
        />
      </Reveal>

      {/* ============================================================
          Section 7 — Bottom (Group 297:57128)
          Frame (270, 3836.76), 897×1080. Inlined 4 photo cards:
          large bottom photo + 3 small cards in a row at top.
          Remaining typography vectors still TODO.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 435.89, top: 4374.71, width: 562.11, height: 401.18 }}
        >
          <Image
            src="/figma-assets/work/iwl/bottom/large.png"
            alt="IWL editorial photograph"
            width={1960}
            height={1399}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 435.89, top: 3983.44, width: 140.65, height: 138.12 }}
        >
          <Image
            src="/figma-assets/work/iwl/bottom/sm1.png"
            alt="IWL editorial photograph"
            width={877}
            height={865}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      <Reveal delay={0.07}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 576.21, top: 3983.44, width: 140.86, height: 138.12 }}
        >
          <Image
            src="/figma-assets/work/iwl/bottom/sm2.png"
            alt="IWL editorial photograph"
            width={874}
            height={865}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      <Reveal delay={0.09}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 716.75, top: 3983.44, width: 141.02, height: 138.12 }}
        >
          <Image
            src="/figma-assets/work/iwl/bottom/sm3.png"
            alt="IWL editorial photograph"
            width={878}
            height={865}
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
