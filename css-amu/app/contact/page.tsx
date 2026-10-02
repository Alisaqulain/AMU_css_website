import ContactForm from "@/components/contact/ContactForm";
import AnimatedLogo from "@/components/AnimatedLogo";
import FadeIn from "@/components/motion/FadeIn";
import { cssIdentity } from "@/lib/css-official";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-slate-200/60">
        <div className="pointer-events-none absolute inset-0 mesh-gradient" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <div className="flex flex-col items-center text-center">
            <AnimatedLogo size="md" />
            <FadeIn className="mt-8 max-w-2xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
                Contact us
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-[#25297F] sm:text-5xl">
                Reach the Computer Science Society
              </h1>
              <p className="mx-auto mt-5 text-base leading-7 text-slate-600">
                Questions about clubs, events, or collaborations? Send a message
                below or email us at{" "}
                <a
                  href={`mailto:${cssIdentity.email}`}
                  className="font-semibold text-[#3035B5] hover:underline"
                >
                  {cssIdentity.email}
                </a>
                .
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
        <ContactForm />
      </section>
    </div>
  );
}
