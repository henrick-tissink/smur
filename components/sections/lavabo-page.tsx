import Image from "next/image";
import { lavabo, lavaboFrame } from "@/content/lavabo";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid desktop LAVABO case study.
  Ported from components/work/lavabo-page.tsx (LavaboCaseStudy) to the
  aspect-ratio stage pattern: stage = aspect-ratio 1440/5336
  container-query box, the legacy 1440×5336 composition (Figma 70:6705,
  bg #fff7f4) is expressed in % (positions) and cqw (font sizes) so it
  scales with viewport width — no zoom.

  Lavabo is a vector-composed brand-book section — its baked SVG/PNG
  composition (2×2 logotype grid, sink photos, logotype band, letterforms
  grid, mark icons, brand-book artboard) stays internally UNCHANGED; only
  the positioning wrappers convert from px to %/cqw. Per CLAUDE.md rule #2,
  image fills come from get_design_context asset URLs (NOT screenshots).

  Containing-block note: every section wrapper below was a direct child of
  the legacy fixed canvas, so each stays a direct child of the aspect-stage
  div here — EXCEPT the "sink hero with overlay" section (Frame 52, y=2715),
  whose wrapper is itself position:absolute AND contains a second
  position:absolute child (the white logotype overlay SVG). That overlay's
  left/top/width/height are LOCAL to the wrapper's own 896×895.5 box (CSS
  resolves an absolutely-positioned element's offsets against its nearest
  positioned ancestor, which is the wrapper — not the stage). Converted
  with shx/shy (percent of that local 896×895.5 box) instead of pctX/pctY
  (percent of the 1440×5336 stage) — same trap as taf's hero quadrant group.
*/

const STAGE_W = lavaboFrame.desktop.width;
const STAGE_H = lavaboFrame.desktop.height;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

// Local coordinate space of the sink-hero-with-overlay wrapper (Frame 52) —
// see containing-block note above. 896×895.5 is the wrapper's own size,
// not the stage's.
const SINK_LOCAL_W = 896;
const SINK_LOCAL_H = 895.5;
function shx(px: number) {
  return `${(px / SINK_LOCAL_W) * 100}%`;
}
function shy(px: number) {
  return `${(px / SINK_LOCAL_H) * 100}%`;
}

export function LavaboCaseStudy() {
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
        {/* 2x2 logotype grid at y=140 (4 cells of 434.52 × 312.51) */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(272), top: pctY(140), width: pctX(434.52), height: pctY(312.51) }}
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
            style={{ left: pctX(731.52), top: pctY(140), width: pctX(436.48), height: pctY(312.51) }}
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
            style={{ left: pctX(272), top: pctY(478.51), width: pctX(434.52), height: pctY(312.51) }}
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
            style={{ left: pctX(731.52), top: pctY(477.51), width: pctX(436.48), height: pctY(312.51) }}
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

        {/* Title + body at y=875 (Group 297:57945, w=898.71 centered at left=271) */}
        <div
          className="absolute text-center"
          style={{ left: pctX(505), top: pctY(875), width: pctX(430), color: "#35221a" }}
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
              {lavabo.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ marginTop: cqw(35), fontSize: cqw(17), lineHeight: 1.33, margin: 0 }}>
              {lavabo.body}
            </p>
          </Reveal>
        </div>

        {/* Sink editorial hero (lavabo_2_1.psd) at y=1180 */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(272), top: pctY(1180), width: pctX(896), height: pctY(598) }}
          >
            <Image
              src="/figma-assets/work/lavabo/sink-photo.png"
              alt="LAVABO concrete sink — editorial photograph"
              width={897}
              height={598}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Logotype band (Frame 50) at y=1803 */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(272), top: pctY(1803), width: pctX(896), height: pctY(354.37) }}
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

        {/* Letterforms grid (Frame 51) at y=2182 */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(272), top: pctY(2182), width: pctX(896), height: pctY(507.81) }}
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

        {/* Sink hero with overlay (Frame 52) at y=2715 — containing-block
           trap: the overlay Image below is LOCAL to this 896×895.5 wrapper
           (see file-header note), converted with shx/shy, not pctX/pctY. */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(272), top: pctY(2715), width: pctX(896), height: pctY(895.5) }}
          >
            <Image
              src="/figma-assets/work/lavabo/sink-hero.png"
              alt="LAVABO sink lifestyle photo"
              width={894}
              height={896}
              unoptimized
              className="absolute block max-w-none object-cover"
              /* baked-in light column on the artboard's right edge; oversize
                 past the clip box so it's cropped out */
              style={{ left: 0, top: 0, width: "calc(100% + 2px)", height: "100%" }}
            />
            <Image
              src="/figma-assets/work/lavabo/sink-overlay.svg"
              alt=""
              width={624}
              height={257}
              unoptimized
              className="absolute"
              style={{ left: shx(135), top: shy(325), width: shx(624.14), height: shy(256.81) }}
            />
          </div>
        </Reveal>

        {/* Mark icons (Frame 53) at y=3635 */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(272), top: pctY(3635), width: pctX(896), height: pctY(288.77) }}
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

        {/* Brand book mockup (Frame 54) at y=3949 — flat export of the LAVABO
           "The art of sink." website page (artboard 59); replaces the
           hand-built <LavaboBrandBook> HTML rebuild. Frame 898.58×1246.09
           (artboard 1798×2493, ratio 0.721 — exact). */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(272), top: pctY(3949), width: pctX(896), height: pctY(1246.09) }}
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
