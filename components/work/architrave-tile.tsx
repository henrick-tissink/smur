"use client";

import Image from "next/image";
import { TileCarousel } from "./tile-carousel";

/*
  ArchitraveTile — reproduces the "ARCHITRAVE WORK" component (Figma file
  UGvU1B8yP5Pa7vQmneV0Cz, component set 27:4791 on the `components` page),
  whose prototype auto-advances three variants:

    1. "Group 8"  — iPhone showing an Instagram interior-design profile
    2. "Layer_1"  — two white business cards on grey (brand mark + logo)
    3. "Frame 8"  — "DESIGNING THE REFLECTION OF YOU" brand presentation

  Variants 1 & 3 are rendered Architrave artboards (archiArtboard 86 / 87 from
  the EXPORTS drop), object-cover (their aspect ≈ the tile's 0.879). Variant 2
  is the two business cards on charcoal — a flat export supplied by the client
  (June 2026), 1055×1199 ≈ the tile's 0.879 aspect, object-cover. It replaces
  the earlier structural rebuild of that Figma composition.
*/

export function ArchitraveTile({ width }: { width: number }) {
  const frames = [
    <Image
      key="phone"
      src="/figma-assets/work/architrave-anim/frame-phone.png"
      alt="ARCHITRAVE — social media profile mockup"
      fill
      sizes={`${Math.round(width)}px`}
      unoptimized
      className="object-cover object-center"
    />,
    <Image
      key="cards"
      src="/figma-assets/work/architrave-anim/cards.png"
      alt="ARCHITRAVE — business cards: contact details and studio logotype on charcoal"
      fill
      sizes={`${Math.round(width)}px`}
      unoptimized
      className="object-cover object-center"
    />,
    <Image
      key="presentation"
      src="/figma-assets/work/architrave-anim/frame-presentation.png"
      alt="ARCHITRAVE — brand presentation: designing the reflection of you"
      fill
      sizes={`${Math.round(width)}px`}
      unoptimized
      className="object-cover object-center"
    />,
  ];

  return <TileCarousel frames={frames} label="ARCHITRAVE project showcase" />;
}
