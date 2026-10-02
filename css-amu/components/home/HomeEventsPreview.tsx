"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/motion/FadeIn";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";
import SectionHeader from "@/components/ui/SectionHeader";

type EventRow = {
  id: string;
  title: string;
  description: string;
  year: string;
  is_coming_soon: boolean;
};

const fallback: EventRow[] = [
  {
    id: "1",
    title: "AMUHACKS 6.0",
    description:
      "The next edition of our flagship hackathon — bigger tracks and mentor support.",
    year: "2026",
    is_coming_soon: true,
  },
  {
    id: "2",
    title: "AMUHACKS 5.0",
    description:
      "A national-level hackathon bringing together students to build innovative solutions.",
    year: "2025",
    is_coming_soon: false,
  },
  {
    id: "3",
    title: "Capture The Flag",
    description:
      "Cybersecurity competition designed to test problem-solving and technical skills.",
    year: "2025",
    is_coming_soon: false,
  },
];

const accents = ["#3035B5", "#5B2D91", "#3CA049"];

export default function HomeEventsPreview() {
  const [events, setEvents] = useState<EventRow[]>(fallback);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        if (data.events?.length) {
          setEvents(data.events.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="border-t border-slate-200/80 bg-linear-to-b from-slate-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Our journey"
            title="Events & milestones"
            description="From AMUHACKS to CTF week — see what we have hosted and what is next."
          />
          <Link
            href="/events"
            className="mb-2 w-fit shrink-0 text-sm font-semibold text-[#3035B5] hover:text-[#5B2D91]"
          >
            Full events calendar →
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {events.map((event, index) => (
            <FadeIn key={event.id} delay={index * 0.08} as="article">
              <article
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="absolute left-0 top-0 h-1 w-full opacity-80"
                  style={{ backgroundColor: accents[index % accents.length] }}
                />
                {event.is_coming_soon && (
                  <div className="absolute right-5 top-5">
                    <ComingSoonBadge />
                  </div>
                )}
                <span className="text-sm font-bold text-[#3035B5]">{event.year}</span>
                <h3 className="mt-8 text-2xl font-bold text-[#25297F] pr-2">
                  {event.title}
                </h3>
                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {event.description}
                </p>
                <span className="mt-6 text-sm font-medium text-slate-400 group-hover:text-[#3035B5]">
                  Learn more on Events →
                </span>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
