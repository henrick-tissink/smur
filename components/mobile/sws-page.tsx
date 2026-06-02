"use client";

import Image from "next/image";
import { sws } from "@/content/sws";
import { Reveal } from "../reveal";

/*
  Mobile SWS (Sassy Woman Society) case study. SWS has no dedicated mobile
  Figma design, so this is a mobile-native reflow (Lavabo/CRISP-style): a
  readable native-size intro, then the desktop flat-image showcase sections
  re-stacked full-bleed at the 393 mobile width. Rendered inside the route's
  393 zoom wrapper. (The desktop background vector frames have no clean flat
  export, so the case study opens on the intro + the hero site capture.)
*/
const SECTIONS = [
  { src: "/figma-assets/work/sws/hero-image.gif", w: 1920, h: 1082, alt: "Sassy Woman Society site" },
  { src: "/figma-assets/work/sws/middle-image.png", w: 960, h: 3914, alt: "Sassy Woman Society mobile layout" },
  { src: "/figma-assets/work/sws/bottom-image.png", w: 1921, h: 1409, alt: "Sassy Woman Society event" },
];

export function MobileSwsCaseStudy() {
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
            {sws.eyebrow}
          </p>
          {sws.body.map((para, i) => (
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
