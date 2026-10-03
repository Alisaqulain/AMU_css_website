"use client";

import Link from "next/link";
import { FaUsers, FaRocket, FaTrophy, FaCompass } from "react-icons/fa6";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { whyJoin } from "@/lib/site-content";

const icons = [FaUsers, FaRocket, FaTrophy, FaCompass];

export default function WhyJoinSection() {
  return (
    <section className="border-t border-[#e2e0d8] bg-[#faf9f6] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div>
            <SectionHeader
              eyebrow="Student life"
              title="Why students join CSS"
              description="First year or final year, you can join a club or help run an event."
            />
            <FadeIn className="mt-6 flex flex-wrap gap-3">
              <Link href="/team" className="btn-secondary">
                Meet the team
              </Link>
              <Link href="/events" className="btn-primary">
                Browse events
              </Link>
            </FadeIn>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyJoin.map((item, index) => {
              const Icon = icons[index];
              return (
                <FadeIn key={item.title} delay={index * 0.06}>
                  <div className="card-interactive p-5">
                    <Icon className="h-5 w-5 text-[#3035B5]" aria-hidden />
                    <h3 className="mt-3 font-semibold text-[#1a1f3d]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#4a5068]">
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
