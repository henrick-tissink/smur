import Image from "next/image";
import { ctaButton, services, servicesList } from "@/content/home";
import { Reveal } from "./reveal";
import { TitleMask } from "./title-mask";

/*
  Third service section: Webdesign, Print & More.
  Frame 79 (text): x=218 y=1881 width=425 height=258
  Frame 78 (list): x=218 y=2183 width=194 height=142
  BUTTON: x=218 y=2368 width=318
  Right column: LAVABO photo (replaces the vector brand-book mockup per the
  May 2026 client feedback round).
*/
export function ServicesList() {
  const service = services[2];
  return (
    <section
      id="webdesign-print"
      aria-labelledby="webdesign-title"
      data-nav-scheme="dark"
      className="mx-auto max-w-[1440px] px-[220px] py-[130px]"
    >
      <div className="flex items-start justify-between gap-[120px]">
        <div className="w-[430px]">
          <Reveal>
            <span className="eyebrow">{service.eyebrow}</span>
          </Reveal>
          {/*
            Spacings match Figma Frame 79 (261:1884) and the y-coords of the
            sibling list/button: header gap-25 (Frame 23), header→body gap-35
            (Frame 27), body→list gap ≈44 box, list→button gap ≈43 box. The
            mt-* below trim those by ~12px each to compensate for the SVG
            title's ascender/descender padding and the body's line-box bleed,
            so the rendered visual gaps land at Figma's intent.
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
              <h2
                id="webdesign-title"
                className="mt-[12px] font-heading text-[58px] leading-[1.21] text-ink"
              >
                {service.title}
              </h2>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-[24px] max-w-[425px] text-[17px] leading-[1.33] text-ink">
              {service.body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-[32px] space-y-[15px] text-[17px] italic text-accent">
              {servicesList.map((item) => (
                // text-box-trim matches Figma Frame 78 items (208:12266) so the
                // 15px gap is between the trimmed cap-to-baseline boxes, not
                // between line-boxes (which would render visually ~22px).
                <li
                  key={item}
                  className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="mt-[32px]">
            <CtaButton href="/contact">{ctaButton}</CtaButton>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="relative overflow-hidden"
            style={{ width: service.frameWidth, height: service.frameHeight }}
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              width={service.image.intrinsicWidth}
              height={service.image.intrinsicHeight}
              unoptimized
              className="block h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/*
  Shared CTA button — "LET'S WORK TOGETHER" pill on light backgrounds.
  Matches Figma BUTTON 208:12249 exactly:
   - geometry: px-[24.548px] py-[5.776px] gap-[6.498px] rounded-[18.05px]
   - label: DM Sans Regular 20.22px, no letter-spacing, color #a18080
   - border: 1.444px solid #a98a8a
   - arrow: "Union" SVG (41.503 × 14.11 wide horizontal arrow, /figma-assets/
     arrows/cta-union.svg) recolored via CSS mask so it follows the text color
     for both ink and cream variants.
*/
export function CtaButton({
  href,
  children,
  variant = "ink",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ink" | "cream";
}) {
  const isInk = variant === "ink";
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-[6.498px] rounded-[18.05px] border-[1.444px] px-[24.548px] py-[5.776px] text-[20.22px] uppercase leading-[1.21] transition-colors ${
        isInk
          ? "border-[#a98a8a] text-[#a18080] hover:bg-ink hover:text-cream"
          : "border-cream/70 text-cream hover:bg-cream hover:text-ink"
      }`}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="block shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        style={{
          width: "41.503px",
          height: "14.11px",
          WebkitMaskImage: "url(/figma-assets/arrows/cta-union.svg)",
          maskImage: "url(/figma-assets/arrows/cta-union.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          backgroundColor: "currentColor",
        }}
      />
    </a>
  );
}
