"use client";

import CasinoCard from "@/components/CasinoCard";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "@/context/LocationContext";
import { Flame } from "lucide-react";

interface CasinosDirectoryClientViewProps {
  casinos: any[];
}

export default function CasinosDirectoryClientView({ casinos }: CasinosDirectoryClientViewProps) {
  const { t } = useLanguage();
  const { country, isAvailableInCountry } = useLocation();

  const filtered = casinos.filter((c) => isAvailableInCountry(c.allowedCountries));

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header (Black Matte) */}
      <section className="bg-zinc-950 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest bg-zinc-900 px-4 py-1.5 rounded-full border border-white/20">
            <Flame className="w-3.5 h-3.5 text-white" />
            {t.directory.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">{t.directory.title}</h1>
          <p className="text-base text-zinc-400 leading-relaxed font-normal">
            {t.directory.subtitle}
          </p>
          <div className="pt-2 text-xs text-zinc-400">
            Showing <strong className="text-white">{filtered.length}</strong> casinos verified for <strong className="text-white">{country.name} ({country.flag})</strong>
          </div>
        </div>
      </section>

      {/* Casino Cards on Black Matte Canvas */}
      <section className="bg-black py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {filtered.map((casino, idx) => (
            <ScrollReveal key={casino.id} direction="up" delay={idx * 0.05}>
              <CasinoCard casino={casino as any} rank={idx + 1} />
            </ScrollReveal>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-zinc-900/60 rounded-2xl border border-white/10">
              <p className="text-zinc-400 text-sm">
                No casinos match the current country selection. Try selecting "Global" in the top bar.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
