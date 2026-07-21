import Image from "next/image";
import { photos } from "@/content/home";

/*
  Faithful-fluid PhotoStrip. Ported from legacy components/photo-strip.tsx —
  full-bleed flex row of 4 near-equal tiles (flex-1 + object-cover), no
  animation. Only the layout math is fluid:

  - Fixed `h-[357px]` → `h-[clamp(240px,25vw,357px)]`: the strip is already
    full-width/flex-1 (fluid horizontally), so the height is the only value
    that needs a fluid replacement — clamps to the Figma height at 1440
    (357px = 25vw) and doesn't shrink below 240px on narrow desktop widths.
  - Everything else (flex-1 tiles, object-cover crop, unoptimized + sizes)
    is unchanged from legacy.
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
      <ul className="flex h-[clamp(240px,25vw,357px)] w-full">
        {photos.map((p) => (
          <li key={p.image.src} className="relative flex-1 overflow-hidden">
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
