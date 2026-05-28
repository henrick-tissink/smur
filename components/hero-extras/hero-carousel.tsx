"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/*
  HeroCarousel — reproduces the HERO component set's animation (Figma file
  UGvU1B8yP5Pa7vQmneV0Cz, component set 165:26896 "HERO", variants Frame 7–12).

  The prototype auto-advances a single HERO instance through its variants. Each
  variant keeps the beige hero background and places ONE project showcase at its
  own position + size on the canvas (NOT a shared crop box). So each slide here
  is absolutely positioned at the showcase's measured frame coordinates (in the
  native 1440×869 hero space) and we crossfade between them.

  Positions were measured by pixel-scanning the rendered variant set; aspect
  ratios matched each designer-exported artboard within ~2%, so object-contain
  shows the full artwork with the beige hero filling any slack.

  IMAGE OPTIMIZATION — intentionally NOT `unoptimized`. CLAUDE.md rule 3 mandates
  `unoptimized` for Figma images, but that rule exists for percent-CROP fills
  (`w-[207.98%] left-[-75.11%]`) where the rendered width exceeds the frame and
  `sizes` would under-describe it, causing the optimizer to downsample. That
  cannot happen here: each showcase is object-contain inside a fixed-width box,
  so rendered width <= box width always, and `sizes={w}px` is an exact upper
  bound. Letting Next optimize turns ~9MB of source PNG into a few hundred KB of
  DPR-aware AVIF/WebP sourced from the full-res originals — this is what fixes
  the "carousel stutters at the start" symptom (un-preloaded multi-MB PNGs not
  ready by the first crossfade). Off-screen frames load eagerly (cheap now) so
  no crossfade ever waits on a download.

  NOTE: the component set has 6 variants, but the designer's "animation header"
  export folder contains only 5 artboards. Frame 10 (a brand-collateral spread)
  has no exported asset yet, so it is omitted below — see SLIDES gap at frame 10.
*/

type Slide = {
  /** Figma variant this reproduces (Frame 7–12). */
  frame: number;
  src: string;
  alt: string;
  /** showcase box in native 1440×869 hero coordinates */
  x: number;
  y: number;
  w: number;
  h: number;
};

const SLIDES: Slide[] = [
  { frame: 7, src: "/figma-assets/hero-carousel/02-interstellar.png", alt: "INTERSTELLAR — real-estate brand & website", x: 1129, y: 361, w: 302, h: 499 },
  { frame: 8, src: "/figma-assets/hero-carousel/05-interst.png", alt: "INTERSTELLAR — editorial photography", x: 644, y: 118, w: 292, h: 266 },
  { frame: 9, src: "/figma-assets/hero-carousel/03-kokop.png", alt: "KOKO.P — coffee + snacks brand", x: 1114, y: 118, w: 319, h: 388 },
  // frame 10 — brand-collateral spread: asset missing from the export drop.
  { frame: 11, src: "/figma-assets/hero-carousel/04-taf.png", alt: "TAF — brand campaign", x: 681, y: 496, w: 424, h: 286 },
  { frame: 12, src: "/figma-assets/hero-carousel/01-crisp.png", alt: "CRISP — bakery brand identity", x: 895, y: 226, w: 328, h: 388 },
];

const INTERVAL_MS = 2000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Project showcase"
    >
      {SLIDES.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.frame}
            className={`absolute transition-opacity duration-[300ms] ease-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: s.x, top: s.y, width: s.w, height: s.h }}
            aria-hidden={!active}
          >
            <Image
              src={s.src}
              alt={active ? s.alt : ""}
              fill
              sizes={`${s.w}px`}
              quality={90}
              // Next 16: `priority` is deprecated in favour of `preload`. The
              // first frame is the hero LCP, so preload it (injects a <link> in
              // <head>). The rest load eagerly — small after optimization — so
              // every later frame is decoded before its 4s crossfade.
              preload={i === 0}
              loading={i === 0 ? undefined : "eager"}
              className="object-contain object-center"
            />
          </div>
        );
      })}
    </div>
  );
}
