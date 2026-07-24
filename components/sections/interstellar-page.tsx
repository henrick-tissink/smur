import Image from "next/image";
import { useTranslations } from "next-intl";
import { interstellar, interstellarFrame } from "@/content/interstellar";
import { Reveal } from "@/components/reveal";
import { InterstellarRow5Content } from "@/components/work/interstellar-extras/row5-full";

/*
  Faithful-fluid desktop INTERSTELLAR (Interstellar Real Estate) case
  study. Ported from components/work/interstellar-page.tsx
  (InterstellarCaseStudy) to the aspect-ratio stage pattern: stage =
  aspect-ratio 1440/5075 container-query box, the legacy 1440×5075
  composition (Figma 73:19115, bg #fff7f4) is expressed in % (positions)
  and cqw (font sizes) so it scales with viewport width — no zoom.

  Deferred per CLAUDE.md rule #2 (unchanged from legacy):
    - Row 3 Layer_2 inner letter overlays (~36 vectors). Outer bg vectors
      and masked photo render.
    - Row 5 Layer_1 inner masked composition (~37 vectors), inlined via
      InterstellarRow5Content (kept fully unchanged internally).

  Containing-block note: the legacy fixed-canvas version wrapped
  Sections 3-8 + the floating brand vector (INCLUDING the inlined
  InterstellarRow5Content) in `<div className="absolute inset-0"
  style={{ transform: "translateY(-330px)" }}>` to correct a
  transcription offset (Row1 1369.05/1367.62, Row2 1702.92, Row3
  2037.59, Row4 2618.59, Row5 4099.84, Row6 4688.84, floating 4250.49 —
  each 330px too low vs Figma). A fixed-px transform doesn't scale with
  the fluid stage, so here that -330 shift is baked directly into each
  child's top coordinate and every one of those children is hoisted to
  be a direct child of the aspect-stage (per the containing-block rule)
  instead of nesting inside an intermediate absolute/transformed group.

  InterstellarRow5Content (interstellar-extras/row5-full.tsx) is a LIVE
  baked composition (47 masked vectors) — its internals are byte-
  identical to legacy. Only its own root positioning wrapper (a plain
  `left/top/width/height` px style, previously frame-absolute at
  (283, 4099.84)) was converted to the hoisted %-based position
  (283, 3769.84) so it resolves correctly as a direct stage child; see
  the note at the top of that file.

  Row 3's masked photo (Section 5) is nested inside a sized
  overflow-hidden wrapper (429×556, itself frame-absolute) and uses
  LOCAL coordinates relative to THAT box (left: -357.45, top: -36.14,
  width: 913.18, height: 636.19 — far outside any frame-absolute range),
  not frame-absolute coordinates. Converted with row3PhotoX/row3PhotoY
  (percent of the local 429×556 box) instead of pctX/pctY — converting
  against the stage would be wrong (the containing-block gotcha), and
  hoisting to a direct stage child would be equally wrong since these
  were never frame-absolute to begin with.

  heroLetters insets (content/interstellar.ts) and the mix-blend-color
  overlay inset are already root-frame (1440×5075) relative percentages
  from Figma's own get_design_context output — kept verbatim, no
  conversion needed.
*/

const STAGE_W = interstellarFrame.desktop.width;
const STAGE_H = interstellarFrame.desktop.height;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

// Local coordinate space of the Row 3 masked photo (Section 5) — see
// containing-block note above. 429×556 is the wrapper's own size, not
// the stage's.
const ROW3_LOCAL_W = 429;
const ROW3_LOCAL_H = 556;
function row3PhotoX(px: number) {
  return `${(px / ROW3_LOCAL_W) * 100}%`;
}
function row3PhotoY(px: number) {
  return `${(px / ROW3_LOCAL_H) * 100}%`;
}

