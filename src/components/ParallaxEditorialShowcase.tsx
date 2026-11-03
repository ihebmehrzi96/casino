"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ShieldCheck, ArrowRight, Zap, ExternalLink, Award, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ShowcaseItem {
  id: string;
  rank: string;
  name: string;
  tagline: string;
  description: string;
  rating: string;
  safetyScore: string;
  payoutSpeed: string;
  license: string;
  bonus: string;
  imageUrl: string;
  claimUrl: string;
  reviewUrl: string;
  badge: string;
  accentBorder: string;
  accentColor: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "showcase-1",
    rank: "No. 01 / Flagship Operator",
    name: "BitStarz",
    tagline: "Certified King of Hybrid Crypto & Fiat Gaming",
    description:
      "Independently audited with an unmatched 10-minute average withdrawal latency. Tier-1 Curacao oversight with verified provably fair RNG studio connections.",
    rating: "9.8",
    safetyScore: "9.9",
    payoutSpeed: "Instant (10 Mins)",
    license: "Curacao GCB Verified",
    bonus: "100% Up to $500 or 5 BTC + 180 Free Spins",
    imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80",
    claimUrl: "https://bitstarz.com/?ref=demo_affiliate",
    reviewUrl: "/casinos/bitstarz",
    badge: "Highest Safety Score",
    accentBorder: "hover:border-emerald-400/50",
    accentColor: "text-[#A9D8F5]",
  },
  {
    id: "showcase-2",
    rank: "No. 02 / European Benchmark",
    name: "LeoVegas",
    tagline: "Dual UKGC & MGA Regulated Mobile Flagship",
    description:
      "King of Mobile gaming carrying European regulatory gold standards. Flawless player dispute history and industry-leading LeoSafePlay consumer protection.",
    rating: "9.5",
    safetyScore: "9.8",
    payoutSpeed: "12 - 24 Hours",
    license: "UKGC & Malta (MGA)",
    bonus: "100% Match up to €1,000 + 200 Free Spins",
    imageUrl: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&w=1200&q=80",
    claimUrl: "https://leovegas.com/?ref=demo_affiliate",
    reviewUrl: "/casinos/leovegas",
    badge: "Tier-1 Regulatory Benchmark",
    accentBorder: "hover:border-amber-400/50",
    accentColor: "text-[#F04464]",
  },
  {
    id: "showcase-3",
    rank: "No. 03 / High Roller Crypto",
    name: "Stake",
    tagline: "Uncapped Blockchain Payouts & Provably Fair",
    description:
      "World's largest crypto gaming portal. Instant on-chain payouts, zero withdrawal caps, and real-time provably fair verification on all proprietary titles.",
    rating: "9.4",
    safetyScore: "9.6",
    payoutSpeed: "Instant On-Chain",
    license: "Curacao GCB Official",
    bonus: "200% Deposit Match up to $1,000 + 10% Rakeback",
    imageUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1200&q=80",
    claimUrl: "https://stake.com/?c=demo_affiliate",
    reviewUrl: "/casinos/stake",
    badge: "Uncapped Crypto Payouts",
    accentBorder: "hover:border-cyan-400/50",
    accentColor: "text-cyan-400",
  },
  {
    id: "showcase-4",
    rank: "No. 04 / Verified Fast Cashout",
    name: "Roobet",
    tagline: "Provably Fair Originals & VIP Lounge",
    description:
      "Social crypto powerhouse with automated instant payouts, Snoop Dogg VIP promotions, and audited Pragmatic Play & Evolution studio connections.",
    rating: "9.3",
    safetyScore: "9.5",
    payoutSpeed: "15 - 30 Mins",
    license: "Curacao eGaming Verified",
    bonus: "$80 Welcome Package + 70 Free Spins",
    imageUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=80",
    claimUrl: "https://roobet.com/?ref=demo_affiliate",
    reviewUrl: "/casinos/roobet",
    badge: "Instant Crypto Engine",
    accentBorder: "hover:border-purple-400/50",
    accentColor: "text-purple-400",
  },
  {
    id: "showcase-5",
    rank: "No. 05 / Crypto Ecosystem",
    name: "BC.Game",
    tagline: "Multi-Currency Metaverse Gaming Portal",
    description:
      "Supports 90+ cryptocurrencies with zero fee internal swaps, certified eCOGRA RNG tests, and daily audited deposit match bonuses.",
    rating: "9.2",
    safetyScore: "9.4",
    payoutSpeed: "Instant (5 Mins)",
    license: "CIL Certified Authority",
    bonus: "Up to 360% Deposit Match Across 4 Deposits",
    imageUrl: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=1200&q=80",
    claimUrl: "https://bc.game/?ref=demo_affiliate",
    reviewUrl: "/casinos/bc-game",
    badge: "90+ Cryptos Supported",
    accentBorder: "hover:border-indigo-400/50",
    accentColor: "text-indigo-400",
  },
  {
    id: "showcase-6",
    rank: "No. 06 / VIP Retro Arcade",
    name: "7Bit Casino",
    tagline: "Classic Retro Aesthetics with Modern Security",
    description:
      "Over a decade of consistent, rapid payouts. Generous cashback races, verified SSL data encryption, and instant crypto processing.",
    rating: "9.1",
    safetyScore: "9.3",
    payoutSpeed: "Under 1 Hour",
    license: "Antillephone N.V. Audited",
    bonus: "100% Up to 1.5 BTC + 100 Free Spins",
    imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80",
    claimUrl: "https://7bitcasino.com/?ref=demo_affiliate",
    reviewUrl: "/casinos/7bit",
    badge: "10+ Years Payout Trust",
    accentBorder: "hover:border-rose-400/50",
    accentColor: "text-rose-400",
  },
];

