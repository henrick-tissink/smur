const SRC = "/figma-assets/smur-logo.svg";

type Props = {
  className?: string;
  width?: number;
  height?: number;
  title?: string;
};

export function Wordmark({ className, width = 108, height = 24, title = "SMUR" }: Props) {
  return (
    <span
      role="img"
      aria-label={title}
      className={className}
      style={{
        display: "inline-block",
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${SRC})`,
        maskImage: `url(${SRC})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
