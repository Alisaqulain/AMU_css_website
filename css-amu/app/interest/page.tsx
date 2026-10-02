import InterestForm from "@/components/interest/InterestForm";
import AnimatedLogo from "@/components/AnimatedLogo";
import FadeIn from "@/components/motion/FadeIn";
import { clubDomains } from "@/lib/site-content";

export default function InterestPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-slate-200/60">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <div className="flex flex-col items-center text-center">
            <AnimatedLogo size="md" />
            <FadeIn className="mt-8 max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
                Club Interest Form
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-[#25297F] sm:text-5xl">
                Club interest form
              </h1>
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
