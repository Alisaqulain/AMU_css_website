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
    <FadeIn className={`max-w-3xl ${alignClass} ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#3035B5]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#25297F] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
      )}
      <div
        className={`mt-6 h-1 w-14 rounded-full bg-linear-to-r from-[#3035B5] via-[#5B2D91] to-[#3CA049] ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </FadeIn>
  );
}
