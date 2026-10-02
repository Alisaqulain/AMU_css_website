"use client";

import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { timeline } from "@/lib/site-content";

export default function TimelineSection() {
  return (
    <section className="border-t border-slate-200/80 bg-slate-50/80 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our story"
          title="From ADC to CSS"
          description="Key dates for ADC and CSS at AMU. Student-led since 2018."
        />

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-linear-to-b from-[#3035B5] via-[#5B2D91] to-[#3CA049] md:left-1/2 md:block" />

          <ul className="space-y-10">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <FadeIn key={item.year + item.title} delay={index * 0.05}>
                  <li className="relative md:grid md:grid-cols-2 md:gap-12">
                    <div
                      className={`md:col-span-1 ${
                        isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12 md:text-left"
                      }`}
                    >
                      <span className="inline-block rounded-full bg-[#3035B5] px-4 py-1 text-sm font-bold text-white">
                        {item.year}
                      </span>
                      <h3 className="mt-4 text-xl font-bold text-[#25297F]">
                        {item.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-600">{item.body}</p>
                    </div>
                    <div
                      className="absolute left-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-4 border-white bg-[#5B2D91] shadow md:left-1/2 md:block"
                      aria-hidden
                    />
                  </li>
                </FadeIn>
              );
            })}
          </ul>
        </div>

        <FadeIn className="mt-12 text-center">
          <Link
            href="/about"
            className="text-sm font-semibold text-[#3035B5] hover:text-[#5B2D91]"
          >
            Read full history, objectives & faculty committee →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
