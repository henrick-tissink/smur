import type { Service } from "@/content/home";
import { FigmaImage } from "@/components/figma-image";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";
import { ServiceAccordion } from "./service-accordion";

/*
  Faithful-fluid ServiceSection — ported from components/service-card.tsx.

  Legacy `ServiceCard` renders one SERVICES sub-section at fixed 1440-px
  coordinates (px-[220px]/py-[130px] section padding, gap-[120px] row,
  w-[430px] text column, fixed-px image frame). This component reproduces the
  same content, Reveal choreography, and TitleMask/overlay usage, but expressed
  fluidly so it scales continuously with viewport width instead of zooming a
  fixed 1440 composition:

  - Section padding uses the shared --gutter / --space-section tokens (see
    app/styles/spacing.css) instead of hardcoded px.
  - The row is `flex flex-col` (stacked, text-then-image in DOM) below `md:`,
    and becomes `md:flex-row` with a fluid `clamp()` gap at/above it.
    `service.reversed` only flips visual order at `md:` via
    `md:flex-row-reverse` — DOM order (text first) never changes, so a
    stacked mobile/tablet reader always gets text before image regardless of
    which service it is.
  - The image uses `<FigmaImage fluid />` (Task 1) inside a wrapper capped at
    the Figma frame's native width (`maxWidth: service.frameWidth`) so it
    never renders larger than the source composition, and `service.overlay`
    (CRISP wordmark) is positioned as a percentage of the frame so it tracks
    the image's fluid scaling instead of drifting at fixed px.
  - Both columns are `md:flex-1 md:min-w-0` (not `shrink-0`) so the row
    compresses to fit any viewport ≥768px instead of overflowing — two
    ~430px non-shrinking columns + gap only fit at ~1340px+. The text column
    caps at `md:max-w-[430px]` and the image wrapper's inner element caps at
    `maxWidth: service.frameWidth`, so at 1440px both still render at their
    Figma design size with `justify-between` pushing them to the row edges.
*/
export function ServiceSection({ service }: { service: Service }) {
  const titleId = `${service.id}-title`;

  const text = (
    <div className="w-full md:min-w-0 md:max-w-[430px] md:flex-1">
      <Reveal>
        <span className="eyebrow">{service.eyebrow}</span>
      </Reveal>
      {/*
        Figma Frame 27 (1:710) gap-35 between header and body, gap-25 inside
        the header. Figma uses text-box-trim / fixed h-[51px] on the title,
        but the exported TitleMask SVG is 69.43px tall (font ascender +
        descender baked in, ~12px each side). The mt-* values below are the
        Figma gaps minus that vertical padding so the rendered visual gaps
        match Figma — otherwise the section reads with ~18px of extra space.
      */}
      <Reveal delay={0.05}>
        {service.titleSvg ? (
          <div id={titleId} className="mt-[12px] text-ink">
            <TitleMask
              src={service.titleSvg.src}
              width={service.titleSvg.width}
              height={service.titleSvg.height}
              leftBearing={service.titleSvg.leftBearing}
              alt={service.title}
              as={2}
            />
          </div>
        ) : (
          <h2 id={titleId} className="mt-[12px] font-heading text-[58px] leading-[1.21] text-ink">
            {service.title}
          </h2>
        )}
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-[24px] max-w-[430px] text-[17px] leading-[1.33] text-ink">
          {service.body}
        </p>
      </Reveal>
      {service.dropdowns.length > 0 && (
        <Reveal delay={0.15} className="mt-[32px]">
          <div>
            {service.dropdowns.map((d) => (
              <ServiceAccordion key={d.label} label={d.label} body={d.body} />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );

  const image = (
    <Reveal delay={0.1} className="w-full md:min-w-0 md:flex-1">
      <div
        className="relative mx-auto"
        style={{ width: "100%", maxWidth: service.frameWidth }}
      >
        <FigmaImage
          src={service.image.src}
          alt={service.image.alt}
          intrinsicWidth={service.image.intrinsicWidth}
          intrinsicHeight={service.image.intrinsicHeight}
          width={service.frameWidth}
          height={service.frameHeight}
          crop={service.crop}
          fluid
        />
        {service.overlay && (
          <img
            src={service.overlay.src}
            alt=""
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: `${(service.overlay.left / service.frameWidth) * 100}%`,
              top: `${(service.overlay.top / service.frameHeight) * 100}%`,
              width: `${(service.overlay.width / service.frameWidth) * 100}%`,
              height: `${(service.overlay.height / service.frameHeight) * 100}%`,
            }}
          />
        )}
      </div>
    </Reveal>
  );

  return (
    <section
      id={service.id}
      aria-labelledby={titleId}
      data-nav-scheme="dark"
      className="mx-auto max-w-[1440px]"
      style={{
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <div
        className={`flex flex-col gap-[clamp(40px,6vw,120px)] md:flex-row md:items-start md:justify-between ${
          service.reversed ? "md:flex-row-reverse" : ""
        }`}
      >
        {text}
        {image}
      </div>
    </section>
  );
}
