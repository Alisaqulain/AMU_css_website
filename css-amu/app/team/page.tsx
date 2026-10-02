import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";

const coreTeam = [
  {
    name: "Misbahur Rahman",
    designation: "Coordinator",
    image: "/team/misbahurrahman.jpg",
    linkedin: "https://www.linkedin.com/in/rahman-misbah",
  },
  {
    name: "Anshika Porwal",
    designation: "Secretary",
    image: "/team/anshikaporwal.jpg",
    linkedin: "https://www.linkedin.com/in/anshika-porwal-522a7b27a",
  },
  {
    name: "Tuba Rahman",
    designation: "Mentor",
    image: "/team/tubarahman.jpg",
    linkedin: "https://www.linkedin.com/in/tuba-rahman-200424255",
  },
  {
    name: "Syed Umar Ali",
    designation: "Mentor",
    image: "/team/umarali.jpg",
    linkedin: "https://www.linkedin.com/in/syed-umar-ali-1b2527291",
  },
];

const domainLeads = [
  {
    name: "Mohd Wasi Imam",
    designation: "AI/ML Lead",
    image: "/team/wasiimam.jpg",
    linkedin: "https://www.linkedin.com/in/mohd-wasi-imam-28a7b731b/",
  },
  {
    name: "Ali Saqulain",
    designation: "Web Development Lead",
    image: "/team/alisaqulain.jpg",
    linkedin: "https://www.linkedin.com/in/ali-saqulain-7404a8287",
  },
  {
    name: "Sameer Ahmad",
    designation: "Cybersecurity Lead",
    image: "/team/sameerahmad.jpg",
    linkedin: "https://www.linkedin.com/in/sameer-abrar",
  },
  {
    name: "Saurav Singh",
    designation: "DSA Mentor",
    image: "/team/sauravsingh.jpg",
    linkedin: "https://www.linkedin.com/in/saurav-singh-228554281",
  },
  {
    name: "Umaimah Mushtaq",
    designation: "DSA Lead",
    image: "/team/umaimahmushtaq.jpg",
    linkedin: "https://www.linkedin.com/in/umaimah-mushtaq-76a68932a",
  },
  {
    name: "Adeeba Ekbal",
    designation: "Co-AI/ML Lead",
    image: "/team/adeebaekbal.jpg",
    linkedin: "https://www.linkedin.com/in/adeeba-ekbal-50b30632a",
  },
  {
    name: "Mohd Amir Hasan",
    designation: "Co-Web Development Lead",
    image: "/team/amir.jpg",
    linkedin: "https://www.linkedin.com/in/amir-hasan-web-developer/",
  },
  {
    name: "Maria Ali",
    designation: "Co-Cybersecurity Lead",
    image: "/team/mariaali.jpg",
    linkedin: "https://www.linkedin.com/in/trynnafindmaria",
  },
];

function TeamCard({
  name,
  designation,
  image,
  linkedin,
}: {
  name: string;
  designation: string;
  image: string;
  linkedin: string;
}) {
  return (
    <article className="group w-[calc(50%-0.75rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#3035B5]/30 hover:shadow-xl sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] xl:w-[calc(25%-1.5rem)]">
      <div className="relative aspect-4/5 overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#25297F]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#25297F]">
              {name}
            </h2>

            <p className="mt-1 text-sm font-medium text-[#3035B5]">
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

export default function TeamPage() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
              Leadership
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#25297F] sm:text-4xl">
              Core Team
            </h2>

            <div className="mt-4 h-1 w-12 rounded-full bg-[#5B2D91]" />
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {coreTeam.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Domain Leads */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3035B5]">
              Technical Leadership
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#25297F] sm:text-4xl">
              Domain Leads
            </h2>

            <div className="mt-4 h-1 w-12 rounded-full bg-[#3CA049]" />

            <p className="mt-5 max-w-2xl text-slate-600">
              Meet the students leading the various technical domains of the
              Computer Science Society.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {domainLeads.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}