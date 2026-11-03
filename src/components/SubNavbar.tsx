"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocation, SUPPORTED_COUNTRIES } from "@/context/LocationContext";
import CompareModal from "@/components/CompareModal";
import BonusCalculatorModal from "@/components/BonusCalculatorModal";
import {
  ChevronDown,
  Check,
  Flame,
  Gift,
  Coins,
  Calculator,
  Layers,
  ShieldAlert,
  Dices,
  BookOpen,
  Sparkles,
  CreditCard,
  Zap,
  Globe,
  Award,
  Gamepad2,
  HelpCircle,
  Wrench,
  Newspaper,
} from "lucide-react";

interface SubNavbarProps {
  casinos?: any[];
}

export default function SubNavbar({ casinos = [] }: SubNavbarProps) {
  const pathname = usePathname();
  const { country, setCountryByCode } = useLocation();

  // Active menu: 'casinos' | 'games' | 'guides' | 'tools' | null
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Smooth hover handlers with 350ms safety buffer so cursor transitions never flicker or drop
  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 350);
  };

  const toggleMenu = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <>
      {/* SECONDARY NAVIGATION BAR (CasinoFreak Layout & Vaultora Monochromatic Black Matte Style) */}
      <div
        className="relative w-full border-b border-white/10 bg-zinc-950/95 backdrop-blur-md sticky top-20 z-40 text-xs font-bold"
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left Nav Tabs (CasinoFreak tabs: New Casinos, No Deposit, Free Spins, Casinos ⌵, Games ⌵, Guides ⌵, Tools NEW, Blog) */}
            <div className="flex items-center h-full overflow-x-auto no-scrollbar">
              {/* 1. New Casinos */}
              <Link
                href="/casinos?sort=new"
                className="h-full flex items-center px-3 sm:px-4 text-zinc-300 hover:text-white hover:bg-zinc-900/80 transition-colors uppercase tracking-wider text-[11px] whitespace-nowrap"
              >
                New Casinos
              </Link>

              {/* 2. No Deposit Casinos */}
              <Link
                href="/bonuses?type=no-deposit"
                className="h-full flex items-center px-3 sm:px-4 text-zinc-300 hover:text-white hover:bg-zinc-900/80 transition-colors uppercase tracking-wider text-[11px] whitespace-nowrap"
              >
                No Deposit Casinos
              </Link>

              {/* 3. Free Spins */}
              <Link
                href="/bonuses?type=free-spins"
                className="h-full flex items-center px-3 sm:px-4 text-zinc-300 hover:text-white hover:bg-zinc-900/80 transition-colors uppercase tracking-wider text-[11px] whitespace-nowrap"
              >
                Free Spins
              </Link>

              {/* 4. CASINOS TAB WITH 6-COLUMN MEGA-MENU ON HOVER & CLICK */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter("casinos")}
              >
                <button
                  type="button"
                  onClick={() => toggleMenu("casinos")}
                  aria-expanded={activeMenu === "casinos"}
                  className={`h-full flex items-center gap-1.5 px-3.5 sm:px-4 uppercase tracking-wider text-[11px] font-black transition-colors whitespace-nowrap border-b-2 ${
                    activeMenu === "casinos"
                      ? "bg-white text-black border-white"
                      : "text-zinc-200 hover:text-white hover:bg-zinc-900/80 border-transparent"
                  }`}
                >
                  <span>Casinos</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === "casinos" ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* 5. GAMES TAB WITH DROPDOWN */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter("games")}
              >
                <button
                  type="button"
                  onClick={() => toggleMenu("games")}
                  aria-expanded={activeMenu === "games"}
                  className={`h-full flex items-center gap-1.5 px-3 sm:px-4 uppercase tracking-wider text-[11px] font-bold transition-colors whitespace-nowrap border-b-2 ${
                    activeMenu === "games"
                      ? "bg-white text-black border-white font-black"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-900/80 border-transparent"
                  }`}
                >
                  <span>Games</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === "games" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Games Dropdown */}
                {activeMenu === "games" && (
                  <div
                    className="absolute left-0 top-full w-64 bg-zinc-950 border-2 border-white/20 shadow-2xl p-2 z-50 animate-fade-in"
                    onMouseEnter={() => handleMouseEnter("games")}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-white/10 mb-1">
                      Free Casino Games & Slots
                    </div>
                    <a
                      href="#free-games"
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-white hover:text-black font-bold text-xs transition"
                    >
                      <Dices className="w-4 h-4 text-current" />
                      <span>Free Demo Slots</span>
                    </a>
                    <Link
                      href="/casinos?game=live"
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-white hover:text-black font-bold text-xs transition"
                    >
                      <Sparkles className="w-4 h-4 text-current" />
                      <span>Live Dealer Tables</span>
                    </Link>
                    <Link
                      href="/casinos?game=crash"
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-white hover:text-black font-bold text-xs transition"
                    >
                      <Flame className="w-4 h-4 text-current" />
                      <span>Crash & Instant Games</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* 6. GUIDES TAB WITH DROPDOWN */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter("guides")}
              >
                <button
                  type="button"
                  onClick={() => toggleMenu("guides")}
                  aria-expanded={activeMenu === "guides"}
                  className={`h-full flex items-center gap-1.5 px-3 sm:px-4 uppercase tracking-wider text-[11px] font-bold transition-colors whitespace-nowrap border-b-2 ${
                    activeMenu === "guides"
                      ? "bg-white text-black border-white font-black"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-900/80 border-transparent"
                  }`}
                >
                  <span>Guides</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === "guides" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Guides Dropdown */}
                {activeMenu === "guides" && (
                  <div
                    className="absolute left-0 top-full w-64 bg-zinc-950 border-2 border-white/20 shadow-2xl p-2 z-50 animate-fade-in"
                    onMouseEnter={() => handleMouseEnter("guides")}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-white/10 mb-1">
                      Player Protection Guides
                    </div>
                    <a
                      href="#protocol"
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-white hover:text-black font-bold text-xs transition"
                    >
                      <BookOpen className="w-4 h-4 text-current" />
                      <span>Safety Audit Protocol</span>
                    </a>
                    <button
                      onClick={() => {
                        setActiveMenu(null);
                        setIsCalcOpen(true);
                      }}
                      className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-300 hover:bg-white hover:text-black font-bold text-xs transition"
                    >
                      <Calculator className="w-4 h-4 text-current" />
                      <span>Wagering Calculation Guide</span>
                    </button>
                    <Link
                      href="/blacklist"
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500 hover:text-white font-bold text-xs transition"
                    >
                      <ShieldAlert className="w-4 h-4 text-current" />
                      <span>Blacklisted Rogue Sites</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* 7. TOOLS [NEW] TAB */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter("tools")}
              >
                <button
                  type="button"
                  onClick={() => toggleMenu("tools")}
                  aria-expanded={activeMenu === "tools"}
                  className={`h-full flex items-center gap-1.5 px-3 sm:px-4 uppercase tracking-wider text-[11px] font-bold transition-colors whitespace-nowrap border-b-2 ${
                    activeMenu === "tools"
                      ? "bg-white text-black border-white font-black"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-900/80 border-transparent"
                  }`}
                >
                  <span>Tools</span>
                  <span className="px-1.5 py-0.2 rounded bg-white text-black text-[9px] font-black">
                    NEW
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeMenu === "tools" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Tools Dropdown */}
                {activeMenu === "tools" && (
                  <div
                    className="absolute left-0 top-full w-72 bg-zinc-950 border-2 border-white/20 shadow-2xl p-2 z-50 animate-fade-in"
                    onMouseEnter={() => handleMouseEnter("tools")}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-white/10 mb-1">
                      Player Utilities
                    </div>
                    <button
                      onClick={() => {
                        setActiveMenu(null);
                        setIsCompareOpen(true);
                      }}
                      className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-300 hover:bg-white hover:text-black font-bold text-xs transition"
                    >
                      <span className="flex items-center gap-2.5">
                        <Layers className="w-4 h-4 text-current" />
                        Compare Casinos
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        Side-by-side
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveMenu(null);
                        setIsCalcOpen(true);
                      }}
                      className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-300 hover:bg-white hover:text-black font-bold text-xs transition"
                    >
                      <span className="flex items-center gap-2.5">
                        <Calculator className="w-4 h-4 text-current" />
                        Bonus Wagering Calculator
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        Math tool
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* 8. Blog */}
              <Link
                href="/casinos"
                className="h-full flex items-center px-3 sm:px-4 text-zinc-300 hover:text-white hover:bg-zinc-900/80 transition-colors uppercase tracking-wider text-[11px] whitespace-nowrap"
              >
                Blog
              </Link>
            </div>

            {/* Right Side: Interactive Geo-Location Country Selector Pill */}
            <div className="shrink-0 pl-3">
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-white/20 text-white transition-all duration-200 hover:border-white shadow-sm"
              >
                <span className="text-base leading-none">{country.flag}</span>
                <span className="hidden sm:inline font-bold text-[11px] text-zinc-200">
                  {country.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-wider font-mono text-zinc-400">
                  [{country.code}]
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>

        {/* 
          ========================================================================
          EXACT CASINOFREAK 6-COLUMN MEGA MENU (Black Matte Monochromatic Style)
          FLUSH DIRECTLY AT top-full WITH ZERO GAP.
          Hover & Click Activated.
          ========================================================================
        */}
        {activeMenu === "casinos" && (
          <div
            className="absolute left-0 right-0 top-full w-full bg-zinc-950/98 border-t border-b-2 border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.98)] backdrop-blur-2xl z-50 animate-fade-in overflow-hidden"
            onMouseEnter={() => handleMouseEnter("casinos")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-h-[75vh] overflow-y-auto no-scrollbar">
                
                {/* COLUMN 1: POPULAR PAGES */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-white border-b border-white/15 pb-2.5 flex items-center justify-between">
                    <span>Popular Pages</span>
                  </h4>
                  <div className="space-y-2 text-xs font-semibold text-zinc-400">
                    <Link href="/casinos" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      All Online Casinos
                    </Link>
                    <Link href="/casinos?sort=rating" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Best Casinos
                    </Link>
                    <Link href="/casinos?game=slots" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Real Money Slots
                    </Link>
                    <Link href="/casinos?feature=payout" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Best Payout Casinos
                    </Link>
                    <Link href="/casinos?feature=instant" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Fast Payout Casinos
                    </Link>
                    <Link href="/casinos?feature=min-deposit" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Minimum Deposit Casinos
                    </Link>
                    <Link href="/casinos?feature=mobile" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Mobile Casinos
                    </Link>
                    <Link href="/casinos?feature=exclusive" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Exclusive Casinos
                    </Link>
                    <Link href="/bonuses?wager=low" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Low Wagering Casinos
                    </Link>
                    <Link href="/casinos?banking=crypto" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Crypto Casinos
                    </Link>
                    <Link href="/casinos?feature=instant-play" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      No Account Casinos
                    </Link>
                    <Link href="/casinos?feature=inclave" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Inclave Casinos
                    </Link>
                    <Link href="/casinos?feature=independent" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Independent Casinos
                    </Link>
                    <Link href="/casinos" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      International Casinos
                    </Link>
                    <Link href="/casinos" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      European Casinos
                    </Link>
                    <Link href="/casinos" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      eCOGRA Casinos
                    </Link>
                  </div>
                </div>

                {/* COLUMN 2: CASINOS BY GAME */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-white border-b border-white/15 pb-2.5">
                    Casinos By Game
                  </h4>
                  <div className="space-y-2 text-xs font-semibold text-zinc-400">
                    <Link href="/casinos?game=live" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Live Dealer Casinos
                    </Link>
                    <Link href="/casinos?game=roulette" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Roulette Casinos
                    </Link>
                    <Link href="/casinos?game=blackjack" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Blackjack Casinos
                    </Link>
                    <Link href="/casinos?game=craps" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Craps Casinos
                    </Link>
                    <Link href="/casinos?game=baccarat" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Baccarat Casinos
                    </Link>
                    <Link href="/casinos?game=bingo" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Bingo Casinos
                    </Link>
                    <Link href="/casinos?game=keno" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Keno Casinos
                    </Link>
                    <Link href="/casinos?game=video-poker" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Video Poker Casinos
                    </Link>
                    <Link href="/casinos?game=plinko" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Plinko Casinos
                    </Link>
                    <Link href="/casinos?game=chicken" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Chicken Gambling Casinos
                    </Link>
                    <Link href="/casinos?game=crash" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Crash Games Casinos
                    </Link>
                    <Link href="/casinos?game=fish" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Fish Games Casinos
                    </Link>
                    <Link href="/casinos?game=mines" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Mines Casinos
                    </Link>
                    <Link href="/casinos?game=sic-bo" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Sic Bo Casinos
                    </Link>
                    <Link href="/casinos?game=vr" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      VR Casinos
                    </Link>
                  </div>
                </div>

                {/* COLUMN 3: COUNTRY (CasinoFreak Countries + Interactive Location Switcher) */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-white border-b border-white/15 pb-2.5 flex items-center justify-between">
                    <span>Country</span>
                    <span className="text-[10px] text-zinc-400 font-mono">[{country.code}]</span>
                  </h4>
                  <div className="space-y-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => {
                        setCountryByCode("US");
                        setActiveMenu(null);
                      }}
                      className={`w-full text-left flex items-center justify-between py-1 transition ${
                        country.code === "US" ? "text-white font-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>USA 🇺🇸</span>
                      {country.code === "US" && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCountryByCode("AU");
                        setActiveMenu(null);
                      }}
                      className={`w-full text-left flex items-center justify-between py-1 transition ${
                        country.code === "AU" ? "text-white font-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>Australia 🇦🇺</span>
                      {country.code === "AU" && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCountryByCode("CA");
                        setActiveMenu(null);
                      }}
                      className={`w-full text-left flex items-center justify-between py-1 transition ${
                        country.code === "CA" ? "text-white font-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>Canada 🇨🇦</span>
                      {country.code === "CA" && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCountryByCode("GB");
                        setActiveMenu(null);
                      }}
                      className={`w-full text-left flex items-center justify-between py-1 transition ${
                        country.code === "GB" ? "text-white font-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>UK 🇬🇧</span>
                      {country.code === "GB" && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCountryByCode("NZ");
                        setActiveMenu(null);
                      }}
                      className={`w-full text-left flex items-center justify-between py-1 transition ${
                        country.code === "NZ" ? "text-white font-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>New Zealand 🇳🇿</span>
                      {country.code === "NZ" && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCountryByCode("NL");
                        setActiveMenu(null);
                      }}
                      className={`w-full text-left flex items-center justify-between py-1 transition ${
                        country.code === "NL" ? "text-white font-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>Netherlands 🇳🇱</span>
                      {country.code === "NL" && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCountryByCode("SE");
                        setActiveMenu(null);
                      }}
                      className={`w-full text-left flex items-center justify-between py-1 transition ${
                        country.code === "SE" ? "text-white font-black" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <span>Sweden 🇸🇪</span>
                      {country.code === "SE" && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCountryByCode("ALL");
                        setActiveMenu(null);
                      }}
                      className="pt-3 block text-xs font-black uppercase text-white hover:underline cursor-pointer tracking-wider"
                    >
                      ALL COUNTRIES 🌐
                    </button>
                  </div>
                </div>

                {/* COLUMN 4: SOFTWARE */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-white border-b border-white/15 pb-2.5">
                    Software
                  </h4>
                  <div className="space-y-2 text-xs font-semibold text-zinc-400">
                    <Link href="/casinos?software=netent" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      NetEnt
                    </Link>
                    <Link href="/casinos?software=hacksaw" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Hacksaw Gaming
                    </Link>
                    <Link href="/casinos?software=redtiger" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Red Tiger Gaming
                    </Link>
                    <Link href="/casinos?software=playngo" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Play n GO
                    </Link>
                    <Link href="/casinos?software=betsoft" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      BetSoft
                    </Link>
                    <Link href="/casinos?software=bgaming" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      BGaming
                    </Link>
                    <Link href="/casinos?software=thunderkick" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Thunderkick
                    </Link>
                    <Link
                      href="/casinos"
                      onClick={() => setActiveMenu(null)}
                      className="pt-3 block text-xs font-black uppercase text-white hover:underline tracking-wider"
                    >
                      ALL SOFTWARE
                    </Link>
                  </div>
                </div>

                {/* COLUMN 5: BANKING */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-white border-b border-white/15 pb-2.5">
                    Banking
                  </h4>
                  <div className="space-y-2 text-xs font-semibold text-zinc-400">
                    <Link href="/casinos?banking=visa" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Visa
                    </Link>
                    <Link href="/casinos?banking=mastercard" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      MasterCard
                    </Link>
                    <Link href="/casinos?banking=skrill" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Skrill
                    </Link>
                    <Link href="/casinos?banking=neteller" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Neteller
                    </Link>
                    <Link href="/casinos?banking=wire" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Wire Transfer
                    </Link>
                    <Link href="/casinos?banking=paysafe" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      paysafecard
                    </Link>
                    <Link href="/casinos?banking=crypto" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Bitcoin
                    </Link>
                    <Link
                      href="/casinos"
                      onClick={() => setActiveMenu(null)}
                      className="pt-3 block text-xs font-black uppercase text-white hover:underline tracking-wider"
                    >
                      ALL BANKING
                    </Link>
                  </div>
                </div>

                {/* COLUMN 6: LICENSE */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-white border-b border-white/15 pb-2.5">
                    License
                  </h4>
                  <div className="space-y-2 text-xs font-semibold text-zinc-400">
                    <Link href="/casinos?license=mga" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Malta
                    </Link>
                    <Link href="/casinos?license=curacao" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Curacao
                    </Link>
                    <Link href="/casinos?license=kahnawake" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Kahnawake
                    </Link>
                    <Link href="/casinos?license=anjouan" onClick={() => setActiveMenu(null)} className="block hover:text-white hover:translate-x-1 transition">
                      Anjouan
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* Country Location Switcher Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="max-w-md w-full bg-zinc-950 border border-white/20 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-900 px-3 py-0.5 rounded-full border border-white/10">
                  Geo-Targeting Engine
                </span>
                <h3 className="text-xl font-black text-white mt-1">Select Your Country / Region</h3>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              We dynamically filter verified casino licenses, accepted payment methods, and legal promotions based on your location.
            </p>

            {/* Countries Grid */}
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 no-scrollbar">
              {SUPPORTED_COUNTRIES.map((c) => {
                const isSelected = c.code === country.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCountryByCode(c.code);
                      setIsLocationModalOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-white text-black font-black"
                        : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl leading-none">{c.flag}</span>
                      <div className="text-left">
                        <div className="text-xs font-black">{c.name}</div>
                        <div className={`text-[10px] ${isSelected ? "text-zinc-800 font-bold" : "text-zinc-400"}`}>
                          {c.licenseAuthority} • {c.currency}
                        </div>
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-black font-black" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="btn-matte w-full py-2.5 rounded-xl text-xs uppercase tracking-wider"
              >
                Done / Save Preference
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        casinos={casinos}
      />

      {/* Bonus Calculator Modal */}
      <BonusCalculatorModal
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
      />
    </>
  );
}