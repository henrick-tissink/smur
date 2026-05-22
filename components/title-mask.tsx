/*
  Renders an exported Figma title SVG as a CSS mask, with the color driven
  by the surrounding theme (via the `color` prop, default = currentColor).

  Why mask and not <img>: the exported SVGs are filled cream (#fff7f4) but
  we need to drop the same artwork on light backgrounds too (where it has
  to read as dark brown / ink). Mask + bg-color lets one asset render in
  any color without inlining the SVG path.

  The container's width/height MUST be set by the caller — these come from
  the SVG's native viewBox (extracted via `grep viewBox`) so the type sits
  at the same size the designer drew. Set them as inline styles or via the
  `width`/`height` props.
*/

type Props = {
  src: string;
  /** Native viewBox width (px) — sets the displayed width too. */
  width: number;
  /** Native viewBox height (px). */
  height: number;
  /** Accessible label — also rendered as visually-hidden text. */
  alt: string;
  /** Heading level. Pass `null` to render a plain <span>. Default: 2. */
  as?: 1 | 2 | 3 | null;
  /** Override the mask color. Default = currentColor. */
  color?: string;
  className?: string;
};

export function TitleMask({
  src,
  width,
  height,
  alt,
  as = 2,
  color,
  className = "",
}: Props) {
  const style: React.CSSProperties = {
    display: "inline-block",
    width: `${width}px`,
    height: `${height}px`,
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "left top",
    maskPosition: "left top",
    backgroundColor: color ?? "currentColor",
  };

  const visuallyHidden: React.CSSProperties = {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  };

  const Mask = (
    <>
      <span aria-hidden style={style} className={className} />
      <span style={visuallyHidden}>{alt}</span>
    </>
  );

  if (as === null) return <span className="relative inline-block">{Mask}</span>;
  if (as === 1) return <h1 className="relative inline-block">{Mask}</h1>;
  if (as === 3) return <h3 className="relative inline-block">{Mask}</h3>;
  return <h2 className="relative inline-block">{Mask}</h2>;
}
