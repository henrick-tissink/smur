import Image from "next/image";
import Link from "next/link";
import {
  workFooter,
  workFrame,
  workHero,
  workProjects,
  workTileHref,
} from "@/content/work";
import { Reveal } from "../reveal";

/*
  Mobile WORK page (Figma 268:37131): 393 × 2309, bg #fff7f4.
  Same fixed-height + absolute pattern; tiles are smaller / restacked
  asymmetrically per the mobile Figma.
*/
export function MobileWorkPage() {
  const { width, height, bg } = workFrame.mobile;
  const { container, titleSize, eyebrowSize } = workHero.mobile;

  return (
    <section
      data-nav-scheme="dark"
      className="relative mx-auto"
      style={{ width, height, backgroundColor: bg }}
    >
      {/* Hero intro */}
      <div
        className="absolute text-center"
        style={{
          left: container.x,
          top: container.y,
          width: container.w,
        }}
      >
        <Reveal>
          <p
            className="font-sans italic text-accent"
            style={{ fontSize: `${eyebrowSize}px`, lineHeight: 1 }}
          >
            {workHero.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1
            className="mt-[8px] font-heading text-ink"
            style={{ fontSize: `${titleSize}px`, lineHeight: 1.21 }}
          >
            {workHero.title[0]}
            <br />
            {workHero.title[1]}
          </h1>
        </Reveal>
        {/* Arrow (Component 2 at x=169 y=245 — 55x72 on mobile) */}
        <Reveal delay={0.12}>
          <div
            className="absolute font-sans italic text-accent"
            style={{
              left: `${(169 - container.x)}px`,
              top: `${(245 - container.y)}px`,
              fontSize: "24px",
              lineHeight: 1,
            }}
            aria-hidden
          >
            ↓
          </div>
        </Reveal>
      </div>

      {/* Project tiles */}
      {workProjects.map((p, i) => (
        <Reveal key={p.slug} delay={0.05 + (i % 4) * 0.04}>
          <Link
            href={workTileHref(p.slug)}
            aria-label={p.name}
            className="absolute block overflow-hidden transition-transform duration-500 active:scale-[0.99]"
            style={{
              left: p.mobile.x,
              top: p.mobile.y,
              width: p.mobile.w,
              height: p.mobile.h,
            }}
          >
            <Image
              src={p.image}
              alt={p.name}
              width={p.mobile.w}
              height={p.mobile.h}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </Link>
        </Reveal>
      ))}

      {/* thanks :) footer */}
      <div
        className="absolute text-center"
        style={{
          left: workFooter.mobile.x,
          top: workFooter.mobile.y,
          width: workFooter.mobile.w,
        }}
      >
        <Reveal>
          <p
            className="font-sans italic lowercase text-accent"
            style={{
              fontSize: `${workFooter.mobile.fontSize}px`,
              lineHeight: 1,
            }}
          >
            {workFooter.text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
