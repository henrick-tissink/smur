"use client";

import Image from "next/image";
import { kokop } from "@/content/kokop";
import { Reveal } from "../reveal";

/*
  Mobile KOKO.P case study — full desktop parity (June 2026).
  Desktop section order: hero brand grid (artboards 148_1/149/150/151 as
  the 2×2 quadrants) → intro → sec1 (salmon logo tile SVG + packaging
  photo) → café mockup → sec3 (dark logo tile SVG + storefront photo) →
  brand-book interior (artboard 158) → instagram phone.
  The final folded-menu composition (desktop section 8) has no flat
  export — it remains desktop-only.
*/
const HERO_GRID = [
  { src: "/figma-assets/work/kokop/hero-q1.png", alt: "KOKO.P logo — dark ground" },
  { src: "/figma-assets/work/kokop/hero-q2.png", alt: "KOKO.P logo — cream ground" },
  { src: "/figma-assets/work/kokop/hero-q3.png", alt: "KOKO.P logo — terracotta ground" },
  { src: "/figma-assets/work/kokop/hero-q4.png", alt: "KOKO.P logo — brown ground" },
];

export function MobileKokopCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* 2×2 hero brand-mark grid — projects open on an image. */}
      <Reveal eager>
        <div className="grid grid-cols-2 gap-[2px]">
          {HERO_GRID.map((q) => (
            <Image
              key={q.src}
              src={q.src}
              alt={q.alt}
              width={870}
              height={626}
              unoptimized
              priority
              className="block h-auto w-full"
            />
          ))}
        </div>
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div className="px-[43px] py-[36px] text-center">
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: "40px", lineHeight: 1, letterSpacing: "0.01em" }}
          >
            {kokop.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {kokop.body}
          </p>
        </div>
      </Reveal>

      {/* Full-bleed visual sections in desktop order. */}
      <div className="flex flex-col gap-[12px] pb-[24px]">
        {/* Sec 1 — salmon logo tile (consolidated SVG) + packaging photo. */}
        <Reveal eager>
          <img
            src="/figma-assets/work/kokop/sec1-right-logo.svg"
            alt="KOKO.P — coffee and snacks logotype on salmon"
            className="block h-auto w-full"
          />
        </Reveal>
        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/sec1-photo.jpg"
            alt="KOKO.P branded packaging"
            width={869}
            height={1048}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/cafe-storefront.png"
            alt="KOKO.P café branding mockup"
            width={1787}
            height={1193}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        {/* Sec 3 — dark kokopelli tile (consolidated SVG) + storefront. */}
        <Reveal eager>
          <img
            src="/figma-assets/work/kokop/sec3-left-logo.svg"
            alt="KOKO.P kokopelli mark on dark ground"
            className="block h-auto w-full"
          />
        </Reveal>
        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/sec3-photo.jpg"
            alt="KOKO.P storefront / brand application"
            width={874}
            height={1045}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/brand-interior.png"
            alt="KOKO.P café interior with brand applications"
            width={1794}
            height={1010}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/kokop/insta-phone.png"
            alt="KOKO.P Instagram feed mockup"
            width={1748}
            height={2089}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>
      </div>
    </div>
  );
}
