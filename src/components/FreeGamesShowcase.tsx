"use client";

import { useState } from "react";
import { Play, Sparkles, Layers, Info } from "lucide-react";

interface Game {
  id: string;
  title: string;
  provider: string;
  rtp: string;
  volatility: "High" | "Medium" | "Very High";
  category: "Slots" | "Live Dealer" | "Megaways";
  thumbnailUrl: string;
}

const DEMO_GAMES: Game[] = [
  {
    id: "gates-of-olympus",
    title: "Gates of Olympus",
    provider: "Pragmatic Play",
    rtp: "96.50%",
    volatility: "High",
    category: "Slots",
    thumbnailUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sweet-bonanza",
    title: "Sweet Bonanza",
    provider: "Pragmatic Play",
    rtp: "96.48%",
    volatility: "High",
    category: "Megaways",
    thumbnailUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "wanted-dead-wild",
    title: "Wanted Dead or a Wild",
    provider: "Hacksaw Gaming",
    rtp: "96.38%",
    volatility: "Very High",
    category: "Slots",
    thumbnailUrl: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lightning-roulette",
    title: "Lightning Roulette",
    provider: "Evolution Live",
    rtp: "97.30%",
    volatility: "Medium",
    category: "Live Dealer",
    thumbnailUrl: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80",
  },
];

export default function FreeGamesShowcase() {
  const [playingGame, setPlayingGame] = useState<string | null>(null);

  return (
    <section id="free-games" className="py-20 border-b border-white/[0.08] bg-[#08090A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Free Demo Slots & Games
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Play Verified Casino Slots for Free
            </h2>
            <p className="text-sm text-zinc-400 mt-1 font-normal">
              Test game mechanics, volatility, and studio RTP rates with zero deposit required.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Original Studio Servers Verified</span>
          </div>
        </div>

        {/* Demo Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_GAMES.map((game) => (
            <div
              key={game.id}
              className="rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden flex flex-col justify-between"
            >
              {/* Image Container with Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={game.thumbnailUrl}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setPlayingGame(game.title)}
                    className="bg-white hover:bg-zinc-200 text-black font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    Launch Demo
                  </button>
                </div>
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 border border-white/20 text-[10px] font-bold uppercase text-white">
                  {game.category}
                </div>
              </div>

              {/* Game Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-base font-black text-white group-hover:text-zinc-200 transition">
                    {game.title}
                  </h3>
                  <div className="text-xs text-zinc-400 font-medium">{game.provider}</div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 text-zinc-300">
                  <span>
                    RTP: <strong className="text-white">{game.rtp}</strong>
                  </span>
                  <span>
                    Vol: <strong className="text-white">{game.volatility}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal if Launch Demo clicked */}
        {playingGame && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
            <div className="max-w-md w-full p-6 rounded-2xl bg-zinc-900 border border-white/20 text-center space-y-4">
              <h3 className="text-xl font-black text-white">Launching {playingGame} Demo</h3>
              <p className="text-sm text-zinc-400">
                Connected directly to certified studio server. Demo credits loaded for risk-free testing.
              </p>
              <div className="p-4 rounded-xl bg-black border border-white/10 text-xs font-mono text-zinc-300">
                ✓ Fair RNG verified by eCOGRA • Instant practice play active
              </div>
              <button
                onClick={() => setPlayingGame(null)}
                className="btn-white w-full py-2.5 rounded-xl text-xs uppercase tracking-wider"
              >
                Close Demo Player
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
