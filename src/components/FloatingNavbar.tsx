"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Flame, Gift, ShieldAlert, Menu, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FloatingNavbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active navigation link tracking based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "top-casinos", "bonuses-preview", "free-games", "protocol"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Top Casinos", href: "#top-casinos", id: "top-casinos" },
    { name: "Bonuses", href: "/bonuses", id: "bonuses-preview" },
    { name: "Free Games", href: "#free-games", id: "free-games" },
    { name: "Audits", href: "#protocol", id: "protocol" },
    { name: "Blacklist", href: "/blacklist", id: "blacklist", badge: "24" },
  ];

  return (
    <>
      {/* ── Floating Pill Navbar ── */}
      <nav className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-5xl bg-[#141518]/90 backdrop-blur-xl rounded-full px-5 sm:px-7 py-2.5 sm:py-3 border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.65)] transition-all">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <span className="w-7 h-7 rounded-full bg-white text-black font-extrabold text-xs flex items-center justify-center font-mono">
              C
            </span>
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-zinc-200 transition">
              CASINOVA<span className="text-[10px] text-zinc-400 font-sans ml-0.5">®</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-5 list-none m-0 p-0">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={`relative text-xs font-semibold transition-all py-1 duration-200 flex items-center gap-1.5 ${
                        isActive ? "text-white" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full transition-all" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Pill */}
            <div className="flex items-center p-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold">
              {(["en", "fr", "de"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded-full uppercase transition ${
                    lang === l ? "bg-white text-black font-extrabold shadow-sm" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Login & Sign Up */}
            <Link
              href="/casinos"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white border border-white/10 hover:border-white/30 transition"
            >
              Sign In
            </Link>

            <a
              href="#top-casinos"
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-white hover:bg-zinc-200 text-black transition shadow-sm hover:scale-[1.02]"
            >
              Explore
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-1 hover:text-zinc-300 transition"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-4 right-4 z-40 bg-[#16171B]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <ul className="space-y-3 list-none p-0 m-0">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-semibold text-zinc-300 hover:text-white py-2 border-b border-white/5"
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-3 flex items-center justify-between gap-3">
            <Link
              href="/casinos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-1/2 py-2 text-center rounded-full text-xs font-semibold text-zinc-300 border border-white/15"
            >
              Sign In
            </Link>
            <a
              href="#top-casinos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-1/2 py-2 text-center rounded-full text-xs font-bold bg-white text-black"
            >
              Explore
            </a>
          </div>
        </div>
      )}
    </>
  );
}
