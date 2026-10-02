import Image from "next/image";
import Link from "next/link";
import { facultyLeadCards } from "@/lib/css-official";

type FacultyLeadCardsProps = {
  showTeamLink?: boolean;
  className?: string;
};

export default function FacultyLeadCards({
  showTeamLink = false,
  className = "",
}: FacultyLeadCardsProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {facultyLeadCards.map((member) => (
          <article
            key={member.role}
            className="flex items-center gap-4 rounded-2xl border border-[#3035B5]/20 bg-white p-4 shadow-sm"
          >
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
        ))}
      </div>
      {showTeamLink && (
        <p className="mt-5 text-center sm:text-left">
          <Link
            href="/team"
            className="text-sm font-semibold text-[#3035B5] hover:underline"
          >
            View full faculty committee →
          </Link>
        </p>
      )}
    </div>
  );
}
