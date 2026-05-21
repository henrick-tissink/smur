"use client";

import Image from "next/image";
import { mnf, mnfFrame } from "@/content/mnf";
import { Reveal } from "../reveal";

/*
  Desktop MNF (Manufaktura Studio Architecture) case study.
  Figma 71:343, 1440 × 4367, cream #fff7f4. Desktop only.

  Deferred per CLAUDE.md rule #2:
    - Big middle (Clip path group 218:16465, 899×1239) — grid of masked
      photo cards. Many nested clip-path groups, no consolidated SVG
      export. Renders as cream gap.
*/
export function MnfCaseStudy() {
  const { width, height } = mnfFrame.desktop;
  const titleInk = "#35221a";

  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto overflow-hidden"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Hero (Group 22, 71:974)
          Frame (269, 140), 899.78×370.67. Consolidated SVG.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/mnf/hero.svg"
          alt="Manufaktura Studio hero"
          className="absolute"
          style={{ left: 269, top: 140, width: 899.78, height: 370.67 }}
        />
      </Reveal>

      {/* ============================================================
          Section 2 — Title + body (Group 79, 297:57100)
          Frame (504.81, 595.67), 430×199.
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 504.81, top: 595.67, width: 430, color: titleInk }}
      >
        <Reveal>
          <p
            className="font-heading italic"
            style={{ fontSize: 20, lineHeight: 1, margin: 0 }}
          >
            {mnf.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p
            style={{
              marginTop: 14.17, // top 34.17 - 20 eyebrow
              fontSize: 17,
              lineHeight: 1.33,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {mnf.body}
          </p>
        </Reveal>
      </div>

      {/* ============================================================
          Section 3 — Row 1 LEFT (Group 25, 71:977)
          Frame (270, 1753.63), 437.65×299.26. Consolidated SVG.
          ============================================================ */}
      <Reveal>
        <img
          src="/figma-assets/work/mnf/row1-left.svg"
          alt="Manufaktura site layout"
          className="absolute"
          style={{ left: 270, top: 1753.63, width: 437.65, height: 299.26 }}
        />
      </Reveal>

      {/* ============================================================
          Section 4 — Row 1 RIGHT (Group 26, 71:978)
          Frame (731.65, 1753.63), 437.65×299.26. Consolidated SVG.
          ============================================================ */}
      <Reveal delay={0.05}>
        <img
          src="/figma-assets/work/mnf/row1-right.svg"
          alt="Manufaktura site layout"
          className="absolute"
          style={{ left: 731.65, top: 1753.63, width: 437.65, height: 299.26 }}
        />
      </Reveal>

      {/* ============================================================
          Section 5 — Big middle (Clip path group 218:16465) — DEFERRED
          Frame (270, 2672.88), 899×1239.42. Grid of masked photo cards.
          TODO: inline.
          ============================================================ */}
      <div
        className="absolute"
        style={{ left: 270, top: 2672.88, width: 899, height: 1239.42 }}
        aria-hidden
      />

      {/* ============================================================
          Section 6 — Bottom (Group 27, 71:981)
          Frame (270, 3937.30), 899×575. Bg photo + mix-blend-multiply
          overlay + 18 letter vectors spelling the Manufaktura wordmark.
          ============================================================ */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 270, top: 3937.30, width: 899, height: 575 }}
        >
          {/* Bg photo */}
          <img
            src="/figma-assets/work/mnf/bottom/photo.png"
            alt="Manufaktura Studio architecture"
            className="absolute"
            style={{
              left: 0,
              top: 2,
              width: 899,
              height: 573,
              objectFit: "cover",
              maxWidth: "none",
            }}
          />
          {/* mix-blend-multiply overlay vector */}
          <img
            src="/figma-assets/work/mnf/bottom/blend.svg"
            alt=""
            className="absolute inset-0 block h-full w-full"
            style={{ mixBlendMode: "multiply", maxWidth: "none" }}
          />
          {/* 18 letter vectors (Manufaktura wordmark + bottom line) */}
          {mnf.bottomVectors.map((v) => (
            <img
              key={v.src}
              src={`/figma-assets/work/mnf/bottom/${v.src}`}
              alt=""
              className="absolute"
              style={{
                left: v.left,
                top: v.top,
                width: v.width,
                height: v.height,
              }}
            />
          ))}
        </div>
      </Reveal>

      {/* Floating brand vector (71:410) at frame (717.26, 4250.49), 275×88 */}
      <Reveal>
        <img
          src="/figma-assets/work/mnf/floating.svg"
          alt=""
          className="absolute"
          style={{
            left: 717.26,
            top: 4250.49,
            width: 275.25,
            height: 87.60,
          }}
        />
      </Reveal>
    </div>
  );
}
