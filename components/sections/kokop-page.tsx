import Image from "next/image";
import { kokop, kokopFrame } from "@/content/kokop";
import { Reveal } from "@/components/reveal";
import { KokopSection8Content } from "@/components/work/kokop-extras/section8";

/*
  Faithful-fluid desktop KOKO.P case study (Figma 136:234). Ported from
  components/work/kokop-page.tsx (KokopCaseStudy) to the aspect-ratio
  stage pattern: stage = aspect-ratio 1440/4891 container-query box, the
  legacy 1440×4891 composition (bg #fff7f4) is expressed in % (positions)
  and cqw (font sizes) so it scales with viewport width — no zoom.
  Desktop only — no mobile frame exists in Figma (content/kokop.ts has no
  `kokopFrame.mobile`).

  Sections 6 (Group 122 brand book) and 8 (Group 120 final showcase) have
  small vector text overlays not yet fully inlined for section 6 — its
  base photo (brand-interior.png) renders as a flat export with the
  signage typography baked in, same as legacy. Section 8's typography IS
  fully inlined via kokop-extras/section8.tsx (KokopSection8Content, 944
  lines, 192 vector children) — kept unchanged internally, see the
  containing-block note below.

  kokop-extras/section6.tsx is NOT imported anywhere (confirmed via
  `rg "kokop-extras/section6"` — only self-reference in its own file) —
  dead code, like the kabinett/iwl extras precedent. Left byte-unchanged
  and unimported; section 6 below reproduces exactly what the legacy page
  actually rendered at that spot (the flat brand-interior.png photo).

  Containing-block note — Section 8 (kokop-extras/section8.tsx,
  KokopSection8Content): its own root is `<div className="contents
  relative size-full">` — `display:contents` generates no box, so it
  carries no left/top/width/height of its own; all of its ~192
  `inset-[…%]` vector children resolve their percentages against the
  nearest positioned ancestor, i.e. THIS file's wrapper div. The legacy
  wrapper was `className="absolute inset-0" style={{ transform:
  "translateX(-1.34px) scaleX(0.99524)", transformOrigin: "0 0" }}` — a
  fixed-px transform + scale that (a) doesn't fluidly resize with the
  stage and (b) is forbidden by the no-transform-scale rule. Hoisted
  instead into equivalent stage-relative left/width percentages: with
  transformOrigin 0/0 and transform order translate∘scale, a point at
  frame-x maps to `x*0.99524 - 1.34`. So x=0 → -1.34 (new left), x=1440 →
  1433.1456 (new right); width = 1433.1456 - (-1.34) = 1433.1456 (i.e.
  1440*0.99524, scale doesn't touch size independent of translate). No
  vertical transform existed, so top/height are untouched (0 / 4891 =
  100%). This keeps every one of section8.tsx's own inner children
  byte-identical (only this file's wrapper changed).

  Per CLAUDE.md rule #2, no get_screenshot for ANY assets — every img is
  a real Figma asset URL from get_design_context.
*/

