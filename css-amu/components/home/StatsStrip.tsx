"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { societyStats } from "@/lib/site-content";

function StatItem({
  label,
  value,
  suffix,
  delay,
}: {
  label: string;
  value: string;
  suffix: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) return;
    let frame = 0;
    const totalFrames = 36;
    const id = window.setInterval(() => {
      frame += 1;
      setDisplay(Math.round((numeric * frame) / totalFrames));
      if (frame >= totalFrames) window.clearInterval(id);
    }, 24);
    return () => window.clearInterval(id);
  }, [inView, numeric]);

  const shown = Number.isNaN(numeric) ? value : `${display}${suffix}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
      className="relative rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-sm"
    >
      <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {shown}
      </p>
      <p className="mt-2 text-sm font-medium text-blue-100/80">{label}</p>
    </motion.div>
  );
}

export default function StatsStrip() {
  return (
    <section className="relative bg-linear-to-br from-[#25297F] via-[#3035B5] to-[#1e2159] py-16">
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
            By the numbers
          </p>
          <p className="mt-2 text-white/90">
            A growing technical community inside AMU Computer Science
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {societyStats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
