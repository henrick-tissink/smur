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
  Desktop WORK page (Figma 1:243): 1440 × 5187, bg #fff7f4.

  Fixed-height container with absolutely positioned children — same pattern
  as the home sections (CLAUDE.md rule #8). Each tile is a clickable Link
  pointing to a future /work/<slug> case study page; for now those routes
  don't exist yet so clicking falls back to the same page.
*/
export function DesktopWorkPage() {
  const { width, height, bg } = workFrame.desktop;
  const { container, titleSize, eyebrowSize } = workHero.desktop;

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
            className="mt-[12px] font-heading text-ink"
            style={{ fontSize: `${titleSize}px`, lineHeight: 1.21 }}
          >
            {workHero.title[0]}
            <br />
            {workHero.title[1]}
          </h1>
        </Reveal>
        {/* Arrow indicator pointing down (Figma "Component 2" at x=684 y=345 — 72x94) */}
        <Reveal delay={0.12}>
          <div
            className="absolute font-sans italic text-accent"
            style={{
              left: `${(684 - container.x)}px`,
              top: `${(345 - container.y)}px`,
              fontSize: "32px",
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
            className="absolute block overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
            style={{
              left: p.desktop.x,
              top: p.desktop.y,
              width: p.desktop.w,
              height: p.desktop.h,
            }}
          >
            <Image
              src={p.image}
              alt={p.name}
              width={p.desktop.w}
              height={p.desktop.h}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </Link>
        </Reveal>
      ))}

      {/* Thanks :) footer */}
      <div
        className="absolute text-center"
        style={{
          left: workFooter.desktop.x,
          top: workFooter.desktop.y,
          width: workFooter.desktop.w,
        }}
      >
        <Reveal>
          <p
            className="font-sans italic lowercase text-accent"
            style={{
              fontSize: `${workFooter.desktop.fontSize}px`,
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
