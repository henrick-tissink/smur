import type { Service } from "@/content/home";
import { FigmaImage } from "@/components/figma-image";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";
import { MobileServiceAccordion } from "@/components/sections/mobile-service-accordion";

// Mobile service titles are 45px vs the desktop SVG export's 58px, so each
// brand-font title SVG is scaled by this ratio (preserving its line-breaks).
const MOBILE_TITLE_SCALE = 45 / 58;

/*
  Faithful-fluid MobileServiceSection — ported from
  components/mobile/service-card.tsx.

  Stage = a `mx-auto w-full max-w-[393px]` container-query box (like
  MobileHero's stage), but UNLIKE the hero it has no fixed aspect-ratio: the
  accordion below needs to be able to grow the section's height when opened,
  so height stays `auto`. Because there's no fixed aspect box, percentages
  can't be used for the Y axis (percent-of-auto-height resolves to nothing) —
  so every length (X *and* Y, plus font sizes) that was measured against the
  legacy's fixed 393px stage converts to `cqw` instead (cqw = 1% of the
  container's inline size, i.e. the same "% of 393" math, just usable on any
  axis). See `cqw()` below.

  Per Figma metadata (unchanged from the legacy):

  Brand identity (Frame 27 at y=923):
    - Eyebrow at y=0,    h=11   "full service"
    - Title   at y=36,   h=121  "Brand identity"
    - Body    at y=113   (inside Group 75), h=155
    - Dropdowns Component 4 at y=275, h=79
    - KOKOP image at y=425 (absolute 1348), w=307 h=401

  Naming & Positioning (Group 76 at y=1820):
    Same structure but with image FIRST (CRISP at y=479 within section).

  Exactly like the legacy: the eyebrow/title/body text blocks are absolutely
  positioned (they sit above the dropdowns and never need to reflow); the
  dropdowns + image are rendered in NORMAL FLOW below (paddingTop anchors them
  at the Figma dropdowns y), so opening a dropdown grows the flow block and
  pushes the image (and everything below it) down instead of overlapping.
  Reveal delays (0, .05, .1, .15, .2) are preserved unchanged.
*/

type Layout = {
  textTop: number; // y of eyebrow within the section
  bodyTop: number; // y of body within the section
  dropdownsTop: number; // y of dropdowns within the section (only if dropdowns)
  imageTop: number;
  imageWidth: number;
  imageHeight: number;
};

const layoutByService: Record<string, Layout> = {
  // Figma dropdownsTop/imageTop were 275/425 and 329/479; both pulled up by a
  // per-card delta (18 / 38) to tighten the body→dropdowns gap to ~24px (June
  // 2026 client request). Image moves up with the dropdowns so the
  // dropdowns→image spacing is unchanged.
  "brand-identity": {
    textTop: 0,
    bodyTop: 113,
    dropdownsTop: 257, // was 275
    imageTop: 407, // was 425 (1348 - 923)
    imageWidth: 307,
    imageHeight: 401,
  },
  "naming-positioning": {
    textTop: 0,
    bodyTop: 167,
    dropdownsTop: 291, // was 329
    imageTop: 441, // was 479
    imageWidth: 306,
    imageHeight: 397,
  },
};

// Collapsed height of the two-row mobile dropdown stack (DETAILS + TIMELINE),
// measured from the rendered component (59px/row). Used to place the image
// directly under the collapsed dropdowns so the collapsed layout still matches
// Figma's image y, while the in-flow dropdowns let expansion push it down.
const DROPDOWN_STACK_H = 119;

/** Native stage width the layout px values above were measured against. */
const STAGE_W = 393;

/** Converts a px length on the STAGE_W stage to a `cqw` (percent-of-container-
 *  inline-size) length string, usable on either axis since the stage has no
 *  fixed aspect-ratio / block size. */
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function MobileServiceSection({ service }: { service: Service }) {
  const layout = layoutByService[service.id];
  if (!layout) return null;

  const titleId = `m-${service.id}-title`;
  const hasDropdowns = service.dropdowns.length > 0;
  // Gap from the bottom of the (collapsed) dropdowns to the image so the image
  // lands at its Figma y. When a dropdown expands, the flow below it shifts.
  const imageGap =
    layout.imageTop -
    layout.dropdownsTop -
    (hasDropdowns ? DROPDOWN_STACK_H : 0);

  return (
    <section
      id={`m-${service.id}`}
      aria-labelledby={titleId}
      data-nav-scheme="dark"
      className="w-full"
    >
      <div
        data-service-stage
        className="relative mx-auto w-full max-w-[393px]"
        style={{ containerType: "inline-size" }}
      >
        {/* Text block: eyebrow + title at top */}
        <div
          className="absolute"
          style={{ left: cqw(43), top: cqw(layout.textTop), width: cqw(308) }}
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
                style={{
                  marginTop: cqw(25),
                  fontSize: cqw(45),
                  lineHeight: 1.21,
                  whiteSpace: "pre-line",
                }}
              >
                {service.title}
              </h2>
            )}
          </Reveal>
        </div>

        {/* Body block */}
        <div
          className="absolute"
          style={{ left: cqw(43), top: cqw(layout.bodyTop), width: cqw(308) }}
        >
          <Reveal delay={0.1}>
            <p className="text-ink" style={{ fontSize: cqw(15), lineHeight: 1.33 }}>
              {service.body}
            </p>
          </Reveal>
        </div>

        {/* Dropdowns + image — IN FLOW. paddingTop anchors the stack at the
            Figma dropdowns y (expressed in cqw); the image follows with
            `imageGap` so collapsed it lands at the Figma image y. Opening a
            dropdown grows this block → grows the (auto-height) stage →
            pushes everything below down, exactly like the legacy. */}
        <div style={{ paddingTop: cqw(layout.dropdownsTop) }}>
          {hasDropdowns && (
            <div style={{ marginLeft: cqw(45), width: cqw(307) }}>
              <Reveal delay={0.15}>
                {service.dropdowns.map((d) => (
                  <MobileServiceAccordion key={d.label} label={d.label} body={d.body} />
                ))}
              </Reveal>
            </div>
          )}
          <div style={{ marginLeft: cqw(43), marginTop: cqw(imageGap) }}>
            <Reveal delay={0.2}>
              <div className="relative" style={{ width: cqw(layout.imageWidth) }}>
                <FigmaImage
                  src={service.image.src}
                  alt={service.image.alt}
                  intrinsicWidth={service.image.intrinsicWidth}
                  intrinsicHeight={service.image.intrinsicHeight}
                  width={layout.imageWidth}
                  height={layout.imageHeight}
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
                      /* Percent of the service's Figma frame — matches the
                         desktop ServiceSection's overlay math exactly (the
                         overlay coords in content/home.ts are calibrated
                         against frameWidth/frameHeight, not the mobile
                         imageWidth/imageHeight, so the same ratio applies
                         regardless of the mobile frame's own px size). */
                      left: `${(service.overlay.left / service.frameWidth) * 100}%`,
                      top: `${(service.overlay.top / service.frameHeight) * 100}%`,
                      width: `${(service.overlay.width / service.frameWidth) * 100}%`,
                      height: `${(service.overlay.height / service.frameHeight) * 100}%`,
                    }}
                  />
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
