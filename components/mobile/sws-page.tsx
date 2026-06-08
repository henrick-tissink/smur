"use client";

import Image from "next/image";
import { sws } from "@/content/sws";
import { Reveal } from "../reveal";

/*
  Mobile SWS (Sassy Woman Society) case study — full desktop parity
  (June 2026). Desktop wraps each capture in a colored panel (the
  hero/middle/bottom bg SVGs are solid fills: #E4E4E4 / #352C4F /
  #E4E4E4) with the image inset; reproduced here with panel divs and
  the same section-relative insets.
*/
const PANELS = [
  {
    bg: "#E4E4E4",
    aspect: "898.58 / 616.41",
    img: { src: "/figma-assets/work/sws/hero-image.gif", w: 1920, h: 1082, alt: "Sassy Woman Society site" },
    inset: { left: "3.59%", top: "11.53%", width: "94.02%", height: "77.23%" },
  },
  {
    bg: "#352C4F",
    aspect: "898.58 / 2010.67",
    img: { src: "/figma-assets/work/sws/middle-image.png", w: 960, h: 3914, alt: "Sassy Woman Society mobile layout" },
    inset: { left: "25.85%", top: "6.04%", width: "49.14%", height: "89.54%" },
  },
  {
    bg: "#E4E4E4",
    aspect: "898.58 / 656.36",
    img: { src: "/figma-assets/work/sws/bottom-image.png", w: 1921, h: 1409, alt: "Sassy Woman Society event" },
    inset: { left: "7.86%", top: "7.01%", width: "85.51%", height: "85.87%" },
  },
];

export function MobileSwsCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* Hero panel — projects open on an image. */}
      <Reveal eager>
        <Panel {...PANELS[0]} priority />
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div className="px-[43px] py-[36px] text-center">
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: "26px", lineHeight: 1.05, letterSpacing: "0.01em" }}
          >
            {sws.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {sws.body}
          </p>
        </div>
      </Reveal>

      {/* Middle + bottom panels in desktop order. */}
      <div className="flex flex-col gap-[12px] pb-[24px]">
        <Reveal eager>
          <Panel {...PANELS[1]} />
        </Reveal>
        <Reveal eager>
          <Panel {...PANELS[2]} />
        </Reveal>
      </div>
    </div>
  );
}

function Panel({
  bg,
  aspect,
  img,
  inset,
  priority,
}: (typeof PANELS)[number] & { priority?: boolean }) {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: aspect, backgroundColor: bg }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        unoptimized
        priority={priority}
        className="absolute object-cover"
        style={{ ...inset, height: inset.height }}
      />
    </div>
  );
}
