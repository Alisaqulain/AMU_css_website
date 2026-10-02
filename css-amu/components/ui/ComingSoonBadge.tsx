"use client";

import { motion } from "framer-motion";

export default function ComingSoonBadge() {
  return (
    <motion.span
      className="inline-flex items-center gap-1.5 rounded-full border border-[#E1A65E]/40 bg-[#E1A65E]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#b87d2e]"
      animate={{ boxShadow: ["0 0 0 0 rgba(225,166,94,0)", "0 0 0 6px rgba(225,166,94,0.15)", "0 0 0 0 rgba(225,166,94,0)"] }}
      transition={{ duration: 2.2, repeat: Infinity }}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E1A65E] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E1A65E]" />
      </span>
      Coming Soon
    </motion.span>
  );
}
