"use client";

import Image from "next/image";
import { interstellar } from "@/content/interstellar";
import { Reveal } from "../reveal";

/*
  Mobile INTERSTELLAR case study — full desktop parity (June 2026).
  Desktop section order: hero (artboard 116) → intro → row1 logo tiles
  (SVGs) → row2 band (bg + 2 overlay labels, composite) → row3 (starburst
  tile w/ masked photo + sage poster) → row4 property page (122) → row5
  interior photo → row6 dark band (SVG).
*/
export function MobileInterstellarCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* Hero (artboard 116) — projects open on an image. */}
      <Reveal eager>
        <Image
          src="/figma-assets/work/interstellar/hero-flat.png"
          alt="INTERSTELLAR — real-estate brand hero"
          width={1797}
          height={988}
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
            style={{ fontSize: "34px", lineHeight: 1.05, letterSpacing: "0.01em" }}
          >
            {interstellar.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {interstellar.body}
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col gap-[12px] pb-[24px]">
        {/* Row 1 — logo tiles (consolidated SVGs). */}
        <Reveal eager>
          <img
            src="/figma-assets/work/interstellar/row1-left.svg"
            alt="Interstellar brand composition"
            className="block h-auto w-full"
          />
        </Reveal>
        <Reveal eager>
          <img
            src="/figma-assets/work/interstellar/row1-right.svg"
            alt="Interstellar brand composition"
            className="block h-auto w-full"
          />
        </Reveal>

        {/* Row 2 — full-width band + two label overlays (desktop composite
            reproduced with section-relative percentages). */}
        <Reveal eager>
          <div
            className="relative w-full"
            style={{ aspectRatio: "887.2 / 308.87" }}
          >
            <img
              src="/figma-assets/work/interstellar/row2-bg.svg"
              alt="Interstellar brand application"
              className="absolute inset-0 block h-full w-full"
            />
            <img
              src="/figma-assets/work/interstellar/row2-overlay1.svg"
              alt=""
              className="absolute"
              style={{ left: "12.51%", top: "41.01%", width: "22.34%", height: "15.98%" }}
            />
            <img
              src="/figma-assets/work/interstellar/row2-overlay2.svg"
              alt=""
              className="absolute"
              style={{ left: "64.62%", top: "41.01%", width: "22.34%", height: "15.98%" }}
            />
          </div>
        </Reveal>

        {/* Row 3 left — starburst tile with the masked brand photo
            (desktop composite, section-relative percentages). */}
        <Reveal eager>
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "429 / 556" }}
          >
            <img
              src="/figma-assets/work/interstellar/row3-left-bg.svg"
              alt=""
              className="absolute inset-0 block h-full w-full"
            />
            <img
              src="/figma-assets/work/interstellar/row3-photo.svg"
              alt="Interstellar brand photo"
              className="absolute max-w-none"
              style={{ left: "-83.32%", top: "-6.5%", width: "212.86%", height: "114.42%" }}
            />
          </div>
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/interstellar/row3-right.png"
            alt="Interstellar poster — ‘We deal legacy, not property.’ over a carved stone facade"
            width={870}
            height={1140}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        <Reveal eager>
          <Image
            src="/figma-assets/work/interstellar/row4-full.png"
            alt="Interstellar property listing page — hero villa, property cards, and ‘The Path to Your Residence’ section"
            width={1798}
            height={2950}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        {/* Row 5 — the interior photo from the desktop composition. */}
        <Reveal eager>
          <Image
            src="/figma-assets/work/interstellar/row5-full/imgRectangle.jpg"
            alt="Interstellar — residential interior photograph"
            width={1385}
            height={2077}
            unoptimized
            className="block h-auto w-full"
          />
        </Reveal>

        {/* Row 6 — dark closing band (consolidated SVG). */}
        <Reveal eager>
          <img
            src="/figma-assets/work/interstellar/row6.svg"
            alt="Interstellar closing brand band"
            className="block h-auto w-full"
          />
        </Reveal>
      </div>
    </div>
  );
}
