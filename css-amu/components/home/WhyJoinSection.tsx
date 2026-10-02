"use client";

import Link from "next/link";
import { FaUsers, FaRocket, FaTrophy, FaCompass } from "react-icons/fa6";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { whyJoin } from "@/lib/site-content";

const icons = [FaUsers, FaRocket, FaTrophy, FaCompass];

export default function WhyJoinSection() {
  return (
    <section className="border-t border-slate-200/80 bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            eyebrow="Student life"
            title="Why students join CSS"
            description="Whether you are in your first semester or final year, there is a track that meets you where you are."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {whyJoin.map((item, index) => {
              const Icon = icons[index];
              return (
                <FadeIn key={item.title} delay={index * 0.06}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3035B5]/10 text-[#3035B5]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-4 font-bold text-[#25297F]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <FadeIn className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/team"
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#25297F] hover:border-[#3035B5]"
          >
            Meet the team
          </Link>
          <Link
            href="/events"
            className="rounded-xl bg-[#3035B5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#25297F]"
          >
            Browse events
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
