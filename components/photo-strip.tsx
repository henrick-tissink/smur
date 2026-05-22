import Image from "next/image";
import { photos } from "@/content/home";

/*
  photos smur frame: 1440 × 357. Four sub-frames at varying widths.
  The May 2026 exports (pic1–pic4@2x.png) are pre-cropped 723×723 squares —
  the user has already framed each photo as they want it to read in its
  tile, so we just object-cover into the four frame widths.
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
          <li
            key={p.image.src}
            className="relative flex-none overflow-hidden"
            style={{ width: widths[i], height: 357 }}
          >
            <Image
              src={p.image.src}
              alt={p.image.alt}
              fill
              unoptimized
              sizes={`${widths[i]}px`}
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
