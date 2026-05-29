import Image from "next/image";
import Link from "next/link";
import {
  workFooter,
  workFrame,
  workHero,
  workProjects,
  workTileHref,
} from "@/content/work";
import { BouncingArrow } from "../bouncing-arrow";
import { Reveal } from "../reveal";
import { TitleMask } from "../title-mask";

/*
  Mobile WORK page (Figma 268:37131): 393 × 2309, bg #fff7f4.
  Same fixed-height + absolute pattern; tiles are smaller / restacked
  asymmetrically per the mobile Figma.
*/
export function MobileWorkPage() {
  const { width, height, bg } = workFrame.mobile;
  const { container, eyebrowSize } = workHero.mobile;

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
          {/* "This is / My Work" — brand-font SVG (this-is-my-work.svg),
              2-line break matches the mobile design, scaled 45/58. */}
          <div className="mt-[8px] flex justify-center text-ink">
            <TitleMask
              src="/figma-assets/titles/this-is-my-work.svg"
              width={197.6}
              height={112.7}
              alt={`${workHero.title[0]} ${workHero.title[1]}`}
              as={1}
            />
          </div>
        </Reveal>
        {/* Scroll-down arrow (Figma "Component 2" at x=169 y=245 — 55×71.8).
            Centered in its frame box; bounces like the contact hero cue. */}
        <Reveal delay={0.12}>
          <div
            className="absolute flex items-center justify-center text-ink"
            style={{
              left: `${169 - container.x}px`,
              top: `${245 - container.y}px`,
              width: "55px",
              height: "71.806px",
            }}
            aria-hidden
          >
            <BouncingArrow direction="down" size={72} />
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
