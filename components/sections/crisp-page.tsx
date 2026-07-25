import Image from "next/image";
import { crisp, crispFrame } from "@/content/crisp";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid desktop CRISP case study (Figma 71:3160). Ported from
  components/work/crisp-page.tsx (CrispCaseStudy) to the aspect-ratio
  stage pattern: stage = aspect-ratio 1440/5340 container-query box, the
  legacy 1440×5340 composition (bg #fff7f4) is expressed in % (positions)
  and cqw (font sizes) so it scales with viewport width — no zoom.
  Desktop only — no mobile frame exists in Figma (mobile uses Recipe B,
  M_W = 393, see mobile-crisp-page.tsx).

  Four originally-vector-composed sections (the pattern band, row-2 left
  Instagram mockup, row-2 right business cards, and the bottom poster) are
  flat full-resolution artboard exports (unchanged from legacy) — kept
  byte-identical, only their positioning wrapper converts.

  Containing-block note: the legacy fixed-canvas version wrapped
  Sections 3-11 (everything below the intro) in `<div className=
  "absolute inset-0" style={{ transform: "translateY(-279.21px)" }}>` to
  correct a transcription offset (Row1 1404.46/1405.46, band 1968.46,
  row2 2613, middle band 3171.71/overlay 3423.19, row3 3811.59, poster
  4365.08 — each verified 279.21px too low vs Figma). A fixed-px
  transform doesn't scale with the fluid stage, so here that -279.21
  shift is baked directly into each child's top coordinate and every one
  of those children is hoisted to be a direct child of the aspect-stage
  (per the containing-block rule) instead of nesting inside an
  intermediate absolute/transformed group.

  The hero brand-mark letterforms (v1-v9 SVGs) and the 19 rotated
  "ARTISANALPATISSERIE" curve-letters (heroCurveLetters) already use
  frame-relative % insets in content/crisp.ts (verbatim from Figma's own
  get_design_context output) — these need NO pctX/pctY conversion, they
  already resolve against the 1440×5340 stage exactly like a converted
  px value would. Each curve-letter wrapper sets `containerType: "size"`
  to compute its own rotated bounding box locally via `hypot(cqw, cqh)` —
  intentionally LOCAL container-query units (case c, like taf's hx/hy),
  NOT the stage's cqw. The one literal px value inside that local
  context, fontSize: 22, is converted to a LOCAL cqw percentage (via
  heroLetterFontSize below) sized against that letter's own box width so
  it still scales in lockstep with the stage — using the global `cqw`
  helper here would silently resolve against the wrong (local) container.
*/

const STAGE_W = crispFrame.desktop.width;
const STAGE_H = crispFrame.desktop.height;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

// Each heroCurveLetters wrapper is a `containerType: "size"` local query
// container (case c) sized by its own frame-relative % inset. Its width
// at the design resolution (STAGE_W) is `(100 - left% - right%)/100 *
// STAGE_W`; expressing the target px as a % of THAT local width, in
// `cqw` (which resolves against the local container, not the stage),
// reproduces the same design-width px at STAGE_W and keeps scaling in
// lockstep with the stage at other widths.
function heroLetterFontSize(inset: string, targetPx: number) {
  const [, right, , left] = inset.split("_").map((v) => parseFloat(v));
  const localWidthPx = (STAGE_W * (100 - left - right)) / 100;
  return `${(targetPx / localWidthPx) * 100}cqw`;
}

export function CrispCaseStudy() {
  const ink = "#26211e";
  const titleInk = "#35221a";
  const heroBg = "#D4C3A2";

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
            Section 1 — Hero brand mark (Group 41, 71:4364)
            Frame y=140, 900×621. Backdrop rect + 5 letterforms + 4
            decorative vectors + 19 rotated text characters arranged
            around the circular mark spelling "ARTISANALPATISSERIE".
            ============================================================ */}
        {/* Backdrop rectangle (v0.svg, native fill #D4C3A2) */}
        <Reveal>
          <div
            className="absolute"
            style={{
              left: pctX(293),
              top: pctY(140),
              width: pctX(900),
              height: pctY(621),
              backgroundColor: heroBg,
            }}
          />
        </Reveal>

        {/* 5 letterforms (v1-v5) + 4 decorative vectors (v6-v9).
           Insets are root-frame-relative percentages from Figma —
           already stage-relative, no conversion needed. */}
        {[
          { src: "v1.svg", inset: "9.02% 54.07% 89.48% 40.59%" },
          { src: "v2.svg", inset: "9.05% 48.41% 89.51% 47.18%" },
          { src: "v3.svg", inset: "9.05% 46.78% 89.51% 52.32%" },
          { src: "v4.svg", inset: "9.02% 41.74% 89.48% 54.46%" },
          { src: "v5.svg", inset: "9.05% 36.81% 89.51% 59.5%" },
          { src: "v6.svg", inset: "7.11% 44.24% 91.22% 49.32%" },
          { src: "v7.svg", inset: "8.08% 47.35% 91.47% 52.04%" },
          { src: "v8.svg", inset: "8.04% 44.28% 91.23% 51.99%" },
          { src: "v9.svg", inset: "7.24% 47.69% 92.05% 49.59%" },
        ].map((v) => (
          <div key={v.src} className="absolute" style={{ inset: v.inset }}>
            <img
              src={`/figma-assets/work/crisp/hero/${v.src}`}
              alt=""
              className="absolute inset-0 block h-full w-full"
              style={{ maxWidth: "none" }}
            />
          </div>
        ))}

        {/* 19 rotated characters around the brand-mark perimeter spelling
           "ARTISANALPATISSERIE". Uses CSS container queries (containerType:
           size) + hypot() for the rotated text bounding boxes — copied
           verbatim from Figma's design context output. */}
        {crisp.heroCurveLetters.map((c, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{ inset: c.inset.replace(/_/g, " "), containerType: "size" }}
          >
            <div
              style={{
                flex: "none",
                height: c.h,
                width: c.w,
                transform: `rotate(${c.rotate}deg)`,
              }}
            >
              <p
                className="relative"
                style={{
                  margin: 0,
                  fontFamily: "var(--font-open-sans), sans-serif",
                  fontWeight: 400,
                  fontSize: heroLetterFontSize(c.inset, 22),
                  lineHeight: "normal",
                  color: ink,
                  wordBreak: "break-word",
                  width: "100%",
                  height: "100%",
                  fontVariationSettings: "'wdth' 100",
                }}
              >
                {c.ch}
              </p>
            </div>
          </div>
        ))}

        {/* ============================================================
            Section 2 — Title "CRISP" + intro body (Group 79, 297:57117)
            Inside Frame 88 at frame (293, 846); Group 79 at +(234.81, 0)
            → frame-absolute (527.81, 846), 430×194.
            ============================================================ */}
        <div
          className="absolute text-center"
          style={{ left: pctX(527.81), top: pctY(846), width: pctX(430), color: titleInk }}
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
              {crisp.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              style={{
                marginTop: cqw(13.87), // 33.87 (Figma top) − 20 (eyebrow line)
                fontSize: cqw(17),
                lineHeight: 1.33,
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              {crisp.body}
            </p>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------
            Everything below was transcribed 279.21px too low vs Figma
            (legacy correction: `translateY(-279.21px)` on a wrapper
            group). That fixed-px transform doesn't scale with the fluid
            stage, so the -279.21 shift is baked into each child's top
            below and every child stays a direct child of the aspect
            stage (containing-block rule) instead of nesting inside a
            transformed group.
            ------------------------------------------------------------ */}

        {/* ============================================================
            Section 3 — Row 1 left (Group 71:4365, photo)
            Frame (293, 1404.46 - 279.21 = 1125.25), 435×535. Figma crop:
            w=238.85% h=109.16% left=0 top=-9.16%.
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(293), top: pctY(1125.25), width: pctX(435), height: pctY(535) }}
          >
            <Image
              src="/figma-assets/work/crisp/row1-cafe.jpg"
              alt="CRISP café interior"
              width={851}
              height={1044}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 4 — Row 1 right (Group 85, consolidated SVG)
            Frame (753, 1405.46 - 279.21 = 1126.25), 431×534.
            ============================================================ */}
        <Reveal eager delay={0.05}>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(753), top: pctY(1126.25), width: pctX(440), height: pctY(534) }}
          >
            <Image
              src="/figma-assets/work/crisp/row1-badges.png"
              alt="CRISP — artisanal patisserie marks"
              width={848}
              height={1045}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 5 — Pattern band (artboard 93). Flat export of the
            repeated "CRISP" wordmark / croissant / stamp pattern;
            replaces the former 384-vector big-typography composition.
            Frame (293, 1968.46 - 279.21 = 1689.25), 900×615 (artboard
            1771×1208, Δ0.2%).
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(293), top: pctY(1689.25), width: pctX(900), height: pctY(615) }}
          >
            <Image
              src="/figma-assets/work/crisp/band-pattern.png"
              alt="CRISP pattern — repeated wordmark, croissant line marks and ‘artisanal patisserie’ stamps"
              width={1771}
              height={1208}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 6 — Row 2 left (artboard 95). Flat export of the
            Instagram-feed phone mockup; replaces the former ~42-vector
            + 3-photo composition. Frame (293, 2613 - 279.21 = 2333.79),
            439×529 (artboard 867×1045, Δ0.0%).
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(293), top: pctY(2333.79), width: pctX(439), height: pctY(529) }}
          >
            <Image
              src="/figma-assets/work/crisp/instagram-mockup.png"
              alt="CRISP Instagram feed shown on a phone held in hand"
              width={867}
              height={1045}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 7 — Row 2 right (artboard 96). Flat export of the
            two business cards on the sage backdrop; replaces the former
            consolidated SVG. Frame (757, 2613 - 279.21 = 2333.79),
            429×530 (artboard 847×1045, Δ0.1%).
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(757), top: pctY(2333.79), width: pctX(436), height: pctY(530) }}
          >
            <Image
              src="/figma-assets/work/crisp/business-cards.png"
              alt="CRISP business cards — contact details and croissant logotype on a sage background"
              width={847}
              height={1045}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 8 — Middle full-width band (Group 45, 71:4371)
            Frame (293, 3171.71 - 279.21 = 2892.50), 899×610.88. Bg photo
            + centered overlay.
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(293), top: pctY(2892.50), width: pctX(900), height: pctY(610.88) }}
          >
            <Image
              src="/figma-assets/work/crisp/band-bg.jpg"
              alt="CRISP brand showcase"
              width={2404}
              height={1633}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal eager delay={0.1}>
          <img
            src="/figma-assets/work/crisp/band-overlay.svg"
            alt=""
            className="absolute"
            style={{
              left: pctX(508.84), // 293 + 215.84
              top: pctY(3143.98), // 3171.71 + 251.48 - 279.21
              width: pctX(428.083),
              height: pctY(105.555),
            }}
          />
        </Reveal>

        {/* ============================================================
            Section 9 — Row 3 left (Group 88, consolidated SVG)
            Frame (293, 3811.59 - 279.21 = 3532.38), 436×524.
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(293), top: pctY(3532.38), width: pctX(436.362), height: pctY(524.485) }}
          >
            <Image
              src="/figma-assets/work/crisp/row3-icons.png"
              alt="CRISP brand composition"
              width={869}
              height={1045}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 10 — Row 3 right (Group 49, masked photo + overlay)
            Frame (754.36, 3811.59 - 279.21 = 3532.38), 430×524. Photo
            clipped by a rectangle mask (so a simple overflow-hidden
            wrapper at section bounds replicates the visible region);
            plus a centered overlay graphic.
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(754.36), top: pctY(3532.38), width: pctX(438.64), height: pctY(524.485) }}
          >
            <Image
              src="/figma-assets/work/crisp/row3-right-flat.png"
              alt="CRISP pastry photograph with circular croissant stamp"
              width={857}
              height={1044}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 11 — Bottom CRISP CAFÉ poster (artboard 100). Flat
            export of the folded "WE ARE NOW OPEN!" flyer; replaces the
            former Group 62 composition (bg photo + mix-blend overlay +
            45 masked vectors + wordmark + curved + contact text).
            Frame (293, 4365.08 - 279.21 = 4085.87), 899×1114.18
            (artboard 1796×2228, Δ0.1%).
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(293), top: pctY(4085.87), width: pctX(900), height: pctY(1114.18) }}
          >
            <Image
              src="/figma-assets/work/crisp/now-open-poster.png"
              alt="CRISP ‘We are now open!’ folded poster with a tartlet photo and contact details"
              width={1796}
              height={2228}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
