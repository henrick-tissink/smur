"use client";

import { useEffect, useState } from "react";

/*
  TileCarousel — auto-cycling crossfade used by the animated WORK tiles
  (ARCHITRAVE, LAVABO) that reproduce Figma "…WORK" components whose
  prototypes auto-advance through their variants. Each `frame` is rendered
  absolutely filling the tile; the active one fades in over 300ms. Same tempo
  as the home HeroCarousel. Pauses on hover.
*/

const INTERVAL_MS = 1400;

export function TileCarousel({
  frames,
  label,
}: {
  frames: React.ReactNode[];
  label: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % frames.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, frames.length]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={label}
    >
      {frames.map((frame, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[220ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          {frame}
        </div>
      ))}
    </div>
  );
}
