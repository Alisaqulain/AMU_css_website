import Link from "next/link";
import { introductionParagraphs } from "@/lib/css-official";
import HeroSection from "@/components/home/HeroSection";
import EventMarquee from "@/components/home/EventMarquee";
import StatsStrip from "@/components/home/StatsStrip";
import HomeEventsPreview from "@/components/home/HomeEventsPreview";
import ClubsShowcase from "@/components/home/ClubsShowcase";
import InitiativesGrid from "@/components/home/InitiativesGrid";
import TimelineSection from "@/components/home/TimelineSection";
import FacultyLeadsSection from "@/components/home/FacultyLeadsSection";
import LeadershipQuote from "@/components/home/LeadershipQuote";
import WhyJoinSection from "@/components/home/WhyJoinSection";
import FAQSection from "@/components/home/FAQSection";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventMarquee />
      <StatsStrip />
      <FacultyLeadsSection />

      <section className="border-b border-slate-200/80 bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:items-center">
            <SectionHeader
              eyebrow="About us"
              title="What is CSS?"
              description="Faculty of Science, AMU. Formerly ADC; recognized as CSS since 2021."
            />
            <FadeIn delay={0.1}>
              <div className="space-y-6 text-lg leading-8 text-slate-600">
                <p>{introductionParagraphs[0]}</p>
                <p>{introductionParagraphs[1]}</p>
                <ul className="grid gap-3 sm:grid-cols-2 text-sm font-medium text-[#25297F]">
                  {[
                    "Faculty committee",
                    "Student domain leads",
                    "Club interest form",
                    "DSA and placement groups",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <span className="text-[#3CA049]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-6">
                  <Link
                    href="/about"
                    className="inline-flex items-center font-semibold text-[#3035B5] hover:text-[#5B2D91]"
                  >
                    Full history & objectives <span className="ml-2">→</span>
                  </Link>
                  <Link
                    href="/interest"
                    className="inline-flex items-center font-semibold text-[#5B2D91] hover:text-[#3035B5]"
                  >
                    Club interest form <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <ClubsShowcase />
      <InitiativesGrid />
      <HomeEventsPreview />
      <TimelineSection />
      <LeadershipQuote />
      <WhyJoinSection />
      <FAQSection />

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#25297F] via-[#3035B5] to-[#5B2D91] px-8 py-16 text-center text-white sm:px-16">
              <div className="pointer-events-none absolute inset-0 pattern-dots opacity-20" />
              <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                Join a club
              </p>
              <h2 className="relative mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Club interest form
              </h2>
              <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                AI/ML, Web Development, Cybersecurity, or DSA. Submit the form and
                the domain lead will contact you.
              </p>
              <div className="relative mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/interest"
                  className="inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#3035B5] transition hover:bg-blue-50 hover:shadow-lg"
                >
                  Club interest form
                </Link>
                <Link
                  href="/membershipForm"
                  className="inline-flex rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Core team recruitment
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
