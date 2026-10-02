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
            Student leaders who run clubs, events, and mentorship — supported by
            faculty and the wider CS department community.
          </p>
          <dl className="mt-8 flex flex-wrap justify-center gap-6 lg:justify-start">
            {societyStats.slice(0, 3).map((s) => (
              <div key={s.label} className="text-left">
                <dt className="text-xs uppercase tracking-wider text-slate-500">
                  {s.label}
                </dt>
                <dd className="text-lg font-bold text-[#25297F]">
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
