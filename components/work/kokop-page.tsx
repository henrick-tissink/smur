"use client";

import Image from "next/image";
import { kokop, kokopFrame } from "@/content/kokop";
import { Reveal } from "../reveal";

/*
  Desktop KOKOP case study (Figma 136:234). 1440 × 4891, cream #fff7f4.
  Desktop only — no mobile frame exists in Figma.

  Layout (absolute children at exact Figma y-coords per CLAUDE.md rule #8):
    y=140   4-quadrant KOKO.P logotype grid (894×647)
              - hero-grid.svg: 4 colored backgrounds (Layer_1)
              - hero-logos.svg: KOKO.P letterforms overlay (Layer_2)
    y=872   "KOKO. P" eyebrow + body paragraph
    y=1201  Photo + logo overlay (890×516) — Group 126
    y=1742  Café branding mockup photo (891×595) — Group 125
    y=2362  Photo + KOKO.P logo on packaging (895×522) — Group 124
    y=2909  Brand color/menu layout (896×504) — Group 122
    y=3438  Instagram feed mockup (902×528) — Group 121
    y=3991  Final brand showcase photo (897×724) — Group 120

  Per CLAUDE.md rule #2, every image is from get_design_context asset URLs.
  Sections 4 (Group 122) and 7 (Group 120) have small vector overlays
  (text/labels on top of the base photo) that aren't yet inlined — TODO.
*/
export function KokopCaseStudy() {
  const { width, height } = kokopFrame.desktop;
  return (
    <div
      data-nav-scheme="dark"
      className="relative mx-auto"
      style={{ width, height, backgroundColor: "#fff7f4" }}
    >
      {/* Top hero: 4-quadrant grid with KOKO.P logotype variations */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 287, top: 140, width: 894.44, height: 647.35 }}
        >
          <Image
            src="/figma-assets/work/kokop/hero-grid.svg"
            alt=""
            width={894}
            height={647}
            unoptimized
            priority
            className="block h-full w-full"
          />
          <Image
            src="/figma-assets/work/kokop/hero-logos.svg"
            alt="KOKO.P logotype in four colorways"
            width={894}
            height={647}
            unoptimized
            priority
            className="absolute inset-0 block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Title + body block centered at y=872 */}
      <div
        className="absolute text-center"
        style={{ left: 505, top: 872, width: 430, color: "#35221a" }}
      >
        <Reveal>
          <p
            className="font-heading italic"
            style={{ fontSize: 20, lineHeight: 1 }}
          >
            {kokop.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-[36px] space-y-[22px]">
            {kokop.body.map((para, i) => (
              <p key={i} style={{ fontSize: 17, lineHeight: 1.33 }}>
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Section: Photo + logo overlay at y=1201 (Group 126) */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 275, top: 1201, width: 890.55, height: 516.12 }}
        >
          <Image
            src="/figma-assets/work/kokop/sec1-photo.jpg"
            alt="KOKO.P branded packaging photograph"
            width={3680}
            height={2456}
            unoptimized
            className="block h-full w-full object-cover"
          />
          <Image
            src="/figma-assets/work/kokop/sec1-overlay.svg"
            alt=""
            width={890}
            height={516}
            unoptimized
            className="absolute inset-0 block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Café mockup at y=1742 (Group 125) */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 275, top: 1742.12, width: 891, height: 595 }}
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

      {/* Section: Photo + KOKO.P logo at y=2362 (Group 124) */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 272, top: 2362.12, width: 895.13, height: 521.96 }}
        >
          <Image
            src="/figma-assets/work/kokop/sec3-photo.jpg"
            alt="KOKO.P brand application — coffee cup or signage"
            width={2080}
            height={3120}
            unoptimized
            className="block h-full w-full object-cover"
          />
          <Image
            src="/figma-assets/work/kokop/sec3-logo.svg"
            alt=""
            width={895}
            height={522}
            unoptimized
            className="absolute inset-0 block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Section: Brand color / menu layout at y=2909 (Group 122)
         TODO: 19 vector text/label overlays not yet inlined */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 272, top: 2909.08, width: 896.31, height: 504.44 }}
        >
          <Image
            src="/figma-assets/work/kokop/sec4-bg.png"
            alt="KOKO.P brand book layout"
            width={1672}
            height={941}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* Instagram mockup at y=3438 (Group 121) */}
      <Reveal>
        <div
          className="absolute"
          style={{ left: 271, top: 3438.52, width: 442, height: 528 }}
        >
          <Image
            src="/figma-assets/work/kokop/insta-mockup.png"
            alt="KOKO.P Instagram feed mockup"
            width={1748}
            height={2089}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
        {/* Overlay positioned right of the Instagram phone */}
        <div
          className="absolute"
          style={{ left: 731, top: 3744, width: 442, height: 397 }}
        >
          <Image
            src="/figma-assets/work/kokop/insta-overlay.svg"
            alt=""
            width={442}
            height={397}
            unoptimized
            className="block h-full w-full"
          />
        </div>
      </Reveal>

      {/* Section: Final brand showcase at y=3991 (Group 120)
         TODO: 60+ vector overlays (likely repeated KOKO.P typography
         showcase) not yet inlined */}
      <Reveal>
        <div
          className="absolute overflow-hidden"
          style={{ left: 278, top: 3991.52, width: 897.18, height: 723.94 }}
        >
          <Image
            src="/figma-assets/work/kokop/sec7-photo.png"
            alt="KOKO.P final brand application photograph"
            width={1254}
            height={1254}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
    </div>
  );
}
