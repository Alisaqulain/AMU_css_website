import AnimatedLogo from "@/components/AnimatedLogo";
import FadeIn from "@/components/motion/FadeIn";
import { societyStats } from "@/lib/site-content";

export default function TeamPageHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-70" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20 lg:flex-row lg:justify-between lg:px-8">
        <FadeIn className="max-w-2xl text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
            People behind CSS
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#25297F] sm:text-5xl">
            Coordinators, mentors & domain leads
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Student coordinators and domain leads for clubs, events, and mentorship,
            with the faculty committee listed below.
          </p>
          <dl className="mx-auto mt-8 grid w-full max-w-lg grid-cols-1 gap-3 sm:mx-0 sm:max-w-none sm:grid-cols-3 sm:gap-4 lg:justify-items-start">
            {societyStats.slice(0, 3).map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 sm:flex-col sm:items-start sm:justify-start sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
              >
                <dt className="min-w-0 text-left text-xs leading-snug uppercase tracking-wide text-slate-500 sm:tracking-wider">
                  {s.label}
                </dt>
                <dd className="shrink-0 text-right text-xl font-bold tabular-nums text-[#25297F] sm:text-left sm:text-lg">
                  {s.value}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
        <AnimatedLogo size="lg" />
      </div>
    </section>
  );
}
