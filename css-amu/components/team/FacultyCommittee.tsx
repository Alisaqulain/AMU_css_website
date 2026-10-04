import Image from "next/image";
import FadeIn from "@/components/motion/FadeIn";
import FacultyLeadCards from "@/components/faculty/FacultyLeadCards";
import Link from "next/link";
import { facultyCommitteeRoles } from "@/lib/css-official";

type FacultyRole = (typeof facultyCommitteeRoles)[number];

function isFeaturedRole(role: string) {
  return role === "President" || role === "Convener";
}

function FacultyCard({ member }: { member: FacultyRole }) {
  return (
    <article className="card-interactive flex items-center gap-4 p-4">
      <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:h-20 sm:w-20">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="80px"
          className="object-cover object-top"
        />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#3035B5] sm:text-xs">
          {member.role}
        </p>
        <p className="mt-1 text-sm font-semibold leading-snug text-[#25297F] sm:text-base">
          {member.name}
        </p>
      </div>
    </article>
  );
}

export default function FacultyCommittee() {
  const others = facultyCommitteeRoles.filter(
    (m) => !isFeaturedRole(m.role),
  );

  return (
    <section className="border-b border-slate-200/80 bg-linear-to-b from-slate-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="mb-8 max-w-2xl">
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

        <FadeIn delay={0.05} className="mx-auto max-w-2xl lg:mx-0">
          <FacultyLeadCards />
        </FadeIn>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((member, i) => (
            <FadeIn key={member.name} delay={0.06 + i * 0.03}>
              <FacultyCard member={member} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15} className="mt-8 text-center sm:text-left">
          <Link
            href="/about"
            className="text-sm font-semibold text-[#3035B5] hover:underline"
          >
            Full society history & objectives →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
