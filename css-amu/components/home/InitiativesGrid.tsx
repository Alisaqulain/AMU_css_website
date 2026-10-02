"use client";

import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { initiatives } from "@/lib/site-content";

export default function InitiativesGrid() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="What we run"
          title="More than a poster on the wall"
          description="CSS is where hackathons, workshops, placement prep, and domain clubs actually happen."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.05}>
              <article
                className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-linear-to-b from-white to-slate-50/50 p-7 transition hover:border-[#3035B5]/25 hover:shadow-lg"
              >
                <span className="w-fit rounded-full bg-[#3035B5]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#3035B5]">
                  {item.badge}
                </span>
                <h3 className="mt-5 text-xl font-bold text-[#25297F] group-hover:text-[#3035B5] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
                <div className="mt-6 h-0.5 w-0 rounded-full bg-[#3035B5] transition-all group-hover:w-12" />
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
