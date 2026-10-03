import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";

export const teamCardWidthClass = "w-full";

export default function TeamCard({
  name,
  designation,
  image,
  linkedin,
  accent = "#3035B5",
  className = "",
}: {
  name: string;
  designation: string;
  image: string;
  linkedin: string;
  accent?: string;
  className?: string;
}) {
  return (
    <article
      className={`card-interactive group h-full overflow-hidden ${className}`}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div
          className="absolute left-0 top-0 h-1 w-full"
          style={{ backgroundColor: accent }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#25297F]">{name}</h2>
            <p className="mt-1 text-sm font-medium" style={{ color: accent }}>
              {designation}
            </p>
          </div>

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name}'s LinkedIn profile`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-[#3035B5] hover:bg-[#3035B5] hover:text-white"
          >
            <FaLinkedinIn className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
