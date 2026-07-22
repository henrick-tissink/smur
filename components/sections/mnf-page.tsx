import Image from "next/image";
import { mnf, mnfFrame } from "@/content/mnf";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid desktop MNF (Manufaktura Studio Architecture) case study.
  Ported from components/work/mnf-page.tsx (MnfCaseStudy) to the
  aspect-ratio stage pattern: stage = aspect-ratio 1440/4367
  container-query box, the legacy 1440×4367 composition (Figma 71:343,
  bg #fff7f4) is expressed in % (positions) and cqw (font sizes) so it
  scales with viewport width — no zoom.

  Deferred per CLAUDE.md rule #2 (unchanged from legacy):
    - Big middle (Clip path group 218:16465, 899×1239) — grid of masked
      photo cards. Many nested clip-path groups, no consolidated SVG
      export. Renders as cream gap (superseded below by the flat
      brand/interior grid artboard, see Section 5).

  Containing-block note: the legacy fixed-canvas version wrapped
  Sections 3–6 + the floating brand vector in
  `<div className="absolute inset-0" style={{ transform:
  "translateY(-286px)" }}>` to correct a transcription offset (Row1
  1753.63→1467.63, gold band 2076→1790, grid 2672.88→2386.88, bottom
  3937.30→3651.30, floating vector 4250.49→3964.49) without rewriting
  every child's top value. A fixed-px transform doesn't scale with the
  fluid stage, so here that -286 shift is baked directly into each
  child's top coordinate and every one of those children is hoisted to
  be a direct child of the aspect-stage (per the containing-block rule)
  instead of nesting inside an intermediate absolute/transformed group.
  content/mnf.ts's `bottomVectors` (19 letterform SVGs) are NOT rendered
  here — they were already dead/unused in the legacy component, replaced
  by the flat "bottom-full.png" artboard with the wordmark baked in (see
  Section 6 comment below and the legacy file's own comment on this).
*/

const STAGE_W = mnfFrame.desktop.width;
const STAGE_H = mnfFrame.desktop.height;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function MnfCaseStudy() {
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
            Section 1 — Hero (Group 22, 71:974)
            Frame (269, 140), 899.78×370.67. Consolidated SVG.
            ============================================================ */}
        <Reveal>
          <img
            src="/figma-assets/work/mnf/hero.svg"
            alt="Manufaktura Studio hero"
            className="absolute"
            style={{
              left: pctX(270),
              top: pctY(140),
              width: pctX(899),
              height: pctY(370.67),
            }}
          />
        </Reveal>

        {/* ============================================================
            Section 2 — Title + body (Group 79, 297:57100)
            Frame (504.81, 595.67), 430×199.
            ============================================================ */}
        <div
          className="absolute text-center"
          style={{ left: pctX(504.81), top: pctY(595.67), width: pctX(430), color: titleInk }}
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
              {mnf.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              style={{
                marginTop: cqw(14.17), // top 34.17 - 20 eyebrow
                fontSize: cqw(17),
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
            position (outside the offset group below).
            ============================================================ */}
        <Reveal delay={0.05}>
          <div
            className="absolute"
            style={{ left: pctX(270), top: pctY(900), width: pctX(899), height: pctY(545) }}
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
            1753.63→1467.63, mid 2672.88→2386.88, bottom
            3937.30→3651.30), opening a gap under the intro and
            overflowing the frame. The -286 shift is baked into each
            child's top below (see file-header note) — each stays a
            direct child of the aspect-stage. */}

        {/* ============================================================
            Section 3 — Row 1 LEFT (Group 25, 71:977)
            Frame (270, 1753.63 - 286 = 1467.63), 437.65×299.26.
            Consolidated SVG.
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{
              left: pctX(270),
              top: pctY(1467.63),
              width: pctX(437.65),
              height: pctY(299.26),
            }}
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
            Frame (731.65, 1753.63 - 286 = 1467.63), 437.65×299.26.
            Consolidated SVG.
            ============================================================ */}
        <Reveal eager delay={0.05}>
          <div
            className="absolute overflow-hidden"
            style={{
              left: pctX(731.65),
              top: pctY(1467.63),
              width: pctX(437.35),
              height: pctY(299.26),
            }}
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
            style={{ left: pctX(270), top: pctY(1790), width: pctX(899), height: pctY(571) }}
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
            Frame (270, 2672.88 - 286 = 2386.88), 899×1239.42. The dense
            grid was only partially inlined (4 cards); now the full
            brand-grid artboard (MNFArtboard 76, matching 0.725 aspect),
            object-cover.
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(270), top: pctY(2386.88), width: pctX(899), height: pctY(1239.42) }}
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
            Frame (270, 3937.30 - 286 = 3651.30), 899×575. Full flat
            artboard 77 (1791×1208) with the "MANUFAKTURA STUDIO___"
            wordmark baked in, replacing the low-res photo + blend
            overlay + 18 letter vectors (content/mnf.ts `bottomVectors`
            — dead/unused, see file-header note).
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(270), top: pctY(3651.30), width: pctX(899), height: pctY(575) }}
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

        {/* Floating brand vector (71:410) at frame
            (717.26, 4250.49 - 286 = 3964.49), 275×88 */}
        <Reveal eager>
          <img
            src="/figma-assets/work/mnf/floating.svg"
            alt=""
            className="absolute"
            style={{
              left: pctX(717.26),
              top: pctY(3964.49),
              width: pctX(275.25),
              height: pctY(87.60),
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
