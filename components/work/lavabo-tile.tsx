"use client";

import Image from "next/image";
import { TileCarousel } from "./tile-carousel";

/*
  LavaboTile — reproduces the "LVB WORK" component (Figma file
  UGvU1B8yP5Pa7vQmneV0Cz, component set 27:1566 on the `components` page),
  whose prototype auto-advances three variants. Unlike ARCHITRAVE, all three
  are flat rendered artboards from the EXPORTS drop, so each is just an
  object-cover image (their aspect ≈ the tile's 1.5):

    1. "lavabo_2_1.psd" — flat-lay brand collateral mockup (archiArtboard 64)
    2. "lavabo change2" — LAVABO logotype construction study (archiArtboard 62)
    3. "LAVABO CHANGE"  — LAV/ABO over the concrete basins (lavabo 3)
*/

const FRAMES = [
  { src: "/figma-assets/work/lavabo-anim/frame-mockup.png", alt: "LAVABO — brand collateral mockup" },
  { src: "/figma-assets/work/lavabo-anim/frame-logo.png", alt: "LAVABO — logotype construction study" },
  { src: "/figma-assets/work/lavabo-anim/frame-sinks.png", alt: "LAVABO — concrete basins" },
];

export function LavaboTile({ width }: { width: number }) {
  const frames = FRAMES.map((f) => (
    <Image
      key={f.src}
      src={f.src}
      alt={f.alt}
      fill
      sizes={`${Math.round(width)}px`}
      unoptimized
      className="object-cover object-center"
    />
  ));
  return <TileCarousel frames={frames} label="LAVABO project showcase" />;
}
