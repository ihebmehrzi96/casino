"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, HelpCircle, ShieldCheck } from "lucide-react";
import { SiteStats } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

interface GamblingGuidesStatsSectionProps {
  stats?: SiteStats;
}

export default function GamblingGuidesStatsSection({ stats }: GamblingGuidesStatsSectionProps) {
  const { t } = useLanguage();

  const currentStats = [
    {
      number: stats?.newCasinos ? stats.newCasinos.toLocaleString() : "234",
      label: t.statsSection?.newCasinos || "NEW CASINOS",
      link: "#casino-directory",
    },
    {
      number: stats?.noDepositBonuses ? stats.noDepositBonuses.toLocaleString() : "75",
      label: t.statsSection?.noDeposit || "NO DEPOSIT BONUSES",
      link: "/bonuses",
    },
    {
      number: stats?.freeSpins ? stats.freeSpins.toLocaleString() : "167",
      label: t.statsSection?.freeSpins || "FREE SPINS",
      link: "/bonuses",
    },
    {
      number: stats?.freeGames ? stats.freeGames.toLocaleString() : "25,713",
      label: t.statsSection?.freeGames || "FREE GAMES",
      link: "#free-games",
    },
    {
      number: stats?.casinoReviews ? stats.casinoReviews.toLocaleString() : "2,360",
      label: t.statsSection?.reviews || "CASINO REVIEWS",
      link: "#casino-directory",
    },
    {
      number: stats?.gamblingGuides ? stats.gamblingGuides.toLocaleString() : "92",
      label: t.statsSection?.guides || "GAMBLING GUIDES",
      link: "/#protocol",
    },
  ];

  return (
    <section className="bg-[#17131B] border-b border-[#A9D8F5]/15 py-20 px-4 sm:px-6 lg:px-8 text-[#F8F5F2] relative overflow-hidden">
      
      {/* Subtle monochrome ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#A9D8F5]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        
        {/* Centered Section Header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1A25] border border-[#A9D8F5]/25 text-xs font-mono text-[#A9D8F5] uppercase tracking-widest mb-4">
            <BarChart3 className="w-3.5 h-3.5 text-[#F04464]" />
            <span>Live Audit Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8F5F2] tracking-tight mb-4 leading-tight">
            {t.statsSection?.title || "Online Casino Reviews & Gambling Guides"}
          </h2>

          <p className="text-sm sm:text-base text-[#F8F5F2]/80 font-normal leading-relaxed max-w-2xl mx-auto">
            {t.statsSection?.subtitle || "Authentic player reviews, no deposit bonuses, and a wide selection of games with free play."}
          </p>
        </div>

        {/* Centered 6-Card Monochrome Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {currentStats.map((item, idx) => (
            <Link
              key={item.label}
              href={item.link}
              className="group relative rounded-2xl p-6 sm:p-8 bg-[#1F1A25] border border-[#A9D8F5]/20 hover:border-[#F04464]/60 transition-all duration-300 hover:-translate-y-1 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden hover:shadow-[0_15px_30px_-10px_rgba(240,68,100,0.25)]"
            >
              {/* Subtle hover gradient sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F04464]/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Metric Tag */}
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#A9D8F5] uppercase mb-3 block">
                METRIC {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Big Bold Monospace Number in Stark White */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8F5F2] group-hover:text-[#F04464] font-mono tracking-tight leading-none group-hover:scale-105 transition-transform duration-300">
                {item.number}
              </div>

              {/* Centered Label */}
              <div className="text-[11px] sm:text-xs font-extrabold uppercase text-[#A9D8F5] tracking-wider mt-3.5 leading-snug group-hover:text-[#F8F5F2] transition-colors">
                {item.label}
              </div>

              {/* Minimal Accent Dash */}
              <div className="w-6 h-0.5 bg-[#A9D8F5]/30 group-hover:w-12 group-hover:bg-[#F04464] transition-all duration-300 mt-4 rounded-full" />
            </Link>
          ))}
        </div>

        {/* Centered Monochrome Action Links */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-[#A9D8F5]/15 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/#protocol"
            className="px-5 py-2.5 rounded-full bg-[#1F1A25] hover:bg-[#26202D] border border-[#A9D8F5]/20 hover:border-[#F04464]/50 text-xs font-bold text-[#A9D8F5] hover:text-[#F8F5F2] uppercase tracking-wider transition flex items-center gap-2 group"
          >
            <ShieldCheck className="w-4 h-4 text-[#A9D8F5] group-hover:text-[#F04464]" />
            <span>{t.statsSection?.learnMore || "LEARN MORE ABOUT US"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/#protocol"
            className="px-5 py-2.5 rounded-full bg-[#1F1A25] hover:bg-[#26202D] border border-[#A9D8F5]/20 hover:border-[#F04464]/50 text-xs font-bold text-[#A9D8F5] hover:text-[#F8F5F2] uppercase tracking-wider transition flex items-center gap-2 group"
          >
            <HelpCircle className="w-4 h-4 text-[#A9D8F5] group-hover:text-[#F04464]" />
            <span>{t.statsSection?.support || "SUPPORT CENTER"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
