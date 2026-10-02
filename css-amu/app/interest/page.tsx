import InterestForm from "@/components/interest/InterestForm";

export default function InterestPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
            Student Interest Form
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-[#25297F] sm:text-5xl">
            Get Involved with CSS
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Tell us a little about yourself, your areas of interest, and how
            you would like to contribute to or engage with the Computer
            Science Society.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-6 sm:px-8 sm:py-6">
        <InterestForm />
      </section>
    </div>
  );
}