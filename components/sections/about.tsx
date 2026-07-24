import { useTranslations } from "next-intl";
import { about } from "@/content/home";
import { FigmaImage } from "@/components/figma-image";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";

/*
  Faithful-fluid About. Ported from components/about.tsx.

  Stage = aspect-ratio 1440/971 container-query box; the legacy 1440-px
  composition (bg-[#906553] warm brown, positioning frame at left 218/top 133/
  w 981/h 728 with title/body/portrait/socials absolutely placed inside it) is
  expressed in % (positions) and cqw (type + TitleMask size) so it scales with
  viewport width — no zoom. The frame's own offset (218, 133) is folded into
  each child's stage-absolute % so there's no intermediate positioned frame.
  Reveal wrappers/delays (title 0, body 0.08, portrait 0.15, socials 0.2) and
  body copy are preserved unchanged from the legacy component — only px→%/cqw
  units differ.

  Native coords (1440×971 stage, frame offset already folded in):
  title left=218 top=133, header.svg-equivalent about.svg 273.84×220.43;
  body left=775 top=133 width=424, 17px/1.33; portrait left=775 top=492
  294×294 square; socials left=775 top=847 width=361, 20px italic.
*/

/** Native about stage the px coordinates below were measured against. */
const STAGE_W = 1440;
const STAGE_H = 971;

/** Converts a px value on the STAGE_W×STAGE_H stage to a CSS percentage string. */
function pctX(px: number) {
  return `${(px / STAGE_W) * 100}%`;
}
function pctY(px: number) {
  return `${(px / STAGE_H) * 100}%`;
}

export function About() {
  const t = useTranslations("About");
  // The message body is one plain string; the legacy JSX renders it as three
  // <p> paragraphs (separated by a blank line in the Figma copy). Split on
  // runs of 2+ whitespace to recover the same three paragraphs, and swap the
  // straight apostrophes from the extracted message for the typographic ’
  // the design uses (matches the pre-i18n hardcoded JSX).
  const bodyParagraphs = t("body")
    .split(/\s{2,}/)
    .map((p) => p.replace(/'/g, "’"));

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      data-nav-scheme="light"
      className="w-full"
      style={{ backgroundColor: "var(--color-about)" }}
    >
      <div
        data-about-stage
        className="relative mx-auto w-full max-w-[1440px]"
        style={{ aspectRatio: "1440 / 971", containerType: "inline-size" }}
      >
        <Reveal>
          <div
            id="about-title"
            className="absolute text-cream"
            style={{ left: pctX(218), top: pctY(133) }}
          >
            <TitleMask
              src="/figma-assets/titles/about.svg"
              width="19.02cqw" /* 273.84/1440 */
              height="15.31cqw" /* 220.43/1440 */
              leftBearing={6}
              alt={t("heading")}
              as={2}
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="absolute text-cream"
            style={{ left: pctX(775), top: pctY(133), width: pctX(424) }}
          >
            {bodyParagraphs.map((p, i) => (
              <p
                key={i}
                className={i > 0 ? "mt-[1em]" : undefined}
                style={{ fontSize: "1.18cqw" /* 17/1440 */, lineHeight: 1.33 }}
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="absolute"
            style={{
              left: pctX(775),
              top: pctY(492),
              width: "20.42cqw" /* 294/1440 */,
            }}
          >
            <FigmaImage
              src={about.portrait.image.src}
              alt={about.portrait.image.alt}
              intrinsicWidth={about.portrait.image.intrinsicWidth}
              intrinsicHeight={about.portrait.image.intrinsicHeight}
              width={about.portrait.frameWidth}
              height={about.portrait.frameHeight}
              crop={about.portrait.crop}
              fluid
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="absolute font-sans italic leading-normal text-white"
            style={{
              left: pctX(775),
              top: pctY(847),
              width: pctX(361),
              fontSize: "1.39cqw" /* 20/1440 */,
            }}
          >
            <a
              href="https://www.instagram.com/smurstudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              INSTAGRAM
            </a>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <a
              href="https://ro.pinterest.com/smurstudio/_saved/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              PINTEREST
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
