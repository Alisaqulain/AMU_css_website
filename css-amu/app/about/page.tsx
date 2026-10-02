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
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-8">
          <FadeIn className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
              About the society
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#25297F] sm:text-5xl">
              Computer Science Society
            </h1>
            <p className="mt-3 text-lg font-medium text-[#5B2D91]">
              {cssIdentity.affiliation}
            </p>
            <p className="mt-6 text-slate-600 leading-8">
              Formerly the <strong>Area of Dominant Coders (ADC)</strong>. Sharing
              computer science across the Faculty of Science since December 2018.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/team"
                className="rounded-xl bg-[#3035B5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#25297F]"
              >
                Current student team
              </Link>
              <Link
                href="/events"
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-[#25297F] hover:border-[#3035B5]"
              >
                Events & hackathons
              </Link>
            </div>
          </FadeIn>
          <AnimatedLogo size="lg" className="hidden lg:block" />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader eyebrow="Introduction" title="What is CSS?" />
          <FadeIn delay={0.08} className="mt-10 max-w-4xl space-y-6 text-lg leading-8 text-slate-600">
            {introductionParagraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="History"
            title="A walk through the history"
            description="From ADC in 2018 to university-recognized Computer Science Society."
          />
          <div className="mt-14 space-y-12">
            {historyMilestones.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.05}>
                <article
                  className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm lg:p-10"
                >
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="rounded-full bg-[#3035B5] px-4 py-1 text-sm font-bold text-white">
                      {item.period}
                    </span>
                    <h3 className="text-2xl font-bold text-[#25297F]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mt-6 space-y-4 text-slate-600 leading-8">
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

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Mission" title="Objectives" />
              <FadeIn delay={0.06} className="mt-8">
                <ul className="space-y-3">
                  {societyObjectives.map((item, i) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm leading-6 text-slate-700"
                    >
                      <span className="font-bold text-[#3035B5]">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <div>
              <SectionHeader eyebrow="Impact" title="Outcomes for students" />
              <FadeIn delay={0.1} className="mt-8">
                <ul className="space-y-3">
                  {societyOutcomes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-6 text-slate-700"
                    >
                      <span className="mt-1 text-[#3CA049]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Governance"
            title="How the society operates"
          />
          <FadeIn delay={0.06} className="mt-10">
            <ol className="grid gap-4 md:grid-cols-2">
              {societyOperations.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600"
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

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Committee"
            title="Composition of the society"
            description="Faculty mentors and the student roles that run each academic session."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <FadeIn>
              <h3 className="text-lg font-bold text-[#25297F]">Faculty members</h3>
              <ul className="mt-6 space-y-3">
                {facultyCommitteeRoles.map((member) => (
                  <li
                    key={member.name}
                    className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <span className="font-medium text-[#25297F]">{member.name}</span>
                    <span className="text-sm text-[#3035B5]">{member.role}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-[#3035B5]/20 bg-[#3035B5]/5 p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#3035B5]">
                  Convener
                </p>
                <p className="mt-2 text-xl font-bold text-[#25297F]">
                  {convenerProfile.name}
                </p>
                <p className="mt-1 text-sm text-slate-600">{convenerProfile.title}</p>
                <p className="text-sm text-slate-500">{convenerProfile.department}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h3 className="text-lg font-bold text-[#25297F]">Student roles</h3>
              <p className="mt-2 text-sm text-slate-600">
                Each session, students serve in roles such as:
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {studentCommitteeRoles.map((role) => (
                  <li
                    key={role}
                    className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
                  >
                    {role}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-slate-600">
                See the{" "}
                <Link href="/team" className="font-semibold text-[#3035B5] hover:underline">
                  Team page
                </Link>{" "}
                for the current session&apos;s student coordinators, mentors, and domain
                leads.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-[#25297F] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Contact</h2>
              <p className="mt-4 text-blue-100 leading-7">{cssIdentity.address}</p>
              <a
                href={`mailto:${cssIdentity.email}`}
                className="mt-4 inline-block font-semibold text-white hover:text-blue-200"
              >
                {cssIdentity.email}
              </a>
            </div>
            <div>
              <h2 className="text-2xl font-bold">AMU quick links</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {amuPortalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-100 hover:text-white hover:underline"
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