export default function ParallaxEditorialShowcase() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !swiperContainerRef.current) return;

    // 1. Initialize Swiper with custom navigation & pagination
    const swiper = new Swiper(swiperContainerRef.current, {
      modules: [Navigation, Pagination],
      direction: "horizontal",
      slidesPerView: "auto",
      spaceBetween: 24,
      centeredSlides: true,
      speed: 650,
      grabCursor: true,
      watchSlidesProgress: true,
      navigation: {
        prevEl: prevBtnRef.current,
        nextEl: nextBtnRef.current,
      },
      pagination: {
        el: paginationRef.current,
        type: "bullets",
        clickable: true,
        bulletClass: "swiper-pagination-bullet",
        bulletActiveClass: "swiper-pagination-bullet-active",
      },
    });

    swiperRef.current = swiper;

    // 2. Set up GSAP ScrollTrigger to scrub Swiper translation in sync with vertical scroll
    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        if (!swiper || swiper.destroyed) return 1200;
        return Math.max(swiper.virtualSize - swiper.width + 600, 950);
      };

      const proxy = { progress: 0 };

      gsap.to(proxy, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollDistance()}px`,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            if (swiper && !swiper.destroyed) {
              swiper.update();
            }
          },
          onUpdate: (self) => {
            if (!swiper || swiper.destroyed) return;
            const p = self.progress;
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const currentTranslate = (max - min) * p + min;

            swiper.setTranslate(currentTranslate);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
          },
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (swiper && !swiper.destroyed) {
        swiper.destroy(true, true);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="editorial-showcase"
      className="editorial-carousel-section bg-[#17131B] min-h-screen py-16 lg:py-24 flex flex-col justify-center border-b border-[#A9D8F5]/15 overflow-hidden relative"
    >
      {/* ── SECTION HEADER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1A25] border border-[#A9D8F5]/25 text-xs font-mono text-[#A9D8F5] uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Editorial Flagship Series</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F8F5F2] leading-tight">
            {t.filters.topRatedTitle}
          </h2>
        </div>

        <div className="max-w-md">
          <p className="text-sm text-[#F8F5F2]/80 font-normal leading-relaxed">
            {t.filters.topRatedSubtitle}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs font-mono text-[#A9D8F5]">
            <span className="w-2 h-2 rounded-full bg-[#F04464] animate-pulse" />
            <span>6 Audited Operators • Live Registry</span>
          </div>
        </div>
      </div>

      {/* ── HORIZONTAL SCROLL-SYNCED SWIPER CAROUSEL ── */}
      <div className="editorial-carousel w-full relative">
        <div ref={swiperContainerRef} className="swiper-container w-full">
          <div className="swiper-wrapper">
            {SHOWCASE_ITEMS.map((item) => (
              <div key={item.id} className="swiper-slide">
                <div
                  className={`card group rounded-2xl bg-[#1F1A25] border border-[#A9D8F5]/20 ${item.accentBorder} transition-all duration-300 shadow-2xl overflow-hidden flex flex-col`}
                >
                  {/* Media Container with Image & Overlays */}
                  <div className="media-container relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                      loading="lazy"
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A25] via-transparent to-[#17131B]/60" />

                    {/* Top Row Badges */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-md bg-[#17131B]/80 backdrop-blur-md border border-[#A9D8F5]/30 text-[11px] font-mono font-bold tracking-wider text-[#A9D8F5] uppercase">
                        {item.rank}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#A9D8F5]/10 backdrop-blur-md border border-[#A9D8F5]/30 text-[#A9D8F5] text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Score: {item.safetyScore}
                      </span>
                    </div>

                    {/* Payout Tag on Bottom Left of Image */}
                    <div className="absolute bottom-3 left-3.5 z-10">
                      <span className="px-2.5 py-1 rounded-lg bg-[#17131B]/85 backdrop-blur-md border border-[#A9D8F5]/30 text-xs font-semibold text-[#F8F5F2] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        {item.payoutSpeed}
                      </span>
                    </div>
                  </div>

                  {/* Card Body Text */}
                  <div className="card-text p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Regulatory Seal */}
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-3 h-3 text-zinc-400" />
                        <span className="text-[11px] font-mono uppercase text-[#A9D8F5] tracking-wider">
                          {item.license}
                        </span>
                      </div>

                      {/* Casino Name & Tagline */}
                      <h3 className="text-2xl sm:text-3xl font-black text-[#F8F5F2] tracking-tight mb-2 group-hover:text-zinc-100 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[#A9D8F5] mb-3">
                        {item.tagline}
                      </p>

                      {/* Editorial Audit Note */}
                      <p className="text-xs sm:text-sm text-[#F8F5F2]/75 line-clamp-3 leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Verified Welcome Bonus Box */}
                      <div className="p-3.5 rounded-xl bg-[#17131B]/70 border border-[#A9D8F5]/20 mb-6">
                        <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A9D8F5] mb-1">
                          Verified Welcome Package
                        </span>
                        <div className="text-xs sm:text-sm font-bold text-[#F8F5F2] leading-snug">
                          {item.bonus}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 border-t border-white/10 flex items-center gap-3">
                      <a
                        href={item.claimUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-white/10 hover:scale-[1.02]"
                      >
                        <span>{t.card.claimBonus || "Claim Bonus"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <Link
                        href={item.reviewUrl}
                        className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
                      >
                        <span>{t.card.readReview || "Read Review"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Navigation Arrows */}
          <div className="swiper-navigation-container">
            <button
              ref={prevBtnRef}
              type="button"
              className="swiper-prev"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              ref={nextBtnRef}
              type="button"
              className="swiper-next"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Centered Pagination Bullets */}
        <div className="swiper-pagination-container">
          <div ref={paginationRef} className="swiper-pagination" />
        </div>
      </div>
    </section>
  );
}
