"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "de", label: "DE", flag: "🇩🇪" },
];

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-white/15 shadow-sm">
      {languages.map((l) => {
        const isSelected = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={isSelected}
            aria-label={`Switch to ${l.label}`}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black transition-all duration-200 ${
              isSelected
                ? "bg-white text-black shadow-md"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <span className="text-sm leading-none">{l.flag}</span>
            <span className="uppercase tracking-wider text-[11px] font-mono font-black">
              {l.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}