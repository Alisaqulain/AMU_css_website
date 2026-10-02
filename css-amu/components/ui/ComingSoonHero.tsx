"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type ComingSoonHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
};

export default function ComingSoonHero({
  eyebrow,
  title,
  description,
  backHref = "/",
  backLabel = "Back to home",
}: ComingSoonHeroProps) {
  return (
    <div className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(48,53,181,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#5B2D91]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-[#3CA049]/15 blur-3xl" />

      <motion.div
        className="relative max-w-2xl text-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#3035B5]"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {eyebrow}
        </motion.p>

        <h1 className="text-4xl font-bold tracking-tight text-[#25297F] sm:text-6xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-slate-600">
          {description}
        </p>

        <motion.div
          className="mx-auto mt-10 flex h-1 w-32 overflow-hidden rounded-full bg-slate-200"
          aria-hidden
        >
          <motion.div
            className="h-full w-1/3 rounded-full bg-linear-to-r from-[#3035B5] via-[#5B2D91] to-[#3CA049]"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <Link
          href={backHref}
          className="mt-10 inline-flex rounded-xl border border-[#3035B5]/25 px-5 py-2.5 text-sm font-semibold text-[#3035B5] transition hover:border-[#3035B5] hover:bg-[#3035B5]/5"
        >
          {backLabel}
        </Link>
      </motion.div>
    </div>
  );
}
