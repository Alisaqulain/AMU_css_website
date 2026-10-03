import Link from "next/link";
import AnimatedLogo from "@/components/AnimatedLogo";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  amuPortalLinks,
  convenerProfile,
  cssIdentity,
  facultyCommitteeRoles,
  historyMilestones,
  introductionParagraphs,
  societyObjectives,
  societyOperations,
  societyOutcomes,
  studentCommitteeRoles,
} from "@/lib/css-official";

export const metadata = {
  title: "About CSS | Computer Science Society, AMU",
  description:
    "Introduction, history, objectives, and governance of the Computer Science Society, Faculty of Science, Aligarh Muslim University.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="page-band">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-16">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#5b2d91]">
              About the society
            </p>
            <h1 className="font-display mt-2 text-4xl font-semibold text-[#1a1f3d] sm:text-5xl">
              Computer Science Society
            </h1>
            <p className="mt-3 text-base font-medium text-[#5b2d91]">
              {cssIdentity.affiliation}
            </p>
            <p className="mt-5 text-[#4a5068] leading-7">
              Formerly the <strong>Area of Dominant Coders (ADC)</strong>. Sharing
              computer science across the Faculty of Science since December 2018.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/team" className="btn-primary">
                Current student team
              </Link>
              <Link href="/events" className="btn-secondary">
                Events & hackathons
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="flex justify-center lg:justify-end">
            <AnimatedLogo size="lg" />
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-[#e2e0d8] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader eyebrow="Introduction" title="What is CSS?" />
          <FadeIn
            delay={0.06}
            className="mt-8 columns-1 gap-x-10 text-base leading-7 text-[#4a5068] md:text-lg lg:columns-2 [&_p]:mb-6 [&_p]:break-inside-avoid"
          >
            {introductionParagraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-[#e2e0d8] bg-[#faf9f6] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="History"
            title="A walk through the history"
            description="From ADC in 2018 to university-recognized Computer Science Society."
          />
          <div className="mt-10 space-y-6">
            {historyMilestones.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.04}>
                <article className="card-interactive p-6 lg:p-8">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="bg-[#3035B5] px-3 py-1 text-xs font-bold text-white">
                      {item.period}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-[#1a1f3d]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-[#4a5068] md:text-base">
                    {item.body.map((para) => (
                      <p key={para.slice(0, 48)}>{para}</p>
                    ))}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#e2e0d8] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader eyebrow="Mission" title="Objectives" />
          <FadeIn delay={0.06} className="mt-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {societyObjectives.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-3 border border-[#e2e0d8] bg-[#faf9f6] px-4 py-3 text-sm leading-6 text-[#4a5068]"
                >
                  <span className="font-bold text-[#3035B5]">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-[#e2e0d8] bg-[#faf9f6] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader eyebrow="Impact" title="Outcomes for students" />
          <FadeIn delay={0.06} className="mt-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {societyOutcomes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border border-[#e2e0d8] bg-white px-4 py-3 text-sm leading-6 text-[#4a5068]"
                >
                  <span className="mt-0.5 shrink-0 font-bold text-[#3CA049]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-[#e2e0d8] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Governance"
            title="How the society operates"
          />
          <FadeIn delay={0.06} className="mt-8">
            <ol className="grid gap-3 sm:grid-cols-2">
              {societyOperations.map((step, i) => (
                <li
                  key={step}
                  className="card-interactive flex gap-4 p-4 text-sm leading-7 text-[#4a5068]"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5B2D91]/10 text-sm font-bold text-[#5B2D91]"
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-[#e2e0d8] bg-[#faf9f6] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Committee"
            title="Composition of the society"
            description="Faculty mentors and the student roles that run each academic session."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <h3 className="text-base font-semibold text-[#1a1f3d]">
                Faculty members
              </h3>
              <ul className="mt-4 space-y-2">
                {facultyCommitteeRoles.map((member) => (
                  <li
                    key={member.name}
                    className="flex flex-wrap items-baseline justify-between gap-2 border border-[#e2e0d8] bg-white px-4 py-3"
                  >
                    <span className="font-medium text-[#1a1f3d]">
                      {member.name}
                    </span>
                    <span className="text-sm text-[#3035B5]">{member.role}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.06}>
              <h3 className="text-base font-semibold text-[#1a1f3d]">
                Student roles
              </h3>
              <p className="mt-2 text-sm text-[#4a5068]">
                Each session, students serve in roles such as:
              </p>
              <ul className="mt-4 space-y-2">
                {studentCommitteeRoles.map((role) => (
                  <li
                    key={role}
                    className="border border-[#e2e0d8] bg-white px-4 py-3 text-sm font-medium text-[#4a5068]"
                  >
                    {role}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-[#4a5068]">
                See the{" "}
                <Link
                  href="/team"
                  className="font-semibold text-[#3035B5] hover:underline"
                >
                  Team page
                </Link>{" "}
                for the current session&apos;s coordinators and domain leads.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.1} className="mt-8">
            <div className="border border-[#3035B5]/25 bg-[#3035B5]/5 p-6 lg:max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#3035B5]">
                Convener
              </p>
              <p className="mt-2 text-lg font-semibold text-[#1a1f3d]">
                {convenerProfile.name}
              </p>
              <p className="mt-1 text-sm text-[#4a5068]">
                {convenerProfile.title}
              </p>
              <p className="text-sm text-[#6b7280]">
                {convenerProfile.department}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#1a1f3d] py-14 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold">Contact</h2>
              <p className="mt-4 text-sm leading-7 text-[#c5c9e8]">
                {cssIdentity.address}
              </p>
              <a
                href={`mailto:${cssIdentity.email}`}
                className="mt-4 inline-block text-sm font-semibold text-white hover:underline"
              >
                {cssIdentity.email}
              </a>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">
                AMU quick links
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {amuPortalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#c5c9e8] hover:text-white hover:underline"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
