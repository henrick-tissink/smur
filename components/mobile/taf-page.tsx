"use client";

import Image from "next/image";
import { taf } from "@/content/taf";
import { Reveal } from "../reveal";

/*
  Mobile TAF (UAE cleaning brand) case study. TAF has no dedicated mobile
  Figma design, so this is a mobile-native reflow (Lavabo/CRISP-style): a
  readable native-size intro, then the desktop flat-image showcase sections
  re-stacked full-bleed at the 393 mobile width. Rendered inside the route's
  393 zoom wrapper. (The desktop vector brand-mark hero, masked row photos and
  letterform overlays have no clean flat export, so the case study opens on the
  intro + the fabric band.)
*/
const SECTIONS = [
  { src: "/figma-assets/work/taf/band-fabric.png", w: 1783, h: 1206, alt: "TAF logo printed on fabric" },
  { src: "/figma-assets/work/taf/website.png", w: 1798, h: 3348, alt: "TAF cleaning-services website landing page" },
  { src: "/figma-assets/work/taf/bottom/photo.jpg", w: 2834, h: 1889, alt: "TAF brand photograph" },
];

export function MobileTafCaseStudy() {
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
            {taf.eyebrow}
          </p>
          {taf.body.map((para, i) => (
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
