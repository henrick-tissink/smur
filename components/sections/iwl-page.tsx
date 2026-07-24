"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { iwl, iwlFrame } from "@/content/iwl";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid desktop IWL (Harvard Institute for World Literature) case
  study. Ported from components/work/iwl-page.tsx (IwlCaseStudy) to the
  aspect-ratio stage pattern: stage = aspect-ratio 1440/5081 container-query
  box, the legacy 1440x5081 composition (Figma 71:4377, bg #fff7f4) is
  expressed in % (positions) and cqw (font sizes) so it scales with
  viewport width — no zoom.

  Every element below was a direct child of the legacy fixed canvas, so
  each stays a direct child of the aspect-stage div here (containing-block
  rule) — none are nested inside another absolutely-positioned box. The
  inner <Image> crop percentages (row1-photo) are relative to their own
  overflow-hidden wrapper div, not the stage, and are left unchanged.

  Note: components/work/iwl-extras/row2-content.tsx (the 114-vector Layer_2
  overlay) is NOT imported by the legacy component — Row 2 is rendered as a
  single flattened `row2-band.png` image (Section 4 below). That extras
  file is dead code; it is intentionally left untouched and unimported here.
*/

const STAGE_W = iwlFrame.desktop.width;
const STAGE_H = iwlFrame.desktop.height;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function IwlCaseStudy() {
  const t = useTranslations("CaseStudies.iwl");
  const titleInk = "#35221a";

  return (
    <section
      data-nav-scheme="dark"
      className="w-full"
      style={{ backgroundColor: "#fff7f4" }}
    >
      <div
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden"
        style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}`, containerType: "inline-size" }}
      >
        {/* ============================================================
            Section 1 — Hero (Frame 60, 71:18794)
            Frame (272, 140), 898x389. Consolidated bg + Layer_2 wordmark
            overlay (Layer_2 at frame (534.57, 292.92), 367.39x75.06).
            ============================================================ */}
        <Reveal>
          <img
            src="/figma-assets/work/iwl/hero-bg.svg"
            alt=""
            className="absolute"
            style={{ left: pctX(271), top: pctY(140), width: pctX(898.64), height: pctY(389) }}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <img
            src="/figma-assets/work/iwl/hero-wordmark.svg"
            alt="Harvard Institute for World Literature"
            className="absolute"
            style={{
              left: pctX(534.57), // 272 + 262.57
              top: pctY(292.92), // 140 + 152.92
              width: pctX(367.39),
              height: pctY(75.06),
            }}
          />
        </Reveal>

        {/* ============================================================
            Section 2 — Title + intro body (Group 79, 297:57892)
            Frame (514.36, 614), 430x268. DM Sans italic eyebrow +
            DM Sans regular body, color #35221a.
            ============================================================ */}
        <div
          className="absolute text-center"
          style={{ left: pctX(514.37), top: pctY(614), width: pctX(430), color: titleInk }}
        >
          <Reveal>
            <p
              className="italic"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 400,
                fontSize: cqw(20),
                lineHeight: 1, // Figma H3: DM Sans Italic 20 / lh normal
                margin: 0,
              }}
            >
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              style={{
                marginTop: cqw(19), // 39 (Figma top 653-614) − 20 (eyebrow line)
                fontSize: cqw(17),
                lineHeight: 1.33,
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              {t("body")}
            </p>
          </Reveal>
        </div>

        {/* ============================================================
            Section 3 — Row 1 (Group 95, 297:57126)
            Frame (271, 967), 899x521. LEFT photo + RIGHT panel with
            Möbius brand mark overlay.
            ============================================================ */}
        {/* LEFT — rounded-rectangle photo at (271, 967), 431x520 */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{
              left: pctX(271),
              top: pctY(967.04),
              width: pctX(431),
              height: pctY(518.98),
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
            style={{ left: pctX(734), top: pctY(967), width: pctX(435.64), height: pctY(521.96) }}
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
            banner; sits directly below Row 1. Frame (270.64, 1514), 899x595.8
            (artboard 1798x1195, ratio 1.505 — exact).
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(271), top: pctY(1514), width: pctX(898.64), height: pctY(595.8) }}
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
            Frame (274.64, 2134.75), 895x491. Rendered as a single
            flattened row2-band.png (the Layer_2 114-vector overlay is
            dead code in components/work/iwl-extras/row2-content.tsx,
            never imported by the legacy component — not reproduced here).
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(271), top: pctY(2134.75), width: pctX(898.64), height: pctY(491) }}
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
            893x608.34 (artboard 1789x1216, ratio 1.471 — exact).
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(271), top: pctY(2656), width: pctX(898.64), height: pctY(608.34) }}
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
        {/* LEFT — Group 91 (273.64, 3289.34), 434.57x522.42
           (artboard 871x1046, ratio 0.833 — exact). */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(271), top: pctY(3289.34), width: pctX(434.57), height: pctY(522.42) }}
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
        {/* RIGHT — Group 90 (742.64, 3289.34), 427x522
           (artboard 871x1042, ratio 0.836). */}
        <Reveal delay={0.05}>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(742.64), top: pctY(3289.34), width: pctX(427), height: pctY(522) }}
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
            4 inlined photo cards. Frame (270, 3836.76), 897.6x1080.9
            (artboard 1790x2159, ratio 0.829 — exact).
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(271), top: pctY(3836.76), width: pctX(898.64), height: pctY(1080.9) }}
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

        {/* Floating Möbius brand vector (71:4382) at frame (717, 4242), 275x87 */}
        <Reveal>
          <img
            src="/figma-assets/work/iwl/floating.svg"
            alt=""
            className="absolute"
            style={{ left: pctX(717.26), top: pctY(4242.14), width: pctX(275.25), height: pctY(87.43) }}
          />
        </Reveal>
      </div>
    </section>
  );
}
