"use client";

import Image from "next/image";
import { kokop } from "@/content/kokop";
import { Reveal } from "../reveal";

/*
  Mobile KOKOP (KOKO.P café) case study. KOKOP has no dedicated mobile Figma
  design, so this is a mobile-native reflow (Lavabo/CRISP-style): a readable
  native-size intro, then the desktop flat-image showcase sections re-stacked
  full-bleed at the 393 mobile width. Rendered inside the route's 393 zoom
  wrapper. (The desktop vector brand-mark hero, the terracotta/logo split
  panels, the brand-book vector overlays and the final 192-vector typography
  composition have no clean flat export, so the case study opens on the intro
  + the flat showcase photographs.)
*/
const SECTIONS = [
  { src: "/figma-assets/work/kokop/sec1-photo.jpg", w: 3680, h: 2456, alt: "KOKO.P branded packaging" },
  { src: "/figma-assets/work/kokop/cafe-storefront.png", w: 1787, h: 1193, alt: "KOKO.P café branding mockup" },
  { src: "/figma-assets/work/kokop/sec3-photo.jpg", w: 2080, h: 3120, alt: "KOKO.P storefront / brand application" },
  { src: "/figma-assets/work/kokop/insta-phone.png", w: 1748, h: 2089, alt: "KOKO.P Instagram feed mockup" },
];

export function MobileKokopCaseStudy() {
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto"
      style={{ width: "393px", backgroundColor: "#fff7f4", paddingTop: "100px" }}
    >
      {/* Readable intro. */}
      <Reveal eager>
        <div className="px-[43px] pb-[36px] text-center">
          <p
            className="font-heading uppercase text-ink"
            style={{ fontSize: "40px", lineHeight: 1, letterSpacing: "0.01em" }}
          >
            {kokop.eyebrow}
          </p>
          {kokop.body.map((para, i) => (
            <p
              key={i}
              className={`${i === 0 ? "mt-[20px]" : "mt-[1em]"} text-ink`}
              style={{ fontSize: "15px", lineHeight: 1.45 }}
            >
              {para}
            </p>
          ))}
        </div>
      </Reveal>

      {/* Full-bleed visual sections. */}
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
