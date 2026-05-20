import { photos } from "@/content/home";
import { FigmaImage } from "./figma-image";

/*
  photos smur frame: 1440 × 357. Four sub-frames at varying widths.
  Per Figma generated code, photos 1, 2, and 4 are rotated; image fills
  overflow their frames by 150-225% with specific offsets.
*/
export function PhotoStrip() {
  const widths = [361, 360, 359, 360];
  return (
    <section
      aria-label="Studio moments"
      data-nav-scheme="dark"
      className="bg-page"
    >
      <ul className="mx-auto flex h-[357px] max-w-[1440px]">
        {photos.map((p, i) => (
          <li key={p.image.src} className="flex-none">
            <FigmaImage
              src={p.image.src}
              alt={p.image.alt}
              intrinsicWidth={p.image.intrinsicWidth}
              intrinsicHeight={p.image.intrinsicHeight}
              width={widths[i]}
              height={357}
              crop={p.crop}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
