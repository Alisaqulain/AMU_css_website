"use client";

import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { initiatives } from "@/lib/site-content";

export default function InitiativesGrid() {
  return (
    <section className="border-b border-[#e2e0d8] bg-[#faf9f6] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Activities"
          title="What we run"
          description="Hackathons, workshops, placement prep, and club meetings through the year."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.03}>
              <article className="card-interactive h-full p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#5b2d91]">
                  {item.badge}
                </span>
                <h3 className="font-display mt-3 text-lg font-semibold text-[#1a1f3d]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#4a5068]">
                  {item.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
