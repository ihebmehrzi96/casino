import { prisma } from "@/lib/prisma";
import { FALLBACK_BLACKLIST } from "@/lib/data";
import { ShieldAlert, PlusCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminBlacklistPage() {
  let blacklist: any[] = [];
  try {
    blacklist = await prisma.casino.findMany({
      where: { status: "BLACKLISTED" },
      orderBy: { createdAt: "desc" },
    });
    if (blacklist.length === 0) blacklist = FALLBACK_BLACKLIST;
  } catch {
    blacklist = FALLBACK_BLACKLIST;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Rogue Casino Blacklist Manager</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            Maintain public consumer safety warnings against scam operators, cloned software, and non-paying sites.
          </p>
        </div>

        <Link
          href="/admin/casinos/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider transition shadow-lg shadow-red-600/40 border border-red-500/30"
        >
          <PlusCircle className="w-5 h-5" />
          Add To Blacklist
        </Link>
      </div>

      <div className="rounded-3xl bg-[#111728]/90 border border-red-500/30 overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-red-950/40 text-red-300 border-b border-red-500/30 font-black uppercase text-xs">
              <tr>
                <th className="py-4 px-6">Casino Name</th>
                <th className="py-4 px-6">Safety Score</th>
                <th className="py-4 px-6">Flagged Reason</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
              {blacklist.map((item) => (
                <tr key={item.id} className="hover:bg-white/5">
                  <td className="py-4 px-6 font-black text-white flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.logoUrl} alt="" className="w-9 h-9 rounded-xl object-cover grayscale border border-white/10" />
                    <div>
                      <div>{item.name}</div>
                      <span className="text-xs text-slate-500 font-normal">/{item.slug}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-black text-red-400">{item.safetyIndex} / 10</td>
                  <td className="py-4 px-6 text-slate-300 max-w-md font-medium">
                    {item.blacklistReason || item.summary}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-red-950 text-red-400 border border-red-500/40">
                      BLACKLISTED
                    </span>
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
