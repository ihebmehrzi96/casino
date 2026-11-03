"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Dices, RefreshCw } from "lucide-react";

// Floating Monochromatic Casino Medallion
export function FloatingCasinoChip({
  size = 56,
  top = "10%",
  left = "5%",
  duration = "6s",
  delay = "0s",
}: {
  size?: number;
  top?: string;
  left?: string;
  duration?: string;
  delay?: string;
}) {
  return (
    <div
      style={{ top, left, animationDuration: duration, animationDelay: delay }}
      className="absolute pointer-events-none select-none -z-10 animate-float-slow opacity-25 hover:opacity-70 transition-opacity"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] transform -rotate-12"
      >
        {/* Outer Matte Rim */}
        <circle cx="50" cy="50" r="46" fill="#121216" stroke="#FFFFFF" strokeWidth="2.5" />
        {/* Striped Ring */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 8" opacity="0.6" />
        {/* Inner Circle */}
        <circle cx="50" cy="50" r="28" fill="#18181D" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="16" fill="#09090B" stroke="#FFFFFF" strokeWidth="1" />
        {/* Center Star */}
        <polygon points="50,38 53,46 62,46 55,51 57,59 50,54 43,59 45,51 38,46 47,46" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

// Rolling Slot Machine Reels Micro-Widget (Pure Black Matte & White)
export function RollingSlotReels() {
  const { t } = useLanguage();
  const symbols = ["7️⃣", "💎", "⭐", "👑", "♠️", "🎲", "⚡", "🔒"];
  const [reels, setReels] = useState(["7️⃣", "7️⃣", "7️⃣"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [jackpot, setJackpot] = useState(false);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setJackpot(false);

    let count = 0;
    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setReels(["7️⃣", "7️⃣", "7️⃣"]);
        setIsSpinning(false);
        setJackpot(true);
      }
    }, 80);
  };

  return (
    <div className="relative inline-flex flex-col sm:flex-row items-center gap-4 p-3 px-5 rounded-2xl bg-zinc-900/90 border border-white/20 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <span className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
          <Dices className="w-4 h-4 text-white" />
          {t.slot.fairCheck}
        </span>
      </div>

      {/* 3 Reels */}
      <div className="flex items-center gap-2 bg-black p-2 rounded-xl border border-white/10 shadow-inner">
        {reels.map((symbol, i) => (
          <div
            key={i}
            className={`w-11 h-12 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xl font-bold shadow-md transition-all duration-150 transform ${
              isSpinning ? "scale-95 blur-[0.5px] -translate-y-1" : "scale-100 translate-y-0"
            }`}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Spin Trigger */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className="px-4 py-2 rounded-xl btn-white text-xs uppercase tracking-wider flex items-center gap-1.5 transition disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? "animate-spin text-black" : ""}`} />
        {isSpinning ? t.slot.rolling : t.slot.testRoll}
      </button>

      {/* Jackpot verified badge */}
      {jackpot && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          {t.slot.verified}
        </span>
      )}
    </div>
  );
}
