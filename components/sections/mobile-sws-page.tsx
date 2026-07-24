import Image from "next/image";
import { useTranslations } from "next-intl";
import { sws } from "@/content/sws";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid mobile SWS (Sassy Woman Society) case study — full
  desktop parity (June 2026). Ported from components/mobile/sws-page.tsx
  (MobileSwsCaseStudy) to Recipe B (container-query flow): the legacy
  root was a fixed `width: "393px"` canvas scaled by the route's `zoom`
  wrapper; here the root is a fluid `w-full` box with
  `containerType: "inline-size"` and every fixed px value (paddingTop,
  section padding/margin/gap, font sizes) expressed as `mcqw(N)` on the
  393-wide legacy basis, so `1cqw` == 1% of the root's rendered width —
  reproducing the old zoom's proportional scaling without a transform.

  content/sws.ts has no `swsFrame.mobile`, so M_W = 393 (the legacy
  mobile canvas width) per the task brief.

  Desktop wraps each capture in a colored panel (the hero/middle/bottom
  bg SVGs are solid fills: #E4E4E4 / #352C4F / #E4E4E4) with the image
  inset; reproduced here with panel divs and the same section-relative
  insets. Panel/aspectRatio/%-insets/Reveal/images are unchanged from
  the legacy component.
*/

const M_W = 393; // legacy mobile canvas width

function mcqw(px: number) {
  return `${(px / M_W) * 100}cqw`;
}

const PANELS = [
  {
    bg: "#E4E4E4",
    aspect: "898.58 / 616.41",
    img: { src: "/figma-assets/work/sws/hero-image.gif", w: 1920, h: 1082, alt: "Sassy Woman Society site" },
    inset: { left: "3.59%", top: "11.53%", width: "94.02%", height: "77.23%" },
  },
  {
    bg: "#352C4F",
    aspect: "898.58 / 2010.67",
    img: { src: "/figma-assets/work/sws/middle-image.png", w: 960, h: 3914, alt: "Sassy Woman Society mobile layout" },
    inset: { left: "25.85%", top: "6.04%", width: "49.14%", height: "89.54%" },
  },
  {
    bg: "#E4E4E4",
    aspect: "898.58 / 656.36",
    img: { src: "/figma-assets/work/sws/bottom-image.png", w: 1921, h: 1409, alt: "Sassy Woman Society event" },
    inset: { left: "7.86%", top: "7.01%", width: "85.51%", height: "85.87%" },
  },
];

export function MobileSwsCaseStudy() {
  const t = useTranslations("CaseStudies.sws");
  return (
    <div
      data-nav-scheme="dark"
      className="mx-auto w-full"
      style={{
        containerType: "inline-size",
        backgroundColor: "#fff7f4",
        paddingTop: mcqw(100), // was 100px
      }}
    >
      {/* Hero panel — projects open on an image. */}
      <Reveal eager>
        <Panel {...PANELS[0]} priority />
      </Reveal>

      {/* Readable intro. */}
      <Reveal eager>
        <div
          className="text-center"
          style={{ paddingLeft: mcqw(43), paddingRight: mcqw(43), paddingTop: mcqw(36), paddingBottom: mcqw(36) }}
        >
          <p
            className="font-sans uppercase text-ink"
            style={{ fontSize: mcqw(26), lineHeight: 1.05, letterSpacing: "0.01em" }}
          >
            {t("eyebrow")}
          </p>
          <div
            className="text-ink"
            style={{ marginTop: mcqw(20), fontSize: mcqw(15), lineHeight: 1.45 }}
          >
            {t("body").split("\n\n").map((p, i) => (
              <p key={i} style={{ margin: 0, marginTop: i === 0 ? 0 : "1em" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Middle + bottom panels in desktop order. */}
      <div className="flex flex-col" style={{ gap: mcqw(12), paddingBottom: mcqw(24) }}>
        <Reveal eager>
          <Panel {...PANELS[1]} />
        </Reveal>
        <Reveal eager>
          <Panel {...PANELS[2]} />
        </Reveal>
      </div>
    </div>
  );
}

function Panel({
  bg,
  aspect,
  img,
  inset,
  priority,
}: (typeof PANELS)[number] & { priority?: boolean }) {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: aspect, backgroundColor: bg }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        unoptimized
        priority={priority}
        className="absolute object-cover"
        style={{ ...inset, height: inset.height }}
      />
    </div>
  );
}
