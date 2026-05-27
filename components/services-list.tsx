import Image from "next/image";
import { ctaButton, services, servicesList } from "@/content/home";
import { Arrow } from "./arrow";
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
          <Reveal delay={0.05}>
            {service.titleSvg ? (
              <div className="mt-[16px] text-ink">
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
                className="mt-[16px] font-heading text-[58px] leading-[1.21] text-ink"
              >
                {service.title}
              </h2>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-[36px] max-w-[425px] text-[17px] leading-[1.33] text-ink">
              {service.body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-[44px] space-y-[27px] text-[17px] italic text-accent">
              {servicesList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
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
  Type matches Figma BUTTON 208:12249: DM Sans Regular 20.22px, no letter-
  spacing, label #a18080 on a #a98a8a border. Uses the exported SMUR arrow
  asset (rotated right) instead of a unicode →.
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
      className={`group inline-flex items-center gap-[18px] rounded-full border-[1.444px] px-[32px] py-[12px] text-[20.22px] uppercase leading-[1.21] transition-colors ${
        isInk
          ? "border-[#a98a8a] text-[#a18080] hover:bg-ink hover:text-cream"
          : "border-cream/70 text-cream hover:bg-cream hover:text-ink"
      }`}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <Arrow direction="right" size={22} />
      </span>
    </a>
  );
}
