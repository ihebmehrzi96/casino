"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  currency: string;
  licenseAuthority: string;
}

export const SUPPORTED_COUNTRIES: CountryInfo[] = [
  { code: "ALL", name: "All Countries (Global)", flag: "🌐", currency: "USD ($)", licenseAuthority: "International Licensed" },
  { code: "US", name: "USA", flag: "🇺🇸", currency: "USD ($)", licenseAuthority: "State & Crypto Regulated" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD ($)", licenseAuthority: "ACMA Audited Pokies" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD ($)", licenseAuthority: "iGaming Ontario & Kahnawake" },
  { code: "GB", name: "UK", flag: "🇬🇧", currency: "GBP (£)", licenseAuthority: "UKGC Licensed" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", currency: "NZD ($)", licenseAuthority: "International Certified" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", currency: "EUR (€)", licenseAuthority: "KSA Regulated" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", currency: "SEK (kr)", licenseAuthority: "Spelinspektionen" },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR (€)", licenseAuthority: "GGL & EU Regulated" },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR (€)", licenseAuthority: "ANJ & EU Regulated" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", currency: "BRL (R$)", licenseAuthority: "SPA / MF Regulated" },
];

interface LocationContextType {
  country: CountryInfo;
  isAutoDetected: boolean;
  setCountryByCode: (code: string) => void;
  isAvailableInCountry: (casinoAllowedCountries?: string[]) => boolean;
  allCountries: CountryInfo[];
}

const LocationContext = createContext<LocationContextType>({
  country: SUPPORTED_COUNTRIES[1], // default USA
  isAutoDetected: true,
  setCountryByCode: () => {},
  isAvailableInCountry: () => true,
  allCountries: SUPPORTED_COUNTRIES,
});

export const useLocation = () => useContext(LocationContext);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountry] = useState<CountryInfo>(SUPPORTED_COUNTRIES[1]);
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(true);

  useEffect(() => {
    // 1. Check if user previously manually selected a country
    const savedCode = localStorage.getItem("casinova_country");
    if (savedCode) {
      const match = SUPPORTED_COUNTRIES.find((c) => c.code === savedCode);
      if (match) {
        setCountry(match);
        setIsAutoDetected(false);
        return;
      }
    }

    // 2. Auto-detect user's real location as DEFAULT
    let detected = false;

    // Fast IP-based country lookup
    const detectFromIp = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const res = await fetch("https://api.country.is", { signal: controller.signal });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json();
          const countryCode = data?.country?.toUpperCase();
          if (countryCode) {
            const match = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
            if (match) {
              setCountry(match);
              setIsAutoDetected(true);
              detected = true;
              return;
            }
          }
        }
      } catch {
        // Fallback to timezone and locale detection below
      }

      if (!detected) {
        detectFromTimezone();
      }
    };

    const detectFromTimezone = () => {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        const navLang = typeof navigator !== "undefined" ? (navigator.language || "") : "";

        if (tz.includes("London") || navLang.includes("en-GB")) {
          setCountry(SUPPORTED_COUNTRIES.find((c) => c.code === "GB")!);
        } else if (
          tz.includes("New_York") ||
          tz.includes("Chicago") ||
          tz.includes("Los_Angeles") ||
          tz.includes("Denver") ||
          tz.includes("Phoenix") ||
          tz.includes("America")
        ) {
          setCountry(SUPPORTED_COUNTRIES.find((c) => c.code === "US")!);
        } else if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal") || navLang.includes("en-CA")) {
          setCountry(SUPPORTED_COUNTRIES.find((c) => c.code === "CA")!);
        } else if (tz.includes("Sydney") || tz.includes("Melbourne") || tz.includes("Brisbane") || tz.includes("Perth") || navLang.includes("en-AU")) {
          setCountry(SUPPORTED_COUNTRIES.find((c) => c.code === "AU")!);
        } else if (tz.includes("Auckland") || navLang.includes("en-NZ")) {
          setCountry(SUPPORTED_COUNTRIES.find((c) => c.code === "NZ")!);
        } else if (tz.includes("Amsterdam")) {
          setCountry(SUPPORTED_COUNTRIES.find((c) => c.code === "NL")!);
        } else if (tz.includes("Stockholm")) {
          setCountry(SUPPORTED_COUNTRIES.find((c) => c.code === "SE")!);
        } else if (tz.includes("Berlin")) {
          setCountry(SUPPORTED_COUNTRIES.find((c) => c.code === "DE")!);
        } else if (tz.includes("Paris")) {
          setCountry(SUPPORTED_COUNTRIES.find((c) => c.code === "FR")!);
        } else {
          // Default to US or Global
          setCountry(SUPPORTED_COUNTRIES.find((c) => c.code === "US") || SUPPORTED_COUNTRIES[1]);
        }
        setIsAutoDetected(true);
      } catch {
        setCountry(SUPPORTED_COUNTRIES[1]);
        setIsAutoDetected(true);
      }
    };

    detectFromIp();
  }, []);

  const setCountryByCode = (code: string) => {
    const found = SUPPORTED_COUNTRIES.find((c) => c.code === code) || SUPPORTED_COUNTRIES[0];
    setCountry(found);
    setIsAutoDetected(false);
    localStorage.setItem("casinova_country", found.code);
  };

  const isAvailableInCountry = (casinoAllowedCountries?: string[]) => {
    if (!casinoAllowedCountries || casinoAllowedCountries.length === 0) return true;
    if (country.code === "ALL") return true;
    return (
      casinoAllowedCountries.includes(country.code) ||
      casinoAllowedCountries.includes("GLOBAL") ||
      casinoAllowedCountries.includes("ALL")
    );
  };

  return (
    <LocationContext.Provider
      value={{
        country,
        isAutoDetected,
        setCountryByCode,
        isAvailableInCountry,
        allCountries: SUPPORTED_COUNTRIES,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
