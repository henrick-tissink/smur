"use client";

import Image from "next/image";
import { sws, swsFrame } from "@/content/sws";
import { Reveal } from "../reveal";

/*
  Desktop SWS (Sassy Woman Society) case study.
  Figma 73:40179, 1440 × 4053, cream #fff7f4. Desktop only.

  Three sections, each composed of a background vector frame + a
  rounded-rectangle image fill. Hero image is a GIF (animated screen
  recording of the live site). Middle image is a tall PNG (scrolling
  capture). No deferred sections — small + cleanly consolidated.
*/
export function SwsCaseStudy() {
  const { width, height } = swsFrame.desktop;
  const titleInk = "#35221a";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Hero (Group 61, 73:40824)
          Frame (271.38, 140), 898.58×616.41.
          Bg vector + image rect (animated GIF of the SWS site).
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/sws/hero-bg.svg"
          alt=""
          className="absolute"
          style={{
            left: 271.38,
            top: 140,
            width: 898.58,
            height: 616.41,
          }}
        />
      </Reveal>
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{
            left: 303.63, // from Figma metadata 73:40820
            top: 211.05,
            width: 844.80,
            height: 476.08,
          }}
        >
          <Image
            src="/figma-assets/work/sws/hero-image.gif"
            alt="Sassy Woman Society site"
            width={1920}
            height={1082}
            unoptimized
            priority
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 2 — Title + body (Group 79, 297:57931)
          Frame (482, 841.41), 430×295.
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 482, top: 841.41, width: 430, color: titleInk }}
      >
        <Reveal>
          <p
            className="italic"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: 20,
              lineHeight: 1, // Figma H3: DM Sans Italic 20 / lh normal
              margin: 0,
            }}
          >
            {sws.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            style={{
              marginTop: 22, // top 883-841 = 42, minus eyebrow line ~20
              fontSize: 17,
              lineHeight: 1.33,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {sws.body}
          </p>
        </Reveal>
      </div>

      {/* ============================================================
          Section 3 — Middle large (Group 59, 73:40822)
          Frame (277, 1221.41), 898.58×2010.67.
          Bg vector + tall image (mobile-style scrolling capture).
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/sws/middle-bg.svg"
          alt=""
          className="absolute"
          style={{
            left: 277,
            top: 1221.41,
            width: 898.58,
            height: 2010.67,
          }}
        />
      </Reveal>
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{
            left: 503.63, // from Figma metadata 73:40818
            top: 1342.84,
            width: 441.60,
            height: 1800.44,
          }}
        >
          <Image
            src="/figma-assets/work/sws/middle-image.png"
            alt="Sassy Woman Society mobile layout"
            width={960}
            height={3914}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 4 — Bottom (Group 60, 73:40823)
          Frame (277, 3257.08), 898.58×656.36.
          Bg vector + bottom image (events / community photo).
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/sws/bottom-bg.svg"
          alt=""
          className="absolute"
          style={{
            left: 277,
            top: 3257.08,
            width: 898.58,
            height: 656.36,
          }}
        />
      </Reveal>
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{
            left: 342, // from Figma metadata 73:40819
            top: 3303.08,
            width: 768.40,
            height: 563.60,
          }}
        >
          <Image
            src="/figma-assets/work/sws/bottom-image.png"
            alt="Sassy Woman Society event"
            width={1921}
            height={1409}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
    </div>
  );
}
