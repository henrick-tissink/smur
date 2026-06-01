"use client";

import Image from "next/image";
import { kokop, kokopFrame } from "@/content/kokop";
import { Reveal } from "../reveal";
import { KokopSection6Content } from "./kokop-extras/section6";
import { KokopSection8Content } from "./kokop-extras/section8";

/*
  Desktop KOKOP case study (Figma 136:234). 1440 × 4891, cream #fff7f4.
  Desktop only — no mobile frame exists in Figma.

  Per CLAUDE.md rule #8 + the inset-positions memory: every element is
  rendered as its own absolute child at frame-absolute pixel coordinates.
  No "section bounding div + stretched contents" — that approach distorts
  multi-element layouts (past mistake committed and reverted as `c36858a`).

  Frame-absolute positions are computed from Figma's inset percentages:
    left   = (leftPct  / 100) * 1440
    top    = (topPct   / 100) * 4891
    width  = 1440 - left - (rightPct  / 100) * 1440
    height = 4891 - top  - (bottomPct / 100) * 4891

  Sections 6 (Group 122 brand book) and 8 (Group 120 final showcase) have
  small vector text overlays (19 and 60+ respectively) not yet inlined —
  TODO. Their base photos render correctly.

  Per CLAUDE.md rule #2, no get_screenshot for ANY assets — every img is a
  real Figma asset URL from get_design_context.
*/
export function KokopCaseStudy() {
  const { width, height } = kokopFrame.desktop;
  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* ============================================================
          Section 1 — Top hero (Frame 143:1426, y=140, 894×647)
          Layer_1 (bg quadrants) + Layer_2 (KOKO.P logotypes) stack
          ============================================================ */}
      <Reveal>
        <Image
          src="/figma-assets/work/kokop/hero-grid.svg"
          alt=""
          width={894}
          height={647}
          unoptimized
          priority
          className="absolute"
          style={{ left: 287, top: 140, width: 894.44, height: 647.35 }}
        />
      </Reveal>
      {/* Layer_2 (143:1432) has its own bounds inside Frame 143:1426:
         offset (113.51, 72.13), size 667.41×501.31 — must position at those
         exact dims, NOT stretch over the full 894×647 quadrant grid (that
         distorts the logos out of their centered positions). */}
      <Reveal>
        <Image
          src="/figma-assets/work/kokop/hero-logos.svg"
          alt="KOKO.P logotype in four colorways"
          width={667}
          height={501}
          unoptimized
          priority
          className="absolute"
          style={{
            left: 287 + 113.51,
            top: 140 + 72.13,
            width: 667.41,
            height: 501.31,
          }}
        />
      </Reveal>

      {/* ============================================================
          Section 2 — Title + body (Group 119, y=872, w=430 centered)
          ============================================================ */}
      <div
        className="absolute text-center"
        style={{ left: 505, top: 872, width: 430, color: "#35221a" }}
      >
        <Reveal>
          <p
            className="italic"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: 20,
              lineHeight: 1, // Figma H3: DM Sans Italic 20 / lh normal
            }}
          >
            {kokop.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-[24px] space-y-[22px]">
            {kokop.body.map((p, i) => (
              <p key={i} style={{ fontSize: 17, lineHeight: 1.33 }}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ============================================================
          Section 3 — Group 126 (y=1201, 890×516)
          Photo on LEFT half + terracotta panel on RIGHT half + KOKO.P
          logo accent inside right panel
          ============================================================ */}
      {/* Right half — terracotta solid panel (#D1766B) */}
      <Reveal delay={0.05}>
        <Image
          src="/figma-assets/work/kokop/sec1-right-logo.svg"
          alt=""
          width={432}
          height={515}
          unoptimized
          className="absolute"
          style={{ left: 734, top: 1201, width: 432, height: 515 }}
        />
      </Reveal>
      {/* Left half — packaging photograph */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 275, top: 1201, width: 432, height: 515 }}
        >
          <Image
            src="/figma-assets/work/kokop/sec1-photo.jpg"
            alt="KOKO.P branded packaging"
            width={3680}
            height={2456}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      {/* KOKO.P logo overlay centered in right panel */}
      <Reveal delay={0.1}>
        <Image
          src="/figma-assets/work/kokop/sec1-accent.svg"
          alt="KOKO.P logo"
          width={191}
          height={353}
          unoptimized
          className="absolute"
          style={{ left: 854, top: 1292, width: 191.22, height: 353.27 }}
        />
      </Reveal>

      {/* ============================================================
          Section 4 — Café mockup (Group 125, y=1742, 891×595)
          Single image fill
          ============================================================ */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 274.5, top: 1742.12, width: 891, height: 595 }}
        >
          <Image
            src="/figma-assets/work/kokop/cafe-mockup.jpg"
            alt="KOKO.P café branding mockup"
            width={4096}
            height={2733}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 5 — Group 124 (y=2362, 895×522)
          KOKO.P logo on LEFT + storefront photo on RIGHT (masked)
          ============================================================ */}
      <Reveal>
        <Image
          src="/figma-assets/work/kokop/sec3-left-logo.svg"
          alt="KOKO.P brand logo composition"
          width={437}
          height={522}
          unoptimized
          className="absolute"
          style={{ left: 272, top: 2362, width: 436.84, height: 521.96 }}
        />
      </Reveal>
      <Reveal delay={0.05}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 719, top: 2363, width: 458, height: 522 }}
        >
          <Image
            src="/figma-assets/work/kokop/sec3-photo.jpg"
            alt="KOKO.P storefront / brand application"
            width={2080}
            height={3120}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 6 — Brand book layout (Group 122, 297:57937)
          y=2909, 896×504. Inlined: bg photo + 20 KOKO.P text-label
          vectors via ./kokop-extras/section6.
          ============================================================ */}
      <Reveal>
        <KokopSection6Content />
      </Reveal>

      {/* ============================================================
          Section 7 — Group 121 (y=3438, 902×528)
          Instagram phone mockup (LEFT) + brand book card (RIGHT)
          ============================================================ */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 271, top: 3438.52, width: 442, height: 528 }}
        >
          <Image
            src="/figma-assets/work/kokop/insta-phone.png"
            alt="KOKO.P Instagram feed mockup"
            width={1748}
            height={2089}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <div
          className="absolute"
          style={{ left: 731, top: 3438, width: 442, height: 528 }}
        >
          <Image
            src="/figma-assets/work/kokop/insta-card.svg"
            alt="KOKO.P brand book card"
            width={442}
            height={528}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>

      {/* ============================================================
          Section 8 — Group 120 (297:57935), y=3991, 897×724
          Final showcase photo + 192-vector typography composition
          (mix-blend-multiply) via ./kokop-extras/section8.
          ============================================================ */}
      <Reveal>
        <KokopSection8Content />
      </Reveal>
    </div>
  );
}
