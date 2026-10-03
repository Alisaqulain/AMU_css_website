import EventsGrid from "@/components/events/EventsGrid";
import AnimatedLogo from "@/components/AnimatedLogo";
import FadeIn from "@/components/motion/FadeIn";
import { initiatives } from "@/lib/site-content";
import { pageMetadata } from "@/lib/site-seo";

export const metadata = pageMetadata({
  title: "Events & highlights",
  description:
    "Hackathons, workshops, CTFs, and club events from CSS AMU — AMUHACKS and more at Aligarh Muslim University.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-20 text-center lg:flex-row lg:justify-between lg:text-left lg:px-8">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
              Events & Highlights
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#25297F] sm:text-5xl">
              Hackathons, workshops & competitions
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              CSS runs AMUHACKS, weekly workshops, CTFs, and club events. Upcoming
              items show a{" "}
              <span className="font-semibold text-[#b87d2e]">Coming Soon</span> badge.
            </p>
          </FadeIn>
          <AnimatedLogo size="lg" />
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
              Event formats we run
            </h2>
          </FadeIn>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.04}>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="text-xs font-bold uppercase text-[#3035B5]">
                    {item.badge}
                  </span>
                  <h3 className="mt-2 font-bold text-[#25297F]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <FadeIn className="mb-10">
          <h2 className="text-2xl font-bold text-[#25297F]">All events</h2>
          <p className="mt-2 text-slate-600">
            Loaded from the site database. Admins can add events from the dashboard.
          </p>
        </FadeIn>
        <EventsGrid />
      </section>
    </div>
  );
}
