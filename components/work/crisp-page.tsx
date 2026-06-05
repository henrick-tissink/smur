"use client";

import Image from "next/image";
import { crisp, crispFrame } from "@/content/crisp";
import { Reveal } from "../reveal";

/*
  Desktop CRISP case study (Figma 71:3160). 1440 × 5340, cream #fff7f4.
  Desktop only — no mobile frame exists in Figma.

  Per CLAUDE.md rule #8 + the inset-positions memory: every element is
  rendered as its own absolute child at frame-absolute pixel coordinates
  (computed from Figma inset percentages × frame dims).

  Four originally-vector-composed sections (the pattern band, row-2 left
  Instagram mockup, row-2 right business cards, and the bottom poster) are
  rendered as flat full-resolution artboard exports from
  EXPORTS SMUR WEBSITE 2/PROJECTS/CRISP (artboards 93/95/96/100). Their
  aspect ratios match the Figma section frames to within ~0.1%, so each
  fills its frame via object-cover with no distortion — a pixel-perfect
  swap for the prior 384/42/45-vector reconstructions.

  Every Image uses `unoptimized` per CLAUDE.md rule #3 (Figma percent crops).
*/
export function CrispCaseStudy() {
  const { width, height } = crispFrame.desktop;
  const ink = "#26211e";
  const titleInk = "#35221a";
  const heroBg = "#D4C3A2";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
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
            left: 293,
            top: 140,
            width: 900,
            height: 621,
            backgroundColor: heroBg,
          }}
        />
      </Reveal>

      {/* 5 letterforms (v1-v5) + 4 decorative vectors (v6-v9).
         Insets are root-frame-relative percentages from Figma. */}
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
                fontSize: 22,
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
        style={{ left: 527.81, top: 846, width: 430, color: titleInk }}
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
            {crisp.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            style={{
              marginTop: 13.87, // 33.87 (Figma top) − 20 (eyebrow line)
              fontSize: 17,
              lineHeight: 1.33,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {crisp.body}
          </p>
        </Reveal>
      </div>

      {/* ------------------------------------------------------------
          Everything below the intro was transcribed 279.21px too low vs
          Figma. The real layout (Figma 71:3160) nests all below-intro
          content inside Frame 88 (frame-absolute y=846.04): the intro
          Group 79 ends at frame-absolute 1040.25 and Row 1 (Group 85)
          starts at 1126.25 — an 86px gap. Our transcribed `top` values
          all sit exactly 279.21px below their Figma frame-absolute y
          (verified across rows 1–3, the band, and Group 62), so a single
          translateY(-279.21px) on the wrapper realigns every section and
          restores the true 86px gap under the intro. (Was -330px, which
          over-corrected by ~51px and collapsed the gap to ~35px.) The
          positioned+transformed wrapper is the containing block for all
          absolute children, including the inline-coordinate components
          (big-typography / row2-left / group62), so the shift is uniform.
          ------------------------------------------------------------ */}
      <div className="absolute inset-0" style={{ transform: "translateY(-279.21px)" }}>

      {/* ============================================================
          Section 3 — Row 1 left (Group 71:4365, photo)
          Frame (293, 1404.46), 435×535. Figma crop:
          w=238.85% h=109.16% left=0 top=-9.16%.
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 293, top: 1404.46, width: 435, height: 535 }}
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
          Frame (753, 1405.46), 431×534.
          ============================================================ */}
      <Reveal eager delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 753, top: 1405.46, width: 440, height: 534 }}
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
          Frame (293, 1968.46), 900×615 (artboard 1771×1208, Δ0.2%).
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 293, top: 1968.46, width: 900, height: 615 }}
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
          + 3-photo composition. Frame (293, 2613), 439×529
          (artboard 867×1045, Δ0.0%).
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 293, top: 2613, width: 439, height: 529 }}
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
          consolidated SVG. Frame (757, 2613), 429×530
          (artboard 847×1045, Δ0.1%).
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 757, top: 2613, width: 436, height: 530 }}
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
          Frame (293, 3171.71), 899×610.88. Bg photo + centered overlay.
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 293, top: 3171.71, width: 900, height: 610.88 }}
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
            left: 508.84, // 293 + 215.84
            top: 3423.19, // 3171.71 + 251.48
            width: 428.083,
            height: 105.555,
          }}
        />
      </Reveal>

      {/* ============================================================
          Section 9 — Row 3 left (Group 88, consolidated SVG)
          Frame (293, 3811.59), 436×524.
          ============================================================ */}
      <Reveal eager>
        <img
          src="/figma-assets/work/crisp/row3-left.svg"
          alt="CRISP brand composition"
          className="absolute"
          style={{ left: 293, top: 3811.59, width: 436.362, height: 524.485 }}
        />
      </Reveal>

      {/* ============================================================
          Section 10 — Row 3 right (Group 49, masked photo + overlay)
          Frame (754.36, 3811.59), 430×524. Photo clipped by a rectangle
          mask (so a simple overflow-hidden wrapper at section bounds
          replicates the visible region); plus a centered overlay graphic.
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{
            left: 754.36,
            top: 3811.59,
            width: 438.64,
            height: 524.485,
          }}
        >
          <Image
            src="/figma-assets/work/crisp/row3-right-photo.jpg"
            alt="CRISP pastry photograph"
            width={1670}
            height={2505}
            unoptimized
            className="absolute max-w-none"
            /* Photo container in Figma: 436.282 × 654.451 offset (-2.72, -130.34)
               within the 430×524 section — scaled ×1.0116 so it covers the
               grid-snapped 438.64-wide wrapper (right edge at 1193). */
            style={{
              width: 441.36,
              height: 662.07,
              left: -2.72,
              top: -131.86,
              objectFit: "cover",
            }}
          />
        </div>
      </Reveal>
      <Reveal eager delay={0.05}>
        <img
          src="/figma-assets/work/crisp/row3-right-overlay.svg"
          alt=""
          className="absolute"
          style={{
            left: 868.69, // 754.36 + 114.33
            top: 3963.06, // 3811.59 + 151.47
            width: 206.087,
            height: 210.111,
          }}
        />
      </Reveal>

      {/* ============================================================
          Section 11 — Bottom CRISP CAFÉ poster (artboard 100). Flat
          export of the folded "WE ARE NOW OPEN!" flyer; replaces the
          former Group 62 composition (bg photo + mix-blend overlay +
          45 masked vectors + wordmark + curved + contact text).
          Frame (293, 4365.08), 899×1114.18 (artboard 1796×2228, Δ0.1%).
          ============================================================ */}
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 293, top: 4365.08, width: 900, height: 1114.18 }}
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
      {/* Hand-built legacy bottom removed (replaced by inlined Group62
          above). Kept frozen below for reference if positioning diverges. */}
      {/*
      <Reveal eager>
        <div
          className="absolute overflow-hidden"
          style={{ left: 293, top: 4365.08, width: 900, height: 1114.18 }}
        >
          <Image src="LEGACY" alt="" width={1} height={1} />
        </div>
      </Reveal>
      */}
      </div>
    </div>
  );
}
