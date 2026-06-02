import Image from "next/image";
import { photos } from "@/content/home";

/*
  photos smur frame: 1440 × 357. Four sub-frames at varying widths.
  Sourced from EXPORTS SMUR WEBSITE 2/HOME/pictures homepic{1-4}@2x.png
  (pre-cropped 723×723 squares — the user has already framed each photo as
  they want it to read in its tile), copied to public/figma-assets/photo-{1-4}.png.
  We just object-cover into the four frame widths.
*/
export function PhotoStrip() {
  return (
    <section
      aria-label="Studio moments"
      data-nav-scheme="dark"
      className="bg-page"
    >
      {/* Full-bleed strip (June 2026 client request): the four tiles stretch
          edge-to-edge so on zoom-out / wide viewports the photos fill the row
          instead of leaving cream gutters around a centered 1440 block —
          matching the contact page's full-width bands. Tiles are near-equal in
          Figma (361/360/359/360 ≈ a quarter each), so flex-1 keeps them even
          while object-cover crops each photo to its tile. */}
      <ul className="flex h-[357px] w-full">
        {photos.map((p) => (
          <li
            key={p.image.src}
            className="relative flex-1 overflow-hidden"
            style={{ height: 357 }}
          >
            <Image
              src={p.image.src}
              alt={p.image.alt}
              fill
              unoptimized
              sizes="25vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
