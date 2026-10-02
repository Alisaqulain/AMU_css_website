import ComingSoonHero from "@/components/ui/ComingSoonHero";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function MembershipFormPage() {
  return (
    <div className="relative min-h-[80vh]">
      <div className="absolute left-1/2 top-16 -translate-x-1/2">
        <AnimatedLogo size="md" />
      </div>
      <ComingSoonHero
        eyebrow="CSS Recruitment"
        title="Team recruitment opens soon"
        description="The next core team recruitment form will appear here. Follow our social accounts for the opening date."
        backHref="/team"
        backLabel="Meet the team"
      />
    </div>
  );
}
