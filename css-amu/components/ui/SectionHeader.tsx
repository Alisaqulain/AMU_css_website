import FadeIn from "@/components/motion/FadeIn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <FadeIn className={`w-full ${alignClass} ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#5b2d91]">
        {eyebrow}
      </p>
      <h2
        className="font-display mt-2 text-3xl font-semibold leading-tight text-[#1a1f3d] sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-3xl text-base leading-7 text-[#4a5068] ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
      {align === "left" && (
        <div className="mt-5 h-px w-16 bg-[#3035B5]" aria-hidden />
      )}
    </FadeIn>
  );
}
