import { photos } from "@/content/home";
import { FigmaImage } from "../figma-image";

/*
  Mobile photo strip (Group 78 268:34816): 392 × 392 area (4 photos in 2×2 grid).
  Each photo is 197×196 with the same crop+rotation as desktop:
    - Top-left:  photo-3 (no rotation) — rect 268:34814
    - Top-right: photo-4 (rotate +90)  — rect 268:34815
    - Bot-left:  photo-1 (rotate -90)  — rect 268:34807
    - Bot-right: photo-2 (rotate +90)  — rect 268:34808
  Note: indices are different from desktop because mobile rearranges the grid.
*/
export function MobilePhotoStrip() {
  // Map: desktop index → mobile grid position
  // Mobile order per Figma metadata: imgRectangle=photo3, imgRectangle1=photo4,
  //                                  imgRectangle2=photo1, imgRectangle3=photo2
  // Top-row frames are 1px taller than their 196px grid row so they overlap
  // the bottom row — kills the subpixel seam (cream bg hairline) that shows
  // when the section lands on a fractional device-pixel boundary. The photos
  // overflow their crop frames by far more than 1px, so nothing visible changes.
  const cells = [
    { photo: photos[2], width: 197, height: 197 }, // top-left
    { photo: photos[3], width: 198, height: 197 }, // top-right
    { photo: photos[0], width: 198, height: 196 }, // bot-left
    { photo: photos[1], width: 198, height: 196 }, // bot-right
  ];

  return (
    <section
      aria-label="Studio moments"
      data-nav-scheme="dark"
      className="bg-page"
      style={{ height: "392px" }}
    >
      <div
        className="mx-auto grid grid-cols-2"
        style={{
          maxWidth: "393px",
          width: "393px",
          height: "392px",
          gridTemplateRows: "196px 196px",
        }}
      >
        {cells.map((cell, i) => (
          <div key={i} className="relative">
            <FigmaImage
              src={cell.photo.image.src}
              alt={cell.photo.image.alt}
              intrinsicWidth={cell.photo.image.intrinsicWidth}
              intrinsicHeight={cell.photo.image.intrinsicHeight}
              width={cell.width}
              height={cell.height}
              crop={cell.photo.crop}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
