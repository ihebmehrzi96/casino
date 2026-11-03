"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Shield } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-white/10 bg-[#090A0E] text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Compliance Warning Bar */}
        <div className="mb-12 p-6 rounded-2xl border border-white/10 bg-zinc-900 flex flex-col sm:flex-row items-center gap-5 text-sm text-zinc-300 font-medium">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-white text-black flex items-center justify-center font-black text-xl shadow-md">
            18+
          </div>
          <p className="leading-relaxed text-sm sm:text-base">
            <strong className="text-white font-black">{t.footer.playResponsibly} </strong>
            {t.footer.warningText}{" "}
            <a
              href="https://www.begambleaware.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-white hover:text-zinc-300"
            >
              BeGambleAware.org
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-sreda text-3xl text-white font-normal tracking-tight">
                Casinova
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-xs tracking-wider uppercase mb-4 text-white">
              {t.footer.quickNav}
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/casinos" className="hover:text-white text-zinc-400 transition">
                  {t.nav.topCasinos}
                </Link>
              </li>
              <li>
                <Link href="/bonuses" className="hover:text-white text-zinc-400 transition">
                  {t.nav.bestBonuses}
                </Link>
              </li>
              <li>
                <Link href="/blacklist" className="hover:text-white text-zinc-400 transition">
                  {t.nav.blacklist}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-extrabold text-xs tracking-wider uppercase mb-4 text-white">
              CasinoFreak Categories
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-zinc-400">
              <li>No Deposit Bonuses</li>
              <li>Instant Crypto Withdrawals</li>
              <li>Free Demo Slot Machines</li>
              <li>MGA & UKGC Licensed Operators</li>
            </ul>
          </div>

          {/* Affiliate Transparency */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-xs tracking-wider uppercase mb-4 text-white">
              {t.footer.affiliateTransparency}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              {t.footer.affiliateText}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-500">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">{t.footer.privacyPolicy}</span>
            <span className="hover:text-white cursor-pointer">{t.footer.termsOfService}</span>
            <span className="hover:text-white cursor-pointer">{t.footer.guidelines}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
