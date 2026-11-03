"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NakulaDrawerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  // Escape key closes menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const languages = [
    { code: "en" as const, label: "EN", flag: "🇬🇧" },
    { code: "fr" as const, label: "FR", flag: "🇫🇷" },
    { code: "de" as const, label: "DE", flag: "🇩🇪" },
  ];

  return (
    <>
      {/* 2-Line Circular Toggle Button (Nakula Exact Style) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="w-10 h-10 rounded-full border border-white/20 hover:border-white bg-zinc-950/80 hover:bg-white text-white hover:text-black flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-lg group"
      >
        <span className="w-4 h-[1.75px] bg-current group-hover:scale-x-110 transition-transform" />
        <span className="w-4 h-[1.75px] bg-current group-hover:scale-x-110 transition-transform" />
      </button>

      {/* Menu Overlay & Drawer (Clean CSS Slide-In: No GSAP on Menu, Fast & Normal) */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Dark Blurring Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          onClick={() => setIsOpen(false)}
        />

        {/* Right-Aligned Drawer Panel (Exact Nakula Layout from Screenshot 4) */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full sm:w-[480px] bg-[#0E100F] border-l border-white/10 p-6 sm:p-12 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-2xl transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top Bar: ■ MENU and ( ✕ ) Close Button */}
          <div className="flex items-center justify-between pb-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-white">
              <span className="w-2 h-2 bg-[#FF4925] rounded-none inline-block" />
              <span>MENU</span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-full border border-white/20 hover:border-white bg-transparent hover:bg-white text-zinc-300 hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Giant Stacked Links in 'Anton' Display Font with Thin Divider Lines */}
          <nav className="my-auto py-4 space-y-0">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between py-4 sm:py-5 border-b border-white/10 hover:border-white/30 transition-colors"
            >
              <span className="font-nakula text-5xl sm:text-6xl text-white group-hover:text-zinc-300 tracking-tight uppercase flex items-center gap-2">
                HOME
                <span className="w-2 h-2 bg-[#FF4925] rounded-none inline-block ml-1" />
              </span>
            </Link>

            <Link
              href="/casinos"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between py-4 sm:py-5 border-b border-white/10 hover:border-white/30 transition-colors"
            >
              <span className="font-nakula text-5xl sm:text-6xl text-white group-hover:text-zinc-300 tracking-tight uppercase">
                CASINOS
              </span>
            </Link>

            <Link
              href="/bonuses"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between py-4 sm:py-5 border-b border-white/10 hover:border-white/30 transition-colors"
            >
              <span className="font-nakula text-5xl sm:text-6xl text-white group-hover:text-zinc-300 tracking-tight uppercase">
                BONUSES
              </span>
            </Link>

            <a
              href="#free-games"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between py-4 sm:py-5 border-b border-white/10 hover:border-white/30 transition-colors"
            >
              <span className="font-nakula text-5xl sm:text-6xl text-white group-hover:text-zinc-300 tracking-tight uppercase">
                FREE GAMES
              </span>
            </a>

            <a
              href="#protocol"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between py-4 sm:py-5 border-b border-white/10 hover:border-white/30 transition-colors"
            >
              <span className="font-nakula text-5xl sm:text-6xl text-white group-hover:text-zinc-300 tracking-tight uppercase">
                SAFETY AUDITS
              </span>
            </a>

            <Link
              href="/blacklist"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between py-4 sm:py-5 border-b border-white/10 hover:border-red-500/30 transition-colors"
            >
              <span className="font-nakula text-5xl sm:text-6xl text-red-400 group-hover:text-red-300 tracking-tight uppercase">
                BLACKLIST
              </span>
            </Link>
          </nav>

          {/* Drawer Bottom Metadata & Contact (Exact Nakula Footer Layout from Screenshot 4) */}
          <div className="pt-8 space-y-6">
            {/* Language Switcher in a Row */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider mb-2">
                (LANGUAGE)
              </div>
              <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/10">
                {languages.map((l) => {
                  const isSelected = l.code === lang;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLang(l.code)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                        isSelected
                          ? "bg-white text-black shadow-md font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span className="font-mono text-[11px]">{l.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email in Bold Orange Font (hello@nakula.com style) */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider mb-1">
                (EMAIL)
              </div>
              <a
                href="mailto:hello@casinova.io"
                className="text-2xl sm:text-3xl font-bold text-[#FF4925] hover:underline transition inline-block font-sans"
              >
                hello@casinova.io
              </a>
            </div>

            {/* Socials (Exact Nakula Layout from Screenshot 8) */}
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-zinc-500 tracking-wider mb-2">
                (COMMUNITY & SOCIALS)
              </div>
              <div className="flex items-center gap-5 text-sm font-bold text-zinc-300">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  <span>X / Twitter</span>
                  <span className="text-zinc-500">↗</span>
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  <span>Telegram</span>
                  <span className="text-zinc-500">↗</span>
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-white transition"
                >
                  <span>Discord</span>
                  <span className="text-zinc-500">↗</span>
                </a>
              </div>
            </div>

            {/* Standards */}
            <div className="text-xs font-semibold text-zinc-500 flex items-center justify-between pt-2 border-t border-white/5">
              <span>eCOGRA Certified</span>
              <span>MGA Verified</span>
              <span>UKGC Audited</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}