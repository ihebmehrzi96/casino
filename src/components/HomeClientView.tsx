"use client";

import Link from "next/link";
import LinearHero from "@/components/LinearHero";
import ParallaxEditorialShowcase from "@/components/ParallaxEditorialShowcase";
import InteractiveCasinoList from "@/components/InteractiveCasinoList";
import FreeGamesShowcase from "@/components/FreeGamesShowcase";
import ScrollReveal from "@/components/ScrollReveal";
import MarqueeTicker from "@/components/MarqueeTicker";
import CasinoHubDirectory from "@/components/CasinoHubDirectory";
import GamblingGuidesStatsSection from "@/components/GamblingGuidesStatsSection";
import GameCategoriesHub from "@/components/GameCategoriesHub";
import { SiteStats } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  Zap,
  ShieldAlert,
  ArrowRight,
  Shield,
  CheckCircle2,
  ExternalLink,
  Award,
  Sparkles,
  Scale,
  Flame,
  Gauge,
  ArrowDownCircle,
  Gift,
  Coins,
  Check,
} from "lucide-react";

interface HomeClientViewProps {
  casinos: any[];
  blacklist: any[];
  stats?: SiteStats;
}

export default function HomeClientView({ casinos, blacklist, stats }: HomeClientViewProps) {
  const { t } = useLanguage();

  const allBonuses = casinos.flatMap((casino) =>
    (casino.bonuses || []).map((bonus: any) => ({
      ...bonus,
      casinoName: casino.name,
      casinoSlug: casino.slug,
      casinoLogo: casino.logoUrl,
    }))
  );

  return (
    <div className="bg-[#090A0E] text-white">
      {/* 1. HERO & TOP CASINOS BANNER */}
      <LinearHero />

      {/* 2. REGULATOR & STUDIO TRUST STRIP */}
      <MarqueeTicker />

      {/* 3. DAVE UDA STYLE SPLIT-COLUMN PARALLAX EDITORIAL SHOWCASE */}
      <ParallaxEditorialShowcase />

      {/* 4. AUDITED CASINO DIRECTORY & FILTERS */}
      <section id="casino-directory" className="bg-[#090A0E] border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveCasinoList initialCasinos={casinos} />
        </div>
      </section>

      {/* 4. ONLINE CASINO REVIEWS & GAMBLING GUIDES STATS BANNER (IMAGE 2) */}
      <GamblingGuidesStatsSection stats={stats} />

      {/* 5. GAME CATEGORIES SCROLLABLE HUB & DEMO PLAY (IMAGE 1) */}
      <GameCategoriesHub />

      {/* 6. THE CASINOVA AUDIT PROTOCOL */}
      <section id="protocol" className="bg-[#090A0E] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-zinc-900 border border-white/10 p-8 sm:p-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {t.protocol.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                {t.protocol.title}
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-10 font-normal">
                {t.protocol.subtitle}
              </p>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-black/40 border border-white/5">
                  <Scale className="w-5 h-5 text-white mb-2" />
                  <h4 className="text-white font-bold text-base">{t.protocol.licensingTitle}</h4>
                  <p className="text-sm text-zinc-400 mt-1 font-normal">
                    {t.protocol.licensingDesc}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-black/40 border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-white mb-2" />
                  <h4 className="text-white font-bold text-base">{t.protocol.termsTitle}</h4>
                  <p className="text-sm text-zinc-400 mt-1 font-normal">
                    {t.protocol.termsDesc}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-black/40 border border-white/5">
                  <ShieldAlert className="w-5 h-5 text-white mb-2" />
                  <h4 className="text-white font-bold text-base">{t.protocol.complaintsTitle}</h4>
                  <p className="text-sm text-zinc-400 mt-1 font-normal">
                    {t.protocol.complaintsDesc}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-black/40 border border-white/5">
                  <Zap className="w-5 h-5 text-white mb-2" />
                  <h4 className="text-white font-bold text-base">{t.protocol.rngTitle}</h4>
                  <p className="text-sm text-zinc-400 mt-1 font-normal">
                    {t.protocol.rngDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED BONUSES & PROMO CODES */}
      <section className="bg-black border-b border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest mb-2 bg-zinc-900 px-3.5 py-1.5 rounded-full border border-white/20">
                  <Gift className="w-4 h-4 text-white" />
                  {t.bonusesSection.badge}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {t.bonusesSection.title}
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 mt-2 font-medium">
                  {t.bonusesSection.subtitle} {new Date().getFullYear()}.
                </p>
              </div>

              <Link
                href="/bonuses"
                className="group inline-flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider hover:underline transition"
              >
                <span>{t.bonusesSection.browseAll}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBonuses.slice(0, 3).map((bonus: any, idx: number) => (
              <ScrollReveal key={idx} delay={idx * 120} direction="up">
                <div className="p-7 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 shadow-matte-card flex flex-col justify-between space-y-5 group h-full">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-black border border-white/20 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={bonus.casinoLogo} alt={bonus.casinoName} className="w-full h-full object-cover" />
                        </div>
                        <Link
                          href={`/casinos/${bonus.casinoSlug}`}
                          className="text-sm font-black text-white hover:underline transition"
                        >
                          {bonus.casinoName}
                        </Link>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-white text-black">
                        {bonus.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white leading-snug">{bonus.title}</h3>

                    <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/10 text-xs sm:text-sm font-semibold">
                      <div>
                        <span className="text-zinc-400 block text-[11px] font-bold uppercase mb-0.5">
                          {t.bonusesSection.wagering}
                        </span>
                        <span className="font-extrabold text-white">{bonus.wagering}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[11px] font-bold uppercase mb-0.5">
                          {t.bonusesSection.minDeposit}
                        </span>
                        <span className="font-extrabold text-white">{bonus.minDeposit || "None"}</span>
                      </div>
                    </div>

                    {bonus.bonusCode && (
                      <div className="mt-4 p-2.5 rounded-xl bg-black border border-white/20 text-xs flex items-center justify-between">
                        <span className="text-zinc-400 font-bold uppercase text-[10px]">{t.bonusesSection.promoCode}:</span>
                        <code className="text-white font-mono font-black text-sm">{bonus.bonusCode}</code>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <a
                      href={bonus.claimUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="btn-white group/btn w-full py-3 px-5 rounded-xl text-center text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <span>{t.bonusesSection.claimThisBonus}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-black group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                    <p className="text-[10px] text-zinc-500 text-center mt-2 font-medium">
                      {t.bonusesSection.termsApply}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BLACK MEDAL ROGUE SCAM ALERT (CasinoFreak Black Medal System in Pure Black & White) */}
      {blacklist.length > 0 && (
        <section className="bg-zinc-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="p-8 sm:p-10 rounded-2xl bg-black border-2 border-white/30 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shrink-0 shadow-lg font-black text-2xl">
                    ⛔
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider bg-white text-black px-2.5 py-0.5 rounded-md">
                        BLACK MEDAL ROGUE
                      </span>
                      <span className="text-xs font-semibold text-zinc-400">
                        {t.blacklistSection.activeAlert}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Blacklisted Rogue: {blacklist[0].name}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 max-w-2xl font-medium leading-relaxed">
                      {blacklist[0].blacklistReason || blacklist[0].summary}
                    </p>
                  </div>
                </div>

                <Link
                  href="/blacklist"
                  className="btn-white shrink-0 px-6 py-3 rounded-xl text-xs uppercase tracking-wider"
                >
                  {t.blacklistSection.viewBlacklist} ({blacklist.length})
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 8. CASINO DIRECTORY & EXPLORATION HUB (6-COLUMN MATRIX) */}
      <CasinoHubDirectory />
    </div>
  );
}
