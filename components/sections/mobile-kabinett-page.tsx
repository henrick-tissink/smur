import Image from "next/image";
import { kabinett } from "@/content/kabinett";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid mobile kabinett case study — full desktop parity (June
  2026). Ported from components/mobile/kabinett-page.tsx
  (MobileKabinettCaseStudy) to Recipe B (container-query flow): the
  legacy root was a fixed `width: "393px"` canvas scaled by the route's
  `zoom` wrapper; here the root is a fluid `w-full` box with
  `containerType: "inline-size"` and every fixed px value (paddingTop,
  section padding/margin/gap, font sizes) expressed as `mcqw(N)` on the
  393-wide legacy basis, so `1cqw` == 1% of the root's rendered width —
  reproducing the old zoom's proportional scaling without a transform.

  content/kabinett.ts has no `kabinettFrame.mobile`, so M_W = 393 (the
  legacy mobile canvas width) per the task brief.

  Desktop section order: hero (consolidated SVG) → intro → row1 brand
  photo → row2 poster (artboard 143) → row3 wordmark tile (SVG) → row3
  wine-glasses composition (artboard 142) → row4 logotype pattern (SVG)
  → bottom composition (artboard 148). Panel/aspectRatio/%-insets/Reveal/
  images are unchanged from the legacy component.
*/

const M_W = 393; // legacy mobile canvas width

function mcqw(px: number) {
  return `${(px / M_W) * 100}cqw`;
}

const SECTIONS = [
  { src: "/figma-assets/work/kabinett/row1/photo.jpg", w: 2080, h: 3000, alt: "Kabinett brand photograph" },
  { src: "/figma-assets/work/kabinett/row2-poster.png", w: 1801, h: 2227, alt: "Kabinett ‘Cheese & Wine Evenings’ poster" },
];
const SECTIONS_B = [
  { src: "/figma-assets/work/kabinett/row3-right-flat.png", w: 872, h: 1257, alt: "Kabinett — wine glasses with the logotype overlay" },
];

export function MobileKabinettCaseStudy() {
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
      {/* Hero — 2×2 lockup grid (four artboard quadrants color-matched to
          the desktop hero.svg rects: TL #2D2D2D, TR #E3E4E5, BL #922E46,
          BR #DFD3D1). Full-bleed, kept at the hero's 894.44×645.377 ratio. */}
      <Reveal eager>
        <div className="grid w-full grid-cols-2" style={{ aspectRatio: "894.44 / 645.377" }}>
          <Image
            src="/figma-assets/work/kabinett/hero-q-dark.png"
            alt="Kabinett lockup on charcoal"
            width={870}
            height={626}
            unoptimized
            className="block h-full w-full object-cover"
          />
          <Image
            src="/figma-assets/work/kabinett/hero-q-grey.png"
            alt="Kabinett lockup on grey"
            width={870}
            height={626}
            unoptimized
            className="block h-full w-full object-cover"
          />
          <Image
            src="/figma-assets/work/kabinett/hero-q-burgundy.png"
            alt="Kabinett lockup on burgundy"
            width={870}
            height={626}
            unoptimized
            className="block h-full w-full object-cover"
          />
          <Image
            src="/figma-assets/work/kabinett/hero-q-rose.png"
            alt="Kabinett lockup on rose"
            width={870}
            height={626}
            unoptimized
            className="block h-full w-full object-cover"
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
            style={{ fontSize: mcqw(26), lineHeight: 1.05 }}
          >
            {kabinett.eyebrow}
          </p>
          <p
            className="text-ink"
            style={{ marginTop: mcqw(20), fontSize: mcqw(15), lineHeight: 1.45 }}
          >
            {kabinett.body}
          </p>
        </div>
      </Reveal>

      {/* Full-bleed visual sections in desktop order. */}
      <div className="flex flex-col" style={{ gap: mcqw(12), paddingBottom: mcqw(24) }}>
        {SECTIONS.map((s, i) => (
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

        {/* Row 3 — KABINETT wordmark tile (artboard 144). */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/kabinett/row3-left.png"
            alt="Kabinett Wine & Spirits wordmark on burgundy"
            width={870}
            height={1176}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        {SECTIONS_B.map((s) => (
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

        {/* Row 4 — repeating logotype pattern (artboard 146). */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/kabinett/row4-pattern.png"
            alt="Kabinett repeating logotype pattern"
            width={1771}
            height={1221}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/kabinett/bottom-flat.png"
            alt="Kabinett business cards and brand collateral"
            width={1793}
            height={1210}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
      </div>
    </div>
  );
}
