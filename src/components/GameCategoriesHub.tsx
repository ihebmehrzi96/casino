"use client";

import { useState } from "react";
import { Play, Sparkles, X, Layers, Flame, Trophy } from "lucide-react";

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
];

const CATEGORIES = [
  "All Games",
  "Slots",
  "Roulette",
  "Keno",
  "Baccarat",
  "Bingo",
  "Craps",
  "Scratch Cards",
  "Video Poker",
  "Table Games",
  "Plinko Games",
  "Chicken Gambling",
  "Crash Games",
  "Fish Games",
  "Mines Games",
  "Sic Bo Games",
  "Other",
];

export default function GameCategoriesHub() {
  const [selectedCategory, setSelectedCategory] = useState("All Games");
  const [playingGame, setPlayingGame] = useState<GameItem | null>(null);

  // Filter games based on selected category
  const displayedGames = ALL_GAMES.filter((g) => {
    if (selectedCategory === "All Games") return true;
    return g.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <section id="game-categories" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#0E0F14] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Game Categories & Free Play Demo
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore Online Casino Games by Type
            </h2>
            <p className="text-sm text-zinc-400 mt-1 font-normal">
              Select any game category on the menu to filter original studio demo titles.
            </p>
          </div>

          <div className="text-xs font-mono text-zinc-400">
            Showing <strong className="text-white">{displayedGames.length}</strong> titles in{" "}
            <span className="text-pink-400 font-bold">{selectedCategory}</span>
          </div>
        </div>

        {/* 2-Column Hub Layout: Scrollable Category Menu on Left (Image 1) + Interactive Game Grid on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* ── Left Sidebar Menu: EXACT MATCH TO IMAGE 1 ── */}
          <div className="md:col-span-4 lg:col-span-3 rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#6A165C]">
            <div className="p-3.5 border-b border-white/15 bg-[#5A124E] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white">Game Library</span>
              <span className="text-[10px] font-mono text-pink-200">17 Categories</span>
            </div>

            {/* Scrollable Category List with Native Custom Scrollbar */}
            <div className="h-[440px] overflow-y-scroll py-2 divide-y divide-white/5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition flex items-center justify-between ${
                      isSelected
                        ? "bg-white/20 text-white font-bold pl-6 border-l-4 border-pink-300"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{cat}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right Content: Game Grid Filtered by Category ── */}
          <div className="md:col-span-8 lg:col-span-9">
            {displayedGames.length === 0 ? (
              <div className="p-12 rounded-2xl bg-zinc-900 border border-white/10 text-center">
                <p className="text-zinc-400 text-sm">
                  No free demo games currently listed for <strong className="text-white">{selectedCategory}</strong>.
                </p>
                <button
                  onClick={() => setSelectedCategory("All Games")}
                  className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                >
                  Show All Games
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedGames.map((game) => (
                  <div
                    key={game.id}
                    className="rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-white/25 transition shadow-lg"
                  >
                    {/* Game Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={game.thumbnailUrl}
                        alt={game.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => setPlayingGame(game)}
                          className="bg-white hover:bg-zinc-200 text-black font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
                        >
                          <Play className="w-3.5 h-3.5 fill-black" />
                          Play Demo
                        </button>
                      </div>
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 border border-white/20 text-[10px] font-bold uppercase text-white">
                        {game.category}
                      </div>
                    </div>

                    {/* Game Details */}
                    <div className="p-4 space-y-2">
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-zinc-200">
                          {game.title}
                        </h4>
                        <div className="text-xs text-zinc-400">{game.provider}</div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 text-zinc-300">
                        <span>
                          RTP: <strong className="text-emerald-400">{game.rtp}</strong>
                        </span>
                        <span>
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

      </div>

      {/* Demo Modal when a game is launched */}
      {playingGame && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white text-base">{playingGame.title}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                  RTP {playingGame.rtp}
                </span>
              </div>
              <button
                onClick={() => setPlayingGame(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                Demo Play Simulator: {playingGame.title}
              </h3>
              <p className="text-zinc-400 text-xs max-w-md">
                Certified original server feed by {playingGame.provider}. Random Number Generator verified under standard test conditions.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => alert("Free demo credit loaded ($5,000 fun balance). Enjoy!")}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase"
                >
                  Spin Demo ($5,000 Free Credits)
                </button>
                <button
                  onClick={() => setPlayingGame(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
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
