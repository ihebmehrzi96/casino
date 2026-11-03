"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Search,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LinearHeroProps {
  onSearchChange?: (val: string) => void;
  onTagClick?: (tag: string) => void;
}

export default function LinearHero({ onSearchChange, onTagClick }: LinearHeroProps) {
  const { t } = useLanguage();
  const [searchValue, setSearchValue] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    if (onSearchChange) onSearchChange(val);
  };

  const handleTag = (tag: string) => {
    if (onTagClick) onTagClick(tag);
  };

  // ── KINETIC TYPOGRAPHY HEADLINE ANIMATION ──
  useEffect(() => {
    if (!titleRef.current) return;

    const chars = titleRef.current.querySelectorAll<HTMLElement>(".kinetic-char");
    const replaceChars = titleRef.current.querySelectorAll<HTMLElement>('.kinetic-char:not([data-char="."])');

    if (!chars.length) return;

    gsap.killTweensOf(chars);
    gsap.killTweensOf(replaceChars);

    const tl = gsap.timeline();

    tl.set(chars, {
      yPercent: -110,
    });
    tl.set(titleRef.current, {
      autoAlpha: 1,
    });
    tl.to(chars, {
      duration: 1,
      yPercent: 0,
      stagger: 0.03,
      ease: "expo.inOut",
    }).to(replaceChars, {
      duration: 1,
      yPercent: 110,
      ease: "expo.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.06,
    });

    return () => {
      tl.kill();
    };
  }, [t.hero.titleStart, t.hero.titleHighlight]);

  // ── UNFOLD-STYLE SCRUBBED MULTI-LAYER PARALLAX SCENE ──
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background ambient stars/sky layer
      tl.fromTo(".unfold-bg-layer", { y: 0 }, { y: -80 }, 0)
        // Midground floating shield and dice
        .fromTo(".unfold-mid-shield", { y: 20 }, { y: -200 }, 0)
        .fromTo(".unfold-mid-dice", { y: 30, rotation: 0 }, { y: -240, rotation: 45 }, 0)
        // Foreground floating chips and neon laser traces
        .fromTo(".unfold-fore-chip1", { y: 40, rotation: 0 }, { y: -380, rotation: -30 }, 0)
        .fromTo(".unfold-fore-chip2", { y: 50, rotation: 0 }, { y: -450, rotation: 25 }, 0)
        .fromTo(".unfold-hero-content", { y: 0, opacity: 1 }, { y: -90, opacity: 0.8 }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const target = document.querySelector("#editorial-showcase") || document.querySelector("#casino-directory");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderKineticWords = (text: string, isHighlight: boolean, startIdx: number) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    let charCounter = startIdx;

    return words.map((word, wIdx) => {
      const letters = word.split("").map((ch) => {
        const isReplace = charCounter % 2 === 0;
        charCounter++;
        return {
          char: ch,
          dataChar: isReplace ? ch : ".",
        };
      });

      return (
        <span key={`${word}-${wIdx}`} className="inline-flex whitespace-nowrap mx-[0.14em] my-1">
          {letters.map((item, cIdx) => (
            <span key={cIdx} className="kinetic-box">
              <span
                className={`kinetic-char ${isHighlight ? "kinetic-char-highlight" : ""}`}
                data-char={item.dataChar}
              >
                {item.char}
              </span>
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <div ref={heroRef} className="relative bg-[#17131B] text-[#F8F5F2] overflow-hidden border-b border-[#A9D8F5]/15">
      
      {/* ── PARALLAX DEPTH LAYERS (Unfold Style) ── */}
      {/* Layer 1: Ambient Background Glow & Perspective Grid */}
      <div className="unfold-bg-layer absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#F04464]/20 via-[#A9D8F5]/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute -top-32 right-10 w-[450px] h-[450px] bg-[#A9D8F5]/15 rounded-full blur-[130px]" />
        
        {/* Subtle SVG Perspective Horizon Lines */}
        <svg
          viewBox="0 0 1440 600"
          className="w-full h-full object-cover opacity-20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="500" x2="1440" y2="500" stroke="#F04464" strokeWidth="1" />
          <line x1="100" y1="600" x2="720" y2="400" stroke="#A9D8F5" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="1340" y1="600" x2="720" y2="400" stroke="#A9D8F5" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="300" y1="600" x2="720" y2="400" stroke="#A9D8F5" strokeWidth="0.8" strokeDasharray="4 4" />
          <line x1="1140" y1="600" x2="720" y2="400" stroke="#A9D8F5" strokeWidth="0.8" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Layer 2: Midground Floating Elements (Dice & Shield) */}
      <div className="unfold-mid-shield absolute top-28 left-[8%] hidden lg:block pointer-events-none select-none z-0">
        <div className="w-16 h-16 rounded-2xl bg-[#1F1A25] border border-[#A9D8F5]/25 backdrop-blur-md flex items-center justify-center shadow-2xl">
          <ShieldCheck className="w-8 h-8 text-[#A9D8F5] drop-shadow-[0_0_12px_rgba(169,216,245,0.6)]" />
        </div>
      </div>

      <div className="unfold-mid-dice absolute top-40 right-[10%] hidden lg:block pointer-events-none select-none z-0">
        <div className="w-14 h-14 rounded-2xl bg-[#1F1A25] border border-[#F04464]/40 backdrop-blur-md flex items-center justify-center shadow-2xl text-2xl">
          🎲
        </div>
      </div>

      {/* Layer 3: Foreground Floating Elements (Poker Chips) */}
      <div className="unfold-fore-chip1 absolute bottom-24 left-[12%] hidden lg:block pointer-events-none select-none z-0">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#A9D8F5] to-[#7dbfe6] border-2 border-[#F8F5F2] text-[#17131B] font-black text-xs flex items-center justify-center shadow-[0_0_25px_rgba(169,216,245,0.6)]">
          $100
        </div>
      </div>

      <div className="unfold-fore-chip2 absolute bottom-32 right-[14%] hidden lg:block pointer-events-none select-none z-0">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F04464] to-[#cc2d4c] border-2 border-[#F8F5F2] text-[#F8F5F2] font-black text-xs flex items-center justify-center shadow-[0_0_25px_rgba(240,68,100,0.6)]">
          $500
        </div>
      </div>

      {/* ── HERO CONTENT WITH DYNAMIC TRANSLATION ── */}
      <section className="unfold-hero-content relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1A25] border border-[#A9D8F5]/25 text-xs font-medium text-[#F8F5F2] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F04464] animate-pulse" />
            <span className="font-semibold text-white">{t.hero.badge}</span>
            <span className="text-[#A9D8F5]/40">|</span>
            <span className="text-[#A9D8F5] font-mono text-[11px]">2026 Audit Registry</span>
          </div>

          {/* Master Kinetic Headline */}
          <h1
            ref={titleRef}
            className="kinetic-headline text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight flex flex-wrap justify-center items-center text-center max-w-4xl mx-auto my-2"
          >
            {renderKineticWords(t.hero.titleStart, false, 0)}
            {renderKineticWords(
              t.hero.titleHighlight,
              true,
              t.hero.titleStart.replace(/\s+/g, "").length
            )}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-[#F8F5F2]/80 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#editorial-showcase"
              className="px-6 py-3 rounded-full bg-[#F04464] hover:bg-[#e03353] text-[#F8F5F2] font-tanker tracking-wider uppercase text-sm sm:text-base transition flex items-center gap-2 shadow-lg shadow-[#F04464]/30 hover:scale-[1.02]"
            >
              <span>{t.hero.exploreCasinos || "Explore 48 Audited Casinos"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/blacklist"
              className="px-6 py-3 rounded-full bg-[#1F1A25] hover:bg-[#26202D] border border-[#A9D8F5]/25 text-[#A9D8F5] hover:text-[#F8F5F2] font-tanker tracking-wider uppercase text-sm sm:text-base transition flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-[#F04464]" />
              <span>{t.hero.blacklistedSites || "Blacklisted Sites (24)"}</span>
            </Link>
          </div>

          {/* Search Bar with live translation */}
          <div className="mt-8 max-w-xl mx-auto w-full">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-[#A9D8F5]/60" />
              <input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                placeholder={t.hero.searchPlaceholder || "Search by casino name, crypto, license, or bonus..."}
                className="w-full pl-11 pr-24 py-3 rounded-xl bg-[#1F1A25] border border-[#A9D8F5]/25 text-sm text-[#F8F5F2] placeholder-[#A9D8F5]/60 focus:outline-none focus:border-[#F04464] transition shadow-inner"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchValue("");
                    if (onSearchChange) onSearchChange("");
                  }}
                  className="absolute right-3 text-xs font-mono text-[#A9D8F5] hover:text-[#F8F5F2] px-2 py-0.5 rounded bg-[#17131B]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Tags */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-[#A9D8F5] font-mono text-[11px]">{t.hero.popular || "Popular:"}</span>
              <button
                type="button"
                onClick={() => handleTag("Instant Payouts")}
                className="px-3 py-1 rounded-full bg-[#1F1A25] hover:bg-[#26202D] border border-[#A9D8F5]/20 text-[#A9D8F5] hover:text-[#F8F5F2] hover:border-[#F04464]/40 transition"
              >
                {t.hero.instantPayouts || "⚡ Instant Payouts"}
              </button>
              <button
                type="button"
                onClick={() => handleTag("Crypto Friendly")}
                className="px-3 py-1 rounded-full bg-[#1F1A25] hover:bg-[#26202D] border border-[#A9D8F5]/20 text-[#A9D8F5] hover:text-[#F8F5F2] hover:border-[#F04464]/40 transition"
              >
                {t.hero.cryptoNoKyc || "🪙 Crypto / No KYC"}
              </button>
              <button
                type="button"
                onClick={() => handleTag("Very High Safety")}
                className="px-3 py-1 rounded-full bg-[#1F1A25] hover:bg-[#26202D] border border-[#A9D8F5]/20 text-[#A9D8F5] hover:text-[#F8F5F2] hover:border-[#F04464]/40 transition"
              >
                {t.hero.safetyHigh || "🛡️ Safety 9.5+"}
              </button>
              <button
                type="button"
                onClick={() => handleTag("No Deposit")}
                className="px-3 py-1 rounded-full bg-[#1F1A25] hover:bg-[#26202D] border border-[#A9D8F5]/20 text-[#A9D8F5] hover:text-[#F8F5F2] hover:border-[#F04464]/40 transition"
              >
                {t.hero.freeSpins || "🎁 Free Spins"}
              </button>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
              <div className="text-2xl font-extrabold text-white">48+</div>
              <div className="text-xs text-zinc-400 font-medium">{t.hero.independentAudits}</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
              <div className="text-2xl font-extrabold text-white">&lt; 10 min</div>
              <div className="text-xs text-zinc-400 font-medium">{t.hero.fastestPayouts}</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
              <div className="text-2xl font-extrabold text-emerald-400">9.8 / 10</div>
              <div className="text-xs text-zinc-400 font-medium">{t.hero.safetyScale}</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5">
              <div className="text-2xl font-extrabold text-rose-400">24</div>
              <div className="text-xs text-zinc-400 font-medium">{t.hero.rogueBanned}</div>
            </div>
          </div>

          {/* Unfold Style Bouncing Scroll Down Arrow */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleScrollDown}
              className="group p-2 text-zinc-500 hover:text-white transition flex flex-col items-center gap-1 focus:outline-none cursor-pointer"
              aria-label="Scroll down to showcase"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 group-hover:text-zinc-300">
                SCROLL
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce text-zinc-400 group-hover:text-white" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
