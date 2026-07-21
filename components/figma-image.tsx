import Image from "next/image";
import type { CSSProperties } from "react";

/*
  Renders an original Figma asset inside a fixed-size frame with the
  percent-based crop/position that Figma's generated code specifies.

  Figma image fills overflow their containing rectangle — the source
  photo is usually 2-3x the rendered size and offset to show a specific
  region. The `crop` props mirror Figma's exact values (e.g. for KOKOP:
  w=207.98, h=106.17, top=-0.01, left=-75.11).
*/

type Crop = {
  /** percentage width of the image relative to the frame (e.g. 207.98) */
  w: number;
  /** percentage height of the image relative to the frame (e.g. 106.17) */
  h: number;
  /** percentage left offset (e.g. -75.11 means slide left by 75.11% of frame width) */
  left: number;
  /** percentage top offset */
  top: number;
  /** optional rotation in degrees (used in the photo strip) */
  rotate?: number;
};

export function FigmaImage({
  src,
  alt,
  width,
  height,
  intrinsicWidth,
  intrinsicHeight,
  crop,
  priority,
  className,
  fluid,
}: {
  src: string;
  alt: string;
  /** rendered frame width (matches Figma node width) */
  width: number;
  /** rendered frame height (matches Figma node height) */
  height: number;
  /** native pixel size of the source image (for next/image) */
  intrinsicWidth: number;
  intrinsicHeight: number;
  crop: Crop;
  priority?: boolean;
  className?: string;
  /** when true, use fluid width (100%, maxWidth, aspect-ratio) instead of fixed px */
  fluid?: boolean;
}) {
  const rotated = crop.rotate !== undefined && crop.rotate !== 0;
  const imgStyle: CSSProperties = {
    position: "absolute",
    width: `${crop.w}%`,
    height: "auto",
    left: `${crop.left}%`,
    top: `${crop.top}%`,
    maxWidth: "none",
  };

  // For photo-strip rotation: rotate the image element, container clips
  if (rotated) {
    return (
      <div
        className={`relative overflow-hidden ${className ?? ""}`}
        style={{ width, height }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `translate(-50%, -50%) rotate(${crop.rotate}deg)`,
            width: height,
            height: width,
          }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={src}
              alt={alt}
              width={intrinsicWidth}
              height={intrinsicHeight}
              priority={priority}
              unoptimized
              style={imgStyle}
            />
          </div>
        </div>
      </div>
    );
  }

  const outerStyle = fluid
    ? { width: "100%", maxWidth: width, aspectRatio: `${width} / ${height}` }
    : { width, height };

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      style={outerStyle}
    >
      <Image
        src={src}
        alt={alt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        priority={priority}
        unoptimized
        style={imgStyle}
      />
    </div>
  );
}
