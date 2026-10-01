import Link from "next/link";

const highlights = [
  {
    title: "Hackathons",
    description:
      "Build, innovate, and solve real-world problems alongside fellow developers.",
  },
  {
    title: "Workshops",
    description:
      "Learn new technologies and strengthen your practical skills through hands-on sessions.",
  },
  {
    title: "Competitions",
    description:
      "Challenge yourself through coding contests, CTFs, and other technical competitions.",
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
      <section className="relative overflow-hidden">
        <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-6 py-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Department of Computer Science,
              <br />
              Aligarh Muslim University
            </p>

            <h1 className="text-5xl font-bold tracking-tight text-blue-950 sm:text-6xl lg:text-8xl">
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
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800">
                Explore Events
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/interest"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-950 hover:text-slate-950">
                Join the Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is CSS */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <div className="max-w-2xl flex flex-col justify-center gap-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                About Us
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                What is CSS?
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-slate-600">
                The Computer Science Society (CSS) is the dynamic and official club of the Department of Computer Science at Aligarh Muslim University (AMU). With Prof. Arman Rasool Faridi as the esteemed President and Mr. Misbahur Rahman as the dedicated Coordinator for this year's session, CSS continues to thrive as a hub of innovation and excellence.
              </p>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Founded in December 2018 as the Area of Dominant Coders (ADC), CSS has rapidly evolved into a vibrant platform for knowledge sharing, technical growth, and practical learning within the department. Our mission is to empower students with cutting-edge skills, fostering their readiness for the fast-evolving tech industry.CSS actively collaborates with the Training and Placement Office (TPO) of both the department and the university to provide students with invaluable industry insights, skill enhancement programs, and career-building opportunities.
              </p>

              <Link
                href="/interest"
                className="mt-8 inline-flex items-center font-semibold text-slate-950 transition-colors hover:text-blue-600">
                Get involved
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              What We Do
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Learn. Build. Compete.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
                <span className="text-sm font-semibold text-slate-400">
                  0{index + 1}
                </span>

                <h3 className="mt-8 text-2xl font-bold text-slate-950">
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

      <section className="border-t border-slate-200 bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Our Journey
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Past Events
              </h2>
            </div>

            <Link
              href="/events"
              className="w-fit text-sm font-semibold text-slate-700 transition-colors hover:text-blue-600">
              View all events →
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-colors hover:border-slate-300 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{event.year}</span>

                  <span className="text-slate-500 transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </div>

                <h3 className="mt-12 text-2xl font-bold text-slate-950">{event.title}</h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {event.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-8 py-16 text-center text-slate-900 sm:px-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Be part of the community.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Tell us what you are interested in and what you would like to see
              from the Computer Science Society.
            </p>

            <Link
              href="/interest"
              className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500">
              Student Interest Form
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}