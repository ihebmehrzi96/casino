"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Save,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Sliders,
  Database,
  Layers,
  FileText,
  Gift,
  Building2,
  MessageSquare,
} from "lucide-react";

export default function AdminStatsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Stats & Settings state
  const [stats, setStats] = useState({
    newCasinos: 234,
    noDepositBonuses: 75,
    freeSpins: 167,
    freeGames: 25713,
    casinoReviews: 2360,
    gamblingGuides: 92,
  });

  const [autoCalculate, setAutoCalculate] = useState(true);

  // Offsets (added to real database counts)
  const [offsets, setOffsets] = useState({
    offset_new_casinos: "230",
    offset_no_deposit: "73",
    offset_free_spins: "165",
    offset_free_games: "25700",
    offset_casino_reviews: "2350",
    offset_gambling_guides: "88",
  });

  // Manual values (when autoCalculate is false)
  const [manualValues, setManualValues] = useState({
    stat_new_casinos: "234",
    stat_no_deposit: "75",
    stat_free_spins: "167",
    stat_free_games: "25713",
    stat_casino_reviews: "2360",
    stat_gambling_guides: "92",
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        if (data.stats) setStats(data.stats);
        if (data.settings) {
          setAutoCalculate(data.settings.stats_auto_calculate !== "false");
          setOffsets({
            offset_new_casinos: data.settings.offset_new_casinos || "230",
            offset_no_deposit: data.settings.offset_no_deposit || "73",
            offset_free_spins: data.settings.offset_free_spins || "165",
            offset_free_games: data.settings.offset_free_games || "25700",
            offset_casino_reviews: data.settings.offset_casino_reviews || "2350",
            offset_gambling_guides: data.settings.offset_gambling_guides || "88",
          });
          setManualValues({
            stat_new_casinos: data.settings.stat_new_casinos || String(data.stats.newCasinos || 234),
            stat_no_deposit: data.settings.stat_no_deposit || String(data.stats.noDepositBonuses || 75),
            stat_free_spins: data.settings.stat_free_spins || String(data.stats.freeSpins || 167),
            stat_free_games: data.settings.stat_free_games || String(data.stats.freeGames || 25713),
            stat_casino_reviews: data.settings.stat_casino_reviews || String(data.stats.casinoReviews || 2360),
            stat_gambling_guides: data.settings.stat_gambling_guides || String(data.stats.gamblingGuides || 92),
          });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const payload: Record<string, string> = {
        stats_auto_calculate: String(autoCalculate),
      };

      if (autoCalculate) {
        Object.entries(offsets).forEach(([k, v]) => {
          payload[k] = v;
        });
      } else {
        Object.entries(manualValues).forEach(([k, v]) => {
          payload[k] = v;
        });
      }

      const res = await fetch("/api/admin/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: payload }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.stats) setStats(data.stats);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Public Website Engine</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Real Stats & Metrics Control</h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure the 6 live statistics shown on the public homepage. Switch between automated database calculation and custom values.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-red-600/30 disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Real stats updated successfully and homepage revalidated!</span>
        </div>
      )}

      {/* Live Preview Cards (Exactly as seen on Homepage) */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Live Homepage Display (Current Output)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-xl bg-white text-zinc-900 border border-white/20 shadow-md">
            <div className="text-2xl font-black text-emerald-600 font-mono">
              {stats.newCasinos.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-zinc-800 tracking-wider mt-1">
              NEW CASINOS
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white text-zinc-900 border border-white/20 shadow-md">
            <div className="text-2xl font-black text-emerald-600 font-mono">
              {stats.noDepositBonuses.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-zinc-800 tracking-wider mt-1">
              NO DEPOSIT BONUSES
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white text-zinc-900 border border-white/20 shadow-md">
            <div className="text-2xl font-black text-emerald-600 font-mono">
              {stats.freeSpins.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-zinc-800 tracking-wider mt-1">
              FREE SPINS
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white text-zinc-900 border border-white/20 shadow-md">
            <div className="text-2xl font-black text-emerald-600 font-mono">
              {stats.freeGames.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-zinc-800 tracking-wider mt-1">
              FREE GAMES
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white text-zinc-900 border border-white/20 shadow-md">
            <div className="text-2xl font-black text-emerald-600 font-mono">
              {stats.casinoReviews.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-zinc-800 tracking-wider mt-1">
              CASINO REVIEWS
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white text-zinc-900 border border-white/20 shadow-md">
            <div className="text-2xl font-black text-emerald-600 font-mono">
              {stats.gamblingGuides.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-zinc-800 tracking-wider mt-1">
              GAMBLING GUIDES
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="p-6 rounded-2xl bg-[#0A0F1D] border border-white/10 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Calculation Engine Mode</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose how the public numbers are derived from your database and content managers.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-900 border border-white/10">
            <button
              type="button"
              onClick={() => setAutoCalculate(true)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                autoCalculate ? "bg-emerald-500 text-black shadow" : "text-zinc-400 hover:text-white"
              }`}
            >
              Auto Live Mode
            </button>
            <button
              type="button"
              onClick={() => setAutoCalculate(false)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                !autoCalculate ? "bg-red-600 text-white shadow" : "text-zinc-400 hover:text-white"
              }`}
            >
              Exact Manual Mode
            </button>
          </div>
        </div>

        {/* Mode 1: Auto Live Mode with Database Counts + Network Offsets */}
        {autoCalculate ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
              <span className="font-bold">Auto Live Mode Active:</span> Each time you add a new casino, publish a no-deposit bonus, approve a review, or add a guide in the admin panel, the homepage counts automatically increment in real time! Below are the baseline catalog offsets.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  New Casinos (Base Offset)
                </label>
                <input
                  type="number"
                  value={offsets.offset_new_casinos}
                  onChange={(e) => setOffsets({ ...offsets, offset_new_casinos: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">+ Live Active Casinos</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  No Deposit Bonuses (Base Offset)
                </label>
                <input
                  type="number"
                  value={offsets.offset_no_deposit}
                  onChange={(e) => setOffsets({ ...offsets, offset_no_deposit: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">+ Live No-Deposit Promos</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Free Spins Offers (Base Offset)
                </label>
                <input
                  type="number"
                  value={offsets.offset_free_spins}
                  onChange={(e) => setOffsets({ ...offsets, offset_free_spins: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">+ Live Free Spins Promos</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Free Games Catalog (Base Offset)
                </label>
                <input
                  type="number"
                  value={offsets.offset_free_games}
                  onChange={(e) => setOffsets({ ...offsets, offset_free_games: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">+ Live Catalog Games</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Casino Reviews (Base Offset)
                </label>
                <input
                  type="number"
                  value={offsets.offset_casino_reviews}
                  onChange={(e) => setOffsets({ ...offsets, offset_casino_reviews: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">+ Live Verified Player Reviews</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Gambling Guides (Base Offset)
                </label>
                <input
                  type="number"
                  value={offsets.offset_gambling_guides}
                  onChange={(e) => setOffsets({ ...offsets, offset_gambling_guides: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">+ Published Guides & Articles</span>
              </div>
            </div>
          </div>
        ) : (
          /* Mode 2: Exact Manual Override */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <span className="font-bold">Manual Mode Active:</span> Enter the exact numbers to display on the public homepage.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">New Casinos</label>
                <input
                  type="number"
                  value={manualValues.stat_new_casinos}
                  onChange={(e) => setManualValues({ ...manualValues, stat_new_casinos: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">No Deposit Bonuses</label>
                <input
                  type="number"
                  value={manualValues.stat_no_deposit}
                  onChange={(e) => setManualValues({ ...manualValues, stat_no_deposit: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Free Spins</label>
                <input
                  type="number"
                  value={manualValues.stat_free_spins}
                  onChange={(e) => setManualValues({ ...manualValues, stat_free_spins: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Free Games</label>
                <input
                  type="number"
                  value={manualValues.stat_free_games}
                  onChange={(e) => setManualValues({ ...manualValues, stat_free_games: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Casino Reviews</label>
                <input
                  type="number"
                  value={manualValues.stat_casino_reviews}
                  onChange={(e) => setManualValues({ ...manualValues, stat_casino_reviews: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Gambling Guides</label>
                <input
                  type="number"
                  value={manualValues.stat_gambling_guides}
                  onChange={(e) => setManualValues({ ...manualValues, stat_gambling_guides: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
