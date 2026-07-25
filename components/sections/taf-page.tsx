import Image from "next/image";
import { taf, tafFrame } from "@/content/taf";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid desktop TAF (UAE cleaning brand) case study.
  Ported from components/work/taf-page.tsx (TafCaseStudy) to the
  aspect-ratio stage pattern: stage = aspect-ratio 1440/4942
  container-query box, the legacy 1440×4942 composition (Figma 73:29056,
  bg #fff7f4) is expressed in % (positions) and cqw (font sizes) so it
  scales with viewport width — no zoom.

  Deferred per CLAUDE.md rule #2 (unchanged from legacy):
    - Middle section (Group 112) inner Layer_2 (~900×1474 vector-dense
      composition). Renders as flat #D5CDC2 tan rect (1676 tall) — same
      pattern as INTERSTELLAR Row 4. Highest-impact follow-up.
  content/taf.ts's `bottomVectors` (7 letterform SVGs) are NOT rendered
  here — they were already dead/unused in the legacy component, replaced
  by the flat "bottom-full.png" artboard with the wordmark baked in.

  Containing-block note: the hero (Section 1) outer wrapper sits at
  frame-absolute (273, 140), 900×649.13 — a direct child of the stage, so
  its own left/top/width/height convert with pctX/pctY like everything
  else. But its four quadrant children use LOCAL coordinates relative to
  THAT 900×649.13 box (e.g. left: 1.38, top: 0 — far smaller than any
  frame-absolute value), not frame-absolute coordinates. Those are
  converted with hx/hy (percent of the local 900×649.13 box) instead of
  pctX/pctY (percent of the 1440×4942 stage) — converting them against
  the stage would be wrong (the containing-block gotcha), and hoisting
  them to direct stage children would be equally wrong since they were
  never frame-absolute to begin with. No other section in this file has
  this shape: every other absolutely-positioned child IS a direct child
  of the stage using genuine frame-absolute coordinates, per the legacy
  file's structure (no `transform: translate` correction group here,
  unlike mnf).
*/

const STAGE_W = tafFrame.desktop.width;
const STAGE_H = tafFrame.desktop.height;

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
// containing-block note above. 900×649.13 is the outer wrapper's own
// size, not the stage's.
const HERO_LOCAL_W = 900;
const HERO_LOCAL_H = 649.13;
function hx(px: number) {
  return `${(px / HERO_LOCAL_W) * 100}%`;
}
function hy(px: number) {
  return `${(px / HERO_LOCAL_H) * 100}%`;
}

export function TafCaseStudy() {
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
            Section 1 — Hero (Layer_2, 73:30561)
            Frame (273, 140), 900×649.13. Consolidated SVG.
            ============================================================ */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(273), top: pctY(140), width: pctX(900), height: pctY(649.13) }}
          >
            {/* Four quadrant artboards mapped by background color (matches
               hero.svg quadrant fills): TL #2D2D2D dark (126), TR #EAB5BA
               pink (127), BR #FF8A80 coral (129), BL #DFD8CE tan (128).
               Coordinates below are LOCAL to this 900×649.13 box (see
               containing-block note above) — converted with hx/hy. */}
            <div
              className="absolute overflow-hidden"
              style={{ left: hx(1.38), top: hy(0), width: hx(434.52), height: hy(312.51) }}
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
              style={{ left: hx(461.72), top: hy(1.67), width: hx(434.52), height: hy(312.51) }}
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
              style={{ left: hx(461.72), top: hy(336.61), width: hx(434.52), height: hy(312.51) }}
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
              style={{ left: hx(0), top: hy(336.61), width: hx(434.52), height: hy(312.51) }}
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
          style={{ left: pctX(503), top: pctY(874.13), width: pctX(430), color: titleInk }}
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
              {taf.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div
              style={{
                marginTop: cqw(22), // 42 (Figma top 916-874) − 20 (eyebrow)
                fontSize: cqw(17),
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
            style={{ left: pctX(273), top: pctY(1254), width: pctX(434.52), height: pctY(587.37) }}
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
            Frame (738.52, 1254.66), 434.48×587.37. Consolidated SVG.
            ============================================================ */}
        <Reveal delay={0.05}>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(738.52), top: pctY(1254.66), width: pctX(434.48), height: pctY(587.37) }}
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
            style={{ left: pctX(273), top: pctY(1867), width: pctX(900), height: pctY(609) }}
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
            style={{ left: pctX(273), top: pctY(2501.03), width: pctX(900), height: pctY(1676) }}
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
            Frame (273, 4202.03), 900×600. Background photo + 7 vector
            marks forming the TAF wordmark + decorations.
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(273), top: pctY(4202.03), width: pctX(900), height: pctY(600) }}
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
    </section>
  );
}
