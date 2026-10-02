"use client";

import { marqueeEvents } from "@/lib/site-content";

export default function EventMarquee() {
  const items = [...marqueeEvents, ...marqueeEvents];

  return (
    <div className="relative border-y border-slate-200/80 bg-[#25297F] py-3.5 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-[#25297F] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-[#25297F] to-transparent" />
      <div className="flex w-max animate-marquee gap-10">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex shrink-0 items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#3CA049]" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
