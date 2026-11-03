"use client";

import Link from "next/link";
import { Gift, ExternalLink, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

interface BonusesClientViewProps {
  bonuses: any[];
}

export default function BonusesClientView({ bonuses }: BonusesClientViewProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header (Black Matte) */}
      <section className="bg-zinc-950 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest bg-zinc-900 px-4 py-1.5 rounded-full border border-white/20">
            <Gift className="w-3.5 h-3.5 text-white" />
            {t.bonusesPage.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">{t.bonusesPage.title}</h1>
          <p className="text-base text-zinc-400 leading-relaxed font-normal">
            {t.bonusesPage.subtitle}
          </p>
        </div>
      </section>

      {/* Bonuses on Black Matte Canvas */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonuses.map((bonus: any, idx: number) => (
              <ScrollReveal key={idx} direction="up" delay={(idx % 3) * 100}>
                <div className="p-7 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/35 transition-all duration-300 shadow-matte-card flex flex-col justify-between space-y-5 group h-full">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-black border border-white/20 overflow-hidden shrink-0">
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
                          {t.bonusesPage.wagering}
                        </span>
                        <span className="font-extrabold text-white">{bonus.wagering}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[11px] font-bold uppercase mb-0.5">
                          {t.bonusesPage.minDeposit}
                        </span>
                        <span className="font-extrabold text-white">
                          {bonus.minDeposit || t.bonusesPage.none}
                        </span>
                      </div>
                    </div>

                    {bonus.bonusCode && (
                      <div className="mt-4 p-2.5 rounded-xl bg-black border border-white/20 text-xs flex items-center justify-between">
                        <span className="text-zinc-400 font-bold uppercase text-[10px]">
                          {t.bonusesPage.promoCode}:
                        </span>
                        <code className="text-white font-mono font-black text-sm">{bonus.bonusCode}</code>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <a
                      href={bonus.claimUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="btn-white w-full py-3 px-5 rounded-xl text-center text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      {t.bonusesPage.claimThisBonus}
                      <ExternalLink className="w-3.5 h-3.5 text-black" />
                    </a>
                    <p className="text-[10px] text-zinc-500 text-center mt-2 font-medium">
                      {t.bonusesPage.termsApply}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
