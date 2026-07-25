import Image from "next/image";
import { interstellar } from "@/content/interstellar";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid mobile INTERSTELLAR case study — full desktop parity
  (June 2026). Ported from components/mobile/interstellar-page.tsx
  (MobileInterstellarCaseStudy) to Recipe B (container-query flow): the
  legacy root was a fixed `width: "393px"` canvas scaled by the route's
  `zoom` wrapper; here the root is a fluid `w-full` box with
  `containerType: "inline-size"` and every fixed px value (paddingTop,
  section padding/margin/gap, font sizes) expressed as `mcqw(N)` on the
  393-wide legacy basis, so `1cqw` == 1% of the root's rendered width —
  reproducing the old zoom's proportional scaling without a transform.

  content/interstellar.ts has no `interstellarFrame.mobile`, so
  M_W = 393 (the legacy mobile canvas width) per the task brief.

  Desktop section order: hero (artboard 116) → intro → row1 logo tiles
  (SVGs) → row2 band (bg + 2 overlay labels, composite) → row3 (starburst
  tile w/ masked photo + sage poster) → row4 property page (122) → row5
  interior photo → row6 dark band (SVG). Panel/aspectRatio/%-insets/
  Reveal/images are unchanged from the legacy component.
*/

const M_W = 393; // legacy mobile canvas width

function mcqw(px: number) {
  return `${(px / M_W) * 100}cqw`;
}

export function MobileInterstellarCaseStudy() {
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
      {/* Hero (artboard 116) — projects open on an image. */}
      <Reveal eager>
        <Image
          src="/figma-assets/work/interstellar/hero-flat.png"
          alt="INTERSTELLAR — real-estate brand hero"
          width={1797}
          height={988}
          unoptimized
          priority
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
            style={{ fontSize: mcqw(34), lineHeight: 1.05, letterSpacing: "0.01em" }}
          >
            {interstellar.eyebrow}
          </p>
          <p
            className="text-ink"
            style={{ marginTop: mcqw(20), fontSize: mcqw(15), lineHeight: 1.45 }}
          >
            {interstellar.body}
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col" style={{ gap: mcqw(12), paddingBottom: mcqw(24) }}>
        {/* Row 1 — top of the 2×2 logo-lockup grid (artboard exports
            116_1 charcoal, 117 sage), full-width stacked tiles. */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/interstellar/lockup-charcoal.png"
            alt="Interstellar wordmark in white on a charcoal ground"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
        <Reveal eager>
          <Image
            src="/figma-assets/work/interstellar/lockup-sage.png"
            alt="Interstellar wordmark in white with a gold star on a sage ground"
            width={870}
            height={626}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        {/* Row 2 — bottom of the grid: light #D6D2C9 (119) LEFT + gold
            #B08039 (118) RIGHT, side by side. */}
        <Reveal eager>
          <div className="flex w-full" style={{ gap: mcqw(12) }}>
            <div className="min-w-0 flex-1">
              <Image
                src="/figma-assets/work/interstellar/lockup-light.png"
                alt="Interstellar wordmark in black with a gold star on a light warm-grey ground"
                width={870}
                height={626}
                unoptimized
                className="block h-auto w-full"
              />
            </div>
            <div className="min-w-0 flex-1">
              <Image
                src="/figma-assets/work/interstellar/lockup-gold.png"
                alt="Interstellar wordmark in white on a gold ground"
                width={870}
                height={626}
                unoptimized
                className="block h-auto w-full"
              />
            </div>
          </div>
        </Reveal>

        {/* Row 3 left — starburst tile with the masked brand photo
            (desktop composite, section-relative percentages). */}
        <Reveal eager>
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "429 / 556" }}
          >
            <img
              src="/figma-assets/work/interstellar/row3-left-bg.svg"
              alt=""
              className="absolute inset-0 block h-full w-full"
            />
            <img
              src="/figma-assets/work/interstellar/row3-photo.svg"
              alt="Interstellar brand photo"
              className="absolute max-w-none"
              style={{ left: "-83.32%", top: "-6.5%", width: "212.86%", height: "114.42%" }}
            />
          </div>
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/interstellar/row3-right.png"
            alt="Interstellar poster — ‘We deal legacy, not property.’ over a carved stone facade"
            width={870}
            height={1140}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/interstellar/row4-full.png"
            alt="Interstellar property listing page — hero villa, property cards, and ‘The Path to Your Residence’ section"
            width={1798}
            height={2950}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        {/* Row 5 — the interior photo from the desktop composition. */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/interstellar/row5-full/imgRectangle.jpg"
            alt="Interstellar — residential interior photograph"
            width={1385}
            height={2077}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        {/* Row 6 — dark closing band (consolidated SVG). */}
        <Reveal eager>
          <img
            src="/figma-assets/work/interstellar/row6.svg"
            alt="Interstellar closing brand band"
            className="block h-auto w-full"
          />
        </Reveal>
      </div>
    </div>
  );
}
