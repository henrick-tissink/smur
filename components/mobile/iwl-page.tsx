"use client";

import Image from "next/image";
import { iwl } from "@/content/iwl";
import { Reveal } from "../reveal";

/*
  Mobile IWL case study — full desktop parity (June 2026).
  Desktop section order: hero band (artboard 101) → intro → row1 (arch
  photo + Möbius panel, artboard 104) → banner (105) → red business-card
  band (107) → pattern (107_1) → row4 tiles (110/109) → poster (112).
*/
const SECTIONS = [
  { src: "/figma-assets/work/iwl/row1-photo.jpg", w: 1964, h: 2946, alt: "IWL editorial photograph" },
  { src: "/figma-assets/work/iwl/row1-right.png", w: 874, h: 1045, alt: "IWL — Möbius marks on the Institute red panel" },
  { src: "/figma-assets/work/iwl/banner.png", w: 1798, h: 1195, alt: "Welcome to the Institute for World Literature banner" },
  { src: "/figma-assets/work/iwl/row2-band.png", w: 1793, h: 985, alt: "IWL business cards on the Institute red band" },
  { src: "/figma-assets/work/iwl/pattern.png", w: 1789, h: 1216, alt: "IWL repeating logotype pattern" },
  { src: "/figma-assets/work/iwl/row4-left.png", w: 871, h: 1046, alt: "IWL programme brochure spread" },
  { src: "/figma-assets/work/iwl/row4-right.png", w: 871, h: 1042, alt: "IWL — a participant reading, with the Möbius logo overlay" },
  { src: "/figma-assets/work/iwl/poster.png", w: 1790, h: 2159, alt: "IWL Harvard University 2023 session poster" },
];

export function MobileIwlCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* Hero band (artboard 101) — projects open on an image. */}
      <Reveal eager>
        <Image
          src="/figma-assets/work/iwl/hero-flat.png"
          alt="The Institute for World Literature — brand hero"
          width={1788}
          height={776}
          unoptimized
          priority
          className="block h-auto w-full"
        />
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div className="px-[43px] py-[36px] text-center">
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: "22px", lineHeight: 1.1, letterSpacing: "0.01em" }}
          >
            {iwl.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {iwl.body}
          </p>
        </div>
      </Reveal>

      {/* Full-bleed visual sections in desktop order. */}
      <div className="flex flex-col gap-[12px] pb-[24px]">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.src} eager delay={0.03 * i}>
            <Image
              src={s.src}
              alt={s.alt}
              width={s.w}
              height={s.h}
              unoptimized
              className="block h-auto w-full"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
