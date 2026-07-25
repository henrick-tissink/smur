import type { ReactNode } from "react";
import { Icon } from "./icon";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "outline" | "solid";
  trailingArrow?: boolean;
  className?: string;
};

const base =
  "group inline-flex items-center gap-[10px] px-[26px] py-[13px] " +
  "font-[family-name:var(--font-ui)] text-[14px] uppercase tracking-[0.06em] " +
  "border-[length:var(--hairline-button)] border-solid " +
  "transition-[background-color,color,border-color,transform] duration-200 " +
  "ease-[var(--ease-brand)] active:scale-[var(--scale-press)] " +
  "hover:bg-[var(--color-accent)] hover:text-[var(--color-cream)] hover:border-[var(--color-accent)]";

const variantClasses = {
  outline: "bg-transparent text-[var(--color-ink)] border-[var(--color-ink)]",
  solid: "bg-[var(--color-accent)] text-[var(--color-cream)] border-transparent",
} as const;

export function Button({
  children,
  href,
  onClick,
  variant = "outline",
  trailingArrow = false,
  className = "",
}: Props) {
  const style = {
    borderRadius: "var(--radius-pill)",
  } as const;

  const classes = `${base} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {children}
      {trailingArrow ? <Icon name="arrow-right" size={16} /> : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes} style={style}>
      {content}
    </button>
  );
}
