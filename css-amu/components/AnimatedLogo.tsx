"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/public/cslogo.png";

type AnimatedLogoProps = {
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
};

const sizes = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-24 w-24",
  hero: "h-28 w-28 sm:h-36 sm:w-36",
};

export default function AnimatedLogo({
  size = "md",
  className = "",
}: AnimatedLogoProps) {
  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#3035B5]/30 via-[#5B2D91]/20 to-[#3CA049]/25 blur-xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/20 bg-white/80 p-2 shadow-lg shadow-[#3035B5]/10 backdrop-blur-sm"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05, rotate: 2 }}
      >
        <motion.div
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={logo}
            alt="Computer Science Society logo"
            className="h-full w-full object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
