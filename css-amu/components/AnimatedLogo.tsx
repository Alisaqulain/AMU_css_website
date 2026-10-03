"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import logo from "@/public/cslogo.png";

type AnimatedLogoProps = {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
};

const sizes = {
  sm: "h-10 w-10",
  md: "h-14 w-14",
  lg: "h-20 w-20",
  hero: "h-28 w-28 sm:h-32 sm:w-32",
};

export default function AnimatedLogo({
  size = "md",
  className = "",
}: AnimatedLogoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-lg border border-[#e2e0d8] bg-white p-1.5 ${sizes[size]} ${className}`}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
    >
      <Image
        src={logo}
        alt="CSS logo"
        className="h-full w-full object-contain"
        priority={size === "hero" || size === "lg"}
      />
    </motion.div>
  );
}