const STAGE_W = kokopFrame.desktop.width;
const STAGE_H = kokopFrame.desktop.height;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function KokopCaseStudy() {
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
            Section 1 — Top hero (Frame 143:1426, y=140, 894×647)
            2×2 quadrant grid (q1 dark TL, q2 cream TR, q3 terracotta BL,
            q4 brown BR). Box 891×647.35; each quadrant is half =
            445.5×323.675, positioned at frame-absolute coords.
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(274.5), top: pctY(140), width: pctX(445.5), height: pctY(323.675) }}
          >
            <Image
              src="/figma-assets/work/kokop/hero-q1.png"
              alt="KOKO.P logo — dark ground"
              width={870}
              height={626}
              unoptimized
              priority
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(720), top: pctY(140), width: pctX(445.5), height: pctY(323.675) }}
          >
            <Image
              src="/figma-assets/work/kokop/hero-q2.png"
              alt="KOKO.P logo — cream ground"
              width={870}
              height={626}
              unoptimized
              priority
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(274.5), top: pctY(463.675), width: pctX(445.5), height: pctY(323.675) }}
          >
            <Image
              src="/figma-assets/work/kokop/hero-q3.png"
              alt="KOKO.P logo — terracotta ground"
              width={870}
              height={626}
              unoptimized
              priority
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(720), top: pctY(463.675), width: pctX(445.5), height: pctY(323.675) }}
          >
            <Image
              src="/figma-assets/work/kokop/hero-q4.png"
              alt="KOKO.P logo — brown ground"
              width={870}
              height={626}
              unoptimized
              priority
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 2 — Title + body (Group 119, y=872, w=430 centered)
            ============================================================ */}
        <div
          className="absolute text-center"
          style={{ left: pctX(505), top: pctY(872), width: pctX(430), color: "#35221a" }}
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
              {kokop.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col" style={{ marginTop: cqw(24), gap: cqw(22) }}>
              {kokop.body.map((p, i) => (
                <p key={i} style={{ fontSize: cqw(17), lineHeight: 1.33, margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ============================================================
            Section 3 — Group 126 (y=1201, 890×516)
            Photo on LEFT half + terracotta panel on RIGHT half + KOKO.P
            logo accent inside right panel
            ============================================================ */}
        {/* Right half — terracotta tile (logotype + stacked KOKO.P accent baked in) */}
        <Reveal delay={0.05}>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(734), top: pctY(1201), width: pctX(431.5), height: pctY(515) }}
          >
            <Image
              src="/figma-assets/work/kokop/sec1-right.png"
              alt="KOKO.P coffee and snacks logotype on salmon"
              width={875}
              height={1045}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        {/* Left half — packaging photograph */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(274.5), top: pctY(1201), width: pctX(432), height: pctY(515) }}
          >
            <Image
              src="/figma-assets/work/kokop/sec1-photo.jpg"
              alt="KOKO.P branded packaging"
              width={3680}
              height={2456}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        {/* accent overlay removed — logotype + stacked KOKO.P mark are baked
           into sec1-right.png */}

        {/* ============================================================
            Section 4 — Café mockup (Group 125, y=1742, 891×595)
            Single image fill
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(274.5), top: pctY(1742.12), width: pctX(891), height: pctY(595) }}
          >
            <Image
              src="/figma-assets/work/kokop/cafe-storefront.png"
              alt="KOKO.P café branding mockup"
              width={1787}
              height={1193}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 5 — Group 124 (y=2362, 895×522)
            KOKO.P logo on LEFT + storefront photo on RIGHT (masked)
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(274.5), top: pctY(2362), width: pctX(436.84), height: pctY(521.96) }}
          >
            <Image
              src="/figma-assets/work/kokop/sec3-left.png"
              alt="KOKO.P kokopelli mark business card on dark ground"
              width={875}
              height={1045}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(719), top: pctY(2363), width: pctX(446.5), height: pctY(522) }}
          >
            <Image
              src="/figma-assets/work/kokop/sec3-photo.jpg"
              alt="KOKO.P storefront / brand application"
              width={2080}
              height={3120}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 6 — Brand book layout (Group 122, 297:57937)
            y=2909, 891×504.44. Full-res café-interior photo with the
            KOKO.P signage typography baked in (replaces the cropped
            imgRectangle base + 20 vector text labels — see
            kokop-extras/section6.tsx dead-code note above).
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(274.5), top: pctY(2909.08), width: pctX(891), height: pctY(504.44) }}
          >
            <Image
              src="/figma-assets/work/kokop/brand-interior.png"
              alt="KOKO.P café exterior with branded signage"
              width={1794}
              height={1010}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 7 — Group 121 (y=3438, 902×528)
            Instagram phone mockup (LEFT) + brand book card (RIGHT)
            ============================================================ */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(274.5), top: pctY(3438.52), width: pctX(442), height: pctY(528) }}
          >
            <Image
              src="/figma-assets/work/kokop/insta-phone.png"
              alt="KOKO.P Instagram feed mockup"
              width={1748}
              height={2089}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className="absolute"
            style={{ left: pctX(731), top: pctY(3438), width: pctX(434.5), height: pctY(528) }}
          >
            <Image
              src="/figma-assets/work/kokop/insta-card.png"
              alt="KOKO.P coffee-and-snacks logotype pattern"
              width={442}
              height={528}
              unoptimized
              className="block h-full w-full"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 8 — Group 120 (297:57935), y=3991, 897×724
            Final showcase photo + 192-vector typography composition
            (mix-blend-multiply) via ./kokop-extras/section8. Wrapper
            hoists the legacy transform correction — see file-header note.
            ============================================================ */}
        <Reveal>
          <div
            className="absolute"
            style={{ left: pctX(-1.34), top: pctY(0), width: pctX(1433.1456), height: pctY(4891) }}
          >
            <KokopSection8Content />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
