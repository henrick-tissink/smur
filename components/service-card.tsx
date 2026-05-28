import type { Service } from "@/content/home";
import { Dropdown } from "./dropdown";
import { FigmaImage } from "./figma-image";
import { Reveal } from "./reveal";
import { TitleMask } from "./title-mask";

/*
  Service card layout matches Figma SERVICES sub-sections.
  Each section: 1440 wide, ~700 tall.
  Brand identity: text left (Frame 26 x=220 y=133), image right (kokoP x=775 y=130)
  Naming: image left, text right (Frame 22 x=774, Group 4 x=219)
*/
export function ServiceCard({ service }: { service: Service }) {
  const text = (
    <div className="w-[430px]">
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
          <div className="mt-[12px] text-ink">
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
          <h2 className="mt-[12px] font-heading text-[58px] leading-[1.21] text-ink">
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
              <Dropdown key={d.label} label={d.label} body={d.body} />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );

  const image = (
    <Reveal delay={0.1}>
      <div className="relative" style={{ width: service.frameWidth, height: service.frameHeight }}>
        <FigmaImage
          src={service.image.src}
          alt={service.image.alt}
          intrinsicWidth={service.image.intrinsicWidth}
          intrinsicHeight={service.image.intrinsicHeight}
          width={service.frameWidth}
          height={service.frameHeight}
          crop={service.crop}
        />
        {service.overlay && (
          <img
            src={service.overlay.src}
            alt=""
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              left: service.overlay.left,
              top: service.overlay.top,
              width: service.overlay.width,
              height: service.overlay.height,
            }}
          />
        )}
      </div>
    </Reveal>
  );

  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      data-nav-scheme="dark"
      className="mx-auto max-w-[1440px] px-[220px] py-[130px]"
    >
      <div className="flex items-start justify-between gap-[120px]">
        {service.reversed ? (
          <>
            {image}
            {text}
          </>
        ) : (
          <>
            {text}
            {image}
          </>
        )}
      </div>
    </section>
  );
}
