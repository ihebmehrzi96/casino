"use client";

import { useState, useRef, useEffect } from "react";
import { useLocation, SUPPORTED_COUNTRIES } from "@/context/LocationContext";
import { MapPin, ChevronDown, Check, Globe } from "lucide-react";

interface CountrySelectorProps {
  variant?: "pill" | "banner" | "menu";
}

export default function CountrySelector({ variant = "pill" }: CountrySelectorProps) {
  const { country, isAutoDetected, setCountryByCode } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (variant === "banner") {
    return (
      <div ref={dropdownRef} className="relative w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300">
          <div className="flex items-center gap-2.5">
            <span className="text-xl leading-none">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  Showing casinos available in {country.name}
                </span>
                {isAutoDetected && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-semibold">
                    Auto-Detected
                  </span>
                )}
              </div>
              <p className="text-zinc-400 text-xs mt-0.5">
                License Authority: <span className="text-zinc-300 font-medium">{country.licenseAuthority}</span>
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs border border-white/15 transition cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Change Country</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#14151B] border border-white/15 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-white/10">
                  Select Your Region
                </div>
                {SUPPORTED_COUNTRIES.map((c) => {
                  const isSelected = c.code === country.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setCountryByCode(c.code);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition ${
                        isSelected
                          ? "bg-white/10 text-white font-bold"
                          : "text-zinc-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{c.flag}</span>
                        <div>
                          <div>{c.name}</div>
                          <div className="text-[10px] text-zinc-400">{c.currency}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <div ref={dropdownRef} className="relative inline-block text-left">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition shadow-sm"
        >
          <span className="text-base">{country.flag}</span>
          <span>{country.name}</span>
          {isAutoDetected && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
              Auto
            </span>
          )}
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-0.5" />
        </button>

        {isOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl bg-[#121319] border border-white/20 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-72 overflow-y-auto">
            <div className="px-3.5 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-white/10">
              Select Your Region
            </div>
            {SUPPORTED_COUNTRIES.map((c) => {
              const isSelected = c.code === country.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setCountryByCode(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition ${
                    isSelected
                      ? "bg-white/15 text-white font-bold"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{c.flag}</span>
                    <div>
                      <div className="text-white font-medium">{c.name}</div>
                      <div className="text-[10px] text-zinc-400">{c.currency}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Pill variant (for Navbar)
  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-200 transition"
      >
        <span>{country.flag}</span>
        <span className="font-semibold text-white">{country.name}</span>
        <ChevronDown className="w-3 h-3 text-zinc-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#14151B] border border-white/15 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-80 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-white/10">
            Select Your Location
          </div>
          {SUPPORTED_COUNTRIES.map((c) => {
            const isSelected = c.code === country.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCountryByCode(c.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition ${
                  isSelected
                    ? "bg-white/10 text-white font-bold"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{c.flag}</span>
                  <div>
                    <div>{c.name}</div>
                    <div className="text-[10px] text-zinc-400">{c.currency}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
