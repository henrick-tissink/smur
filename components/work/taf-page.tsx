"use client";

import Image from "next/image";
import { taf, tafFrame } from "@/content/taf";
import { Reveal } from "../reveal";

/*
  Desktop TAF (UAE cleaning brand) case study.
  Figma 73:29056, 1440 × 4942, cream #fff7f4. Desktop only.

  Per CLAUDE.md rules: every element at frame-absolute pixel coordinates;
  all <Image> uses `unoptimized`; wrapper has `overflow-hidden`.

  Deferred per CLAUDE.md rule #2:
    - Middle section (Group 112) inner Layer_2 (~900×1474 vector-dense
      composition). Renders as flat #D5CDC2 tan rect (1676 tall) — same
      pattern as INTERSTELLAR Row 4. Highest-impact follow-up.
*/
export function TafCaseStudy() {
  const { width, height } = tafFrame.desktop;
  const titleInk = "#35221a";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Hero (Layer_2, 73:30561)
          Frame (273, 140), 896.24×649.13. Consolidated SVG.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/taf/hero.svg"
          alt="TAF brand hero"
          className="absolute"
          style={{ left: 273, top: 140, width: 896.24, height: 649.13 }}
        />
      </Reveal>

      {/* ============================================================
          Section 2 — Title + body (Group 79, 297:57920)
          Frame (503, 874.13), 430×295. Two body paragraphs.
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 503, top: 874.13, width: 430, color: titleInk }}
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
            {taf.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div
            style={{
              marginTop: 22, // 42 (Figma top 916-874) − 20 (eyebrow)
              fontSize: 17,
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
          style={{ left: 273, top: 1254, width: 434.52, height: 587.37 }}
        >
          <Image
            src="/figma-assets/work/taf/row1-left-photo.jpg"
            alt="TAF brand photograph"
            width={2084}
            height={2811}
            unoptimized
            className="absolute max-w-none"
            /* Figma inset for the photo within the root frame is
               [24.08% 47.54% 61.14% 14.84%] — extends beyond the
               section. Reproduce the offset within the wrapper:
                 wrapper-relative left = (root left) − (section left)
                                       = 213.70 − 273 = -59.30
                 wrapper-relative top  = 1190.04 − 1254 = -63.96 */
            style={{
              width: 541.72,
              height: 730.02,
              left: -59.30,
              top: -63.96,
              objectFit: "cover",
            }}
          />
          {/* Masked overlay graphic positioned within the same section.
             Wrapper-relative left = 370.66 − 273 = 97.66
                                top = 1498.91 − 1254 = 244.91 */}
          <img
            src="/figma-assets/work/taf/row1-left-overlay.svg"
            alt=""
            className="absolute max-w-none"
            style={{
              width: 246.52,
              height: 48.43,
              left: 97.66,
              top: 244.91,
            }}
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 4 — Row 1 RIGHT (Group 110, 297:57916)
          Frame (738.52, 1254.66), 434.52×587.37. Consolidated SVG.
          ============================================================ */}
      <Reveal delay={0.05}>
        <img
          src="/figma-assets/work/taf/row1-right.svg"
          alt="TAF brand application"
          className="absolute"
          style={{
            left: 738.52,
            top: 1254.66,
            width: 434.52,
            height: 587.37,
          }}
        />
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
          style={{ left: 273, top: 1867, width: 900, height: 609 }}
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
          style={{ left: 273, top: 2501.03, width: 900, height: 1676 }}
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
          Frame (273, 4202.03), 899×600. Background photo + 7 vector
          marks forming the TAF wordmark + decorations.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 273, top: 4202.03, width: 899, height: 600 }}
        >
          <Image
            src="/figma-assets/work/taf/bottom/photo.jpg"
            alt="TAF brand photograph"
            width={2834}
            height={1889}
            unoptimized
            className="block h-full w-full object-cover"
          />
          {/* 7 vector marks positioned within this section using insets
             relative to the 899×600 wrapper. */}
          {taf.bottomVectors.map((v) => (
            <div key={v.src} className="absolute" style={{ inset: v.inset }}>
              <img
                src={`/figma-assets/work/taf/bottom/${v.src}`}
                alt=""
                className="absolute inset-0 block h-full w-full"
                style={{ maxWidth: "none" }}
              />
            </div>
          ))}
        </div>
      </Reveal>

      {/* Floating brand vector (73:29063) at frame (717.26, 4250.49), 275×87 */}
      <Reveal>
        <img
          src="/figma-assets/work/taf/floating.svg"
          alt=""
          className="absolute"
          style={{
            left: 717.26,
            top: 4250.49,
            width: 275.25,
            height: 87.60,
          }}
        />
      </Reveal>
    </div>
  );
}
