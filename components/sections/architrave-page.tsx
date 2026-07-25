import Image from "next/image";
import { architrave, architraveFrame } from "@/content/architrave";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid desktop ARCHITRAVE (Architrave Studio) case study.
  Ported from components/work/architrave-page.tsx (ArchitraveCaseStudy) to
  the aspect-ratio stage pattern: stage = aspect-ratio 1440/4593
  container-query box, Figma 71:982 (bg #fff7f4) expressed in % (positions)
  and cqw (font sizes) so it scales with viewport width — no zoom.

  The vector-dense sections use original full-res PNG exports instead of
  inline vector reconstructions:
    - Group 80 (895×647)  → architrave.png (1791×1294)
    - Row 1 (885×312)     → row1.png (1794×626)
    - Row 2 L/R           → row2-left.png / row2-right.png
    - Big middle (898×1111) → architrave-anim/frame-presentation.png
  Hero (4 quadrant badges), title and bottom pattern also render.

  Every element below was a direct child of the legacy fixed canvas, so
  each stays a direct child of the aspect-stage div here (containing-block
  rule) — none are nested inside another absolutely-positioned box.
*/

const STAGE_W = architraveFrame.desktop.width;
const STAGE_H = architraveFrame.desktop.height;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function ArchitraveCaseStudy() {
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
          // Columns snapped to the page grid: L=273.64, right edge=1159.52
          { src: "hero-grid-tl.png", left: 273.64, top: 140.37, alt: "Architrave Studio logo — white on charcoal" },
          { src: "hero-grid-tr.png", left: 725, top: 140.37, alt: "Architrave Studio logo — white on sage" },
          { src: "hero-grid-bl.png", left: 273.64, top: 478.76, alt: "Architrave Studio logo — charcoal on white" },
          { src: "hero-grid-br.png", left: 725, top: 478.76, alt: "Architrave Studio logo — white on taupe" },
        ].map((q, i) => (
          <Reveal key={q.src} delay={0.04 * i}>
            <div
              className="absolute overflow-hidden"
              style={{ left: pctX(q.left), top: pctY(q.top), width: pctX(434.52), height: pctY(313.33) }}
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
          style={{ left: pctX(498), top: pctY(877), width: pctX(430), color: titleInk }}
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
              {architrave.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              style={{
                marginTop: cqw(19), // 39 (top 916-877) − 20 (eyebrow)
                fontSize: cqw(17),
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
            Frame (265, 1184), 895×647. Replaces the ~61-vector + masked
            photo inline composition with the original full-res spread
            export (1791×1294). object-cover at the page-grid box; the
            clean PNG needs no translate/scale mask fudge.
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(273.64), top: pctY(1159.52), width: pctX(885.88), height: pctY(647) }}
          >
            <Image
              src="/figma-assets/work/architrave.png"
              alt="Architrave Studio — ‘You. Your interior. Your reflection.’ spread"
              width={1791}
              height={1294}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* ============================================================
            Section 4 — Row 1 (Layer_1 73:1699)
            Frame (263, 1854.70), 895×312. Replaces the consolidated SVG
            with the original taupe logotype banner export (1794×626).
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(273.64), top: pctY(1854.70), width: pctX(885.88), height: pctY(312) }}
          >
            <Image
              src="/figma-assets/work/architrave/row1.png"
              alt="Architrave Studio brand application"
              width={1794}
              height={626}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
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
            style={{ left: pctX(273.64), top: pctY(2190.7), width: pctX(423.15), height: pctY(521.96) }}
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
            style={{ left: pctX(724.52), top: pctY(2196.7), width: pctX(435), height: pctY(522) }}
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
            Section 6 — Big middle (Layer_1 71:2406)
            Frame (265, 2747.06), 898×1111. Replaces the ~466-vector
            inline composition with the original full-res presentation
            export (1798×2217). object-cover at the Figma box.
            ============================================================ */}
        <Reveal>
          <div
            className="absolute overflow-hidden"
            style={{ left: pctX(265), top: pctY(2747.06), width: pctX(898), height: pctY(1111) }}
          >
            <Image
              src="/figma-assets/work/architrave-anim/frame-presentation.png"
              alt="Architrave Studio editorial presentation spread"
              width={1798}
              height={2217}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
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
              left: pctX(273.64),
              top: pctY(3883.24),
              width: pctX(885.88),
              height: pctY(495.13),
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
              left: pctX(717.26),
              top: pctY(4261.62),
              width: pctX(275.25),
              height: pctY(87.83),
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
