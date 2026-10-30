import Image from "next/image";
import TeamForm from "@/components/team/TeamForm";
import FadeIn from "@/components/motion/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { CLUB_ACCENT, CLUB_OPTIONS } from "@/lib/clubs";
import { pageMetadata, webPageJsonLd } from "@/lib/site-seo";
import logo from "@/public/cslogo.png";

const pageTitle = "Join the team";
const pageDescription =
  "Apply for the CSS AMU core team: Graphics, Social Media & PR, Volunteer Crew, Technical, Editorial, Logistics, Web Dev, AI/ML, and Cyber.";

export const metadata = pageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/membershipForm",
  keywords: [
    "CSS AMU team recruitment",
    "join CSS core team",
    "Computer Science Society AMU apply",
  ],
});

export default function MembershipFormPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={webPageJsonLd({
          name: pageTitle,
          description: pageDescription,
          path: "/membershipForm",
        })}
      />
      <section className="relative overflow-hidden border-b border-slate-200/60">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <div className="flex flex-col items-center text-center">
            <FadeIn className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
                Core team recruitment
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
                <Image
                  src={logo}
                  alt="Computer Science Society AMU logo"
                  width={72}
                  height={72}
                  className="h-16 w-16 shrink-0 rounded-2xl shadow-md sm:h-[4.5rem] sm:w-[4.5rem]"
                  priority
                />
                <h1 className="text-4xl font-bold tracking-tight text-[#25297F] sm:text-5xl">
                  Join the team
                </h1>
              </div>
              <p className="mx-auto mt-5 text-base leading-7 text-slate-600">
                Apply with your academic details and resume. Shortlisted
                candidates will receive an interview call shortly.
              </p>
            </FadeIn>
          </div>

          <FadeIn
            delay={0.1}
            className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CLUB_OPTIONS.map((team) => (
              <div
                key={team}
                className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 text-center backdrop-blur-sm"
              >
                <p
                  className="text-sm font-bold"
                  style={{ color: CLUB_ACCENT[team] }}
                >
                  {team}
                </p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <TeamForm />
      </section>
    </div>
  );
}
