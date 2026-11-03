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

  let colorClass = "bg-[#A9D8F5] text-[#17131B] border border-[#A9D8F5] font-black";
  let label = "Vault Elite";
  let Icon = ShieldCheck;

  if (isBlacklist) {
    colorClass = "bg-[#F04464] text-[#F8F5F2] border border-[#F04464] font-black";
    label = "Black Medal Rogue";
    Icon = ShieldAlert;
  } else if (isMedium) {
    colorClass = "bg-[#1F1A25] text-[#A9D8F5] border border-[#A9D8F5]/30";
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
