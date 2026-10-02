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
        description="We're polishing the next recruitment cycle. Stay tuned on our socials — the form will go live here when applications open."
        backHref="/team"
        backLabel="Meet the team"
      />
    </div>
  );
}
