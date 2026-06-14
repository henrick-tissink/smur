import Image from "next/image";
import { photos } from "@/content/home";

/*
  Mobile photo strip (Group 78 268:34816): 393 × 392 area, 4 photos in a 2×2 grid.

  Like the DESKTOP strip (components/photo-strip.tsx), we object-cover the
  pre-framed source photos into each tile rather than applying the Figma
  `crop` values. Those crops (146–226% zoom + ±90° rotation) were Figma's way
  of compositing the originals into the design canvas; replaying them here
  blew each photo up to a zoomed-in, cut-off fragment. The photographer has
  already framed each source square, so a plain object-cover reads correctly
  and matches what desktop shows.

  Mobile rearranges the grid vs desktop (Figma metadata order):
    top-left  photo-3   top-right photo-4
    bot-left  photo-1   bot-right photo-2

  The top row is 1px taller and the bottom row is pulled up 1px so the rows
  overlap — this kills the cream-bg hairline (subpixel seam) that shows when
  the section lands on a fractional device-pixel boundary. The photos fully
  cover their tiles, so the overlap changes nothing visible.
*/
const ROWS = [
  [photos[2], photos[3]], // top-left, top-right
  [photos[0], photos[1]], // bot-left, bot-right
];

export function MobilePhotoStrip() {
  return (
    <section
      aria-label="Studio moments"
      data-nav-scheme="dark"
      className="bg-page"
      style={{ height: "392px" }}
    >
      <div
        className="mx-auto flex flex-col"
        style={{ width: "393px", height: "392px" }}
      >
        {ROWS.map((row, r) => (
          <div
            key={r}
            className="flex"
            style={
              r === 0
                ? { height: 197 }
                : { height: 196, marginTop: -1 }
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
