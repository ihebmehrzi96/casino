"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const linksContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCloseNav();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close menu on page navigation
  useEffect(() => {
    if (isOpen) {
      handleCloseNav();
    }
  }, [pathname]);

  const handleOpenNav = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";

    if (navRef.current) {
      gsap.killTweensOf(navRef.current);
      gsap.fromTo(
        navRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.65, ease: "power4.out" }
      );
    }

    if (linksContainerRef.current) {
      const links = linksContainerRef.current.querySelectorAll("li a");
      gsap.fromTo(
        links,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.45, ease: "power3.out", delay: 0.1 }
      );
    }
  };

  const handleCloseNav = () => {
    document.body.style.overflow = "";

    if (navRef.current) {
      gsap.killTweensOf(navRef.current);
      gsap.to(navRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power4.in",
        onComplete: () => {
          setIsOpen(false);
        },
      });
    } else {
      setIsOpen(false);
    }
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const languages = [
    { code: "en" as const, label: "EN", flag: "🇬🇧", name: "English" },
    { code: "fr" as const, label: "FR", flag: "🇫🇷", name: "Français" },
    { code: "de" as const, label: "DE", flag: "🇩🇪", name: "Deutsch" },
  ];

  const navLinks = [
    { name: t.nav.home || "Home", href: "/" },
    { name: t.nav.casinos || "Casinos", href: "/casinos" },
    { name: t.nav.bonuses || "Bonuses", href: "/bonuses" },
    { name: t.nav.freeGames || "Free Games", href: "/#free-games" },
    { name: t.nav.protocol || "Safety Protocol", href: "/#protocol" },
    { name: t.nav.blacklist || "Blacklist", href: "/blacklist" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-[#17131B]/90 backdrop-blur-xl border-b border-[#A9D8F5]/15 shadow-lg shadow-black/40"
            : "bg-[#17131B]/50 backdrop-blur-md border-b border-[#A9D8F5]/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Big Logo using font Tanker */}
            <Link href="/" className="inline-block group focus:outline-none">
              <span className="font-tanker tracking-wider text-3xl sm:text-4xl lg:text-[42px] text-[#F8F5F2] font-normal group-hover:text-[#F04464] transition-colors uppercase">
                Casinova
              </span>
            </Link>

            {/* Right: Animated Hamburger Button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleOpenNav}
                className="p-3 rounded-2xl hover:bg-white/10 transition group focus:outline-none cursor-pointer flex items-center justify-center border border-transparent hover:border-white/10"
                aria-label="Open Navigation Menu"
              >
                <div className="w-[30px] h-[20px] flex flex-col justify-between relative pointer-events-none">
                  <span className="block w-[30px] h-[3px] bg-[#F8F5F2] rounded-sm group-hover:bg-[#F04464] transition-colors" />
                  <span className="block w-[30px] h-[3px] bg-[#F8F5F2] rounded-sm group-hover:bg-[#F04464] transition-colors" />
                  <span className="block w-[30px] h-[3px] bg-[#F8F5F2] rounded-sm group-hover:bg-[#F04464] transition-colors" />
                </div>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Fullscreen Navigation Overlay ── */}
      <nav
        ref={navRef}
        className={`gsap-fullscreen-nav flex flex-col justify-between py-10 px-6 ${
          isOpen ? "is-open" : ""
        }`}
        aria-label="Fullscreen Navigation"
        aria-hidden={!isOpen}
      >
        
        {/* Top Bar: Casinova brand on Left, Close X on Right */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between px-2 sm:px-6">
          <h2 className="gsap-brand-title font-tanker tracking-wider text-3xl sm:text-4xl text-[#F8F5F2] font-normal uppercase">
            Casinova
          </h2>

          <div
            onClick={handleCloseNav}
            className="gsap-close"
            role="button"
            tabIndex={0}
            aria-label="Close Navigation Menu"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCloseNav();
            }}
          >
            <div />
          </div>
        </div>

        {/* Centered Area: Links and Bottom Controls */}
        <div className="my-auto text-center w-full max-w-xl mx-auto py-6">
          
          {/* Centered Navigation Links with Underline Hover Effect */}
          <ul ref={linksContainerRef} className="space-y-3 sm:space-y-4">
            {navLinks.map((item) => (
              <li key={item.href} className="my-2.5 sm:my-3.5">
                <Link
                  href={item.href}
                  onClick={handleCloseNav}
                  className="font-tanker text-2xl sm:text-3xl lg:text-4xl tracking-wider uppercase hover:text-[#F04464] transition-colors inline-block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom Preferences: Language Switcher */}
          <div className="mt-8 pt-8 border-t border-[#A9D8F5]/15 flex items-center justify-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#A9D8F5] font-mono mr-1">
              {t.nav.language || "Language"}:
            </span>
            <div className="flex items-center gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLang(l.code);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                    l.code === lang
                      ? "bg-[#F04464] text-[#F8F5F2] font-bold shadow-md shadow-[#F04464]/30 scale-105"
                      : "bg-[#1F1A25] hover:bg-[#26202D] text-[#A9D8F5] hover:text-[#F8F5F2] border border-[#A9D8F5]/20"
                  }`}
                >
                  <span className="text-sm">{l.flag}</span>
                  <span>{l.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Subtle footer credit inside menu */}
        <div className="text-center text-[11px] text-[#A9D8F5]/60 font-mono tracking-wider uppercase pb-2">
          Independent Casino Audits & Safe Play
        </div>

      </nav>
    </>
  );
}
