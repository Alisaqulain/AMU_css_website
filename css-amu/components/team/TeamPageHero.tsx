import FadeIn from "@/components/motion/FadeIn";
import { societyStats } from "@/lib/site-content";

export default function TeamPageHero() {
  return (
    <section className="page-band">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <FadeIn className="max-w-2xl">
          <p className="text-sm text-[#6b7280]">Team</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-[#1a1f3d] sm:text-5xl">
            Coordinators and domain leads
          </h1>
          <p className="mt-4 text-[#4a5068] leading-7">
            Student coordinators and domain leads for clubs, events, and mentorship,
            with the faculty committee listed below.
          </p>
          <dl className="mx-auto mt-8 grid w-full max-w-lg grid-cols-1 gap-3 sm:mx-0 sm:max-w-none sm:grid-cols-3 sm:gap-4">
            {societyStats.slice(0, 3).map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between gap-4 border border-[#e2e0d8] bg-[#faf9f6] px-4 py-3 sm:block sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
              >
                <dt className="text-left text-xs text-[#6b7280]">{s.label}</dt>
                <dd className="shrink-0 font-semibold tabular-nums text-[#1a1f3d] sm:mt-1">
                  {s.value}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
