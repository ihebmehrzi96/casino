"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "@/context/LocationContext";
import SafetyScoreBadge from "./SafetyScoreBadge";
import CountrySelector from "./CountrySelector";
import {
  Flame,
  Zap,
  Coins,
  ShieldCheck,
  ShieldAlert,
  Award,
  ArrowRight,
  Gift,
  Star,
  Clock,
  CreditCard,
  Check,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface InteractiveCasinoListProps {
  initialCasinos: any[];
}

const CARD_GRADIENTS = [
  "bg-gradient-to-r from-[#1F1A25] via-[#26202D] to-[#1F1A25] border-[#A9D8F5]/25",
  "bg-gradient-to-r from-[#231A24] via-[#2A1D28] to-[#1F1824] border-[#F04464]/30",
  "bg-gradient-to-r from-[#1B1B26] via-[#212330] to-[#1A1A24] border-[#A9D8F5]/30",
  "bg-gradient-to-r from-[#241B26] via-[#2C1F2E] to-[#201825] border-[#F04464]/25",
  "bg-gradient-to-r from-[#1C1824] via-[#231E2D] to-[#1A1622] border-[#A9D8F5]/25",
];

export default function InteractiveCasinoList({ initialCasinos }: InteractiveCasinoListProps) {
  const { t } = useLanguage();
  const { country, isAvailableInCountry } = useLocation();
  const [activeFilter, setActiveFilter] = useState<"ALL" | "NO_DEPOSIT" | "FAST" | "CRYPTO" | "SAFETY">("ALL");
  const accordionsContainerRef = useRef<HTMLDivElement>(null);

  // 1. Filter by location first
  const geoFilteredCasinos = initialCasinos.filter((c) =>
    isAvailableInCountry(c.allowedCountries)
  );

  // 2. Filter by category
  const filteredCasinos = geoFilteredCasinos.filter((c) => {
    if (activeFilter === "NO_DEPOSIT") {
      return (
        c.bonuses?.some((b: any) =>
          b.title?.toLowerCase().includes("no deposit") ||
          b.title?.toLowerCase().includes("free spins") ||
          b.minDeposit === "$0" ||
          b.minDeposit === "None"
        ) || c.minDeposit?.toLowerCase().includes("0")
      );
    }
    if (activeFilter === "FAST") {
      return (
        c.payoutSpeed?.toLowerCase().includes("instant") ||
        c.payoutSpeed?.toLowerCase().includes("10 mins") ||
        c.payoutSpeed?.toLowerCase().includes("hour")
      );
    }
    if (activeFilter === "CRYPTO") {
      return Boolean(c.cryptoFriendly);
    }
    if (activeFilter === "SAFETY") {
      return c.safetyIndex >= 9.7;
    }
    return true;
  });

  // ── GSAP SCROLLTRIGGER ACCORDION STACK TIMELINE (Apple-Style) ──
  useEffect(() => {
    if (!accordionsContainerRef.current) return;

    const accordions = accordionsContainerRef.current.querySelectorAll<HTMLElement>(".casino-accordion");
    const bodies = accordionsContainerRef.current.querySelectorAll<HTMLElement>(".casino-accordion-body");

    if (accordions.length <= 1) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: accordionsContainerRef.current,
          pin: true,
          start: "top 85px",
          end: () => `+=${accordions.length * 300}px`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Collapse earlier cards as you scroll down
      tl.to(bodies, {
        height: 0,
        paddingBottom: 0,
        opacity: 0,
        stagger: 0.5,
        ease: "power2.inOut",
      });

      tl.to(
        accordions,
        {
          marginBottom: -15,
          stagger: 0.5,
          ease: "power2.inOut",
        },
        "<"
      );
    }, accordionsContainerRef);

    return () => ctx.revert();
  }, [filteredCasinos]);

  // Click handler to manually toggle accordion
  const handleToggle = (id: string) => {
    const cardEl = document.getElementById(`accordion-${id}`);
    if (!cardEl) return;
    const bodyEl = cardEl.querySelector<HTMLElement>(".casino-accordion-body");
    const chevronEl = cardEl.querySelector<HTMLElement>(".accordion-chevron");
    if (!bodyEl) return;

    const isCollapsed = bodyEl.offsetHeight === 0;

    if (isCollapsed) {
      gsap.to(bodyEl, {
        height: "auto",
        paddingBottom: "1.5rem",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      if (chevronEl) gsap.to(chevronEl, { rotation: 180, duration: 0.3 });
    } else {
      gsap.to(bodyEl, {
        height: 0,
        paddingBottom: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
      if (chevronEl) gsap.to(chevronEl, { rotation: 0, duration: 0.3 });
    }
  };

  return (
    <div className="space-y-8">
      {/* Location Status Bar (Auto-Detected with Change Dropdown) */}
      <CountrySelector variant="banner" />

      {/* Filter Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveFilter("ALL")}
          className={`px-4 py-2 rounded-full font-semibold text-xs shrink-0 flex items-center gap-2 transition-all duration-150 ${
            activeFilter === "ALL" ? "bg-[#F04464] text-[#F8F5F2] shadow-md shadow-[#F04464]/30" : "bg-[#1F1A25] text-[#A9D8F5] hover:text-[#F8F5F2] border border-[#A9D8F5]/20 hover:border-[#F04464]/40"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          {t.filters.topRanked} ({geoFilteredCasinos.length})
        </button>

        <button
          onClick={() => setActiveFilter("NO_DEPOSIT")}
          className={`px-4 py-2 rounded-full font-semibold text-xs shrink-0 flex items-center gap-2 transition-all duration-150 ${
            activeFilter === "NO_DEPOSIT" ? "bg-[#F04464] text-[#F8F5F2] shadow-md shadow-[#F04464]/30" : "bg-[#1F1A25] text-[#A9D8F5] hover:text-[#F8F5F2] border border-[#A9D8F5]/20 hover:border-[#F04464]/40"
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          {t.filters.bestBonuses}
        </button>

        <button
          onClick={() => setActiveFilter("FAST")}
          className={`px-4 py-2 rounded-full font-semibold text-xs shrink-0 flex items-center gap-2 transition-all duration-150 ${
            activeFilter === "FAST" ? "bg-[#F04464] text-[#F8F5F2] shadow-md shadow-[#F04464]/30" : "bg-[#1F1A25] text-[#A9D8F5] hover:text-[#F8F5F2] border border-[#A9D8F5]/20 hover:border-[#F04464]/40"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          {t.filters.fastPayouts}
        </button>

        <button
          onClick={() => setActiveFilter("CRYPTO")}
          className={`px-4 py-2 rounded-full font-semibold text-xs shrink-0 flex items-center gap-2 transition-all duration-150 ${
            activeFilter === "CRYPTO" ? "bg-[#F04464] text-[#F8F5F2] shadow-md shadow-[#F04464]/30" : "bg-[#1F1A25] text-[#A9D8F5] hover:text-[#F8F5F2] border border-[#A9D8F5]/20 hover:border-[#F04464]/40"
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          {t.filters.crypto}
        </button>

        <button
          onClick={() => setActiveFilter("SAFETY")}
          className={`px-4 py-2 rounded-full font-semibold text-xs shrink-0 flex items-center gap-2 transition-all duration-150 ${
            activeFilter === "SAFETY" ? "bg-[#F04464] text-[#F8F5F2] shadow-md shadow-[#F04464]/30" : "bg-[#1F1A25] text-[#A9D8F5] hover:text-[#F8F5F2] border border-[#A9D8F5]/20 hover:border-[#F04464]/40"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Highest Safety (9.7+)
        </button>

        <Link
          href="/blacklist"
          className="px-4 py-2 rounded-full bg-[#F04464]/10 hover:bg-[#F04464]/20 text-[#F04464] border border-[#F04464]/30 font-semibold text-xs shrink-0 flex items-center gap-2 transition-all ml-auto"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-[#F04464]" />
          <span>Blacklist (24 Sites)</span>
        </Link>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div>
          <div className="flex items-center gap-2 text-[#A9D8F5] text-xs font-black uppercase tracking-widest mb-1.5">
            <Award className="w-4 h-4 text-white" />
            CasinoFreak Verified Database
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#F8F5F2] tracking-tight">
            Audited & Ranked Online Casinos
          </h2>
          <p className="text-sm text-[#F8F5F2]/80 mt-1 font-medium">
            Compare licensed operators, withdrawal velocity, and tested wagering clauses.
          </p>
        </div>

        <Link
          href="/casinos"
          className="group inline-flex items-center gap-1.5 text-xs font-black text-[#A9D8F5] hover:text-[#F04464] uppercase tracking-wider hover:underline"
        >
          <span>{t.filters.browseAll}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* ── APPLE-STYLE STACKING ACCORDIONS DECK ── */}
      <div ref={accordionsContainerRef} className="casino-accordions-wrapper">
        <div className="casino-accordions">
          {filteredCasinos.map((casino, idx) => {
            const topBonus = casino.bonuses && casino.bonuses.length > 0 ? casino.bonuses[0] : null;
            let parsedPros: string[] = [];
            try {
              parsedPros = JSON.parse(casino.pros || "[]");
            } catch {
              parsedPros = [];
            }

            return (
              <div
                key={casino.id}
                id={`accordion-${casino.id}`}
                className={`casino-accordion border ${CARD_GRADIENTS[idx % CARD_GRADIENTS.length]}`}
              >
                {/* Top Medal Ribbon */}
                <div className="absolute top-0 left-0 bg-[#F04464] text-[#F8F5F2] text-[11px] font-black px-4 py-1 rounded-tl-2xl rounded-br-2xl shadow-md tracking-wider uppercase flex items-center gap-1.5 z-10 font-tanker">
                  <span>#{idx + 1}</span>
                  <span className="text-[10px] tracking-widest font-extrabold opacity-80">
                    {idx === 0 ? "VAULT MEDAL" : idx <= 2 ? "TOP MEDAL" : "VERIFIED"}
                  </span>
                </div>

                {/* Accordion Header (Always Visible in the Stacked Deck) */}
                <div
                  onClick={() => handleToggle(casino.id)}
                  className="casino-accordion-header p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 sm:pt-6"
                >
                  {/* Identity: Logo, Name, Rating & Safety */}
                  <div className="flex items-center gap-4 min-w-[260px]">
                    <div className="w-16 h-16 rounded-2xl p-1.5 overflow-hidden flex items-center justify-center shrink-0 bg-black/60 border border-white/15">
                      <img
                        src={casino.logoUrl}
                        alt={casino.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/casinos/${casino.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xl sm:text-2xl font-black text-white hover:underline transition-all flex items-center gap-2"
                      >
                        {casino.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-black bg-[#A9D8F5] text-[#17131B]">
                          <Star className="w-3 h-3 fill-[#17131B] text-[#17131B]" />
                          {casino.rating.toFixed(1)} / 10
                        </div>
                        <span className="text-xs text-[#A9D8F5] font-medium">
                          {casino.license?.split("(")[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Highlights (Desktop summary) */}
                  <div className="flex-1 min-w-[200px] hidden lg:block">
                    <div className="text-sm font-bold text-white line-clamp-1">
                      {topBonus ? topBonus.title : "Exclusive Welcome Offer"}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400">
                      <span className="flex items-center gap-1 text-zinc-300">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        {casino.payoutSpeed}
                      </span>
                      <span>•</span>
                      <span>Min: {casino.minDeposit}</span>
                    </div>
                  </div>

                  {/* Header Actions & Expand Chevron */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <SafetyScoreBadge score={casino.safetyIndex} tier={casino.safetyTier} size="sm" />

                    <a
                      href={casino.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      onClick={(e) => e.stopPropagation()}
                      className="py-2.5 px-5 rounded-xl bg-[#F04464] hover:bg-[#e03353] text-[#F8F5F2] font-tanker tracking-wider uppercase text-sm flex items-center gap-1.5 shadow-md shadow-[#F04464]/30 hover:scale-[1.02] transition-all"
                    >
                      <span>{t.card.claimBonus}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      aria-label="Toggle Details"
                    >
                      <ChevronDown className="accordion-chevron w-4 h-4 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* Accordion Expandable Body (Collapses on ScrollTrigger) */}
                <div className="casino-accordion-body px-5 sm:px-6 pb-6 pt-1">
                  <div className="border-t border-white/10 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Col A: Bonus Details & Terms */}
                    <div className="lg:col-span-8 space-y-3">
                      <div className="text-[11px] text-zinc-400 font-black tracking-widest uppercase flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-white" />
                        {t.card.topWelcomePackage}
                      </div>
                      <div className="text-base sm:text-lg font-black text-white leading-snug">
                        {topBonus ? topBonus.title : t.card.exclusiveOffer}
                      </div>

                      {/* Quick Specs Chips */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold pt-1">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#17131B] border border-[#A9D8F5]/20 text-[#A9D8F5]">
                          <CreditCard className="w-3.5 h-3.5 text-white" />
                          Min: <strong className="text-white">{casino.minDeposit}</strong>
                        </span>
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#17131B] border border-[#A9D8F5]/20 text-[#A9D8F5]">
                          <Clock className="w-3.5 h-3.5 text-white" />
                          Payout: <strong className="text-white">{casino.payoutSpeed}</strong>
                        </span>
                        {topBonus?.wagering && (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-white font-bold">
                            Wager: {topBonus.wagering}
                          </span>
                        )}
                        {topBonus?.bonusCode && (
                          <span className="px-2.5 py-1 rounded-lg bg-[#A9D8F5] text-[#17131B] font-mono font-black text-xs">
                            CODE: {topBonus.bonusCode}
                          </span>
                        )}
                      </div>

                      {/* Verified Points */}
                      <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                        <span className="inline-flex items-center gap-1 text-white font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F04464] animate-pulse"></span>
                          Verified Player Region
                        </span>
                        {parsedPros.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-zinc-300">
                            <Check className="w-3.5 h-3.5 text-[#A9D8F5]" />
                            <span>{parsedPros[0]}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Col B: Review Link CTA */}
                    <div className="lg:col-span-4 flex flex-col justify-end items-end gap-3">
                      <Link
                        href={`/casinos/${casino.slug}`}
                        className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-[#17131B] hover:bg-[#26202D] border border-[#A9D8F5]/25 text-[#A9D8F5] hover:text-[#F8F5F2] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      >
                        <span>{t.card.readReview}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredCasinos.length === 0 && (
            <div className="text-center py-16 bg-zinc-900/60 rounded-2xl border border-white/10 space-y-3">
              <p className="text-zinc-300 text-sm font-semibold">
                No casinos currently available for {country.name} with this filter.
              </p>
              <p className="text-xs text-zinc-500">
                Try switching your region to "Global (All Countries)" in the top bar to view all international operators.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
