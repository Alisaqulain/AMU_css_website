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
      "Next AMUHACKS edition. More tracks and mentors on site.",
    year: "2026",
    is_coming_soon: true,
  },
  {
    id: "2",
    title: "AMUHACKS 5.0",
    description:
      "National hackathon where student teams build and present projects over the weekend.",
    year: "2025",
    is_coming_soon: false,
  },
  {
    id: "3",
    title: "Capture The Flag",
    description:
      "Cybersecurity competition focused on puzzles, flags, and hands-on challenges.",
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
    <section className="border-t border-[#e2e0d8] bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Events"
            title="Recent and upcoming"
            description="AMUHACKS, CTFs, and workshops. Full list on the Events page."
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
                className="card-interactive group relative flex h-full flex-col border-l-4 p-6"
                style={{ borderLeftColor: accents[index % accents.length] }}
              >
                {event.is_coming_soon && (
                  <div className="absolute right-5 top-5">
                    <ComingSoonBadge />
                  </div>
                )}
                <span className="text-sm font-bold text-[#3035B5]">{event.year}</span>
                <h3 className="font-display mt-4 text-xl font-semibold text-[#1a1f3d] pr-2">
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
