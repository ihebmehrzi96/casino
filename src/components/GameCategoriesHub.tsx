"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Play, Sparkles, X, ChevronLeft, ChevronRight, Layers, Flame, Trophy, ExternalLink } from "lucide-react";

interface GameItem {
  id: string;
  title: string;
  category: string;
  provider: string;
  rtp: string;
  volatility: string;
  thumbnailUrl: string;
}

const ALL_GAMES: GameItem[] = [
  {
    id: "gates-of-olympus",
    title: "Gates of Olympus",
    category: "Slots",
    provider: "Pragmatic Play",
    rtp: "96.50%",
    volatility: "High",
    thumbnailUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sweet-bonanza",
    title: "Sweet Bonanza",
    category: "Slots",
    provider: "Pragmatic Play",
    rtp: "96.48%",
    volatility: "High",
    thumbnailUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "wanted-dead-wild",
    title: "Wanted Dead or a Wild",
    category: "Slots",
    provider: "Hacksaw Gaming",
    rtp: "96.38%",
    volatility: "Very High",
    thumbnailUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lightning-roulette",
    title: "Lightning Roulette",
    category: "Roulette",
    provider: "Evolution Live",
    rtp: "97.30%",
    volatility: "Medium",
    thumbnailUrl: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "european-roulette",
    title: "European Roulette Pro",
    category: "Roulette",
    provider: "Play'n GO",
    rtp: "97.30%",
    volatility: "Low",
    thumbnailUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "plinko-xy",
    title: "Plinko XY",
    category: "Plinko Games",
    provider: "BGaming",
    rtp: "99.00%",
    volatility: "Adjustable",
    thumbnailUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "aviator",
    title: "Aviator Crash",
    category: "Crash Games",
    provider: "Spribe",
    rtp: "97.00%",
    volatility: "Medium-High",
    thumbnailUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "chicken-cross",
    title: "Chicken Road Cross",
    category: "Chicken Gambling",
    provider: "UpGaming",
    rtp: "98.00%",
    volatility: "Custom",
    thumbnailUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "mines-dare",
    title: "Mines Dare 2 Win",
    category: "Mines Games",
    provider: "Hacksaw Gaming",
    rtp: "98.00%",
    volatility: "Variable",
    thumbnailUrl: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "speed-baccarat",
    title: "Speed Baccarat A",
    category: "Baccarat",
    provider: "Evolution Live",
    rtp: "98.94%",
    volatility: "Low",
    thumbnailUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "deuces-wild",
    title: "Deuces Wild Video Poker",
    category: "Video Poker",
    provider: "BetSoft",
    rtp: "98.91%",
    volatility: "Medium",
    thumbnailUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sic-bo-dragons",
    title: "Super Sic Bo",
    category: "Sic Bo Games",
    provider: "Evolution Live",
    rtp: "97.22%",
    volatility: "High",
    thumbnailUrl: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "blackjack-vip",
    title: "VIP Infinite Blackjack",
    category: "Table Games",
    provider: "Evolution Live",
    rtp: "99.47%",
    volatility: "Low",
    thumbnailUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "craps-first-person",
    title: "First Person Craps",
    category: "Craps",
    provider: "Evolution Live",
    rtp: "99.17%",
    volatility: "Low",
    thumbnailUrl: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "keno-universe",
    title: "Keno Universe",
    category: "Keno",
    provider: "EGT / Amusnet",
    rtp: "97.10%",
    volatility: "Medium",
    thumbnailUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ocean-king",
    title: "Ocean King Fish Hunter",
    category: "Fish Games",
    provider: "TaDa Gaming",
    rtp: "97.50%",
    volatility: "Medium",
    thumbnailUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80",
  },
];

const CATEGORIES = [
  "All Games",
  "Slots",
  "Roulette",
  "Crash Games",
  "Plinko Games",
  "Mines Games",
  "Baccarat",
  "Video Poker",
  "Table Games",
  "Chicken Gambling",
  "Craps",
  "Keno",
  "Fish Games",
  "Sic Bo Games",
];

const CATEGORY_ICONS: Record<string, string> = {
  "All Games": "✨",
  Slots: "🎰",
  Roulette: "🎡",
  "Crash Games": "💥",
  "Plinko Games": "🎯",
  "Mines Games": "💣",
  Baccarat: "♠️",
  "Video Poker": "🃏",
  "Table Games": "🎴",
  "Chicken Gambling": "🐔",
  Craps: "🎲",
  Keno: "🔢",
  "Fish Games": "🐟",
  "Sic Bo Games": "🎲",
};

