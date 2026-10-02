import FacultyLeadCards from "@/components/faculty/FacultyLeadCards";
import FadeIn from "@/components/motion/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FacultyLeadsSection() {
  return (
    <section className="border-b border-slate-200/80 bg-slate-50/80 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <SectionHeader
            eyebrow="Faculty"
            title="Society leadership"
            description="President and Convener of the Computer Science Society, AMU."
          />
          <FadeIn delay={0.08}>
            <FacultyLeadCards showTeamLink />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
