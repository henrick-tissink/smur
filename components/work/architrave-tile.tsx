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
  has no flat export — it's a Figma composition — so it is rebuilt structurally
  (like the LAVABO brand book): dark-grey field (#515151, measured) + two white
  cards carrying the Architrave logo lockup, the moulding mark, a big "A", and
  contact lines. Marks are cropped from archiArtboard 82; card geometry is
  measured from the variant as percentages so it scales to the desktop
  (569×647) and mobile (206×234) tiles alike.
*/

const GREY = "#515151";

export function ArchitraveTile({ width }: { width: number }) {
  // Card type scales with the tile. Card ≈ 33.2% of tile width.
  const cardW = width * 0.332;
  const aSize = cardW * 0.52;
  const contactSize = Math.max(cardW * 0.072, 4);

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
    <div key="cards" className="absolute inset-0" style={{ backgroundColor: GREY }}>
      {/* Left card — moulding mark + big A + contact lines */}
      <div
        className="absolute bg-white"
        style={{ left: "14.2%", top: "26.9%", width: "33.2%", height: "45.9%" }}
      >
        <Image
          src="/figma-assets/work/architrave-anim/mark-moulding.png"
          alt=""
          width={232}
          height={56}
          unoptimized
          className="absolute h-auto"
          style={{ left: "18%", top: "34%", width: "64%" }}
        />
        <span
          aria-hidden
          className="absolute font-sans font-bold leading-none text-[#7d7d7d]"
          style={{ left: "16%", top: "44%", fontSize: `${aSize}px` }}
        >
          A
        </span>
        <p
          className="absolute text-center font-sans uppercase leading-[1.5] text-[#8a8a8a]"
          style={{ left: 0, right: 0, bottom: "8%", fontSize: `${contactSize}px` }}
        >
          CONTACT@ARCHITRAVE.COM
          <br />
          ARCHITRAVE.COM
        </p>
      </div>
      {/* Right card — full Architrave studio lockup */}
      <div
        className="absolute bg-white"
        style={{ left: "52.5%", top: "26.9%", width: "33.2%", height: "45.9%" }}
      >
        <Image
          src="/figma-assets/work/architrave-anim/lockup.png"
          alt="Architrave studio"
          width={314}
          height={150}
          unoptimized
          className="absolute h-auto -translate-x-1/2"
          style={{ left: "50%", top: "56%", width: "74%" }}
        />
      </div>
    </div>,
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
