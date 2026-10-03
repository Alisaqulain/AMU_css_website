"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { faqItems } from "@/lib/site-content";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-[#e2e0d8] bg-white py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions"
          description="Quick answers before you fill the club interest form."
          align="center"
        />

        <ul className="mt-10 space-y-2">
          {faqItems.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.q}>
                <FadeIn delay={index * 0.04}>
                <div className="card-interactive overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#1a1f3d] sm:text-base"
                  >
                    {item.q}
                    <motion.span
                      className="shrink-0 text-lg text-[#3035B5]"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.2 }}
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="border-t border-[#e2e0d8] px-5 py-4 text-sm leading-7 text-[#4a5068]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
