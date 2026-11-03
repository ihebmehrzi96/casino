"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Star, Award, Zap, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NakulaDrawerMenu from "@/components/NakulaDrawerMenu";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CasinovaHero() {
  const [time, setTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Dynamic local time clock (from Nakula: 9:25 PM GMT+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position for transparent -> blurred header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP ScrollTrigger Scroll Fading (Exact Nakula Behavior: Hero elements fade & scale, mini sticky logo fades in)
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero visual elements fade out and scale down as you scroll
      gsap.to(".hero-fade-target", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: 0.6,
        },
        opacity: 0,
        y: -50,
        scale: 0.96,
        ease: "power2.out",
      });

      // 2. Sticky top-left mini logo appears seamlessly as the giant hero title departs
      gsap.fromTo(
        ".sticky-brand-logo",
        { opacity: 0, x: -12 },
        {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "12% top",
            end: "35% top",
            scrub: 0.4,
          },
          opacity: 1,
          x: 0,
          ease: "power1.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative bg-black text-white selection:bg-white selection:text-black">
      
      {/* ── 1. STICKY TOP HEADER (Completely transparent at scroll 0, acquires dark blur on scroll) ── */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 w-full px-4 sm:px-8 lg:px-14 py-4 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          
          {/* Left: Sticky Brand Wordmark (Fades in on scroll to replace the giant hero title) */}
          <Link
            href="/"
            className="sticky-brand-logo opacity-0 flex items-center gap-1.5 group select-none"
          >
            <span className="font-nakula text-2xl sm:text-3xl font-black tracking-tight text-[#E2E2E6] uppercase group-hover:text-white transition">
              CASINOVA
            </span>
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-zinc-500 text-zinc-400 font-sans font-bold text-[8px]">
              R
            </span>
          </Link>

          {/* Right: Status Pill, Clock, Quick Link & The 2-Line Circular Drawer Menu Button */}
          <div className="flex items-center gap-3 sm:gap-6 ml-auto">
            
            {/* Live Indicator (Nakula: "● Available for project EARLY FEB 2025") */}
            <div className="hidden sm:flex flex-col text-right leading-tight">
              <div className="flex items-center justify-end gap-1.5 text-[11px] font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Available for audits</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                ACTIVE FEB 2026
              </span>
            </div>

            {/* Local Time Clock (Nakula: "9:25 PM (GMT+7)") */}
            {time && (
              <div className="hidden md:flex flex-col text-right leading-tight font-mono text-xs text-zinc-300">
                <span className="font-bold text-white">{time}</span>
                <span className="text-[10px] text-zinc-500 font-semibold">(LOCAL TIME)</span>
              </div>
            )}

            {/* Top Rated Casinos Pill Action (Nakula: "LET'S TALK") */}
            <a
              href="#top-casinos"
              className="px-4 sm:px-5 py-2 rounded-full border border-white/25 hover:border-white bg-zinc-950/60 hover:bg-white hover:text-black text-xs font-black uppercase tracking-wider transition-all duration-200"
            >
              <span>TOP CASINOS</span>
            </a>

            {/* Normal Clean Drawer Menu Toggle (Exact 2-line circular button from screenshot) */}
            <NakulaDrawerMenu />
          </div>

        </div>
      </header>

      {/* ── 2. HERO STAGE (Fades out smoothly with GSAP ScrollTrigger as you scroll) ── */}
      <section className="relative min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-14 pt-20 sm:pt-24 pb-12 overflow-hidden select-none border-b border-white/10">
        
        {/* Main Composition: Giant Title + Diagonal Cutout + Stacked Editorial Headline */}
        <div className="hero-fade-target relative w-full my-auto py-2 sm:py-6">
          
          {/* Top-Left: GIANT CONDENSED "CASINOVA®" WORDMARK */}
          <div className="relative z-20 inline-block">
            <div className="flex items-start">
              <h1 className="font-nakula text-[18vw] sm:text-[16.5vw] md:text-[15.5vw] font-black uppercase tracking-tight leading-[0.76] text-[#E2E2E6] select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
                CASINOVA
              </h1>
              {/* Circular Registered Trademark "®" */}
              <div className="pt-2 sm:pt-4 md:pt-6 ml-1.5 sm:ml-2.5">
                <span className="inline-flex items-center justify-center w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border border-zinc-400 text-zinc-300 font-sans font-bold text-[9px] sm:text-xs md:text-sm">
                  R
                </span>
              </div>
            </div>
          </div>

          {/* Diagonal Center Cinematic Cutout (Nakula Signature Angled Polygon Mask) */}
          <div className="relative -mt-[5vw] sm:-mt-[4.5vw] z-10 w-full h-[320px] sm:h-[440px] md:h-[520px] overflow-hidden my-2">
            <div
              className="w-full h-full relative overflow-hidden border-y border-white/20 shadow-2xl"
              style={{
                clipPath: "polygon(0% 18%, 100% 0%, 100% 82%, 0% 100%)",
              }}
            >
              {/* Authentic Casino Photography Asset */}
              <div className="absolute inset-0 bg-black">
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105 hover:scale-110 transition-transform duration-1000 opacity-95"
                  style={{
                    backgroundImage: `url('/casino-hero.jpg')`,
                  }}
                />
                {/* Chiaroscuro vignetting to blend seamlessly with matte black canvas */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/85 pointer-events-none" />
                
                {/* Center subtle glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                {/* In-Cutout Floating Safety Badge */}
                <div className="absolute bottom-14 sm:bottom-20 left-6 sm:left-12 z-20 flex items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-white/25 text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Independent Proof of Reserve & Payout Audits
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Middle: Stacked Editorial Headline (Nakula Style) */}
          <div className="relative sm:absolute sm:right-0 sm:top-1/4 z-20 max-w-sm sm:max-w-md text-right mt-6 sm:mt-0 ml-auto">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.0] select-none">
              Beyond
              <br />
              Luck.
              <br />
              <span className="text-zinc-500">Audited with</span>
              <br />
              <span className="text-white">Precision.</span>
            </h2>
          </div>

        </div>

        {/* Hero Footer Row: Mission Statement + Action CTA (Nakula: START A PROJECT ↗) */}
        <div className="hero-fade-target w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 z-20 pt-6">
          <div className="max-w-lg text-sm sm:text-base text-zinc-400 font-medium leading-relaxed">
            We audit casinos, verify payout times, and test RNG authenticity{" "}
            <span className="text-white font-black">with intention, clarity and care.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="#top-casinos"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-[#FF4925] text-[#FF4925] font-black text-xs uppercase tracking-widest hover:bg-[#FF4925] hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,73,37,0.2)] hover:scale-105"
            >
              <span>EXPLORE CASINOS</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <Link
              href="/bonuses"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-zinc-950 border border-white/20 text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition"
            >
              <span>VERIFIED BONUSES</span>
            </Link>
          </div>
        </div>

        {/* Standards Bar (Nakula: TRUSTED BY: Logoipsum...) */}
        <div className="hero-fade-target w-full pt-8 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500 font-bold uppercase tracking-wider">
          <div className="text-zinc-400 font-mono text-[10px] tracking-widest">
            TRUSTED STANDARDS BY:
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-mono text-[11px] font-bold text-zinc-400 tracking-wider">
            <span className="hover:text-white transition">eCOGRA</span>
            <span className="hover:text-white transition">UKGC STANDARDS</span>
            <span className="hover:text-white transition">MALTA MGA</span>
            <span className="hover:text-white transition">iTECH LABS</span>
            <span className="hover:text-white transition">GLI TESTED</span>
          </div>
        </div>

      </section>

      {/* ── 3. (ABOUT) SECTION (Image 7 from your upload: Clean High-Contrast Editorial Typography) ── */}
      <section className="py-28 sm:py-40 px-4 sm:px-8 lg:px-14 border-b border-white/10 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
          <div className="md:col-span-3 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
            (ABOUT)
          </div>
          <div className="md:col-span-9">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.14]">
              We combine years of iGaming watchdog experience and math auditing{" "}
              <span className="text-zinc-600">
                expertise to craft meaningful, player-first sanctuary free from predatory traps.
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* ── 4. "TOP CASINOS (04)" SHOWCASE (Nakula's "LATEST WORK (04)" from video 00:07–00:11) ── */}
      <section id="top-casinos" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-14 border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto">
          
          {/* Giant Section Header (Nakula: LATEST WORK (04)) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/10">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-2">
                (CURATED SELECTION)
              </div>
              <h2 className="font-nakula text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase text-white flex items-start gap-2">
                TOP CASINOS
                <span className="text-xl sm:text-2xl font-mono text-[#FF4925] font-bold align-top mt-1">
                  (04)
                </span>
              </h2>
            </div>
            
            <p className="text-sm sm:text-base text-zinc-400 max-w-md">
              Selected through mathematical payout verifications, valid licensing, and player dispute resolution track records.
            </p>
          </div>

          {/* Numbered Editorial Cards (01, 02, 03, 04) */}
          <div className="divide-y divide-white/10">
            
            {/* 01. BitStarz */}
            <div className="group py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-zinc-950/60 px-4 -mx-4 rounded-2xl transition-all duration-300">
              <div className="md:col-span-1 text-2xl sm:text-3xl font-mono font-black text-zinc-600 group-hover:text-[#FF4925] transition-colors">
                01.
              </div>
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-nakula text-3xl sm:text-5xl font-black text-white uppercase tracking-tight group-hover:text-zinc-200 transition">
                    BitStarz Casino
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                    Safety 9.8
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                  World’s premier multi-currency crypto casino. 10-minute automated payout processing with zero gas markup.
                </p>
              </div>
              <div className="md:col-span-3 flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10">100% up to 5 BTC</span>
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10">Avg Payout: 9m</span>
              </div>
              <div className="md:col-span-3 flex justify-start md:justify-end">
                <Link
                  href="/casinos/bitstarz"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 group-hover:border-white bg-transparent group-hover:bg-white text-white group-hover:text-black font-black text-xs uppercase tracking-wider transition-all duration-200"
                >
                  <span>VIEW AUDIT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 02. Stake.com */}
            <div className="group py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-zinc-950/60 px-4 -mx-4 rounded-2xl transition-all duration-300">
              <div className="md:col-span-1 text-2xl sm:text-3xl font-mono font-black text-zinc-600 group-hover:text-[#FF4925] transition-colors">
                02.
              </div>
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-nakula text-3xl sm:text-5xl font-black text-white uppercase tracking-tight group-hover:text-zinc-200 transition">
                    Stake.com
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                    Safety 9.6
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Global powerhouse with provably fair proprietary games, 24/7 VIP concierge, and instant blockchain settlement.
                </p>
              </div>
              <div className="md:col-span-3 flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10">200% up to $1,000</span>
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10">Avg Payout: Instant</span>
              </div>
              <div className="md:col-span-3 flex justify-start md:justify-end">
                <Link
                  href="/casinos/stake"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 group-hover:border-white bg-transparent group-hover:bg-white text-white group-hover:text-black font-black text-xs uppercase tracking-wider transition-all duration-200"
                >
                  <span>VIEW AUDIT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 03. BC.Game */}
            <div className="group py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-zinc-950/60 px-4 -mx-4 rounded-2xl transition-all duration-300">
              <div className="md:col-span-1 text-2xl sm:text-3xl font-mono font-black text-zinc-600 group-hover:text-[#FF4925] transition-colors">
                03.
              </div>
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-nakula text-3xl sm:text-5xl font-black text-white uppercase tracking-tight group-hover:text-zinc-200 transition">
                    BC.Game
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                    Safety 9.5
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Supports 80+ cryptocurrencies, verified CIGA licensing, and provably fair high RTP arcade titles.
                </p>
              </div>
              <div className="md:col-span-3 flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10">300% Deposit Match</span>
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10">Avg Payout: 5m</span>
              </div>
              <div className="md:col-span-3 flex justify-start md:justify-end">
                <Link
                  href="/casinos/bc-game"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 group-hover:border-white bg-transparent group-hover:bg-white text-white group-hover:text-black font-black text-xs uppercase tracking-wider transition-all duration-200"
                >
                  <span>VIEW AUDIT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 04. Betway */}
            <div className="group py-10 sm:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-zinc-950/60 px-4 -mx-4 rounded-2xl transition-all duration-300">
              <div className="md:col-span-1 text-2xl sm:text-3xl font-mono font-black text-zinc-600 group-hover:text-[#FF4925] transition-colors">
                04.
              </div>
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-nakula text-3xl sm:text-5xl font-black text-white uppercase tracking-tight group-hover:text-zinc-200 transition">
                    Betway Casino
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase">
                    Safety 9.4
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Institutional-tier UKGC and MGA licensed operator with strict player protection and audited RNG suites.
                </p>
              </div>
              <div className="md:col-span-3 flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10">100% up to $250</span>
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10">Avg Payout: 12h</span>
              </div>
              <div className="md:col-span-3 flex justify-start md:justify-end">
                <Link
                  href="/casinos/betway"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 group-hover:border-white bg-transparent group-hover:bg-white text-white group-hover:text-black font-black text-xs uppercase tracking-wider transition-all duration-200"
                >
                  <span>VIEW AUDIT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
