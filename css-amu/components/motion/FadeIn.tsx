"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
};

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  as = "div",
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  const variants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      variants={variants}
    >
      {children}
    </Component>
  );
}
