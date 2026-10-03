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

      <section className="border-b border-[#e2e0d8] bg-white py-20">
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
                      className="flex items-center gap-2 border border-[#e2e0d8] bg-[#faf9f6] px-4 py-3 transition-colors hover:border-[#3035B5]/40 hover:bg-white"
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

      <section className="border-t border-[#e2e0d8] bg-[#faf9f6] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <FadeIn>
            <h2 className="font-display text-3xl font-semibold text-[#1a1f3d]">
              Club interest form
            </h2>
            <p className="mt-4 text-[#4a5068]">
              AI/ML, Web Development, Cybersecurity, or DSA. Submit once; a domain
              lead will reply.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/interest" className="btn-primary">
                Open form
              </Link>
              <Link href="/membershipForm" className="btn-secondary">
                Core team recruitment
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
