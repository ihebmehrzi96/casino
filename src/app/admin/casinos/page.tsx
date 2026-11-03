"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, ExternalLink, Edit, Trash2, Loader2 } from "lucide-react";

export default function AdminCasinosPage() {
  const [casinos, setCasinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCasinos();
  }, []);

  async function fetchCasinos() {
    try {
      const res = await fetch("/api/casinos");
      const data = await res.json();
      setCasinos(Array.isArray(data) ? data : []);
    } catch {
      setCasinos([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/casinos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete casino");
      setCasinos((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert(err.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Manage Casinos</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            Edit, update, or remove operators stored in your REDSHIELD database.
          </p>
        </div>

        <Link
          href="/admin/casinos/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider transition shadow-lg shadow-red-600/40 border border-red-500/30"
        >
          <PlusCircle className="w-5 h-5" />
          Add Casino
        </Link>
      </div>

      <div className="rounded-3xl bg-[#111728]/90 border border-white/10 overflow-hidden shadow-xl backdrop-blur-md">
        {loading ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
            <p className="text-sm font-bold">Loading casino records...</p>
          </div>
        ) : casinos.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-400">
            No casinos found in database. Click "Add Casino" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-slate-400 border-b border-white/10 font-black uppercase text-xs">
                <tr>
                  <th className="py-4 px-6">Casino</th>
                  <th className="py-4 px-6">Rating</th>
                  <th className="py-4 px-6">Safety Score</th>
                  <th className="py-4 px-6">License</th>
                  <th className="py-4 px-6">Payout Speed</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                {casinos.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition">
                    <td className="py-4 px-6 font-extrabold text-white flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.logoUrl} alt="" className="w-9 h-9 rounded-xl object-cover bg-slate-900 border border-white/10" />
                      <div>
                        <div>{c.name}</div>
                        <span className="text-xs text-slate-500 font-normal">/{c.slug}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-black text-red-400">{c.rating} / 10</td>
                    <td className="py-4 px-6 font-bold">{c.safetyIndex} / 10</td>
                    <td className="py-4 px-6 text-slate-400 font-semibold">{c.license}</td>
                    <td className="py-4 px-6 text-emerald-400 font-bold">{c.payoutSpeed}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black ${
                          c.status === "ACTIVE"
                            ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                            : "bg-red-950/80 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {/* Edit Button */}
                      <Link
                        href={`/admin/casinos/${c.id}/edit`}
                        className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 inline-flex items-center gap-1.5 text-xs font-bold transition"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </Link>

                      {/* View Link */}
                      <Link
                        href={`/casinos/${c.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white inline-flex items-center gap-1.5 text-xs font-bold transition border border-white/10"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(c.id, c.name)}
                        disabled={deletingId === c.id}
                        className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-500/30 inline-flex items-center gap-1 text-xs font-bold transition disabled:opacity-50"
                      >
                        {deletingId === c.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
