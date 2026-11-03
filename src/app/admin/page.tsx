import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FALLBACK_CASINOS, FALLBACK_BLACKLIST, getSiteStats } from "@/lib/data";
import {
  Building2,
  Gift,
  ShieldAlert,
  MessageSquare,
  PlusCircle,
  ExternalLink,
  BarChart3,
  Gamepad2,
  BookOpen,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let casinoCount = 0;
  let bonusCount = 0;
  let blacklistCount = 0;
  let pendingReviewsCount = 0;
  let recentCasinos: any[] = [];
  const stats = await getSiteStats();

  try {
    [casinoCount, bonusCount, blacklistCount, pendingReviewsCount, recentCasinos] =
      await Promise.all([
        prisma.casino.count({ where: { status: "ACTIVE" } }),
        prisma.bonus.count(),
        prisma.casino.count({ where: { status: "BLACKLISTED" } }),
        prisma.userReview.count({ where: { isApproved: false } }),
        prisma.casino.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      ]);
  } catch (e) {
    casinoCount = FALLBACK_CASINOS.length;
    bonusCount = 4;
    blacklistCount = FALLBACK_BLACKLIST.length;
    pendingReviewsCount = 2;
    recentCasinos = FALLBACK_CASINOS;
  }

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Administration Control</h1>
          <p className="text-base text-slate-400 mt-1 font-medium">
            Manage your CASINOVA® database, live homepage stats, games catalog, and gambling guides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/stats"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition border border-white/10"
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            Live Stats Engine
          </Link>

          <Link
            href="/admin/casinos/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider transition shadow-lg shadow-red-600/40 border border-red-500/30"
          >
            <PlusCircle className="w-5 h-5" />
            Add Casino
          </Link>
        </div>
      </div>

      {/* ── LIVE HOMEPAGE STATS PREVIEW STRIP ── */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1C122C] to-[#120F24] border border-purple-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-black text-white tracking-wide uppercase">
              Homepage Live Stats Feed (Connected)
            </h2>
          </div>
          <Link
            href="/admin/stats"
            className="text-xs font-bold text-pink-400 hover:text-pink-300 transition flex items-center gap-1"
          >
            Configure Calculation Mode & Overrides →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-black text-emerald-400 font-mono">
              {stats.newCasinos.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-slate-300 mt-1">
              New Casinos
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-black text-emerald-400 font-mono">
              {stats.noDepositBonuses.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-slate-300 mt-1">
              No Deposit
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-black text-emerald-400 font-mono">
              {stats.freeSpins.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-slate-300 mt-1">
              Free Spins
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-black text-emerald-400 font-mono">
              {stats.freeGames.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-slate-300 mt-1">
              Free Games
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-black text-emerald-400 font-mono">
              {stats.casinoReviews.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-slate-300 mt-1">
              Reviews
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-black text-emerald-400 font-mono">
              {stats.gamblingGuides.toLocaleString()}
            </div>
            <div className="text-[10px] font-black uppercase text-slate-300 mt-1">
              Guides
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/casinos"
          className="p-6 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md hover:border-white/20 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Active Casinos</span>
            <Building2 className="w-5 h-5 text-red-500 group-hover:scale-110 transition" />
          </div>
          <div className="text-4xl font-black text-white mt-3">{casinoCount}</div>
          <div className="text-xs font-bold text-emerald-400 mt-1">Audited & Published</div>
        </Link>

        <Link
          href="/admin/bonuses"
          className="p-6 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md hover:border-white/20 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Active Bonuses</span>
            <Gift className="w-5 h-5 text-red-500 group-hover:scale-110 transition" />
          </div>
          <div className="text-4xl font-black text-white mt-3">{bonusCount}</div>
          <div className="text-xs font-bold text-slate-400 mt-1">Welcome & Free Spins</div>
        </Link>

        <Link
          href="/admin/games"
          className="p-6 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md hover:border-white/20 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Games Catalog</span>
            <Gamepad2 className="w-5 h-5 text-red-500 group-hover:scale-110 transition" />
          </div>
          <div className="text-4xl font-black text-white mt-3">{stats.freeGames.toLocaleString()}</div>
          <div className="text-xs font-bold text-purple-400 mt-1">17 Game Categories</div>
        </Link>

        <Link
          href="/admin/guides"
          className="p-6 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md hover:border-white/20 transition group"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Gambling Guides</span>
            <BookOpen className="w-5 h-5 text-red-500 group-hover:scale-110 transition" />
          </div>
          <div className="text-4xl font-black text-white mt-3">{stats.gamblingGuides}</div>
          <div className="text-xs font-bold text-blue-400 mt-1">Tutorials & Strategies</div>
        </Link>
      </div>

      {/* Recent Casinos Table */}
      <div className="p-8 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white">Recent Operators in Database</h2>
          <Link href="/admin/casinos" className="text-sm font-bold text-red-400 hover:text-red-300">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-400 border-b border-white/10 font-extrabold uppercase text-xs">
              <tr>
                <th className="pb-4">Casino Name</th>
                <th className="pb-4">Rating</th>
                <th className="pb-4">Safety Score</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
              {recentCasinos.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition">
                  <td className="py-4 font-extrabold text-white flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.logoUrl} alt="" className="w-8 h-8 rounded-lg object-cover bg-slate-900 border border-white/10" />
                    {c.name}
                  </td>
                  <td className="py-4 font-bold text-red-400">{c.rating} / 10</td>
                  <td className="py-4 font-bold">{c.safetyIndex} / 10</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                        c.status === "ACTIVE"
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                          : "bg-red-950/80 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <Link
                      href={`/casinos/${c.slug}`}
                      target="_blank"
                      className="text-slate-400 hover:text-red-400 inline-flex items-center gap-1 font-bold transition"
                    >
                      Preview <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
