"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import logo from "@/public/cslogo.png";

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="page-band">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1.15fr_auto] lg:items-center lg:gap-16 lg:px-8 lg:py-20">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.07 },
            },
          }}
        >
          <motion.p
            variants={item}
            className="text-sm font-medium text-[#4a5068]"
          >
            Department of Computer Science · Faculty of Science · AMU
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display mt-4 text-4xl font-semibold leading-[1.1] text-[#1a1f3d] sm:text-5xl lg:text-[3.25rem]"
          >
            Computer Science Society
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-7 text-[#4a5068] sm:text-lg"
          >
            Student-run society since 2018 (formerly ADC). Hackathons, workshops,
            CTFs, and clubs in AI/ML, web development, cybersecurity, and DSA.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/events" className="btn-primary">
              Events
            </Link>
            <Link href="/interest" className="btn-secondary">
              Club interest form
            </Link>
            <Link
              href="/team"
              className="link-arrow inline-flex items-center px-2 py-3 text-sm font-semibold text-[#3035B5] hover:underline"
            >
              Team list →
            </Link>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-10 grid grid-cols-3 gap-4 border-t border-[#e2e0d8] pt-8 text-sm"
          >
            {[
              { k: "Clubs", v: "4 domains" },
              { k: "Since", v: "2018" },
              { k: "Hackathon", v: "AMUHACKS" },
            ].map((row) => (
              <div key={row.k}>
                <dt className="text-[#6b7280]">{row.k}</dt>
                <dd className="mt-0.5 font-semibold text-[#1a1f3d]">{row.v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="relative z-[1] flex justify-center lg:justify-end"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.2 }}
        >
          <motion.div
            className="card-interactive flex flex-col items-center p-8 sm:p-10"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <Image
              src={logo}
              alt="CSS AMU logo"
              width={140}
              height={140}
              className="h-28 w-28 object-contain sm:h-32 sm:w-32"
              priority
            />
            <p className="mt-4 text-center text-xs font-medium uppercase tracking-wide text-[#6b7280]">
              CSS · AMU
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
