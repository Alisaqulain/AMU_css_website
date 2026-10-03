import FadeIn from "@/components/motion/FadeIn";
import { leadershipHighlight } from "@/lib/site-content";

export default function LeadershipQuote() {
  return (
    <section className="border-b border-[#e2e0d8] bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            <blockquote className="font-display text-xl leading-relaxed text-[#2c3142] sm:text-2xl">
              &ldquo;{leadershipHighlight.quote}&rdquo;
            </blockquote>
            <div className="space-y-6 border-t border-[#e2e0d8] pt-8 text-sm lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
              <div>
                <p className="font-semibold text-[#3035B5]">Faculty</p>
                <p className="mt-1 font-semibold text-[#1a1f3d]">
                  {leadershipHighlight.president}
                </p>
                <p className="text-[#6b7280]">{leadershipHighlight.role}</p>
              </div>
              <div>
                <p className="font-semibold text-[#5b2d91]">Students</p>
                <p className="mt-1 font-semibold text-[#1a1f3d]">
                  {leadershipHighlight.coordinator}
                </p>
                <p className="text-[#6b7280]">
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
