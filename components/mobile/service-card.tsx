import type { Service } from "@/content/home";
import { FigmaImage } from "../figma-image";
import { Reveal } from "../reveal";
import { TitleMask } from "../title-mask";
import { MobileDropdown } from "./dropdown";

// Mobile service titles are 45px vs the desktop SVG export's 58px, so each
// brand-font title SVG is scaled by this ratio (preserving its line-breaks).
const MOBILE_TITLE_SCALE = 45 / 58;

/*
  Mobile service card — fixed-height container with absolutely positioned children
  matching the Figma layout exactly. Per Figma metadata:

  Brand identity (Frame 27 at y=923):
    - Eyebrow at y=0,    h=11   "full service"
    - Title   at y=36,   h=121  "Brand identity"
    - Body    at y=113   (inside Group 75), h=155
    - Dropdowns Component 4 at y=275, h=79
    - KOKOP image at y=425 (absolute 1348), w=307 h=401

  Section height = 826 (text+image total span: 923→1749).

  Naming & Positioning (Group 76 at y=1820):
    Same structure but with image FIRST (CRISP at y=479 within section).

  We render via a single configurable layout: a 826/877-tall container with
  absolutely positioned text and image blocks. The image-position prop chooses
  whether the image sits below (Brand identity) or interleaves with text.
*/

type Layout = {
  textTop: number; // y of eyebrow within the section
  bodyTop: number; // y of body within the section
  dropdownsTop: number; // y of dropdowns within the section (only if dropdowns)
  imageTop: number;
  imageWidth: number;
  imageHeight: number;
  sectionHeight: number;
};

const layoutByService: Record<string, Layout> = {
  "brand-identity": {
    textTop: 0,
    bodyTop: 113,
    dropdownsTop: 275,
    imageTop: 425, // 1348 - 923
    imageWidth: 307,
    imageHeight: 401,
    sectionHeight: 826, // 1749 - 923
  },
  "naming-positioning": {
    // Group 76 at y=1820 (section). CRISP image at 2299 (rel 479). Section to 2696 (h=876).
    textTop: 0,
    bodyTop: 167,
    dropdownsTop: 329,
    imageTop: 479,
    imageWidth: 306,
    imageHeight: 397,
    sectionHeight: 876,
  },
};

// Collapsed height of the two-row mobile dropdown stack (DETAILS + TIMELINE),
// measured from the rendered component (59px/row). Used to place the image
// directly under the collapsed dropdowns so the collapsed layout still matches
// Figma's image y, while the in-flow dropdowns let expansion push it down.
const DROPDOWN_STACK_H = 119;

export function MobileServiceCard({ service }: { service: Service }) {
  const layout = layoutByService[service.id];
  if (!layout) return null;

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
      aria-labelledby={`m-${service.id}-title`}
      data-nav-scheme="dark"
      className="relative mx-auto"
      style={{ width: "393px" }}
    >
      {/* Eyebrow + title + body stay absolute (they sit above the dropdowns and
          never need to reflow). The dropdowns + image are in NORMAL FLOW below
          (paddingTop anchors them at the Figma dropdowns y), so opening a
          dropdown grows the section and pushes the image — and every section
          below — down, instead of overlapping. Section height is auto and
          equals the collapsed Figma height (imageTop + imageHeight). */}
      {/* Text block: eyebrow + title at top */}
      <div
        className="absolute"
        style={{ left: "43px", top: `${layout.textTop}px`, width: "308px" }}
      >
        <Reveal>
          <span
            className="block font-sans italic text-accent"
            style={{ fontSize: "15px", lineHeight: 1 }}
          >
            {service.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          {service.titleSvg ? (
            <div id={`m-${service.id}-title`} className="mt-[25px] text-ink">
              <TitleMask
                src={service.titleSvg.src}
                width={service.titleSvg.width * MOBILE_TITLE_SCALE}
                height={service.titleSvg.height * MOBILE_TITLE_SCALE}
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
              id={`m-${service.id}-title`}
              className="mt-[25px] font-heading text-ink"
              style={{ fontSize: "45px", lineHeight: 1.21, whiteSpace: "pre-line" }}
            >
              {service.title}
            </h2>
          )}
        </Reveal>
      </div>

      {/* Body block */}
      <div
        className="absolute"
        style={{ left: "43px", top: `${layout.bodyTop}px`, width: "308px" }}
      >
        <Reveal delay={0.1}>
          <p className="text-ink" style={{ fontSize: "15px", lineHeight: 1.33 }}>
            {service.body}
          </p>
        </Reveal>
      </div>

      {/* Dropdowns + image — IN FLOW. paddingTop anchors the stack at the Figma
          dropdowns y; the image follows with `imageGap` so collapsed it lands
          at the Figma image y. Opening a dropdown grows this block → grows the
          (auto-height) section → pushes everything below down. */}
      <div style={{ paddingTop: `${layout.dropdownsTop}px` }}>
        {hasDropdowns && (
          <div style={{ marginLeft: "45px", width: "307px" }}>
            <Reveal delay={0.15}>
              {service.dropdowns.map((d) => (
                <MobileDropdown key={d.label} label={d.label} body={d.body} />
              ))}
            </Reveal>
          </div>
        )}
        <div style={{ marginLeft: "43px", marginTop: `${imageGap}px` }}>
          <Reveal delay={0.2}>
            <div
              className="relative"
              style={{ width: layout.imageWidth, height: layout.imageHeight }}
            >
              <FigmaImage
                src={service.image.src}
                alt={service.image.alt}
                intrinsicWidth={service.image.intrinsicWidth}
                intrinsicHeight={service.image.intrinsicHeight}
                width={layout.imageWidth}
                height={layout.imageHeight}
                crop={service.crop}
              />
              {service.overlay && (
                <img
                  src={service.overlay.src}
                  alt=""
                  aria-hidden
                  className="absolute pointer-events-none"
                  style={{
                    /* Scale overlay relative to desktop's 432×560 reference frame */
                    left: `${(service.overlay.left / 432) * layout.imageWidth}px`,
                    top: `${(service.overlay.top / 560) * layout.imageHeight}px`,
                    width: `${(service.overlay.width / 432) * layout.imageWidth}px`,
                    height: `${(service.overlay.height / 560) * layout.imageHeight}px`,
                  }}
                />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
