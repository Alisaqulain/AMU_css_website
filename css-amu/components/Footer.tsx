import Link from "next/link";
import logo from "@/public/cslogo.png";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Past Events", href: "/events" },
  { name: "Current Team", href: "/team" },
  { name: "Interest Form", href: "/interest" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* About */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-950">
                <img src={logo.src} alt="Computer Science Society logo" />
              </div>

              <div>
                <p className="font-bold">Computer Science Society</p>
                <p className="text-xs text-slate-400">
                  Department of Computer Science
                </p>
              </div>
            </Link>

            <div className="flex text-left whitespace-nowrap flex-col text-sm leading-6 text-slate-400">
              <img src="/assets/ahlogo-rounded.png" alt="" className='w-15 rounded'/>
              <p>Aligarh Muslim University (AMU)</p>
              <p>202001, Aligarh</p>
              <p>society.cs@myamu.ac.in</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect With Us
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Follow the Computer Science Society for updates, events, and
              opportunities.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-600 hover:bg-slate-900 hover:text-white"
              >
                <FaInstagram aria-hidden="true" className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-600 hover:bg-slate-900 hover:text-white"
              >
                <FaLinkedinIn aria-hidden="true" className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-600 hover:bg-slate-900 hover:text-white"
              >
                <FaGithub aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Computer Science Society, AMU.
          </p>

          <p>Built by the CSS Web Development Team.</p>
        </div>
      </div>
    </footer>
  );
}