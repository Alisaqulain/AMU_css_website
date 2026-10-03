"use client";

import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { clubDomains } from "@/lib/site-content";

export default function ClubsShowcase() {
  return (
    <section className="border-b border-[#e2e0d8] bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          eyebrow="Clubs"
          title="Four clubs, one society"
          description="Each club runs projects, study circles, and events. Use the interest form to join."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {clubDomains.map((club, index) => (
            <FadeIn key={club.id} delay={index * 0.04}>
              <article
                className="card-interactive flex h-full flex-col border-l-4 p-6"
                style={{ borderLeftColor: club.accent }}
              >
                <div>
                  <p className="text-xs font-medium text-[#6b7280]">{club.tagline}</p>
                  <h3 className="font-display mt-1 text-xl font-semibold text-[#1a1f3d]">
                    {club.name}
                  </h3>
                </div>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#4a5068]">
                  {club.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {club.topics.map((topic) => (
                    <li
                      key={topic}
                      className="border border-[#e2e0d8] bg-[#faf9f6] px-2.5 py-1 text-xs text-[#4a5068]"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/interest"
                  className="mt-5 text-sm font-semibold hover:underline"
                  style={{ color: club.accent }}
                >
                  Interest form →
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
