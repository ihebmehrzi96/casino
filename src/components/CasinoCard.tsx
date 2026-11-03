"use client";

import Link from "next/link";
import SafetyScoreBadge from "./SafetyScoreBadge";
import { useLanguage } from "@/context/LanguageContext";
import {
  Star,
  Zap,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Clock,
  CreditCard,
  Gift,
  Check,
  Shield,
  Layers,
} from "lucide-react";

interface CasinoCardProps {
  casino: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
    rating: number;
    safetyIndex: number;
    safetyTier: string;
    license: string;
    payoutSpeed: string;
    minDeposit: string;
    affiliateUrl: string;
    pros: string;
    summary: string;
    bonuses?: Array<{
      title: string;
      bonusCode?: string | null;
      wagering: string;
    }>;
  };
  rank?: number;
  variant?: "light" | "dark";
}

export default function CasinoCard({ casino, rank }: CasinoCardProps) {
  const { t } = useLanguage();
  let parsedPros: string[] = [];
  try {
    parsedPros = JSON.parse(casino.pros || "[]");
  } catch {
    parsedPros = [];
  }

  const topBonus = casino.bonuses && casino.bonuses.length > 0 ? casino.bonuses[0] : null;

  return (
    <div className="relative rounded-2xl p-6 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-zinc-900 border border-white/10 hover:border-white/20 text-white">
      {/* CasinoFreak-style Medal / Rank Ribbon (Monochrome Black & White) */}
      {rank && (
        <div className="absolute top-0 left-0 bg-white text-black text-xs font-black px-4 py-1 rounded-tl-2xl rounded-br-2xl shadow-sm tracking-wider uppercase flex items-center gap-1.5">
          <span>#{rank}</span>
          <span className="text-[10px] tracking-widest font-extrabold opacity-80">
            {rank === 1 ? "VAULT MEDAL" : rank <= 3 ? "TOP MEDAL" : "VERIFIED"}
          </span>
        </div>
      )}

      {/* Column 1: Casino Identity & Rating */}
      <div className="flex items-center gap-5 min-w-[270px] pt-4 sm:pt-0">
        <div className="w-20 h-20 rounded-2xl p-2 overflow-hidden flex items-center justify-center shrink-0 bg-black border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={casino.logoUrl}
            alt={casino.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div>
          <Link
            href={`/casinos/${casino.slug}`}
            className="text-xl sm:text-2xl font-black text-white hover:underline transition-all flex items-center gap-2"
          >
            {casino.name}
          </Link>

          <div className="flex items-center gap-2.5 mt-1.5">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-black bg-white text-black">
              <Star className="w-3.5 h-3.5 fill-black text-black" />
              {casino.rating.toFixed(1)} / 10
            </div>
            <span className="text-xs font-medium text-zinc-400">
              {casino.license.split("(")[0]}
            </span>
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <SafetyScoreBadge score={casino.safetyIndex} tier={casino.safetyTier} size="sm" />
          </div>
        </div>
      </div>

      {/* Column 2: CasinoFreak Promotional Bonus Block */}
      <div className="flex-1 min-w-[260px]">
        <div className="text-[11px] text-zinc-400 font-black tracking-widest uppercase mb-1 flex items-center gap-1.5">
          <Gift className="w-3.5 h-3.5 text-white" />
          {t.card.topWelcomePackage}
        </div>
        <div className="text-lg sm:text-xl font-black text-white leading-snug">
          {topBonus ? topBonus.title : t.card.exclusiveOffer}
        </div>

        {/* Quick Specs (Min Dep, Payout Speed, Wagering) */}
        <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-xs font-semibold">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black border border-white/10 text-zinc-300">
            <CreditCard className="w-3.5 h-3.5 text-white" />
            Min: <strong className="text-white">{casino.minDeposit}</strong>
          </span>

          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black border border-white/10 text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-white" />
            Payout: <strong className="text-white">{casino.payoutSpeed}</strong>
          </span>

          {topBonus?.wagering && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-white font-bold">
              Wager: {topBonus.wagering}
            </span>
          )}

          {topBonus?.bonusCode && (
            <span className="px-2.5 py-1 rounded-lg bg-white text-black font-mono font-black text-xs">
              CODE: {topBonus.bonusCode}
            </span>
          )}
        </div>

        {/* CasinoFreak Feature Highlight: Live Player Region & Pros */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1 text-white font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Verified Player Region
          </span>
          {parsedPros.length > 0 && (
            <span className="inline-flex items-center gap-1 text-zinc-400">
              <Check className="w-3.5 h-3.5 text-white" />
              <span className="line-clamp-1">{parsedPros[0]}</span>
            </span>
          )}
        </div>
      </div>

      {/* Column 3: High Contrast Dual CTAs (Stark White & Matte Dark) */}
      <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2.5 w-full lg:w-44 shrink-0">
        <a
          href={casino.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="btn-white w-full py-3 px-4 rounded-xl text-center text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 group/btn"
        >
          <span>{t.card.claimBonus}</span>
          <ExternalLink className="w-3.5 h-3.5 text-black group-hover/btn:translate-x-0.5 transition-transform" />
        </a>

        <Link
          href={`/casinos/${casino.slug}`}
          className="btn-matte w-full py-2.5 px-4 rounded-xl text-center text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
        >
          <span>{t.card.readReview}</span>
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </Link>
      </div>
    </div>
  );
}
