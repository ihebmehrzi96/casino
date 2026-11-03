"use client";

import Link from "next/link";
import { useLocation } from "@/context/LocationContext";

interface CasinoHubDirectoryProps {
  onCategorySelect?: (filter: "ALL" | "NO_DEPOSIT" | "FAST" | "CRYPTO" | "SAFETY") => void;
}

export default function CasinoHubDirectory({ onCategorySelect }: CasinoHubDirectoryProps) {
  const { setCountryByCode } = useLocation();

  const handleCountryClick = (code: string) => {
    setCountryByCode(code);
    const target = document.getElementById("casino-directory");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFilterClick = (filter: "ALL" | "NO_DEPOSIT" | "FAST" | "CRYPTO" | "SAFETY") => {
    if (onCategorySelect) {
      onCategorySelect(filter);
    }
    const target = document.getElementById("casino-directory");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const popularPages = [
    { name: "All Online Casinos", filter: "ALL" as const },
    { name: "Best Casinos", filter: "ALL" as const },
    { name: "Real Money Slots", href: "#free-games" },
    { name: "Best Payout Casinos", filter: "FAST" as const },
    { name: "Fast Payout Casinos", filter: "FAST" as const },
    { name: "Minimum Deposit Casinos", href: "/bonuses" },
    { name: "Mobile Casinos", href: "/casinos" },
    { name: "Exclusive Casinos", href: "/casinos" },
    { name: "Low Wagering Casinos", filter: "NO_DEPOSIT" as const },
    { name: "Crypto Casinos", filter: "CRYPTO" as const },
    { name: "No Account Casinos", filter: "CRYPTO" as const },
    { name: "Inclave Casinos", href: "/casinos" },
    { name: "Independent Casinos", filter: "SAFETY" as const },
    { name: "International Casinos", href: "/casinos" },
    { name: "European Casinos", href: "/casinos" },
    { name: "eCOGRA Casinos", filter: "SAFETY" as const },
  ];

  const casinosByGame = [
    "Live Dealer Casinos",
    "Roulette Casinos",
    "Blackjack Casinos",
    "Craps Casinos",
    "Baccarat Casinos",
    "Bingo Casinos",
    "Keno Casinos",
    "Video Poker Casinos",
    "Plinko Casinos",
    "Chicken Gambling Casinos",
    "Crash Games Casinos",
    "Fish Games Casinos",
    "Mines Casinos",
    "Sic Bo Casinos",
    "VR Casinos",
  ];

  const countryLinks = [
    { name: "USA", code: "US" },
    { name: "Australia", code: "AU" },
    { name: "Canada", code: "CA" },
    { name: "UK", code: "GB" },
    { name: "New Zealand", code: "NZ" },
    { name: "Netherlands", code: "NL" },
    { name: "Sweden", code: "SE" },
    { name: "ALL COUNTRIES", code: "ALL", highlight: true },
  ];

  const softwareProviders = [
    "NetEnt",
    "Hacksaw Gaming",
    "Red Tiger Gaming",
    "Play'n GO",
    "BetSoft",
    "BGaming",
    "Thunderkick",
    "ALL SOFTWARE",
  ];

  const bankingMethods = [
    "Visa",
    "MasterCard",
    "Skrill",
    "Neteller",
    "Wire Transfer",
    "paysafecard",
    "Bitcoin",
    "ALL BANKING",
  ];

  const licenseAuthorities = [
    "Malta",
    "Curacao",
    "Kahnawake",
    "Anjouan",
  ];

  return (
    <section className="bg-[#17131B] border-t border-[#A9D8F5]/15 py-16 px-4 sm:px-6 lg:px-8 text-[#F8F5F2]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
          
          {/* Column 1: Popular Pages */}
          <div>
            <h3 className="font-tanker text-sm tracking-wider uppercase mb-5 text-[#F8F5F2]">
              POPULAR PAGES
            </h3>
            <ul className="space-y-2.5 text-xs">
              {popularPages.map((item) => (
                <li key={item.name}>
                  {item.filter ? (
                    <button
                      type="button"
                      onClick={() => handleFilterClick(item.filter)}
                      className="text-[#A9D8F5]/80 hover:text-[#F04464] transition text-left"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.href || "/casinos"}
                      className="text-[#A9D8F5]/80 hover:text-[#F04464] transition"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Casinos by Game */}
          <div>
            <h3 className="font-tanker text-sm tracking-wider uppercase mb-5 text-[#F8F5F2]">
              CASINOS BY GAME
            </h3>
            <ul className="space-y-2.5 text-xs">
              {casinosByGame.map((game) => (
                <li key={game}>
                  <a
                    href="#free-games"
                    className="text-[#A9D8F5]/80 hover:text-[#F04464] transition"
                  >
                    {game}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Country */}
          <div>
            <h3 className="font-tanker text-sm tracking-wider uppercase mb-5 text-[#F8F5F2]">
              COUNTRY
            </h3>
            <ul className="space-y-2.5 text-xs">
              {countryLinks.map((c) => (
                <li key={c.name}>
                  <button
                    type="button"
                    onClick={() => handleCountryClick(c.code)}
                    className={`transition text-left ${
                      c.highlight
                        ? "font-bold text-white uppercase mt-2 pt-2 border-t border-white/10 block"
                        : "text-[#A9D8F5]/80 hover:text-[#F04464]"
                    }`}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Software */}
          <div>
            <h3 className="font-tanker text-sm tracking-wider uppercase mb-5 text-[#F8F5F2]">
              SOFTWARE
            </h3>
            <ul className="space-y-2.5 text-xs">
              {softwareProviders.map((software) => (
                <li key={software}>
                  <a
                    href="#free-games"
                    className={`transition ${
                      software === "ALL SOFTWARE"
                        ? "font-bold text-white uppercase mt-2 pt-2 border-t border-white/10 block"
                        : "text-[#A9D8F5]/80 hover:text-[#F04464]"
                    }`}
                  >
                    {software}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Banking */}
          <div>
            <h3 className="font-tanker text-sm tracking-wider uppercase mb-5 text-[#F8F5F2]">
              BANKING
            </h3>
            <ul className="space-y-2.5 text-xs">
              {bankingMethods.map((method) => (
                <li key={method}>
                  <a
                    href="#casino-directory"
                    className={`transition ${
                      method === "ALL BANKING"
                        ? "font-bold text-white uppercase mt-2 pt-2 border-t border-white/10 block"
                        : "text-[#A9D8F5]/80 hover:text-[#F04464]"
                    }`}
                  >
                    {method}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6: License */}
          <div>
            <h3 className="font-tanker text-sm tracking-wider uppercase mb-5 text-[#F8F5F2]">
              LICENSE
            </h3>
            <ul className="space-y-2.5 text-xs">
              {licenseAuthorities.map((lic) => (
                <li key={lic}>
                  <a
                    href="#protocol"
                    className="text-[#A9D8F5]/80 hover:text-[#F04464] transition"
                  >
                    {lic}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
