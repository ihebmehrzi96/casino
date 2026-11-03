"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <section className="bg-[#1C0E2D] border-b border-purple-900/40 py-12 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading matching reference */}
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight mb-2 leading-tight">
            {t.statsSection?.title || "Online Casino Reviews & Gambling Guides"}
          </h2>
          <p className="text-sm sm:text-base text-purple-200/90 font-normal leading-relaxed">
            {t.statsSection?.subtitle || "Authentic player reviews, no deposit bonuses, and a wide selection of games with free play."}
          </p>
        </div>

        {/* 2-Column Content Row: 6 White Stat Cards on Left + Isometric Casino Rig on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Grid: 2 rows of 3 White Stat Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {currentStats.map((item) => (
              <a
                key={item.label}
                href={item.link}
                className="bg-white rounded-[14px] p-5 sm:p-6 shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-center text-left group"
              >
                <div className="text-2xl sm:text-[32px] font-black text-[#10B981] font-mono tracking-tight leading-none">
                  {item.number}
                </div>
                <div className="text-[11px] sm:text-[12px] font-black uppercase text-[#1F2937] tracking-wider mt-2.5 leading-snug">
                  {item.label}
                </div>
              </a>
            ))}
          </div>

          {/* Right Visual Graphic: Authentic Isometric 3D Roulette & Gaming Rig Illustration */}
          <div className="lg:col-span-4 flex items-center justify-center p-2 relative">
            <svg
              viewBox="0 0 460 360"
              className="w-full max-w-[420px] h-auto drop-shadow-2xl select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Neon glow filters */}
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="cyan-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="purple-wheel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B1261" />
                  <stop offset="100%" stopColor="#1B0630" />
                </linearGradient>
                <linearGradient id="server-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
              </defs>

              {/* Glowing Magenta Floor Circuit Lines */}
              <path
                d="M 330 310 L 330 330 L 440 330 L 440 310"
                stroke="#EC4899"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 285 275 L 310 300 L 310 320 L 250 320"
                stroke="#D946EF"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 390 190 L 420 220 L 420 310"
                stroke="#EC4899"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* ── BACKGROUND SERVER TOWER (Right top) ── */}
              <g transform="translate(370, 70)">
                {/* Server Tower Blocks */}
                <rect x="0" y="0" width="34" height="95" rx="6" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
                <rect x="4" y="6" width="26" height="12" rx="2" fill="#3B82F6" opacity="0.8" />
                <rect x="4" y="24" width="26" height="12" rx="2" fill="#E2E8F0" />
                <rect x="4" y="42" width="26" height="12" rx="2" fill="#E2E8F0" />
                <rect x="4" y="60" width="26" height="12" rx="2" fill="#E2E8F0" />
                <rect x="4" y="78" width="26" height="10" rx="2" fill="#334155" />
                {/* Blinking LEDs */}
                <circle cx="8" cy="83" r="2" fill="#22C55E" />
                <circle cx="14" cy="83" r="2" fill="#06B6D4" />
                <circle cx="20" cy="83" r="2" fill="#EC4899" />
                {/* Top power beacon */}
                <ellipse cx="17" cy="0" rx="6" ry="3" fill="#818CF8" />
              </g>

              {/* ── DESKTOP MONITOR WITH AVATAR (Top center) ── */}
              <g transform="translate(315, 120)">
                {/* Stand */}
                <path d="M 22 75 L 22 95 L 8 98 L 36 98 L 22 95" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
                {/* Screen frame */}
                <rect x="0" y="0" width="60" height="75" rx="8" fill="#581C87" stroke="#9333EA" strokeWidth="2.5" />
                {/* Inside Screen display */}
                <rect x="4" y="4" width="52" height="67" rx="6" fill="#2E1065" />
                {/* Avatar circle */}
                <circle cx="30" cy="35" r="16" fill="#F43F5E" />
                <circle cx="30" cy="32" r="7" fill="#FFFFFF" />
                <path d="M 19 46 Q 30 38 41 46" fill="#FFFFFF" />
                {/* Avatar glasses & hair detail */}
                <rect x="25" y="29" width="10" height="3" rx="1.5" fill="#1E1B4B" />
              </g>

              {/* ── ISOMETRIC 3D ROULETTE WHEEL ── */}
              <g transform="translate(230, 240)">
                
                {/* Outer Cyan Rim / Glow Ring Base */}
                <ellipse cx="80" cy="18" rx="136" ry="68" fill="#0E7490" opacity="0.6" />
                <ellipse cx="80" cy="12" rx="136" ry="68" fill="#083344" />
                <ellipse cx="80" cy="6" rx="136" ry="68" fill="url(#cyan-glow-grad)" filter="url(#neon-glow)" opacity="0.8" />
                <ellipse cx="80" cy="4" rx="134" ry="66" fill="#0284C7" />
                
                {/* Roulette Outer Track (Purple & Pink Alternating Radial Segments) */}
                <ellipse cx="80" cy="0" rx="128" ry="62" fill="url(#purple-wheel-grad)" stroke="#38BDF8" strokeWidth="3" />

                {/* Alternating Color Segments on the Track */}
                <path d="M 80 0 L -44 4 A 124 60 0 0 1 204 -4 Z" fill="#D946EF" opacity="0.85" />
                <path d="M 80 0 L 15 54 A 124 60 0 0 1 145 54 Z" fill="#3B82F6" opacity="0.8" />
                <path d="M 80 0 L -30 -25 A 124 60 0 0 1 60 -58 Z" fill="#EC4899" opacity="0.85" />
                <path d="M 80 0 L 100 -58 A 124 60 0 0 1 190 -25 Z" fill="#6366F1" opacity="0.8" />

                {/* Inner Ring Divider */}
                <ellipse cx="80" cy="0" rx="76" ry="36" fill="#1E0638" stroke="#38BDF8" strokeWidth="1.5" />
                
                {/* Spokes grid */}
                <line x1="80" y1="-36" x2="80" y2="36" stroke="#C084FC" strokeWidth="1.5" />
                <line x1="4" y1="0" x2="156" y2="0" stroke="#C084FC" strokeWidth="1.5" />
                <line x1="26" y1="-25" x2="134" y2="25" stroke="#C084FC" strokeWidth="1.5" />
                <line x1="26" y1="25" x2="134" y2="-25" stroke="#C084FC" strokeWidth="1.5" />

                {/* Turret Center Hub */}
                <ellipse cx="80" cy="0" rx="28" ry="14" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2" />
                <ellipse cx="80" cy="-6" rx="14" ry="8" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
                {/* Spindle handle */}
                <line x1="80" y1="-6" x2="80" y2="-24" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
                <circle cx="80" cy="-26" r="4" fill="#F8FAFC" />

                {/* ── 3D POKER CHIPS ── */}
                {/* Orange / Gold $100 Chip */}
                <g transform="translate(185, -28)">
                  <ellipse cx="12" cy="12" rx="14" ry="9" fill="#B45309" />
                  <ellipse cx="12" cy="8" rx="14" ry="9" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <ellipse cx="12" cy="8" rx="8" ry="5" fill="#FEF3C7" />
                  <text x="12" y="10" fontSize="6" fontWeight="900" fill="#78350F" textAnchor="middle">$100</text>
                </g>

                {/* Pink / Magenta Chip */}
                <g transform="translate(25, -25)">
                  <ellipse cx="12" cy="10" rx="13" ry="8" fill="#9D174D" />
                  <ellipse cx="12" cy="6" rx="13" ry="8" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="1.5" />
                  <ellipse cx="12" cy="6" rx="7" ry="4" fill="#FFE4E6" />
                </g>

                {/* Cyan Striped Chip */}
                <g transform="translate(195, 12)">
                  <ellipse cx="12" cy="10" rx="14" ry="9" fill="#0E7490" />
                  <ellipse cx="12" cy="6" rx="14" ry="9" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" />
                  <ellipse cx="12" cy="6" rx="8" ry="5" fill="#CFFAFE" />
                </g>

                {/* ── 3D ROLLING DICE ── */}
                <g transform="translate(160, 40)">
                  <path d="M 0 0 L 14 -7 L 28 0 L 14 7 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                  <path d="M 0 0 L 14 7 L 14 22 L 0 15 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
                  <path d="M 14 7 L 28 0 L 28 15 L 14 22 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
                  {/* Dice dots */}
                  <circle cx="14" cy="0" r="1.5" fill="#EF4444" />
                  <circle cx="7" cy="11" r="1.2" fill="#1E293B" />
                  <circle cx="21" cy="11" r="1.2" fill="#1E293B" />
                </g>

              </g>

            </svg>
          </div>

        </div>

        {/* Bottom Magenta Action Links matching reference */}
        <div className="mt-8 pt-5 border-t border-purple-800/40 flex flex-wrap items-center gap-6">
          <Link
            href="/#protocol"
            className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#F43F5E] hover:text-pink-300 transition flex items-center gap-2"
          >
            <span>{t.statsSection?.learnMore || "LEARN MORE ABOUT US"}</span>
            <span className="text-purple-400 font-normal">–</span>
            <span>{t.statsSection?.support || "SUPPORT CENTER"}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
