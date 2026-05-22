"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/*
  HeroCarousel — cycles through the brand artboards Smaranda exported in
  EXPORTS/HOME/animation header/ (May 2026 round). Replaces the static
  "Status" real-estate vector mockup.

  Auto-advances every 4s with a 600ms crossfade. Paused on hover so users
  can read a slide they're inspecting. Each slide is its own Next/Image
  with object-cover, sized to fill the right-hand panel of the hero.
*/

type Slide = {
  src: string;
  alt: string;
  /** intrinsic px (for next/image width/height props) */
  w: number;
  h: number;
};

const SLIDES: Slide[] = [
  { src: "/figma-assets/hero-carousel/01-crisp.png", alt: "CRISP — bakery brand identity", w: 1796, h: 2228 },
  { src: "/figma-assets/hero-carousel/02-interstellar.png", alt: "INTERSTELLAR — editorial brand system", w: 1798, h: 2950 },
  { src: "/figma-assets/hero-carousel/03-kokop.png", alt: "KOKOP — coffee + snacks brand", w: 875, h: 1045 },
  { src: "/figma-assets/hero-carousel/04-taf.png", alt: "TAF — brand campaign", w: 1783, h: 1206 },
  { src: "/figma-assets/hero-carousel/05-interst.png", alt: "Interstellar — secondary slide", w: 1201, h: 1097 },
];

const INTERVAL_MS = 4000;

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
      className="absolute"
      style={{ left: 824, top: 78, width: 540, height: 713 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Brand portfolio carousel"
    >
      {SLIDES.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.src}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-[600ms] ease-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!active}
          >
            <Image
              src={s.src}
              alt={active ? s.alt : ""}
              fill
              unoptimized
              priority={i === 0}
              sizes="540px"
              className="object-cover object-center"
            />
          </div>
        );
      })}

      {/* dot indicators */}
      <div className="absolute bottom-[24px] left-1/2 flex -translate-x-1/2 gap-[8px]">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-[6px] w-[6px] rounded-full transition-colors ${
              i === index ? "bg-cream" : "bg-cream/40 hover:bg-cream/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
