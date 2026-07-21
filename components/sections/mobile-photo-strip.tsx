import Image from "next/image";
import { photos } from "@/content/home";

/*
  Faithful-fluid MobilePhotoStrip. Ported from legacy
  components/mobile/photo-strip.tsx — the 2×2 grid, the reorder (photos 3/4
  top row, 1/2 bottom row), and the 1px row overlap that kills the
  cream-bg hairline (subpixel seam) are all UNCHANGED. Only the layout math
  is fluid:

  - Stage = `mx-auto w-full max-w-[393px]` container-query box (same
    convention as MobileHero/MobileTestimonial), `containerType: inline-size`.
  - The legacy's fixed 197px/196px row heights convert to `cqw` (percent of
    the 393 stage width) via the shared `cqw()` helper — this keeps the grid
    proportioned to the Figma 393×392 composition at any viewport width
    instead of a fixed pixel box.
  - The 1px `marginTop` overlap stays a LITERAL `-1px` (not converted to
    cqw): it's a subpixel rendering fix for a fractional device-pixel
    boundary, not a design measurement — scaling it would defeat the point
    (see feedback_subpixel_seam_image_grids.md).
  - `object-cover` + `unoptimized` unchanged from legacy. NO animation.
*/

/** Native mobile photo-strip stage the px values below were measured against. */
const STAGE_W = 393;

/** Converts a px length on the STAGE_W stage to a `cqw` (percent-of-
 *  container-inline-size) length string. */
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

// Mobile rearranges the grid vs desktop (Figma metadata order):
//   top-left  photo-3   top-right photo-4
//   bot-left  photo-1   bot-right photo-2
const ROWS = [
  [photos[2], photos[3]], // top-left, top-right
  [photos[0], photos[1]], // bot-left, bot-right
];

export function MobilePhotoStrip() {
  return (
    <section
      aria-label="Studio moments"
      data-nav-scheme="dark"
      className="w-full bg-page"
    >
      <div
        data-photo-strip-stage
        className="relative mx-auto flex w-full max-w-[393px] flex-col"
        style={{ containerType: "inline-size" }}
      >
        {ROWS.map((row, r) => (
          <div
            key={r}
            className="flex"
            style={
              r === 0
                ? { height: cqw(197) }
                : { height: cqw(196), marginTop: -1 }
            }
          >
            {row.map((p) => (
              <span
                key={p.image.src}
                className="relative block flex-1 overflow-hidden"
              >
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  unoptimized
                  sizes="50vw"
                  className="object-cover"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
