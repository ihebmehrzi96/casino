"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

interface BlacklistClientViewProps {
  blacklist: any[];
}

export default function BlacklistClientView({ blacklist }: BlacklistClientViewProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Warning Hero Box */}
        <ScrollReveal direction="down">
          <div className="p-10 sm:p-14 rounded-3xl bg-zinc-950 border-2 border-white/30 text-white space-y-5 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-wider shadow-sm">
              <ShieldAlert className="w-4 h-4 text-black" />
              {t.blacklistPage.badge} (Black Medal System)
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">{t.blacklistPage.title}</h1>
            <p className="text-base text-zinc-400 max-w-4xl leading-relaxed font-medium">
              {t.blacklistPage.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Blacklist Items in Black Matte Cards */}
        <div className="space-y-4">
          {blacklist.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 0.08}>
              <div className="p-7 rounded-2xl bg-zinc-900 border border-white/20 hover:border-white/50 transition shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-xl bg-black border border-white/10 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.logoUrl} alt={item.name} className="w-full h-full object-cover grayscale opacity-60" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-black text-white">{item.name}</h3>
                        <span className="px-3 py-0.5 rounded-md text-[10px] font-black bg-white text-black uppercase tracking-wider">
                          BLACK MEDAL ROGUE
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 font-bold mt-1.5">
                        {t.blacklistPage.safetyScore}: {item.safetyIndex.toFixed(1)} / 10 • {t.blacklistPage.license}: {item.license}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/casinos/${item.slug}`}
                    className="btn-matte px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider"
                  >
                    {t.blacklistPage.readReport}
                  </Link>
                </div>

                <div className="p-4 rounded-xl bg-black border border-white/10 text-xs text-zinc-300 leading-relaxed font-medium">
                  <strong className="text-white font-black">{t.blacklistPage.reasonLabel}: </strong>
                  {item.blacklistReason || item.summary}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
