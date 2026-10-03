import Link from "next/link";
import Image from "next/image";
import logo from "@/public/cslogo.png";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import { clubDomains } from "@/lib/site-content";
import { amuPortalLinks, cssIdentity } from "@/lib/css-official";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Interest form", href: "/interest" },
  { name: "Contact", href: "/contact" },
  { name: "Recruitment", href: "/membershipForm" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t-4 border-[#3035B5] bg-[#1a1f3d] text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 lg:flex-row lg:items-center lg:px-8">
          <p className="text-lg font-semibold">Join a club or the core team</p>
          <Link
            href="/interest"
            className="inline-flex items-center gap-2 bg-white px-5 py-2.5 text-sm font-semibold text-[#3035B5] hover:bg-[#f0f0f0]"
          >
            Interest form
            <FaArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-1.5 shadow-lg">
                <Image
                  src={logo}
                  alt="CSS logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-bold leading-tight">Computer Science Society</p>
                <p className="text-xs text-slate-400">Faculty of Science · AMU</p>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Formerly ADC (2018). Workshops, AMUHACKS, domain clubs, and placement
              support for CS students at Aligarh Muslim University.
            </p>
            <a
              href={`mailto:${cssIdentity.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10"
            >
              <FaEnvelope className="h-4 w-4 shrink-0 text-[#93b4ff]" aria-hidden />
              {cssIdentity.email}
            </a>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Site
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Technical fields
            </h3>
            <ul className="mt-4 space-y-2">
              {clubDomains.map((c) => (
                <li key={c.id}>
                  <Link
                    href="/interest"
                    className="group flex items-center justify-between text-sm text-slate-400 transition hover:text-white"
                  >
                    <span>{c.name}</span>
                    <span
                      className="h-2 w-2 rounded-full opacity-60 group-hover:opacity-100"
                      style={{ backgroundColor: c.accent }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Connect
            </h3>
            <div className="mt-4 flex gap-2">
              {[
                {
                  icon: FaInstagram,
                  label: "CSS on Instagram",
                  href: "https://www.instagram.com/css.amu/",
                },
                {
                  icon: FaLinkedinIn,
                  label: "CSS on LinkedIn",
                  href: "https://www.linkedin.com/company/cssamu",
                },
                {
                  icon: FaGithub,
                  label: "CSS on GitHub",
                  href: "https://github.com/CSS-AMU",
                },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-slate-400 ring-1 ring-white/10 transition hover:bg-[#3035B5]/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-slate-500">
              {cssIdentity.address}
            </p>
            <ul className="mt-4 space-y-2">
              {amuPortalLinks.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-slate-300"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Computer Science Society, AMU.</p>
          <p className="text-slate-600">Built by the CSS Web Development Team.</p>
        </div>
      </div>
    </footer>
  );
}
