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

  Three sub-sections are deferred per CLAUDE.md rule #2 (too dense for a
  single inline pass — same precedent as KOKOP sections 6 & 8):
    1. Big "CRISP" typography clip-path (71:3418) — 384 vectors
    2. Row 2 left brand-label mockup (297:57115) — 42 vectors + 3 photos
    3. Group 62 inner masked decorative stamp (~45 masked vectors)

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
            className="font-heading italic"
            style={{ fontSize: 20, lineHeight: 1, margin: 0 }}
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

      {/* ============================================================
          Section 3 — Row 1 left (Group 71:4365, photo)
          Frame (293, 1404.46), 435×535. Figma crop:
          w=238.85% h=109.16% left=0 top=-9.16%.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 293, top: 1404.46, width: 435, height: 535 }}
        >
          <Image
            src="/figma-assets/work/crisp/row1-left.png"
            alt="CRISP brand application"
            width={1366}
            height={768}
            unoptimized
            className="absolute max-w-none"
            style={{
              width: "238.85%",
              height: "109.16%",
              left: 0,
              top: "-9.16%",
            }}
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 4 — Row 1 right (Group 85, consolidated SVG)
          Frame (753, 1405.46), 431×534.
          ============================================================ */}
      <Reveal delay={0.05}>
        <img
          src="/figma-assets/work/crisp/row1-right.svg"
          alt="CRISP brand composition"
          className="absolute"
          style={{ left: 753, top: 1405.46, width: 431, height: 534 }}
        />
      </Reveal>

      {/* ============================================================
          Section 5 — Big "CRISP" typography clip-path (71:3418)
          Frame (293, 1968.46), 900×615. 384 vectors — DEFERRED.
          TODO: inline the typography composition (botanical-filled
          giant CRISP letters). Defer per CLAUDE.md rule #2.
          ============================================================ */}
      <div
        className="absolute"
        style={{
          left: 293,
          top: 1968.46,
          width: 900,
          height: 615,
          /* placeholder bg so the empty section is visible during dev */
          backgroundColor: "transparent",
        }}
        aria-hidden
      />

      {/* ============================================================
          Section 6 — Row 2 left (Group 87, brand-label mockup)
          Frame (293, 2613), 439×529. ~42 vectors + 3 photos — DEFERRED.
          TODO: inline the brand-label mockup composition.
          ============================================================ */}
      <div
        className="absolute"
        style={{ left: 293, top: 2613, width: 439, height: 529 }}
        aria-hidden
      />

      {/* ============================================================
          Section 7 — Row 2 right (Group 86, consolidated SVG)
          Frame (757, 2613), 429×530.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/crisp/row2-right.svg"
          alt="CRISP brand composition"
          className="absolute"
          style={{ left: 757, top: 2613, width: 429, height: 530 }}
        />
      </Reveal>

      {/* ============================================================
          Section 8 — Middle full-width band (Group 45, 71:4371)
          Frame (293, 3171.71), 899×610.88. Bg photo + centered overlay.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 293, top: 3171.71, width: 899, height: 610.88 }}
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
      <Reveal delay={0.1}>
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
      <Reveal>
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
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{
            left: 754.36,
            top: 3811.59,
            width: 429.972,
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
               within the 430×524 section. Anchor to the same offset here. */
            style={{
              width: 436.282,
              height: 654.451,
              left: -2.72,
              top: -130.34,
              objectFit: "cover",
            }}
          />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
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
          Section 11 — Bottom CRISP CAFÉ showcase (Group 62, 82:40956)
          Frame (293, 4365.08), 899×1114.18.

          Background photo + mix-blend-multiply overlay + brand mark +
          big CRISP wordmark + curved text + contact text.

          DEFERRED: the inner ~45 masked decorative vectors (a brand
          stamp/seal). Base photo + wordmark + brand mark + contact text
          render here.
          ============================================================ */}
      {/* Background photo (masked to a simple rectangle = overflow-hidden) */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 293, top: 4365.08, width: 899, height: 1114.18 }}
        >
          <Image
            src="/figma-assets/work/crisp/bottom/photo.png"
            alt="CRISP café photograph"
            width={1254}
            height={1254}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* mix-blend-multiply overlay (offset 455.4, 418.25 inside Group 62) */}
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{
            left: 748.4, // 293 + 455.4
            top: 4783.33, // 4365.08 + 418.25
            width: 299.7,
            height: 389.088,
            mixBlendMode: "multiply",
          }}
        >
          <Image
            src="/figma-assets/work/crisp/bottom/overlay-multiply.jpg"
            alt=""
            width={2000}
            height={3000}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* Brand leaf mark (above the wordmark) */}
      <Reveal delay={0.1}>
        <img
          src="/figma-assets/work/crisp/bottom/brand-leaf.svg"
          alt=""
          className="absolute"
          style={{
            left: 714.15, // 293 + 421.15
            top: 4605.22, // 4365.08 + 240.14
            width: 80.936,
            height: 77.976,
          }}
        />
      </Reveal>
      {/* Small brand-mark detail vectors (51, 52, 53) */}
      <Reveal delay={0.12}>
        <img
          src="/figma-assets/work/crisp/bottom/brand-1.svg"
          alt=""
          className="absolute"
          style={{
            left: 748.27, // 293 + 455.27
            top: 4650.40, // 4365.08 + 285.32
            width: 7.726,
            height: 20.904,
          }}
        />
      </Reveal>
      <Reveal delay={0.12}>
        <img
          src="/figma-assets/work/crisp/bottom/brand-2.svg"
          alt=""
          className="absolute"
          style={{
            left: 747.64, // 293 + 454.64
            top: 4648.39, // 4365.08 + 283.31
            width: 46.935,
            height: 34.234,
          }}
        />
      </Reveal>
      <Reveal delay={0.12}>
        <img
          src="/figma-assets/work/crisp/bottom/brand-3.svg"
          alt=""
          className="absolute"
          style={{
            left: 717.51, // 293 + 424.51
            top: 4611.30, // 4365.08 + 246.22
            width: 34.121,
            height: 32.999,
          }}
        />
      </Reveal>

      {/* "CRISP" wordmark — 5 letterform SVGs */}
      <Reveal delay={0.15}>
        <img
          src="/figma-assets/work/crisp/bottom/wordmark-c.svg"
          alt="CRISP"
          className="absolute"
          style={{
            left: 596.77, // 293 + 303.77
            top: 4691.27, // 4365.08 + 326.19
            width: 67.149,
            height: 70.02,
          }}
        />
      </Reveal>
      <Reveal delay={0.16}>
        <img
          src="/figma-assets/work/crisp/bottom/wordmark-r.svg"
          alt=""
          className="absolute"
          style={{
            left: 679.56, // 293 + 386.56
            top: 4692.79, // 4365.08 + 327.71
            width: 55.493,
            height: 66.948,
          }}
        />
      </Reveal>
      <Reveal delay={0.17}>
        <img
          src="/figma-assets/work/crisp/bottom/wordmark-i.svg"
          alt=""
          className="absolute"
          style={{
            left: 744.18, // 293 + 451.18
            top: 4692.79, // 4365.08 + 327.71
            width: 11.258,
            height: 66.937,
          }}
        />
      </Reveal>
      <Reveal delay={0.18}>
        <img
          src="/figma-assets/work/crisp/bottom/wordmark-s.svg"
          alt=""
          className="absolute"
          style={{
            left: 771.10, // 293 + 478.10
            top: 4691.27, // 4365.08 + 326.19
            width: 47.695,
            height: 70.03,
          }}
        />
      </Reveal>
      <Reveal delay={0.19}>
        <img
          src="/figma-assets/work/crisp/bottom/wordmark-p.svg"
          alt=""
          className="absolute"
          style={{
            left: 834.42, // 293 + 541.42
            top: 4692.79, // 4365.08 + 327.71
            width: 46.338,
            height: 66.958,
          }}
        />
      </Reveal>

      {/* Curved text near the bottom (214×64 at frame y=5169) */}
      <Reveal delay={0.2}>
        <img
          src="/figma-assets/work/crisp/bottom/curved-text.svg"
          alt=""
          className="absolute"
          style={{
            left: 635, // 293 + 342
            top: 5169.08, // 4365.08 + 804
            width: 214.602,
            height: 64.763,
          }}
        />
      </Reveal>

      {/* Contact info: 805.323.6531 I @CRISP.CAFE (rendered as SVG) */}
      <Reveal delay={0.22}>
        <img
          src="/figma-assets/work/crisp/bottom/contact-text.svg"
          alt="805.323.6531 I @CRISP.CAFE"
          className="absolute"
          style={{
            left: 657.54, // 293 + 364.54
            top: 5283.05, // 4365.08 + 917.97
            width: 165.582,
            height: 10.069,
          }}
        />
      </Reveal>
    </div>
  );
}
