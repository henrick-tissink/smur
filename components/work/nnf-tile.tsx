"use client";

import Image from "next/image";
import { TileCarousel } from "./tile-carousel";

/*
  NnfTile — reproduces the "NNF WORK" component (Figma file
  UGvU1B8yP5Pa7vQmneV0Cz, component set 27:3435 on the `components` page),
  the MANUFAKTURA STUDIO brand. Its prototype auto-advances three variants:

    1. "mnf__business_cards.psd" — black cards on a gold fluted surface
    2. "Group"                  — "MANUFAKTURA STUDIO___" over a hotel suite
    3. "Clip path group"        — a landscape brand moodboard grid

  Variants 1 & 2 are flat rendered artboards (MNFArtboard 74_1 / 77 from the
  EXPORTS drop), shown object-cover (their aspect ≈ the tile's 1.5).

  Variant 3 has no flat export — it's a clipped Figma composition — so it is
  rebuilt structurally (like the LAVABO brand book / ARCHITRAVE frame): a dark
  moodboard grid carrying the brand's "M" tile and the wooden-staircase shot
  with its MANUFAKTURA STUDIO card (both cropped from the brand grid,
  MNFArtboard 76), plus black tiles and MANUFAKTURA STUDIO wordmarks. Cell
  geometry is percentages of the frame so it scales to the desktop (795×529)
  and mobile (287×191) tiles.
*/

export function NnfTile({ width }: { width: number }) {
  const frames = [
    <Image
      key="cards"
      src="/figma-assets/work/nnf-anim/frame-cards.jpg"
      alt="MANUFAKTURA STUDIO — business cards"
      fill
      sizes={`${Math.round(width)}px`}
      unoptimized
      className="object-cover object-center"
    />,
    <Image
      key="hotel"
      src="/figma-assets/work/nnf-anim/frame-hotel.jpg"
      alt="MANUFAKTURA STUDIO — interior brand campaign"
      fill
      sizes={`${Math.round(width)}px`}
      unoptimized
      className="object-cover object-center"
    />,
    // Variant 3 — the brand moodboard grid. Previously rebuilt structurally
    // because no flat export existed; the June 2026 client drop supplied the
    // real export (1588×1060, aspect ≈ the tile's 1.5), so we render it
    // directly instead of the reconstruction.
    <Image
      key="board"
      src="/figma-assets/work/nnf-anim/board.png"
      alt="MANUFAKTURA STUDIO — brand moodboard grid"
      fill
      sizes={`${Math.round(width)}px`}
      unoptimized
      className="object-cover object-center"
    />,
  ];

  return <TileCarousel frames={frames} label="MANUFAKTURA STUDIO project showcase" />;
}
