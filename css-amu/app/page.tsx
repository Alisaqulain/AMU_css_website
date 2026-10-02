import Link from "next/link";

const highlights = [
  {
    title: "Hackathons",
    description:
      "Build, innovate, and solve real-world problems alongside fellow developers.",
    color: "text-[#3035B5]",
  },
  {
    title: "Workshops",
    description:
      "Learn new technologies and strengthen your practical skills through hands-on sessions.",
    color: "text-[#5B2D91]",
  },
  {
    title: "Competitions",
    description:
      "Challenge yourself through coding contests, CTFs, and other technical competitions.",
    color: "text-[#3CA049]",
  },
];

const events = [
  {
    title: "AMUHACKS 5.0",
    description:
      "A national-level hackathon bringing together students to build innovative solutions.",
    year: "2025",
  },
  {
    title: "AMUHACKS 4.0",
    description:
      "A flagship CSS hackathon focused on creativity, technology, and problem solving.",
    year: "2024",
  },
  {
    title: "Capture The Flag",
    description:
      "A cybersecurity-focused competition designed to test problem-solving and technical skills.",
    year: "2025",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-6 py-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#3035B5]">
              Department of Computer Science,
              <br />
              Aligarh Muslim University
            </p>

            <h1 className="text-5xl font-bold tracking-tight text-[#25297F] sm:text-6xl lg:text-8xl">
              Computer
              <br />
              <span className="text-slate-400">Science Society.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
              A community of students passionate about technology, innovation,
              problem-solving, and building things that matter.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-xl bg-[#3035B5] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#25297F]"
              >
                Explore Events
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/interest"
                className="inline-flex items-center justify-center rounded-xl border border-[#3035B5]/30 px-6 py-3.5 text-sm font-semibold text-[#3035B5] transition-all hover:border-[#3035B5] hover:bg-[#3035B5]/5"
              >
                Join the Community
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Logo Colors */}
        <div className="pointer-events-none absolute -right-20 top-20 hidden h-72 w-72 rounded-full bg-[#3035B5]/10 blur-3xl lg:block" />
        <div className="pointer-events-none absolute right-20 top-1/3 hidden h-56 w-56 rounded-full bg-[#5B2D91]/10 blur-3xl lg:block" />
        <div className="pointer-events-none absolute bottom-10 right-1/4 hidden h-40 w-40 rounded-full bg-[#3CA049]/10 blur-3xl lg:block" />
      </section>

      {/* What is CSS */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <div className="flex max-w-2xl flex-col justify-center gap-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
                About Us
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#25297F] sm:text-5xl">
                What is CSS?
              </h2>

              <div className="h-1 w-16 rounded-full bg-[#5B2D91]" />
            </div>

            <div>
              <p className="text-lg leading-8 text-slate-600">
                The Computer Science Society (CSS) is the dynamic and official
                club of the Department of Computer Science at Aligarh Muslim
                University (AMU). With Prof. Arman Rasool Faridi as the
                esteemed President and Mr. Misbahur Rahman as the dedicated
                Coordinator for this year's session, CSS continues to thrive as
                a hub of innovation and excellence.
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Founded in December 2018 as the Area of Dominant Coders (ADC),
                CSS has rapidly evolved into a vibrant platform for knowledge
                sharing, technical growth, and practical learning within the
                department. Our mission is to empower students with cutting-edge
                skills, fostering their readiness for the fast-evolving tech
                industry. CSS actively collaborates with the Training and
                Placement Office (TPO) of both the department and the university
                to provide students with invaluable industry insights, skill
                enhancement programs, and career-building opportunities.
              </p>

              <Link
                href="/interest"
                className="mt-8 inline-flex items-center font-semibold text-[#3035B5] transition-colors hover:text-[#5B2D91]"
              >
                Get involved
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
              What We Do
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#25297F] sm:text-5xl">
              Learn. Build. Compete.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-[#3035B5]/30 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${item.color}`}>
                    0{index + 1}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-slate-200 transition-colors group-hover:bg-[#3035B5]" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#25297F]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
                Our Journey
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#25297F] sm:text-5xl">
                Past Events
              </h2>
            </div>

            <Link
              href="/events"
              className="w-fit text-sm font-semibold text-slate-700 transition-colors hover:text-[#3035B5]"
            >
              View all events →
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {events.map((event, index) => (
              <article
                key={event.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#3035B5]/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#3035B5]">
                    {event.year}
                  </span>

                  <span className="text-slate-400 transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </div>

                <h3 className="mt-12 text-2xl font-bold text-[#25297F]">
                  {event.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {event.description}
                </p>

                <div
                  className={`mt-6 h-1 w-10 rounded-full ${
                    index === 0
                      ? "bg-[#3035B5]"
                      : index === 1
                        ? "bg-[#5B2D91]"
                        : "bg-[#3CA049]"
                  }`}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#25297F] px-8 py-16 text-center text-white sm:px-16">
            {/* Decorative accents */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#5B2D91]/50 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-[#3035B5]/50 blur-2xl" />
            <div className="pointer-events-none absolute bottom-10 left-1/4 h-20 w-20 rounded-full bg-[#3CA049]/20 blur-xl" />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                Get Involved
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Be part of the community.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                Tell us what you are interested in and what you would like to
                see from the Computer Science Society.
              </p>

              <Link
                href="/interest"
                className="mt-8 inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#3035B5] transition-all hover:bg-blue-50 hover:shadow-lg"
              >
                Show your Interest
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}