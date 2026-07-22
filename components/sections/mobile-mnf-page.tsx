import Image from "next/image";
import { mnf } from "@/content/mnf";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid mobile MNF (Manufaktura Studio) case study — full
  desktop parity (June 2026). Ported from components/mobile/mnf-page.tsx
  (MobileMnfCaseStudy) to Recipe B (container-query flow): the legacy
  root was a fixed `width: "393px"` canvas scaled by the route's `zoom`
  wrapper; here the root is a fluid `w-full` box with
  `containerType: "inline-size"` and every fixed px value (paddingTop,
  section padding/margin/gap, font sizes) expressed as `mcqw(N)` on the
  393-wide legacy basis, so `1cqw` == 1% of the root's rendered width —
  reproducing the old zoom's proportional scaling without a transform.

  content/mnf.ts has no `mnfFrame.mobile`, so M_W = 393 (the legacy
  mobile canvas width) per the task brief / sws precedent.

  Desktop section order: hero band (consolidated SVG) → intro →
  cascading website screens → row1 logo tiles (SVGs) → gold fluted card
  band → brand/interior grid → bottom interior with the wordmark
  (artboard 77). Images/aspectRatio/Reveal/unoptimized are unchanged
  from the legacy component.
*/

const M_W = 393; // legacy mobile canvas width

function mcqw(px: number) {
  return `${(px / M_W) * 100}cqw`;
}

const SECTIONS = [
  { src: "/figma-assets/work/mnf/screens.jpg", w: 1793, h: 1180, alt: "Manufaktura website screens" },
];
const SECTIONS_B = [
  { src: "/figma-assets/work/mnf/gold-band.jpg", w: 1793, h: 1195, alt: "Manufaktura business cards on fluted brass" },
  { src: "/figma-assets/work/mnf/grid.jpg", w: 1799, h: 2480, alt: "Manufaktura brand and interior grid" },
  { src: "/figma-assets/work/mnf/bottom-full.png", w: 1791, h: 1208, alt: "Manufaktura Studio interior with the studio wordmark" },
];

export function MobileMnfCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto w-full"
      style={{ containerType: "inline-size", backgroundColor: "#fff7f4", paddingTop: mcqw(100) }}
    >
      {/* Hero band (consolidated SVG) — projects open on an image. */}
      <Reveal eager>
        <img
          src="/figma-assets/work/mnf/hero.svg"
          alt="Manufaktura Studio — brand hero"
          className="block h-auto w-full"
        />
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div
          className="text-center"
          style={{ paddingLeft: mcqw(43), paddingRight: mcqw(43), paddingTop: mcqw(36), paddingBottom: mcqw(36) }}
        >
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: mcqw(26), lineHeight: 1.05, letterSpacing: "0.01em" }}
          >
            {mnf.eyebrow}
          </p>
          <p
            className="text-ink"
            style={{ marginTop: mcqw(20), fontSize: mcqw(15), lineHeight: 1.45 }}
          >
            {mnf.body}
          </p>
        </div>
      </Reveal>

      {/* Full-bleed visual sections in desktop order. */}
      <div className="flex flex-col" style={{ gap: mcqw(12), paddingBottom: mcqw(24) }}>
        {SECTIONS.map((s) => (
          <Reveal key={s.src} eager>
            <Image
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              unoptimized
              className="block h-auto w-full"
            />
          </Reveal>
        ))}

        {/* Row 1 — M monogram tiles (consolidated SVGs). */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/mnf/row1-left.png"
            alt="Manufaktura M monogram — dark ground"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
        <Reveal eager>
          <Image
            src="/figma-assets/work/mnf/row1-right.png"
            alt="Manufaktura M monogram — sage ground"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        {SECTIONS_B.map((s, i) => (
          <Reveal key={s.src} eager delay={0.03 * i}>
            <Image
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              unoptimized
              className="block h-auto w-full"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