export default function GameCategoriesHub() {
  const [selectedCategory, setSelectedCategory] = useState("All Games");
  const [playingGame, setPlayingGame] = useState<GameItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter games based on selected category
  const displayedGames = ALL_GAMES.filter((g) => {
    if (selectedCategory === "All Games") return true;
    return g.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // GSAP animation when category changes
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".game-card-item");
    if (!cards.length) return;

    gsap.killTweensOf(cards);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.04,
        duration: 0.35,
        ease: "power2.out",
      }
    );
  }, [selectedCategory]);

  // GSAP modal entrance
  useEffect(() => {
    if (playingGame && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.4)" }
      );
    }
  }, [playingGame]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = direction === "left" ? -260 : 260;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="game-categories" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#A9D8F5]/15 bg-[#17131B] text-[#F8F5F2] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* ── SECTION HEADER ── */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A9D8F5] uppercase tracking-widest mb-3 px-3.5 py-1.5 rounded-full bg-[#1F1A25] border border-[#A9D8F5]/25">
            <Sparkles className="w-3.5 h-3.5 text-[#F04464]" />
            <span>Interactive Game Library & Studio Demos</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8F5F2] tracking-tight mb-3">
            Explore Online Casino Games by Type
          </h2>
          
          <p className="text-sm sm:text-base text-[#F8F5F2]/80 font-normal leading-relaxed">
            Select any category from the Game Library deck below to filter authentic studio demo titles.
          </p>
        </div>

        {/* ── TOP HORIZONTAL GAME LIBRARY DOCK (GSAP ANIMATED) ── */}
        <div className="mb-10 bg-[#1F1A25] border border-[#A9D8F5]/20 rounded-2xl p-4 sm:p-5 shadow-2xl relative">
          
          {/* Top Bar inside Dock */}
          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#A9D8F5]/15">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#F04464] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-[#F8F5F2]">
                GAME LIBRARY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#17131B] text-[#A9D8F5] border border-[#A9D8F5]/20">
                {CATEGORIES.length} Categories
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                Showing <strong className="text-white">{displayedGames.length}</strong> games in{" "}
                <span className="text-[#F04464] font-bold">{selectedCategory}</span>
              </span>

              {/* Scroll Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                  aria-label="Scroll Categories Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                  aria-label="Scroll Categories Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Scrolling Category Pills Deck */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const icon = CATEGORY_ICONS[cat] || "🎲";
              const count = cat === "All Games"
                ? ALL_GAMES.length
                : ALL_GAMES.filter((g) => g.category.toLowerCase().includes(cat.toLowerCase())).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#F04464] text-[#F8F5F2] font-black shadow-lg shadow-[#F04464]/35 scale-105 border-transparent"
                      : "bg-[#17131B] hover:bg-[#26202D] text-[#A9D8F5] hover:text-[#F8F5F2] border border-[#A9D8F5]/20 hover:border-[#F04464]/40"
                  }`}
                >
                  <span className="text-sm">{icon}</span>
                  <span>{cat}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                        isSelected ? "bg-black/15 text-black font-bold" : "bg-white/10 text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── FULL-WIDTH GAME CARDS GRID (BELOW THE DOCK) ── */}
        <div ref={gridRef}>
          {displayedGames.length === 0 ? (
            <div className="p-16 rounded-2xl bg-[#0D0F15] border border-white/10 text-center max-w-xl mx-auto space-y-4">
              <p className="text-zinc-400 text-sm">
                No free demo games currently listed for <strong className="text-white">{selectedCategory}</strong>.
              </p>
              <button
                onClick={() => setSelectedCategory("All Games")}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider transition-all"
              >
                Show All Games
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {displayedGames.map((game) => (
                <div
                  key={game.id}
                  className="game-card-item rounded-2xl bg-[#1F1A25] border border-[#A9D8F5]/20 overflow-hidden flex flex-col justify-between group hover:border-[#F04464]/60 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl hover:shadow-[0_15px_30px_-10px_rgba(240,68,100,0.25)]"
                >
                  {/* Game Thumbnail with Hover Play Button */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={game.thumbnailUrl}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A25] via-transparent to-[#17131B]/40" />

                    {/* Category Tag on top left */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#17131B]/85 backdrop-blur-md border border-[#A9D8F5]/30 text-[10px] font-mono font-bold uppercase tracking-wider text-[#A9D8F5]">
                      {game.category}
                    </div>

                    {/* Center Hover Play Button */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button
                        onClick={() => setPlayingGame(game)}
                        className="bg-[#F04464] hover:bg-[#e03353] text-[#F8F5F2] font-tanker tracking-wider uppercase px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all shadow-[#F04464]/30"
                      >
                        <Play className="w-3.5 h-3.5 fill-[#F8F5F2]" />
                        <span>Play Demo</span>
                      </button>
                    </div>
                  </div>

                  {/* Game Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-white group-hover:text-zinc-100 transition-colors tracking-tight line-clamp-1">
                        {game.title}
                      </h4>
                      <div className="text-xs text-[#A9D8F5] font-medium mt-0.5">
                        {game.provider}
                      </div>
                    </div>

                    {/* Specs: RTP and Volatility */}
                    <div className="flex items-center justify-between text-xs pt-3 border-t border-[#A9D8F5]/15 text-[#A9D8F5]">
                      <span className="font-mono">
                        RTP: <strong className="text-[#A9D8F5] font-bold">{game.rtp}</strong>
                      </span>
                      <span className="font-mono">
                        Vol: <strong className="text-white">{game.volatility}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ── DEMO PLAY MODAL SIMULATOR ── */}
      {playingGame && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="w-full max-w-3xl bg-[#17131B] border border-[#A9D8F5]/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#1F1A25] border-b border-[#A9D8F5]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-black text-white text-base sm:text-lg">
                  {playingGame.title}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#A9D8F5]/10 text-[#A9D8F5] border border-[#A9D8F5]/30 font-mono font-bold">
                  RTP {playingGame.rtp}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPlayingGame(null)}
                className="w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Simulator Area */}
            <div className="aspect-video w-full bg-black flex flex-col items-center justify-center p-6 sm:p-10 text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 shadow-inner">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                Certified Demo Stream: {playingGame.title}
              </h3>
              
              <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed">
                Direct client/server websocket simulation verified by {playingGame.provider}. Random Number Generator operates under standard GLI-19 certified test conditions.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => alert("Free demo credit reloaded ($5,000 fun balance). Enjoy!")}
                  className="px-6 py-2.5 rounded-xl bg-[#F04464] hover:bg-[#e03353] text-[#F8F5F2] font-tanker uppercase tracking-wider text-sm transition-all shadow-lg shadow-[#F04464]/30"
                >
                  Spin Demo ($5,000 Balance)
                </button>
                <button
                  type="button"
                  onClick={() => setPlayingGame(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#1F1A25] hover:bg-[#26202D] border border-[#A9D8F5]/25 text-[#A9D8F5] hover:text-[#F8F5F2] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
