import FadeIn from "@/components/motion/FadeIn";
import {
  convenerProfile,
  facultyCommitteeRoles,
} from "@/lib/css-official";

export default function FacultyCommittee() {
  return (
    <section className="border-b border-slate-200/80 bg-linear-to-b from-slate-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
            Faculty committee
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#25297F]">
            Mentors & governance
          </h2>
          <p className="mt-4 text-slate-600 leading-7">
            Official faculty composition of the Computer Science Society as
            recognized by Aligarh Muslim University. Student leads for the
            current session are listed below by club category.
          </p>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facultyCommitteeRoles.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.03}>
              <div
                className={`rounded-2xl border p-5 ${
                  member.role === "President" || member.role === "Convener"
                    ? "border-[#3035B5]/30 bg-[#3035B5]/5"
                    : "border-slate-200 bg-white"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#3035B5]">
                  {member.role}
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug text-[#25297F]">
                  {member.name}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#5B2D91]">
              {convenerProfile.title}
            </p>
            <p className="mt-1 text-lg font-bold text-[#25297F]">
              {convenerProfile.name}
            </p>
            <p className="text-sm text-slate-500">{convenerProfile.department}</p>
          </div>
          <a
            href="/about"
            className="mt-4 inline-flex text-sm font-semibold text-[#3035B5] hover:underline lg:mt-0"
          >
            Full society history & objectives →
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
