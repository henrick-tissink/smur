import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/core";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";
import { ctaButton, services, servicesList } from "@/content/home";

/*
  Faithful-fluid ServicesListSection — ported from components/services-list.tsx.

  Renders services[2] ("webdesign-print") in the same fluid responsive shell
  as ServiceSection (Task 1): --gutter/--space-section padding, flex
  flex-col → md:flex-row row. Two differences from ServiceSection:

  - Text column adds the `servicesList` bullet list (italic accent) between
    body and CTA — this service has no dropdowns.
  - CTA is the Phase-1 foundation `Button` (mauve-fill hover + trailing
    arrow), per user decision — NOT the legacy ink-fill CtaButton.
  - Image has a flat crop (w:100 h:100 left:0 top:0, i.e. no Figma percent
    crop), so it's rendered as a plain `next/image` `object-cover` inside a
    fluid aspect-ratio frame (428/593) rather than via `<FigmaImage>`.
*/
export function ServicesListSection() {
  const service = services[2];
  const t = useTranslations(`Services.${service.id}`);
  const titleId = `${service.id}-title`;

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
      <div className="flex flex-col gap-[clamp(40px,6vw,120px)] md:flex-row md:items-start md:justify-between">
        <div className="w-full md:min-w-0 md:max-w-[430px] md:flex-1">
          <Reveal>
            <span className="eyebrow">{t("eyebrow")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            {service.titleSvg ? (
              <div id={titleId} className="mt-[12px] text-ink">
                <TitleMask
                  src={service.titleSvg.src}
                  width={service.titleSvg.width}
                  height={service.titleSvg.height}
                  leftBearing={service.titleSvg.leftBearing}
                  alt={t("title")}
                  as={2}
                />
              </div>
            ) : (
              <h2 id={titleId} className="mt-[12px] font-heading text-[58px] leading-[1.21] text-ink">
                {t("title")}
              </h2>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-[24px] max-w-[425px] text-[17px] leading-[1.33] text-ink">
              {t("body")}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-[32px] space-y-[15px] text-[17px] italic text-accent">
              {servicesList.map((item) => (
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
            <Button href="/contact" trailingArrow>
              {ctaButton}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="w-full md:min-w-0 md:flex-1">
          <div
            className="relative mx-auto overflow-hidden"
            style={{ width: "100%", maxWidth: service.frameWidth, aspectRatio: `${service.frameWidth} / ${service.frameHeight}` }}
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
