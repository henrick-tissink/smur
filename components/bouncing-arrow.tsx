"use client";

import { motion, useReducedMotion } from "motion/react";
import { Arrow } from "./arrow";

/*
  The SMUR arrow that gently bounces in its pointing direction over a 1.4s
  ease-in-out cycle. Used for every scroll cue (contact hero, work hero) so
  they all read the same. Honors `prefers-reduced-motion`.

  Shared component — call sites are file-agnostic. Wrap it in a fixed-size,
  flex-centered box when it sits in a Figma frame slot wider than the arrow
  itself (the arrow's own box is only `size * 0.347` wide), so it centers
  under the title instead of hugging the left edge.
*/
export function BouncingArrow({
  direction,
  size,
  distance = 18,
}: {
  direction: "up" | "down" | "left" | "right";
  size?: number;
  distance?: number;
}) {
  const reduced = useReducedMotion();
  const isHorizontal = direction === "left" || direction === "right";
  const sign = direction === "down" || direction === "right" ? 1 : -1;
  const target = sign * distance;
  return (
    <motion.div
      animate={
        reduced
          ? { x: 0, y: 0 }
          : isHorizontal
            ? { x: [0, target, 0] }
            : { y: [0, target, 0] }
      }
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <Arrow direction={direction} size={size} />
    </motion.div>
  );
}
