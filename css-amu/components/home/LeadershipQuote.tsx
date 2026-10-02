import FadeIn from "@/components/motion/FadeIn";
import { leadershipHighlight } from "@/lib/site-content";

export default function LeadershipQuote() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-linear-to-r from-[#3035B5]/8 via-white to-[#3CA049]/8" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="grid gap-10 rounded-3xl border border-slate-200/80 bg-white/80 p-10 shadow-xl backdrop-blur-md lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-14">
            <blockquote className="text-xl leading-relaxed text-slate-700 sm:text-2xl">
              <span className="text-4xl font-serif text-[#3035B5]">&ldquo;</span>
              {leadershipHighlight.quote}
              <span className="text-4xl font-serif text-[#3035B5]">&rdquo;</span>
            </blockquote>
            <div className="space-y-6 border-t border-slate-200 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#3035B5]">
                  Faculty leadership
                </p>
                <p className="mt-2 text-lg font-bold text-[#25297F]">
                  {leadershipHighlight.president}
                </p>
                <p className="text-sm text-slate-500">{leadershipHighlight.role}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#5B2D91]">
                  Student coordination
                </p>
                <p className="mt-2 text-lg font-bold text-[#25297F]">
                  {leadershipHighlight.coordinator}
                </p>
                <p className="text-sm text-slate-500">
                  {leadershipHighlight.coordinatorRole}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
