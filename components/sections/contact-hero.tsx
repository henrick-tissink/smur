"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { contactHero } from "@/content/contact";
import { BouncingArrow } from "@/components/bouncing-arrow";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";

/*
  Faithful-fluid desktop ContactHero. Ported from the ContactHero() block in
  legacy components/contact/page.tsx (Figma 193:1383, sage section y=0 h=812)
  to the aspect-ratio stage pattern used by home Hero / WorkPage: stage =
  aspect-ratio 1440/812 container-query box, the legacy 1440×812 composition
  expressed in % (positions) and cqw (type + TitleMask + arrow size) so it
  scales with viewport width — no zoom.

  `overflow: visible` on the stage is REQUIRED: the LAVABO carousel sits at
  top:642 h:249 (bottom 891), 79px past the 812 sage bottom edge — it
  deliberately overlaps the section below per Figma. The legacy build used
  `z-10` on the whole section for the same reason; kept here on the section.

  Reveal delays (UNCHANGED from legacy): title 0, body 0.08, left image 0.12,
  carousel 0.16. The LavaboCarousel animation (3-frame crossfade, 1400ms
  interval, 220ms opacity transition) is preserved exactly.

  Native coords (1440×812 stage):
  title left=505 top=237 w=430; body left=422 top=408 w=596; MANUFAKTURA
  hero-left.png left=0 top=244 w=258 h=356; LavaboCarousel left=1066 top=642
  w=374 h=249; down arrow box left=684 top=642 w=72 h=94.

  Carousel + arrow are DIRECT children of the stage (containing-block rule,
  Phase 4 / CLAUDE.md #8): a %-positioned element nested inside another
  absolutely-positioned box resolves % against THAT box, not the stage. Each
  is only wrapped in a Reveal (position:static, no containing block of its
  own), so their % left/top still resolve against the stage.
*/

const STAGE_W = 1440;
const STAGE_H = 812;

function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function ContactHero() {
  return (
    <section
      data-nav-scheme="light"
      className="relative z-10 w-full"
      style={{ backgroundColor: "var(--color-band)" }}
    >
      <div
        data-contact-hero-stage
        className="relative mx-auto w-full max-w-[1440px]"
        style={{
          aspectRatio: "1440 / 812",
          containerType: "inline-size",
          overflow: "visible",
        }}
      >
        {/* Title centered at y=237, w=430 (Figma 207:1420) */}
        <div
          className="absolute flex justify-center text-cream"
          style={{ left: pctX(505), top: pctY(237), width: pctX(430) }}
        >
          <Reveal>
            <TitleMask
              src="/figma-assets/titles/tell-me-about.svg"
              width={cqw(389.22)}
              height={cqw(138.04)}
              alt={contactHero.title}
              as={1}
            />
          </Reveal>
        </div>

        {/* Body at y=408, w=596 (Figma 207:1419) */}
        <div
          className="absolute text-center text-cream"
          style={{ left: pctX(422), top: pctY(408), width: pctX(596) }}
        >
          <Reveal delay={0.08}>
            <p style={{ fontSize: cqw(17), lineHeight: 1.33 }}>
              {contactHero.body}
            </p>
          </Reveal>
        </div>

        {/* LEFT — MANUFAKTURA editorial (Clip path group 218:17739):
            x=0 y=244 w=258 h=356. */}
        <Reveal delay={0.12}>
          <div
            className="absolute"
            style={{ left: pctX(0), top: pctY(244), width: pctX(258), height: pctY(356) }}
          >
            <Image
              src="/figma-assets/contact/hero-left.png"
              alt="MANUFAKTURA Studio brand collateral"
              fill
              sizes="258px"
              quality={90}
              preload
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* RIGHT — LAVABO editorial carousel (Component 6 218:12494): x=1066
            y=642 w=374 h=249. Direct child of the stage (see file header) so
            its % coords resolve against the full 1440×812 stage, not a
            nested container. */}
        <Reveal delay={0.16}>
          <div
            data-lavabo-carousel
            className="absolute overflow-hidden"
            style={{ left: pctX(1066), top: pctY(642), width: pctX(374), height: pctY(249) }}
          >
            <LavaboCarousel />
          </div>
        </Reveal>

        {/* Down arrow scroll cue at x=684 y=642 (72×94 in Figma). Direct
            child of the stage — same containing-block reasoning as the
            carousel above. */}
        <div
          data-scroll-cue
          className="absolute text-cream"
          style={{ left: pctX(684), top: pctY(642), width: cqw(72), height: cqw(94) }}
          aria-hidden
        >
          <BouncingArrow direction="down" size={cqw(72)} />
        </div>
      </div>
    </section>
  );
}

/*
  Crossfading 3-frame carousel for the LAVABO editorial tile in the hero.
  All three source artboards are 1527×1018 (aspect 1.5), matching the
  374×249 container, so object-cover renders without cropping. Cadence and
  rendering pattern are preserved exactly from the legacy component.
*/
const LAVABO_SLIDES = [
  { src: "/figma-assets/contact/hero-right-1.png", alt: "LAVABO concrete basin editorial" },
  { src: "/figma-assets/contact/hero-right-2.png", alt: "LAVABO logotype construction" },
  { src: "/figma-assets/contact/hero-right-3.png", alt: "LAVABO stacked colored basins" },
];
const LAVABO_INTERVAL_MS = 1400;

function LavaboCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % LAVABO_SLIDES.length),
      LAVABO_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, []);
  return (
    <>
      {LAVABO_SLIDES.map((s, i) => (
        <Image
          key={s.src}
          data-lavabo-frame
          src={s.src}
          alt={i === index ? s.alt : ""}
          fill
          sizes="374px"
          quality={90}
          preload={i === 0}
          loading={i === 0 ? undefined : "eager"}
          className={`absolute inset-0 object-cover transition-opacity duration-[220ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        />
      ))}
    </>
  );
}
