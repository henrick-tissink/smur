import Image from "next/image";
import { useTranslations } from "next-intl";
import { lavabo, lavaboFrame } from "@/content/lavabo";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid mobile LAVABO case study.
  Ported from components/mobile/lavabo-page.tsx (MobileLavaboCaseStudy).

  Lavabo is the ONE mobile exception in this rearchitecture: its legacy
  mobile root was ALSO a fixed 393×2499 canvas with absolute px children
  (NOT the natural-flow Recipe B layout used by every other case study's
  mobile tree). So this file uses Recipe A too — the same aspect-ratio
  stage pattern as the desktop tree, just with STAGE_W/STAGE_H =
  lavaboFrame.mobile and max-w-[393px] — instead of Recipe B's
  container-query flow.

  Visual-only — Figma's mobile design has no title/body block in the
  original Figma frame; the intro eyebrow+body block here was already a
  legacy addition (matching every other mobile case study), reproduced
  verbatim.

  Containing-block note: same trap as the desktop file's "sink hero with
  overlay" section (Frame 52 equivalent) — the wrapper is position:absolute
  AND its overlay child is ALSO position:absolute, so the overlay's
  left/top/width/height are LOCAL to the wrapper's own 393×391.6 box, not
  frame-absolute to the 393×2499 stage. Converted with shx/shy (local to
  that box) instead of pctX/pctY.

  sink-photo.png + sink-hero.png are byte-identical to the desktop assets,
  so we reference the desktop paths instead of duplicating files.
*/

const STAGE_W = lavaboFrame.mobile.width;
const STAGE_H = lavaboFrame.mobile.height;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

// Local coordinate space of the sink-hero-with-overlay wrapper — see
// containing-block note above. 393×391.6 is the wrapper's own size, not
// the stage's (the stage happens to share the same width here, but NOT the
// height — 391.6 vs 2499 — so this must stay a distinct local helper).
const SINK_LOCAL_W = 393;
const SINK_LOCAL_H = 391.6;
function shx(px: number) {
  return `${(px / SINK_LOCAL_W) * 100}%`;
}
function shy(px: number) {
  return `${(px / SINK_LOCAL_H) * 100}%`;
}

export function MobileLavaboCaseStudy() {
  const t = useTranslations("CaseStudies.lavabo");
  return (
    <section
      data-nav-scheme="dark"
      className="w-full"
      style={{ backgroundColor: "#fff7f4" }}
    >
      <div
        className="relative mx-auto w-full max-w-[393px] overflow-hidden"
        style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}`, containerType: "inline-size" }}
      >
        {/* 2x2 logotype grid */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(0), top: pctY(104), width: pctX(189.99), height: pctY(136.65) }}
          >
            <Image
              src="/figma-assets/work/lavabo/grid-black.png"
              alt="LAVABO logotype — black ground"
              width={870}
              height={626}
              unoptimized
              priority
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className="absolute"
            style={{ left: pctX(203.01), top: pctY(104), width: pctX(189.99), height: pctY(136.65) }}
          >
            <Image
              src="/figma-assets/work/lavabo/grid-sage.png"
              alt="LAVABO logotype — sand ground"
              width={870}
              height={626}
              unoptimized
              priority
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            className="absolute"
            style={{ left: pctX(0), top: pctY(251.2), width: pctX(189.99), height: pctY(136.65) }}
          >
            <Image
              src="/figma-assets/work/lavabo/grid-blush.png"
              alt="LAVABO logotype — blush ground"
              width={870}
              height={626}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div
            className="absolute"
            style={{ left: pctX(203.01), top: pctY(251.2), width: pctX(189.99), height: pctY(136.65) }}
          >
            <Image
              src="/figma-assets/work/lavabo/grid-slate.png"
              alt="LAVABO logotype — slate ground"
              width={870}
              height={626}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Intro eyebrow + body — sits in the gap between the logotype grid
           and the sink photo, matching every other mobile case study. Text
           from content/lavabo.ts (same copy as the desktop intro). */}
        <Reveal>
          <div
            className="absolute text-center"
            style={{ left: pctX(0), top: pctY(440), width: pctX(393), color: "#35221a" }}
          >
            <div style={{ paddingLeft: cqw(43), paddingRight: cqw(43) }}>
              <p
                className="italic"
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 400,
                  fontSize: cqw(20),
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {t("eyebrow")}
              </p>
              <p style={{ marginTop: cqw(18), fontSize: cqw(15), lineHeight: 1.45, margin: 0 }}>
                {t("body")}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Sink editorial photo at y=735 */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(0), top: pctY(735), width: pctX(393), height: pctY(261.5) }}
          >
            <Image
              src="/figma-assets/work/lavabo/sink-photo.png"
              alt="LAVABO concrete sink — editorial photograph"
              width={392}
              height={262}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Logotype band at y=1008 */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(0), top: pctY(1008.5), width: pctX(393), height: pctY(154.96) }}
          >
            <Image
              src="/figma-assets/work/lavabo/logotype-band.png"
              alt=""
              width={1797}
              height={709}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Letterforms grid at y=1175 */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(0), top: pctY(1175.47), width: pctX(393), height: pctY(222.06) }}
          >
            <Image
              src="/figma-assets/work/lavabo/letterforms-grid.png"
              alt=""
              width={1797}
              height={1016}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Sink hero with overlay at y=1409 — containing-block trap: the
           overlay Image below is LOCAL to this 393×391.6 wrapper (see
           file-header note), converted with shx/shy, not pctX/pctY. */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(0), top: pctY(1409.53), width: pctX(393), height: pctY(391.6) }}
          >
            <Image
              src="/figma-assets/work/lavabo/sink-hero.png"
              alt="LAVABO sink lifestyle photo"
              width={391}
              height={392}
              unoptimized
              className="block h-full w-full object-cover"
            />
            <Image
              src="/figma-assets/work/lavabo/mobile/sink-overlay.svg"
              alt=""
              width={273}
              height={112}
              unoptimized
              className="absolute"
              style={{ left: shx(59), top: shy(142), width: shx(272.93), height: shy(112.3) }}
            />
          </div>
        </Reveal>

        {/* Mark icons at y=1813 */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(0), top: pctY(1813.12), width: pctX(393), height: pctY(126.28) }}
          >
            <Image
              src="/figma-assets/work/lavabo/mark.png"
              alt=""
              width={1796}
              height={579}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Brand book mockup at y=1951 — flat "The art of sink" artboard, same
           as desktop (the mobile frame shares the desktop's 0.721 aspect ratio). */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(0), top: pctY(1951.4), width: pctX(393), height: pctY(544.91) }}
          >
            <Image
              src="/figma-assets/work/lavabo/brand-book.png"
              alt="LAVABO ‘The art of sink’ website page"
              width={1798}
              height={2493}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
