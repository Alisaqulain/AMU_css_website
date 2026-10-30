"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";
import FadeIn from "@/components/motion/FadeIn";

type EventRow = {
  id: string;
  title: string;
  description: string;
  year: string;
  is_coming_soon: boolean;
  image_url?: string | null;
};

const accent = ["#3035B5", "#5B2D91", "#3CA049"] as const;

export default function EventsGrid() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => setEvents(data.events ?? []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
          />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <FadeIn className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-12 text-center">
        <ComingSoonBadge />
        <p className="mt-6 text-lg font-medium text-[#25297F]">
          Events are being lined up
        </p>
        <p className="mt-2 text-slate-600">
          No events listed yet. Check again later.
        </p>
      </FadeIn>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <FadeIn key={event.id} delay={index * 0.06} as="article">
          <motion.article
            whileHover={{ y: -6 }}
            className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-xl hover:shadow-[#3035B5]/10"
          >
            {event.image_url ? (
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <Image
                  src={event.image_url}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              </div>
            ) : null}

            <div className="relative p-7">
              {event.is_coming_soon && (
                <div className="absolute right-5 top-5">
                  <ComingSoonBadge />
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#3035B5]">
                  {event.year || "-"}
                </span>
                {!event.is_coming_soon && (
                  <span className="text-slate-400 transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                )}
              </div>

              <h3
                className={`text-2xl font-bold text-[#25297F] pr-4 ${
                  event.image_url ? "mt-4" : "mt-10"
                }`}
              >
                {event.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {event.description}
              </p>

              <div
                className="mt-6 h-1 w-12 rounded-full"
                style={{ backgroundColor: accent[index % accent.length] }}
              />
            </div>
          </motion.article>
        </FadeIn>
      ))}
    </div>
  );
}
