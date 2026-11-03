"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Gamepad2,
  Plus,
  Trash2,
  Search,
  Sparkles,
  ExternalLink,
  Layers,
  CheckCircle2,
  X,
  RefreshCw,
  BarChart3,
} from "lucide-react";

interface Game {
  id: string;
  title: string;
  slug: string;
  category: string;
  provider: string;
  rtp: string;
  volatility: string;
  thumbnailUrl: string;
  demoUrl?: string | null;
  featured?: boolean;
}

const CATEGORIES = [
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

export default function AdminGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Slots",
    provider: "Pragmatic Play",
    rtp: "96.50%",
    volatility: "High",
    thumbnailUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
    demoUrl: "",
    featured: true,
  });

  const fetchGames = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/games");
      const data = await res.json();
      if (data.success && data.games) {
        setGames(data.games);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/games/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setGames((prev) => prev.filter((g) => g.id !== id));
        setStatusMessage(`Game "${title}" deleted.`);
        setTimeout(() => setStatusMessage(""), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success && data.game) {
        setGames((prev) => [data.game, ...prev]);
        setIsAddModalOpen(false);
        setFormData({
          title: "",
          category: "Slots",
          provider: "Pragmatic Play",
          rtp: "96.50%",
          volatility: "High",
          thumbnailUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
          demoUrl: "",
          featured: true,
        });
        setStatusMessage("Game added successfully! It is now counted in Free Games.");
        setTimeout(() => setStatusMessage(""), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(search.toLowerCase()) ||
      game.provider.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-red-500" />
            <h1 className="text-2xl font-black text-white">Free Games & Demos Catalog</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage the free games catalog supporting the 17 game categories. Each active game directly feeds the{" "}
            <span className="text-emerald-400 font-bold">Free Games counter</span> on the homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/stats"
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Stats Config</span>
          </Link>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black transition flex items-center gap-2 shadow-lg shadow-red-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Game</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Filter Strip */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by game title or provider..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
          />
        </div>
        <div className="md:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
          >
            <option value="All">All Categories ({games.length})</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs text-slate-400 font-bold">
          <span>Showing {filteredGames.length} games</span>
          <button
            onClick={fetchGames}
            className="hover:text-white flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading games catalog...</div>
        ) : filteredGames.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No games found matching your search.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={game.thumbnailUrl}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white flex items-center gap-2">
                      <span>{game.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {game.category}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                      <span>Provider: <strong className="text-slate-200">{game.provider}</strong></span>
                      <span>•</span>
                      <span>RTP: <strong className="text-emerald-400">{game.rtp}</strong></span>
                      <span>•</span>
                      <span>Volatility: {game.volatility}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDelete(game.id, game.title)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition"
                    title="Delete Game"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Game Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1322] border border-white/10 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-black text-white">Add New Free Game Demo</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGame} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Game Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sugar Rush 1000"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Software Provider</label>
                  <input
                    type="text"
                    placeholder="e.g. Pragmatic Play, NetEnt"
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">RTP (%)</label>
                  <input
                    type="text"
                    placeholder="e.g. 96.50%"
                    value={formData.rtp}
                    onChange={(e) => setFormData({ ...formData, rtp: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Volatility</label>
                  <input
                    type="text"
                    placeholder="Low / Medium / High"
                    value={formData.volatility}
                    onChange={(e) => setFormData({ ...formData, volatility: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Demo Game Iframe URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://demogamesfree.pragmaticplay.net/..."
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black transition shadow-lg shadow-red-600/30"
                >
                  {submitting ? "Saving..." : "Add Game Demo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
