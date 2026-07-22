import Image from "next/image";
import { kabinett, kabinettFrame } from "@/content/kabinett";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid desktop kabinett (Kabinett Wine & Spirits) case study.
  Ported from components/work/kabinett-page.tsx (KabinettCaseStudy) to the
  aspect-ratio stage pattern: stage = aspect-ratio 1440/4985
  container-query box, the legacy 1440×4985 composition (Figma 73:36625,
  bg #fff7f4) is expressed in % (positions) and cqw (font sizes) so it
  scales with viewport width — no zoom.

  Deferred per CLAUDE.md rule #2 (unchanged from legacy):
    - Row 2 (Group 117, 894×1100) — vector-dense composition with 70+
      inline vectors + 2 masked photos. No useful Layer_1 consolidation
      (just the bg). Largest deferred area on this page. Renders as the
      flat "Cheese & Wine Evenings" poster export (row2-poster.png).
    - Row 3 RIGHT (Group 116) — 20+ vectors + masked photo. Deferred;
      renders as the flat row3-right-flat.png export.
    - Bottom (Group 114) inner wordmark letter rows (~20 vectors). Renders
      as the flat bottom-flat.png export.

  kabinett-extras/bottom.tsx (KabinettBottomContent) and
  kabinett-extras/row3-right.tsx (KabinettRow3RightContent) exist in the
  repo but are NOT imported by the legacy desktop page being ported here
  — the legacy file's own comments (Sections 6/8) still describe the old
  inlined-vector architecture, but the actual legacy code already
  replaced both with flat PNG exports (row3-right-flat.png,
  bottom-flat.png). Per the "read the legacy file verbatim" rule, this
  port reproduces what the legacy file actually renders (the flat
  exports), not the stale comment. The two -extras files are left
  untouched and unimported, exactly as they were pre-conversion.

  content/kabinett.ts's `address` field (Quicksand 11.76px, #5d5d5d) is
  likewise NOT rendered by the legacy page — it was authored for the old
  kabinett-extras/bottom inline-address layout, which the legacy page no
  longer mounts (see above). Left unrendered here too, matching legacy
  behavior exactly (no invented content).

  Containing-block note: the hero (Section 1) outer wrapper sits at
  frame-absolute (272, 139.55), 894×645.377 — a direct child of the
  stage, so its own left/top/width/height convert with pctX/pctY like
  everything else. But its four quadrant children use LOCAL coordinates
  relative to THAT 894×645.377 box (e.g. left: 1.07, top: 0 — far
  smaller than any frame-absolute value), not frame-absolute
  coordinates. Those are converted with hx/hy (percent of the local
  894×645.377 box) instead of pctX/pctY (percent of the 1440×4985
  stage) — converting them against the stage would be wrong (the
  containing-block gotcha), and hoisting them to direct stage children
  would be equally wrong since they were never frame-absolute to begin
  with. No `transform: translate` correction group exists in this file
  (unlike mnf) — every other absolutely-positioned child IS a direct
  child of the stage using genuine frame-absolute coordinates.

  Row 1's brand-mark vectors (content/kabinett.ts `row1Vectors`) use
  `inset` percentages that are ALREADY root-frame (1440×4985) relative
  (per the content file's own comment) — identical basis to this stage,
  so they're kept verbatim as direct stage children with no conversion.
*/

const STAGE_W = kabinettFrame.desktop.width;
const STAGE_H = kabinettFrame.desktop.height;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

// Local coordinate space of the hero quadrant group (Section 1) — see
// containing-block note above. 894×645.377 is the outer wrapper's own
// size, not the stage's.
const HERO_LOCAL_W = 894;
const HERO_LOCAL_H = 645.377;
function hx(px: number) {
  return `${(px / HERO_LOCAL_W) * 100}%`;
}
function hy(px: number) {
  return `${(px / HERO_LOCAL_H) * 100}%`;
}

export function KabinettCaseStudy() {
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
            Section 1 — Hero (Layer_1, 73:39242)
            Frame (272, 139.55), 894×645.377. Consolidated SVG.
            ============================================================ */}
        <Reveal>
          {/* 2×2 lockup grid — four artboard quadrants color-matched to the
              hero.svg background rects (TL #2D2D2D, TR #E3E4E5, BL #922E46,
              BR #DFD3D1). Coordinates below are LOCAL to this 894×645.377
              box (see containing-block note above) — converted with hx/hy. */}
          <div
            className="absolute"
            style={{ left: pctX(272), top: pctY(139.55), width: pctX(894), height: pctY(645.377) }}
          >
            {/* Top-left — dark #2D2D2D (artboard 137) */}
            <div
              className="absolute overflow-hidden"
              style={{ left: hx(1.07), top: hy(0), width: hx(434.52), height: hy(311.509) }}
            >
              <Image
                src="/figma-assets/work/kabinett/hero-q-dark.png"
                alt="Kabinett lockup on charcoal"
                width={870}
                height={626}
                unoptimized
                className="block h-full w-full object-cover"
              />
            </div>
            {/* Top-right — grey #E3E4E5 (artboard 138) */}
            <div
              className="absolute overflow-hidden"
              style={{ left: hx(459.92), top: hy(0.11), width: hx(434.52), height: hy(311.509) }}
            >
              <Image
                src="/figma-assets/work/kabinett/hero-q-grey.png"
                alt="Kabinett lockup on grey"
                width={870}
                height={626}
                unoptimized
                className="block h-full w-full object-cover"
              />
            </div>
            {/* Bottom-left — burgundy #922E46 (artboard 139) */}
            <div
              className="absolute overflow-hidden"
              style={{ left: hx(0), top: hy(333.868), width: hx(434.52), height: hy(311.509) }}
            >
              <Image
                src="/figma-assets/work/kabinett/hero-q-burgundy.png"
                alt="Kabinett lockup on burgundy"
                width={870}
                height={626}
                unoptimized
                className="block h-full w-full object-cover"
              />
            </div>
            {/* Bottom-right — rose #DFD3D1 (artboard 140) */}
            <div
              className="absolute overflow-hidden"
              style={{ left: hx(459.92), top: hy(333.868), width: hx(434.52), height: hy(311.509) }}
            >
              <Image
                src="/figma-assets/work/kabinett/hero-q-rose.png"
                alt="Kabinett lockup on rose"
                width={870}
                height={626}
                unoptimized
                className="block h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* ============================================================
            Section 2 — Title + body (Group 79, 297:57927)
            Frame (489, 869.93), 430×295. Title says "KABINETT WINE & SPIRITS".
            ============================================================ */}
        <div
          className="absolute text-center"
          style={{ left: pctX(489), top: pctY(869.93), width: pctX(430), color: titleInk }}
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
              {kabinett.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div
              style={{
                marginTop: cqw(22), // 42 (top 912-870) − 20 (eyebrow)
                fontSize: cqw(17),
                lineHeight: 1.33,
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              {kabinett.body.map((p, i) => (
                <p key={i} style={{ margin: 0, marginTop: i === 0 ? 0 : "1em" }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ============================================================
            Section 3 — Row 1 band (Layer_2, 73:39323)
            Frame (272, 1249.93), 894.49×584.84 (LEFT masked photo, 434×585)
            + RIGHT brand-mark composition (11 vectors).
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(272), top: pctY(1249.93), width: pctX(434), height: pctY(585) }}
          >
            <Image
              src="/figma-assets/work/kabinett/row1/photo.jpg"
              alt="Kabinett brand photograph"
              width={2080}
              height={3000}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        {/* 11 brand-mark vectors on the right half. Insets already
           root-frame (1440×4985) relative (see content/kabinett.ts
           comment) — same basis as this stage, kept verbatim. */}
        {kabinett.row1Vectors.map((v) => (
          <div key={v.src} className="absolute" style={{ inset: v.inset }}>
            <img
              src={`/figma-assets/work/kabinett/row1/${v.src}`}
              alt=""
              className="absolute inset-0 block h-full w-full"
              style={{ maxWidth: "none" }}
            />
          </div>
        ))}

        {/* ============================================================
            Section 4 — Row 2 (Group 117, artboard 143). Flat export of the
            "Cheese & Wine Evenings" poster; replaces the inlined masked
            photo + 70-vector composition. Frame (272, 1859.68), 894×1100
            (artboard 1801×2227, ratio 0.808 — object-cover).
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(272), top: pctY(1859.68), width: pctX(894), height: pctY(1100) }}
          >
            <Image
              src="/figma-assets/work/kabinett/row2-poster.png"
              alt="Kabinett ‘Cheese & Wine Evenings’ poster"
              width={1801}
              height={2227}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 5 — Row 3 LEFT (Group 115, Layer_2 73:39436)
            Frame (272, 2985), 433.51×586. Consolidated SVG.
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(272), top: pctY(2985), width: pctX(433.51), height: pctY(586) }}
          >
            <Image
              src="/figma-assets/work/kabinett/row3-left.png"
              alt="Kabinett Wine & Spirits wordmark on burgundy"
              width={870}
              height={1176}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 6 — Row 3 RIGHT (Group 116, Layer_2 73:39506)
            Frame (729.52, 2985.37), 434.62×585.49. Flat export
            (row3-right-flat.png) — the legacy page's own comment still
            describes the inlined 20+-vector ./kabinett-extras/row3-right
            composition, but the actual legacy code already renders the
            flat export (see file-header note above); reproduced verbatim.
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(729.52), top: pctY(2985.37), width: pctX(434.62), height: pctY(585.49) }}
          >
            <Image
              src="/figma-assets/work/kabinett/row3-right-flat.png"
              alt="Kabinett — wine glasses with the logotype overlay"
              width={872}
              height={1257}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 7 — Row 4 (Clip path group 73:39825)
            Frame (272, 3595.78), 893×608. Masked photo composition.
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(272), top: pctY(3595.78), width: pctX(894), height: pctY(608) }}
          >
            <Image
              src="/figma-assets/work/kabinett/row4-pattern.png"
              alt="Kabinett repeating logotype pattern"
              width={1771}
              height={1221}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 8 — Bottom (Group 114, Layer_2 73:40115)
            Frame (272, 4242.76), 896×604. Flat export (bottom-flat.png) —
            the legacy page's own comment still describes the fully
            inlined ./kabinett-extras/bottom (bg photo + main cabinet
            vector + inset photo + real-HTML address text + 20 letter
            rows), but the actual legacy code already renders the flat
            export (see file-header note above); reproduced verbatim.
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(272), top: pctY(4242.76), width: pctX(894), height: pctY(604) }}
          >
            <Image
              src="/figma-assets/work/kabinett/bottom-flat.png"
              alt="Kabinett business cards and brand collateral"
              width={1793}
              height={1210}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Floating brand vector (73:36629) at frame (717.26, 4236.88), 275×87 */}
        <Reveal>
          <img
            src="/figma-assets/work/kabinett/floating.svg"
            alt=""
            className="absolute"
            style={{
              left: pctX(717.26),
              top: pctY(4236.88),
              width: pctX(275.25),
              height: pctY(87.32),
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
