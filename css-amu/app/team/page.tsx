import TeamPageHero from "@/components/team/TeamPageHero";
import FacultyCommittee from "@/components/team/FacultyCommittee";
import TeamCategoryNav from "@/components/team/TeamCategoryNav";
import TeamCard, { teamCardWidthClass } from "@/components/team/TeamCard";
import FadeIn from "@/components/motion/FadeIn";
import { teamCategories } from "@/lib/team";

export default function TeamPage() {
  return (
    <>
      <TeamPageHero />
      <FacultyCommittee />
      <TeamCategoryNav categories={teamCategories} />

      {teamCategories.map((category, sectionIndex) => (
        <section
          key={category.id}
          id={`team-${category.id}`}
          className={`scroll-mt-32 py-16 lg:py-20 ${
            sectionIndex % 2 === 0 ? "bg-white" : "bg-slate-50/90"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FadeIn className="mb-12 max-w-2xl">
              <p
                className="text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: category.accent }}
              >
                {category.id === "core" ? "Leadership" : "Domain club"}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#25297F] sm:text-4xl">
                {category.title}
              </h2>
              <div
                className="mt-4 h-1 w-12 rounded-full"
                style={{ backgroundColor: category.accent }}
              />
              <p className="mt-5 text-slate-600">{category.subtitle}</p>
              <p className="mt-2 text-sm font-medium text-slate-500">
                {category.members.length}{" "}
                {category.members.length === 1 ? "member" : "members"}
              </p>
            </FadeIn>

            <div className="flex flex-wrap justify-center gap-8">
              {category.members.map((member, i) => (
                <FadeIn
                  key={member.name}
                  delay={i * 0.06}
                  className={teamCardWidthClass}
                >
                  <TeamCard {...member} accent={category.accent} className="w-full" />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
