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
    <footer className="border-t border-[#A9D8F5]/15 bg-[#17131B] text-[#A9D8F5]/80 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Compliance Warning Bar */}
        <div className="mb-12 p-6 rounded-2xl border border-[#A9D8F5]/20 bg-[#1F1A25] flex flex-col sm:flex-row items-center gap-5 text-sm text-[#F8F5F2] font-medium shadow-2xl">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-[#F04464] text-[#F8F5F2] flex items-center justify-center font-black text-xl shadow-md font-tanker">
            18+
          </div>
          <p className="leading-relaxed text-sm sm:text-base">
            <strong className="text-[#F8F5F2] font-black">{t.footer.playResponsibly} </strong>
            {t.footer.warningText}{" "}
            <a
              href="https://www.begambleaware.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-[#A9D8F5] hover:text-[#F04464]"
            >
              BeGambleAware.org
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-tanker tracking-wider text-3xl text-[#F8F5F2] hover:text-[#F04464] font-normal uppercase transition-colors">
                Casinova
              </span>
            </Link>
            <p className="text-xs text-[#F8F5F2]/75 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-xs tracking-wider uppercase mb-4 text-[#F8F5F2] font-tanker text-sm">
              {t.footer.quickNav}
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/casinos" className="hover:text-[#F04464] text-[#A9D8F5] transition">
                  {t.nav.topCasinos}
                </Link>
              </li>
              <li>
                <Link href="/bonuses" className="hover:text-[#F04464] text-[#A9D8F5] transition">
                  {t.nav.bestBonuses}
                </Link>
              </li>
              <li>
                <Link href="/blacklist" className="hover:text-[#F04464] text-[#A9D8F5] transition">
                  {t.nav.blacklist}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-extrabold text-xs tracking-wider uppercase mb-4 text-[#F8F5F2] font-tanker text-sm">
              CasinoFreak Categories
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-[#A9D8F5]/80">
              <li>No Deposit Bonuses</li>
              <li>Instant Crypto Withdrawals</li>
              <li>Free Demo Slot Machines</li>
              <li>MGA & UKGC Licensed Operators</li>
            </ul>
          </div>

          {/* Affiliate Transparency */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-xs tracking-wider uppercase mb-4 text-[#F8F5F2] font-tanker text-sm">
              {t.footer.affiliateTransparency}
            </h4>
            <p className="text-xs text-[#F8F5F2]/75 leading-relaxed font-medium">
              {t.footer.affiliateText}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#A9D8F5]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#A9D8F5]/60">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#F04464] cursor-pointer transition-colors">{t.footer.privacyPolicy}</span>
            <span className="hover:text-[#F04464] cursor-pointer transition-colors">{t.footer.termsOfService}</span>
            <span className="hover:text-[#F04464] cursor-pointer transition-colors">{t.footer.guidelines}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
