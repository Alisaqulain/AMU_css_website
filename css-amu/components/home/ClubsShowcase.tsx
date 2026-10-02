"use client";

import Link from "next/link";
import {
  FaBrain,
  FaCode,
  FaShieldHalved,
  FaDiagramProject,
} from "react-icons/fa6";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { clubDomains } from "@/lib/site-content";

const icons = {
  brain: FaBrain,
  code: FaCode,
  shield: FaShieldHalved,
  graph: FaDiagramProject,
};

export default function ClubsShowcase() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#3035B5]/5 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Technical verticals"
          title="Four clubs. One society."
          description="Each domain runs its own projects, study circles, and events — pick where you want to grow first."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {clubDomains.map((club, index) => {
            const Icon = icons[club.icon];
            return (
              <FadeIn key={club.id} delay={index * 0.06}>
                <article
                  className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-br from-white to-slate-50/90 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    boxShadow: `0 0 0 1px ${club.accent}10`,
                  }}
                >
                  <div
                    className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl transition group-hover:opacity-35"
                    style={{ backgroundColor: club.accent }}
                  />
                  <div className="relative flex items-start gap-5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                      style={{ backgroundColor: club.accent }}
                    >
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {club.tagline}
                      </p>
                      <h3 className="mt-1 text-2xl font-bold text-[#25297F]">
                        {club.name}
                      </h3>
                    </div>
                  </div>
                  <p className="relative mt-5 leading-7 text-slate-600">
                    {club.description}
                  </p>
                  <ul className="relative mt-6 flex flex-wrap gap-2">
                    {club.topics.map((topic) => (
                      <li
                        key={topic}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/interest"
                    className="relative mt-8 inline-flex items-center text-sm font-semibold transition hover:gap-2"
                    style={{ color: club.accent }}
                  >
                    Express interest
                    <span className="ml-1">→</span>
                  </Link>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
