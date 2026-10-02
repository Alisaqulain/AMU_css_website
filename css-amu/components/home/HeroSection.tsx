"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedLogo from "@/components/AnimatedLogo";

const floatingOrbs = [
  { className: "left-[8%] top-[20%] h-64 w-64 bg-[#3035B5]/20", delay: 0 },
  { className: "right-[12%] top-[30%] h-48 w-48 bg-[#5B2D91]/15", delay: 0.5 },
  { className: "bottom-[15%] left-[40%] h-56 w-56 bg-[#3CA049]/12", delay: 1 },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mesh-gradient" />
      <div className="pointer-events-none absolute inset-0 pattern-grid opacity-40" />

      {floatingOrbs.map((orb) => (
        <motion.div
          key={orb.className}
          className={`pointer-events-none absolute rounded-full blur-3xl ${orb.className}`}
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl flex-col items-center gap-14 px-6 py-16 lg:flex-row lg:justify-between lg:gap-8 lg:px-8 lg:py-20">
        <div className="max-w-3xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3035B5]/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3035B5] backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#3CA049]" />
            Dept. of Computer Science · AMU
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="text-5xl font-bold tracking-tight text-[#25297F] sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Build the future
            <br />
            <span className="bg-linear-to-r from-[#3035B5] via-[#5B2D91] to-[#3CA049] bg-clip-text text-transparent">
              with CSS.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-600"
          >
            The Computer Science Society is AMU&apos;s student hub for hackathons,
            workshops, CTFs, and domain clubs in AI/ML, Web Development,
            Cybersecurity, and DSA — mentored by leads and faculty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-[#3035B5] to-[#5B2D91] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3035B5]/30 transition hover:brightness-110"
            >
              Explore Events
              <span className="ml-2">→</span>
            </Link>
            <Link
              href="/interest"
              className="inline-flex items-center justify-center rounded-xl border border-[#3035B5]/30 bg-white/70 px-7 py-3.5 text-sm font-semibold text-[#3035B5] backdrop-blur-sm transition hover:bg-white"
            >
              Join a Club
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center justify-center rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-600 hover:text-[#3035B5]"
            >
              Meet leads →
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-8 text-center lg:text-left"
          >
            {[
              { k: "Domains", v: "4 clubs" },
              { k: "Since", v: "2018" },
              { k: "Flagship", v: "AMUHACKS" },
            ].map((row) => (
              <div key={row.k}>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {row.k}
                </dt>
                <dd className="mt-1 text-sm font-bold text-[#25297F]">{row.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full bg-linear-to-tr from-[#3035B5]/20 to-[#3CA049]/20 blur-2xl" />
          <AnimatedLogo size="hero" />
        </motion.div>
      </div>
    </section>
  );
}
