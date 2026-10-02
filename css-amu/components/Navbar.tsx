"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "@/components/AnimatedLogo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

const joinOptions = [
  {
    href: "/interest",
    title: "Join a club",
    description: "AI/ML, Web Dev, Cybersecurity, DSA",
  },
  {
    href: "/membershipForm",
    title: "Join the team",
    description: "Core team & society roles",
  },
];

function NavLink({
  href,
  name,
  onClick,
  mobile,
}: {
  href: string;
  name: string;
  onClick?: () => void;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const active =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`block rounded-xl px-4 py-3.5 text-base font-medium transition ${
          active
            ? "bg-[#3035B5]/10 text-[#3035B5]"
            : "text-slate-700 hover:bg-slate-100"
        }`}
      >
        {name}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors lg:px-4 ${
        active
          ? "text-[#3035B5]"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {name}
      {active && (
        <motion.span
          layoutId="nav-pill-desktop"
          className="absolute inset-0 -z-10 rounded-full bg-[#3035B5]/10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

function JoinButton({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const joinActive =
    pathname.startsWith("/interest") ||
    pathname.startsWith("/membershipForm");

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const pick = (href: string) => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center justify-center gap-2 rounded-xl bg-[#3035B5] px-3.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#3035B5]/20 transition hover:bg-[#25297F] sm:px-4 ${
          joinActive ? "ring-2 ring-[#3035B5]/30 ring-offset-2" : ""
        }`}
      >
        Join
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs opacity-90"
          aria-hidden
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 mt-2 w-[min(calc(100vw-2rem),17rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
          >
            {joinOptions.map((opt) => {
              const active = pathname.startsWith(opt.href);
              return (
                <Link
                  key={opt.href}
                  href={opt.href}
                  role="menuitem"
                  onClick={() => pick(opt.href)}
                  className={`block border-b border-slate-100 px-4 py-4 last:border-0 transition hover:bg-slate-50 ${
                    active ? "bg-[#3035B5]/5" : ""
                  }`}
                >
                  <span className="font-semibold text-[#25297F]">
                    {opt.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                    {opt.description}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-3"
        >
          <AnimatedLogo size="sm" className="!h-9 !w-9 shrink-0 sm:!h-10 sm:!w-10" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight text-slate-900">
              <span className="sm:hidden">CSS</span>
              <span className="hidden sm:inline">Computer Science Society</span>
            </p>
            <p className="truncate text-[10px] text-slate-500 sm:text-[11px]">
              AMU
            </p>
          </div>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} name={link.name} />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <JoinButton />

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-lg text-slate-700 lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative z-50 max-h-[min(70dvh,24rem)] overflow-y-auto border-b border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden"
            >
              <nav className="mx-auto flex max-w-lg flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    name={link.name}
                    mobile
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
