"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AnimatedLogo from "@/components/AnimatedLogo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

const joinOptions = [
  { href: "/interest", title: "Join a club", description: "AI/ML, Web, Cyber, DSA" },
  { href: "/membershipForm", title: "Join the team", description: "Core roles" },
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
        className={`block border-l-2 py-3 pl-4 text-base font-medium ${
          active
            ? "border-[#3035B5] text-[#3035B5]"
            : "border-transparent text-[#4a5068] hover:border-[#c9c6bc]"
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
      className={`border-b-2 px-2 py-2 text-sm font-medium transition-colors lg:px-3 ${
        active
          ? "border-[#3035B5] text-[#3035B5]"
          : "border-transparent text-[#4a5068] hover:text-[#1a1f3d]"
      }`}
    >
      {name}
    </Link>
  );
}

function JoinButton({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="btn-primary py-2.5 text-sm"
      >
        Join
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-52 border border-[#e2e0d8] bg-white shadow-md"
        >
          {joinOptions.map((opt) => (
            <Link
              key={opt.href}
              href={opt.href}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="block border-b border-[#eee] px-4 py-3 last:border-0 hover:bg-[#faf9f6]"
            >
              <span className="font-semibold text-[#1a1f3d]">{opt.title}</span>
              <span className="mt-0.5 block text-xs text-[#6b7280]">
                {opt.description}
              </span>
            </Link>
          ))}
        </div>
      )}
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
    <header className="sticky top-0 z-50 border-b border-[#e2e0d8] bg-[#faf9f6]/95">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none sm:gap-3"
        >
          <AnimatedLogo size="sm" className="!h-9 !w-9 shrink-0 border-0 bg-transparent p-0 sm:!h-10 sm:!w-10" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight text-[#1a1f3d]">
              <span className="sm:hidden">CSS</span>
              <span className="hidden sm:inline">Computer Science Society</span>
            </p>
            <p className="truncate text-[10px] text-[#6b7280] sm:text-[11px]">
              AMU
            </p>
          </div>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} name={link.name} />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <JoinButton />

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center border border-[#e2e0d8] bg-white text-lg text-[#1a1f3d] lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-50 border-b border-[#e2e0d8] bg-white px-4 py-4 lg:hidden">
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
          </div>
        </>
      )}
    </header>
  );
}
