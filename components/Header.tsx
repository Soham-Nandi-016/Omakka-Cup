"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Swords } from "lucide-react";

const navLinks = [
  { href: "/",            label: "Home" },
  { href: "/rules",       label: "Rules" },
  { href: "/categories",  label: "Categories" },
  { href: "/venue",       label: "Venue" },
  { href: "/register",    label: "Register" },
  { href: "/admin",       label: "Admin" },
];

export default function Header() {
  const pathname  = usePathname();
  const [open,    setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-900/95 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-brand-crimson flex items-center justify-center shadow-crimson-glow group-hover:shadow-[0_0_20px_rgba(200,16,46,0.6)] transition-shadow">
              <Swords className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none">
              <span className="block text-sm font-black tracking-wider text-white">OMAKKA</span>
              <span className="block text-[10px] font-semibold tracking-[0.15em] text-brand-gold">CUP 2026</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              const isRegister = href === "/register";
              if (isRegister) {
                return (
                  <Link key={href} href={href} className="btn-crimson text-sm px-5 py-2 ml-2">
                    Register Now
                  </Link>
                );
              }
              if (href === "/admin") {
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "text-brand-gold" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {label}
                  </Link>
                );
              }
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-brand-gold bg-brand-gold/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-surface-900/98 backdrop-blur-md border-b border-white/[0.06]">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              const isRegister = href === "/register";
              return (
                <Link
                  key={href}
                  href={href}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isRegister
                      ? "bg-brand-crimson text-white text-center mt-2"
                      : isActive
                      ? "bg-brand-gold/10 text-brand-gold"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isRegister ? "🥋 Register Now" : label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
