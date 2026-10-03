import Image from "next/image";
import InterestForm from "@/components/interest/InterestForm";
import FadeIn from "@/components/motion/FadeIn";
import JsonLd from "@/components/seo/JsonLd";
import { clubDomains } from "@/lib/site-content";
import { pageMetadata, webPageJsonLd } from "@/lib/site-seo";
import logo from "@/public/cslogo.png";

const pageTitle = "Club interest form";
const pageDescription =
  "Submit your club interest for CSS AMU: AI/ML, Web Development, Cybersecurity, or DSA. Department of Computer Science, Aligarh Muslim University.";

export const metadata = pageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/interest",
  keywords: [
    "CSS AMU club interest",
    "join computer science society AMU",
    "AI ML club AMU",
    "web development club AMU",
    "DSA club AMU",
    "cybersecurity club AMU",
  ],
});

export default function InterestPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={webPageJsonLd({
          name: pageTitle,
          description: pageDescription,
          path: "/interest",
        })}
      />
      <section className="relative overflow-hidden border-b border-slate-200/60">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <div className="flex flex-col items-center text-center">
            <FadeIn className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
                Club Interest Form
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
                  Club interest form
                </h1>
              </div>
              <p className="mx-auto mt-5 text-base leading-7 text-slate-600">
                Pick AI/ML, Web Development, Cybersecurity, or DSA. A domain lead
                will review your form and reply with next steps.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.1} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {clubDomains.map((club) => (
              <div
                key={club.id}
                className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 text-center backdrop-blur-sm"
              >
                <p className="text-sm font-bold" style={{ color: club.accent }}>
                  {club.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">{club.tagline}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <InterestForm />
      </section>
    </div>
  );
}
