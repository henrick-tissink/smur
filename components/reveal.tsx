"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: As = "div",
  eager = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  /**
   * Reveal on mount instead of on scroll-into-view. Needed when the Reveal
   * wraps absolutely-positioned content (so its motion wrapper is
   * zero-height) AND lives inside a transform wrapper that pushes it off the
   * top of the page — `whileInView` can never observe it there. Used by the
   * case-study offset wrappers. Defaults to scroll-reveal everywhere else.
   */
  eager?: boolean;
}) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedVariants : baseVariants;

  const MotionTag =
    As === "section"
      ? motion.section
      : As === "li"
      ? motion.li
      : As === "span"
      ? motion.span
      : motion.div;

  const trigger = eager
    ? { animate: "show" as const }
    : {
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.05, margin: "0px 0px -5% 0px" },
      };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      {...trigger}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
