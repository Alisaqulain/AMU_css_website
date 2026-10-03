"use client";

import { motion, useReducedMotion } from "framer-motion";
import { societyStats } from "@/lib/site-content";

export default function StatsStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y border-[#1a1f3d] bg-[#1a1f3d] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <motion.p
          className="text-center text-sm text-[#c5c9e8]"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Society at a glance
        </motion.p>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {societyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="border-t border-white/15 pt-4 text-center sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 sm:text-left first:sm:border-l-0 first:sm:pl-0"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <dd className="text-2xl font-semibold tabular-nums">
                {stat.value}
                {stat.suffix}
              </dd>
              <dt className="mt-1 text-sm text-[#a8b0d4]">{stat.label}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
