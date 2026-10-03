"use client";

import { marqueeEvents } from "@/lib/site-content";

export default function EventMarquee() {
  const items = [...marqueeEvents, ...marqueeEvents];

  return (
    <div className="overflow-hidden border-b border-[#e2e0d8] bg-[#eeede8] py-2.5">
      <div className="flex w-max animate-marquee gap-8">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="shrink-0 text-sm font-medium text-[#4a5068]"
          >
            {label}
            <span className="mx-4 text-[#c9c6bc]" aria-hidden>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
