"use client";

import Image from "next/image";
import { mnf } from "@/content/mnf";
import { Reveal } from "../reveal";

/*
  Mobile MNF (Manufaktura Studio Architecture) case study. MNF has no
  dedicated mobile Figma design, so this is a mobile-native reflow
  (Lavabo/CRISP-style): a readable native-size intro, then the desktop
  flat-image showcase sections re-stacked full-bleed at the 393 mobile
  width. Rendered inside the route's 393 zoom wrapper. (The desktop vector
  brand-mark hero and the letterform overlays have no clean flat export, so
  the case study opens on the intro + the website-screens shot.)
*/
const SECTIONS = [
  { src: "/figma-assets/work/mnf/screens.jpg", w: 1793, h: 1180, alt: "Manufaktura website screens" },
  { src: "/figma-assets/work/mnf/gold-band.jpg", w: 1793, h: 1195, alt: "Manufaktura business cards on fluted brass" },
  { src: "/figma-assets/work/mnf/grid.jpg", w: 1799, h: 2480, alt: "Manufaktura brand and interior grid" },
  { src: "/figma-assets/work/mnf/bottom/photo.png", w: 1000, h: 670, alt: "Manufaktura Studio architecture" },
];

export function MobileMnfCaseStudy() {
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
            style={{ fontSize: "26px", lineHeight: 1.05, letterSpacing: "0.01em" }}
          >
            {mnf.eyebrow}
          </p>
          <p
            className="mt-[20px] text-ink"
            style={{ fontSize: "15px", lineHeight: 1.45 }}
          >
            {mnf.body}
          </p>
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
