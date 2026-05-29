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

const DARK = "#3a2f26";

export function NnfTile({ width }: { width: number }) {
  const label = width * 0.02; // wordmark size scales with the tile

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
    <div key="board" className="absolute inset-0" style={{ backgroundColor: DARK }}>
      {/* left partial black tile */}
      <div className="absolute bg-black" style={{ left: "1.5%", top: "6%", width: "11%", height: "40%" }} />
      {/* "M" beige brand tile */}
      <div className="absolute overflow-hidden" style={{ left: "14.5%", top: "6%", width: "23%", height: "40%" }}>
        <Image
          src="/figma-assets/work/nnf-anim/cell-m.png"
          alt=""
          fill
          sizes={`${Math.round(width * 0.23)}px`}
          unoptimized
          className="object-cover object-center"
        />
      </div>
      {/* black tile + MANUFAKTURA wordmark (lower-left) */}
      <div
        className="absolute flex items-end bg-black"
        style={{ left: "14.5%", top: "50%", width: "23%", height: "40%", padding: `${label * 0.7}px` }}
      >
        <span className="font-sans uppercase leading-tight text-white" style={{ fontSize: `${label}px`, letterSpacing: "0.04em" }}>
          Manufaktura
          <br />
          studio___
        </span>
      </div>
      {/* staircase interior + MANUFAKTURA STUDIO card (centre) */}
      <div className="absolute overflow-hidden" style={{ left: "40%", top: "8%", width: "30%", height: "84%" }}>
        <Image
          src="/figma-assets/work/nnf-anim/cell-stair.jpg"
          alt=""
          fill
          sizes={`${Math.round(width * 0.3)}px`}
          unoptimized
          className="object-cover object-center"
        />
      </div>
      {/* black tile + MANUFAKTURA STUDIO wordmark (upper-right) */}
      <div
        className="absolute flex items-start bg-black"
        style={{ left: "72%", top: "6%", width: "26.5%", height: "40%", padding: `${label * 0.7}px` }}
      >
        <span className="font-sans uppercase leading-tight text-white" style={{ fontSize: `${label}px`, letterSpacing: "0.04em" }}>
          Manufaktura
          <br />
          studio___
        </span>
      </div>
      {/* black tile (lower-right) */}
      <div className="absolute bg-black" style={{ left: "72%", top: "50%", width: "26.5%", height: "40%" }} />
    </div>,
  ];

  return <TileCarousel frames={frames} label="MANUFAKTURA STUDIO project showcase" />;
}
