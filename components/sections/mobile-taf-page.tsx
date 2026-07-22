import Image from "next/image";
import { taf } from "@/content/taf";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid mobile TAF case study — full desktop parity (June 2026).
  Ported from components/mobile/taf-page.tsx (MobileTafCaseStudy) to
  Recipe B (container-query flow): the legacy root was a fixed
  `width: "393px"` canvas scaled by the route's `zoom` wrapper; here the
  root is a fluid `w-full` box with `containerType: "inline-size"` and
  every fixed px value (paddingTop, section padding/margin/gap, font
  sizes) expressed as `mcqw(N)` on the 393-wide legacy basis, so `1cqw`
  == 1% of the root's rendered width — reproducing the old zoom's
  proportional scaling without a transform.

  content/taf.ts has no `tafFrame.mobile`, so M_W = 393 (the legacy
  mobile canvas width) per the task brief.

  Desktop section order: hero brand grid (consolidated SVG) → intro →
  row1 (product photo with logo overlay, artboard 130) → row1 right pink
  tile (SVG) → fabric band (134) → website (134_1) → bottom campaign
  shot with the logotype (artboard 135).

  Images / grid / flex flow / Reveal / unoptimized are all unchanged from
  the legacy component — only fixed-px paddings/margins/font-sizes
  convert to mcqw. Unitless lineHeight and the "0.01em" letterSpacing
  stay as-is (em values don't need conversion).
*/
const SECTIONS = [
  { src: "/figma-assets/work/taf/row1-left-flat.png", w: 867, h: 1176, alt: "TAF — cleaning product photo with the logotype overlay" },
];
const SECTIONS_B = [
  { src: "/figma-assets/work/taf/band-fabric.png", w: 1783, h: 1206, alt: "TAF logo printed on fabric" },
  { src: "/figma-assets/work/taf/website.png", w: 1798, h: 3348, alt: "TAF cleaning-services website landing page" },
  { src: "/figma-assets/work/taf/bottom-full.png", w: 1794, h: 1196, alt: "TAF brand campaign — hands holding product with the logotype" },
];

const M_W = 393; // legacy mobile canvas width

function mcqw(px: number) {
  return `${(px / M_W) * 100}cqw`;
}

export function MobileTafCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto w-full"
      style={{
        containerType: "inline-size",
        backgroundColor: "#fff7f4",
        paddingTop: mcqw(100), // was 100px
      }}
    >
      {/* Hero brand grid — four quadrant artboards mapped by color:
         TL #2D2D2D dark (126), TR #EAB5BA pink (127), BR #FF8A80 coral
         (129), BL #DFD8CE tan (128). */}
      <Reveal eager>
        <div className="grid grid-cols-2">
          <Image
            src="/figma-assets/work/taf/hero-q-dark.png"
            alt="TAF brand mark — dark"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
          <Image
            src="/figma-assets/work/taf/hero-q-pink.png"
            alt="TAF brand mark — pink"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
          <Image
            src="/figma-assets/work/taf/hero-q-tan.png"
            alt="TAF brand mark — tan"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
          <Image
            src="/figma-assets/work/taf/hero-q-coral.png"
            alt="TAF brand mark — coral"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
        </div>
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div
          className="text-center"
          style={{ paddingLeft: mcqw(43), paddingRight: mcqw(43), paddingTop: mcqw(36), paddingBottom: mcqw(36) }}
        >
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: mcqw(40), lineHeight: 1, letterSpacing: "0.01em" }}
          >
            {taf.eyebrow}
          </p>
          <p
            className="text-ink"
            style={{ marginTop: mcqw(20), fontSize: mcqw(15), lineHeight: 1.45 }}
          >
            {taf.body}
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

        {/* Row 1 right — pink icon tile (flat artboard 132). */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/taf/row1-right.png"
            alt="TAF brand icons on pink"
            width={870}
            height={1176}
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
