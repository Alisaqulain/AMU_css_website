"use client";

import { useEffect, useState } from "react";
import type { TeamCategory, TeamCategoryId } from "@/lib/team";

type TeamCategoryNavProps = {
  categories: TeamCategory[];
};

export default function TeamCategoryNav({ categories }: TeamCategoryNavProps) {
  const [active, setActive] = useState<TeamCategoryId>(
    categories[0]?.id ?? "core"
  );

  useEffect(() => {
    const ids = categories.map((c) => c.id);
    const sections = ids
      .map((id) => document.getElementById(`team-${id}`))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id.replace("team-", "") as TeamCategoryId);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav
      className="sticky top-[65px] z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md"
      aria-label="Team categories"
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 lg:px-8">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <a
              key={cat.id}
              href={`#team-${cat.id}`}
              onClick={() => setActive(cat.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              style={
                isActive
                  ? { backgroundColor: cat.accent }
                  : undefined
              }
            >
              {cat.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