export function InterstellarCaseStudy() {
  const t = useTranslations("CaseStudies.interstellar");
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
            Section 1 — Hero (Group 106, 297:57904)
            Frame (276.95, 140), 887.54×487.78. Masked bg photo + 11
            letterform SVGs spelling "INTERSTELLAR" + mix-blend-color
            overlay vector.
            ============================================================ */}
        {/* Background photo — clipped by overflow:hidden to section bounds */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(283), top: pctY(140), width: pctX(887.2), height: pctY(487.78) }}
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

        {/* 11 letter SVGs (INTERSTELLAR wordmark + tagline). Insets are
            already root-frame (1440×5075) relative — kept verbatim. */}
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
            Already root-frame relative — kept verbatim. */}
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
          style={{ left: pctX(512.01), top: pctY(712.78), width: pctX(430), color: titleInk }}
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
                marginTop: cqw(16.4), // 36.4 (Figma top inside group) − 20 (eyebrow)
                fontSize: cqw(17),
                lineHeight: 1.33,
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              {t("body")}
            </p>
          </Reveal>
        </div>

        {/* Sections 3-8 + floating vector were transcribed 330px too low
            vs Figma (see file-header note) — the -330 shift is baked
            into each child's top below and every child stays a direct
            child of the aspect stage (containing-block rule) instead of
            nesting inside a transformed group. */}

        {/* ============================================================
            Section 3 — Row 1 (Group 101, 297:57899)
            Frame (283, 1367.62 - 330 = 1037.62), 887×310. Top row of the
            2×2 logo-lockup grid: original artboard exports (116_1
            charcoal, 117 sage).
            ============================================================ */}
        {/* Top-left — charcoal #212121 lockup, white wordmark (artboard 116_1) */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(283), top: pctY(1039.05), width: pctX(429.46), height: pctY(308.87) }}
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
            style={{ left: pctX(740.7), top: pctY(1037.62), width: pctX(429.5), height: pctY(308.87) }}
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
            Frame (283, 1702.92 - 330 = 1372.92), 887×309. Bottom row of
            the 2×2 logo-lockup grid. Original artboard exports (119
            light LEFT, 118 gold RIGHT).
            ============================================================ */}
        {/* Bottom-left — light #D6D2C9 lockup, black wordmark + gold star (artboard 119) */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(283), top: pctY(1372.92), width: pctX(429.457), height: pctY(308.869) }}
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
            style={{ left: pctX(740.704), top: pctY(1372.92), width: pctX(429.457), height: pctY(308.869) }}
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
            Frame (285, 2037.59 - 330 = 1707.59), 884×556. LEFT bg vector
            + RIGHT bg vector + masked photo composition.
            TODO: defer Layer_2 inner letter overlays (~36 vectors).
            ============================================================ */}
        {/* LEFT bg vector */}
        <Reveal eager>
          <img
            src="/figma-assets/work/interstellar/row3-left-bg.svg"
            alt=""
            className="absolute"
            style={{ left: pctX(283), top: pctY(1707.59), width: pctX(429), height: pctY(556) }}
          />
        </Reveal>
        {/* RIGHT panel (artboard 121) — flat export of the "WE DEAL LEGACY,
            NOT PROPERTY." sage poster. Frame 428×556 (artboard 870×1140,
            Δ0.9%). */}
        <Reveal eager delay={0.05}>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(741), top: pctY(1707.59), width: pctX(429.2), height: pctY(556) }}
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
        {/* Masked photo (mask is a rectangle = overflow:hidden at section).
            The <img> inside uses LOCAL coordinates relative to this
            429×556 wrapper — see file-header containing-block note. */}
        <Reveal eager delay={0.1}>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(283), top: pctY(1707.59), width: pctX(429), height: pctY(556) }}
          >
            <img
              src="/figma-assets/work/interstellar/row3-photo.svg"
              alt="Interstellar brand photo"
              className="absolute max-w-none"
              style={{
                left: row3PhotoX(-357.45),
                top: row3PhotoY(-36.14),
                width: row3PhotoX(913.18),
                height: row3PhotoY(636.19),
              }}
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 6 — Row 4 property page (artboard 122). Flat export of
            the full INTERSTELLAR listing page (nav + hero + property grid +
            "The Path to Your Residence" + footer).
            Frame (283, 2618.59 - 330 = 2288.59), 887.53×1456.24 (artboard
            1798×2950, Δ0.01%).
            ============================================================ */}
        <Reveal eager>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(283), top: pctY(2288.59), width: pctX(887.2), height: pctY(1456.24) }}
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
            Frame (282, 4099.84 - 330 = 3769.84), 889×564. Full
            composition inlined via ./interstellar-extras/row5-full: LEFT
            photo + RIGHT bg vector + 3 overlay graphics + Layer_2
            thumbnail + inner Layer_1 masked composition (47 vectors at
            offset chain). InterstellarRow5Content's own root wrapper
            carries the hoisted %-based position — see file-header note.
            ============================================================ */}
        <Reveal eager>
          <InterstellarRow5Content />
        </Reveal>

        {/* ============================================================
            Section 8 — Row 6 (Group 109, 297:57911)
            Frame (278, 4688.84 - 330 = 4358.84), 898×520. Single
            consolidated SVG.
            ============================================================ */}
        <Reveal eager>
          <img
            src="/figma-assets/work/interstellar/row6.svg"
            alt="Interstellar bottom composition"
            className="absolute"
            style={{ left: pctX(283), top: pctY(4358.84), width: pctX(887.2), height: pctY(520.62) }}
          />
        </Reveal>

        {/* Floating brand vector (73:19120) at frame (717.26, 4250.49 -
            330 = 3920.49), 275×87 */}
        <Reveal eager>
          <img
            src="/figma-assets/work/interstellar/floating.svg"
            alt=""
            className="absolute"
            style={{
              left: pctX(717.26),
              top: pctY(3920.49),
              width: pctX(275.25),
              height: pctY(87.60),
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
