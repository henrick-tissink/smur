import { ctaButton, services, servicesList } from "@/content/home";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";

// Mobile service title is 45px vs the desktop SVG export's 58px.
const MOBILE_TITLE_SCALE = 45 / 58;

/** Native stage width the layout px values below were measured against —
 *  same convention as MobileServiceSection: the stage has no fixed
 *  aspect-ratio (auto height), so both axes convert to `cqw`. */
const STAGE_W = 393;
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

/*
  Faithful-fluid MobileServicesListSection — ported from
  components/mobile/services-list.tsx.

  Mobile Webdesign — Group 77 (text) + Frame 78 (list) + BUTTON 2 (CTA).
  Per Figma metadata (absolute y in home mobile), relative to the section
  (subtracting 2767):
    - Text block top: 0     (eyebrow "more.more.more." + title, body at 167)
    - List top: 329
    - Button top: 491

  The CTA stays the legacy MOBILE treatment (a distinct Figma component from
  the desktop foundation Button): a plain inline `<a>` with the mobile
  button-arrow.svg and `hover:opacity-80`. Reveal delays (0, .05, .1, .15,
  .2) are preserved unchanged.
*/
export function MobileServicesListSection() {
  const service = services[2];
  const titleId = `${service.id}-title`;

  return (
    <section
      id={service.id}
      aria-labelledby={titleId}
      data-nav-scheme="dark"
      className="w-full"
    >
      <div
        data-services-list-stage
        className="relative mx-auto w-full max-w-[393px]"
        style={{ containerType: "inline-size" }}
      >
        <div
          className="absolute"
          style={{ left: cqw(42), top: cqw(0), width: cqw(308) }}
        >
          <Reveal>
            <span
              className="block font-sans italic text-accent"
              style={{ fontSize: cqw(15), lineHeight: 1 }}
            >
              {service.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            {service.titleSvg ? (
              <div id={titleId} className="text-ink" style={{ marginTop: cqw(25) }}>
                <TitleMask
                  src={service.titleSvg.src}
                  width={cqw(service.titleSvg.width * MOBILE_TITLE_SCALE)}
                  height={cqw(service.titleSvg.height * MOBILE_TITLE_SCALE)}
                  leftBearing={
                    service.titleSvg.leftBearing
                      ? service.titleSvg.leftBearing * MOBILE_TITLE_SCALE
                      : undefined
                  }
                  alt={service.title}
                  as={2}
                />
              </div>
            ) : (
              <h2
                id={titleId}
                className="font-heading text-ink"
                style={{ marginTop: cqw(25), fontSize: cqw(45), lineHeight: 1.21 }}
              >
                {service.title}
              </h2>
            )}
          </Reveal>
        </div>

        <div
          className="absolute"
          style={{ left: cqw(42), top: cqw(167), width: cqw(308) }}
        >
          <Reveal delay={0.1}>
            <p className="text-ink" style={{ fontSize: cqw(15), lineHeight: 1.33 }}>
              {service.body}
            </p>
          </Reveal>
        </div>

        <div
          className="absolute"
          style={{ left: cqw(42), top: cqw(329), width: cqw(194) }}
        >
          <Reveal delay={0.15}>
            <ul
              className="italic text-accent"
              style={{
                fontSize: cqw(15),
                lineHeight: 1,
                display: "flex",
                flexDirection: "column",
                gap: cqw(15),
              }}
            >
              {servicesList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="absolute" style={{ left: cqw(42), top: cqw(491) }}>
          <Reveal delay={0.2}>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full border-accent no-underline transition-opacity hover:opacity-80"
              style={{
                gap: cqw(6),
                borderWidth: cqw(1.444),
                borderStyle: "solid",
                paddingLeft: cqw(24),
                paddingRight: cqw(24),
                paddingTop: cqw(6),
                paddingBottom: cqw(6),
                color: "#a18080",
              }}
            >
              <span className="font-sans" style={{ fontSize: cqw(19.51), lineHeight: 1.21 }}>
                {ctaButton}{" "}
              </span>
              <img
                src="/figma-assets/mobile/button-arrow.svg"
                alt=""
                aria-hidden
                style={{ width: cqw(40), height: cqw(14) }}
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
