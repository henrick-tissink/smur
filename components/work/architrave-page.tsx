"use client";

import Image from "next/image";
import { architrave, architraveFrame } from "@/content/architrave";
import { Reveal } from "../reveal";
import { ArchitraveBigMiddleContent } from "./architrave-extras/big-middle";
import { ArchitraveGroup80Content } from "./architrave-extras/group80";

/*
  Desktop ARCHITRAVE (Architrave Studio) case study.
  Figma 71:982, 1440 × 4593, cream #fff7f4. Desktop only.

  Substantial deferrals — this is a vector-dense Figma frame:
    - Group 80 (895×647): masked photo + 60+ inline vectors. DEFERRED.
    - Row 2 LEFT (Layer_1, 423×521): 60+ inline vectors. DEFERRED.
    - Row 2 RIGHT (Group 82, 435×522): 67+ inline vectors + 2 masked
      photos + small text labels. DEFERRED.
    - Big middle (Layer_1, 898×1111): too dense to inline. DEFERRED.
  Hero (4 quadrant badges + top-left), title, Row 1 (consolidated) and
  Bottom (masked photo) render.
*/
export function ArchitraveCaseStudy() {
  const { width, height } = architraveFrame.desktop;
  const titleInk = "#35221a";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Hero 2×2 brand-mark grid (Groups 32–35).
          Four 434.52×313.33 quadrants, each a flat artboard export of
          the Architrave logo on its background colour. Mapped by the
          Figma quadrant fill → export (artboards 78/80/80_1/81):
            TL #515151 dark  → 78   TR #B6B6AC sage  → 80
            BL #ffffff white → 80_1 BR #C7BBB1 taupe → 81
          Replaces the prior single hero-tl vector + 4 floating badges
          (the logo is baked into each artboard). Artboards are 870×626
          (ratio 1.389 vs frame 1.387, Δ0.1%), so object-cover is exact.
          ============================================================ */}
      {[
        { src: "hero-grid-tl.png", left: 268, top: 140.37, alt: "Architrave Studio logo — white on charcoal" },
        { src: "hero-grid-tr.png", left: 728.52, top: 140.37, alt: "Architrave Studio logo — white on sage" },
        { src: "hero-grid-bl.png", left: 268, top: 478.76, alt: "Architrave Studio logo — charcoal on white" },
        { src: "hero-grid-br.png", left: 728.37, top: 478.76, alt: "Architrave Studio logo — white on taupe" },
      ].map((q, i) => (
        <Reveal key={q.src} delay={0.04 * i}>
          <div
            className="absolute overflow-hidden"
            style={{ left: q.left, top: q.top, width: 434.52, height: 313.33 }}
          >
            <Image
              src={`/figma-assets/work/architrave/${q.src}`}
              alt={q.alt}
              width={870}
              height={626}
              unoptimized
              priority
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
      ))}

      {/* ============================================================
          Section 2 — Title + body (Group 79, 297:57110)
          Frame (498, 877), 430×222.
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 498, top: 877, width: 430, color: titleInk }}
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
            {architrave.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            style={{
              marginTop: 19, // 39 (top 916-877) − 20 (eyebrow)
              fontSize: 17,
              lineHeight: 1.33,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {architrave.body}
          </p>
        </Reveal>
      </div>

      {/* ============================================================
          Section 3 — Group 80 (first content section, 297:57104)
          Frame (265, 1184), 895×647. Fully inlined via
          ./architrave-extras/group80: bg photo + inner inset photo +
          57 typography/wordmark vectors + mix-blend overlays. Insets
          are root-frame-relative percent so children mount cleanly.
          ============================================================ */}
      <Reveal>
        <ArchitraveGroup80Content />
      </Reveal>

      {/* ============================================================
          Section 4 — Row 1 (Layer_1 73:1699)
          Frame (263, 1854.70), 895×312. Consolidated SVG.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/architrave/row1.svg"
          alt="Architrave Studio brand application"
          className="absolute"
          style={{ left: 263, top: 1854.70, width: 895, height: 312 }}
        />
      </Reveal>

      {/* ============================================================
          Section 5 — Row 2 (Group 84)
          Frame (265, 2190.70), 894×529.
          LEFT (Layer_1 71:1707) — consolidated SVG (the masked bg
            composition that's the foundation of the typography overlay).
          RIGHT (Group 82) — masked photo + inset photo (typography
            vectors still TODO).
          ============================================================ */}
      {/* Row 2 LEFT (artboard 85_1) — flat export of the two contact /
          logotype cards on charcoal; replaces the ~60-vector composition.
          Frame (273.64, 2190.70), 423.15×521.96 (artboard 847×1045, Δ0.02%). */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 273.64, top: 2190.7, width: 423.15, height: 521.96 }}
        >
          <Image
            src="/figma-assets/work/architrave/row2-left.png"
            alt="Architrave Studio business cards — contact details and logotype on charcoal"
            width={1055}
            height={1199}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      {/* Row 2 RIGHT (artboard 86) — flat export of the phone Instagram
          mockup (profile, story circles incl. "WE LOVE"/"35 SQM", and the
          interior photo grid); replaces the ~66-vector composition. Group 82
          frame (724.52, 2196.70), 435×522 (artboard 912×1040; phone is
          centred so object-cover's ~11px side crop only trims sage margin). */}
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 724.52, top: 2196.7, width: 435, height: 522 }}
        >
          <Image
            src="/figma-assets/work/architrave/row2-right.png"
            alt="Architrave Studio Instagram profile shown on a phone"
            width={912}
            height={1040}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 6 — Big middle (Layer_1 71:2406, 466 assets)
          Frame (265, 2747.06), 898×1111. Full composition inlined via
          ./architrave-extras/big-middle: 2 masked interior photos +
          ~460 typography vectors forming the brand-book layout.
          Root-frame-relative insets so mounts as direct child.
          ============================================================ */}
      <Reveal>
        <ArchitraveBigMiddleContent />
      </Reveal>

      {/* ============================================================
          Section 7 — Bottom repeating-logo pattern (artboard 88).
          Flat export of the sage "Architrave studio" tile pattern;
          replaces the bottom-photo vector. The visible sage band is the
          masked clip group (71:2971) at (265, 3883.24), 897.62×495.13 —
          NOT the wider 1196×848 outer group (that includes the faint
          off-band overflow). Artboard 1796×989 (ratio 1.816) matches the
          band (1.813) almost exactly, so object-cover renders the pattern
          at its true density (~3 columns), no zoom.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{
            left: 265,
            top: 3883.24,
            width: 897.62,
            height: 495.13,
          }}
        >
          <Image
            src="/figma-assets/work/architrave/bottom-pattern.png"
            alt="Architrave Studio repeating logotype pattern on sage"
            width={1796}
            height={989}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* Floating brand vector (71:987) at frame (717.26, 4261.62), 275×88 */}
      <Reveal>
        <img
          src="/figma-assets/work/architrave/floating.svg"
          alt=""
          className="absolute"
          style={{
            left: 717.26,
            top: 4261.62,
            width: 275.25,
            height: 87.83,
          }}
        />
      </Reveal>
    </div>
  );
}
