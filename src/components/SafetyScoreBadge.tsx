import React from "react";
import { ShieldAlert, ShieldCheck, Shield } from "lucide-react";

interface SafetyScoreBadgeProps {
  score: number;
  tier?: string;
  size?: "sm" | "md" | "lg";
}

export default function SafetyScoreBadge({ score, tier, size = "md" }: SafetyScoreBadgeProps) {
  const isBlacklist = score < 5.0 || tier === "BLACKLISTED";
  const isHigh = score >= 8.5;
  const isMedium = score >= 6.5 && score < 8.5;

  let colorClass = "bg-white text-black border border-white font-black";
  let label = "Vault Elite";
  let Icon = ShieldCheck;

  if (isBlacklist) {
    colorClass = "bg-black text-white border-2 border-white font-black";
    label = "Black Medal Rogue";
    Icon = ShieldAlert;
  } else if (isMedium) {
    colorClass = "bg-zinc-800 text-zinc-200 border border-white/20";
    label = "Standard Tier";
    Icon = Shield;
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] gap-1.5 font-bold",
    md: "px-3 py-1 text-xs gap-2 font-black uppercase tracking-wider",
    lg: "px-4 py-2 text-sm gap-2.5 font-black uppercase tracking-wider",
  };

  return (
    <div
      className={`inline-flex items-center rounded-md tracking-wide ${colorClass} ${sizeClasses[size]}`}
    >
      <Icon className={size === "lg" ? "w-4 h-4 text-current" : "w-3 h-3 text-current"} />
      <span className="font-mono font-black">{score.toFixed(1)} / 10</span>
      <span className="opacity-90 font-bold lowercase text-[10px]">({label})</span>
    </div>
  );
}
