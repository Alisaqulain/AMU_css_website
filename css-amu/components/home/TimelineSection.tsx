"use client";

import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { timeline } from "@/lib/site-content";

export default function TimelineSection() {
  return (
    <section className="border-t border-[#e2e0d8] bg-[#faf9f6] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our story"
          title="From ADC to CSS"
          description="Key dates for ADC and CSS at AMU. Student-led since 2018."
        />

        <ul className="relative mt-14 space-y-6 border-l-2 border-[#3035B5]/25 pl-8 md:pl-10">
          {timeline.map((item, index) => (
            <FadeIn key={item.year + item.title} delay={index * 0.05}>
              <li className="relative">
                <span
                  className="absolute -left-[2.125rem] top-1.5 flex h-3 w-3 rounded-full border-2 border-white bg-[#3035B5] md:-left-[2.375rem]"
                  aria-hidden
                />
                <article className="card-interactive p-5 md:p-6">
                  <span className="text-xs font-semibold text-[#5b2d91]">
                    {item.year}
                  </span>
                  <h3 className="font-display mt-1 text-lg font-semibold text-[#1a1f3d]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#4a5068]">
                    {item.body}
                  </p>
                </article>
              </li>
            </FadeIn>
          ))}
        </ul>

        <FadeIn className="mt-10">
          <Link
            href="/about"
            className="link-arrow text-sm font-semibold text-[#3035B5] hover:underline"
          >
            Full history on About →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
