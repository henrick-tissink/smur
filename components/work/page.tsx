import Image from "next/image";
import Link from "next/link";
import {
  workFooter,
  workFrame,
  workHero,
  workProjects,
  workTileHref,
} from "@/content/work";
import { ArchitraveTile } from "./architrave-tile";
import { LavaboTile } from "./lavabo-tile";
import { NnfTile } from "./nnf-tile";
import { BouncingArrow } from "../bouncing-arrow";
import { Reveal } from "../reveal";
import { TitleMask } from "../title-mask";

/*
  Desktop WORK page (Figma 1:243): 1440 × 5187, bg #fff7f4.

  Fixed-height container with absolutely positioned children — same pattern
  as the home sections (CLAUDE.md rule #8). Each tile is a clickable Link
  pointing to a future /work/<slug> case study page; for now those routes
  don't exist yet so clicking falls back to the same page.
*/
export function DesktopWorkPage() {
  const { width, height, bg } = workFrame.desktop;
  const { container, eyebrowSize } = workHero.desktop;

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
          <div className="mt-[12px] flex justify-center text-ink">
            <TitleMask
              src="/figma-assets/titles/this-is-my-work.svg"
              width={254.66}
              height={145.21}
              alt={`${workHero.title[0]} ${workHero.title[1]}`}
              as={1}
            />
          </div>
        </Reveal>
        {/* Scroll-down arrow indicator (Figma "Component 2" at x=684 y=345 —
            72×94). Centered in its frame box so it sits under the title, and
            bounces like the contact hero cue. */}
        <Reveal delay={0.12}>
          <div
            className="absolute flex items-center justify-center text-ink"
            style={{
              left: `${684 - container.x}px`,
              top: `${345 - container.y}px`,
              width: "72px",
              height: "94px",
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
            className="absolute block overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
            style={{
              left: p.desktop.x,
              top: p.desktop.y,
              width: p.desktop.w,
              height: p.desktop.h,
            }}
          >
            {p.slug === "mnf" ? (
              <ArchitraveTile width={p.desktop.w} />
            ) : p.slug === "lavabo" ? (
              <LavaboTile width={p.desktop.w} />
            ) : p.slug === "architrave" ? (
              <NnfTile width={p.desktop.w} />
            ) : (
              <Image
                src={p.image}
                alt={p.name}
                width={p.desktop.w}
                height={p.desktop.h}
                unoptimized
                className="block h-full w-full object-cover"
              />
            )}
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
