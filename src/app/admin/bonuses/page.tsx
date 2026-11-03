"use client";

import { useState, useEffect } from "react";
import { Gift, ExternalLink, PlusCircle, Edit, Trash2, Loader2, X, Save } from "lucide-react";

export default function AdminBonusesPage() {
  const [bonuses, setBonuses] = useState<any[]>([]);
  const [casinos, setCasinos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBonus, setEditingBonus] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [resB, resC] = await Promise.all([fetch("/api/bonuses"), fetch("/api/casinos")]);
      const dataB = await resB.json();
      const dataC = await resC.json();
      setBonuses(Array.isArray(dataB) ? dataB : []);
      setCasinos(Array.isArray(dataC) ? dataC : []);
    } catch {
      setBonuses([]);
      setCasinos([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveBonus(e: React.FormEvent) {
    e.preventDefault();
    setActionLoading(true);

    try {
      const isEdit = Boolean(editingBonus?.id);
      const url = isEdit ? `/api/bonuses/${editingBonus.id}` : "/api/bonuses";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBonus),
      });

      if (!res.ok) throw new Error("Failed to save bonus");

      setEditingBonus(null);
      setShowAddModal(false);
      await loadData();
    } catch (err: any) {
      alert(err.message || "Failed to save bonus");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete bonus "${title}"?`)) return;

    try {
      const res = await fetch(`/api/bonuses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete bonus");
      setBonuses((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete bonus");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Manage Casino Bonuses</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            Create, edit, or remove promo packages, bonus codes, and wagering conditions.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBonus({
              casinoId: casinos[0]?.id || "",
              title: "",
              type: "WELCOME",
              bonusCode: "",
              wagering: "35x",
              minDeposit: "$20",
              claimUrl: "https://",
              exclusive: false,
            });
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider transition shadow-lg shadow-red-600/40 border border-red-500/30"
        >
          <PlusCircle className="w-5 h-5" />
          Add Bonus
        </button>
      </div>

      <div className="rounded-3xl bg-[#111728]/90 border border-white/10 overflow-hidden shadow-xl backdrop-blur-md">
        {loading ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
            <p className="text-sm font-bold">Loading bonuses...</p>
          </div>
        ) : bonuses.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-400 space-y-2">
            <Gift className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="font-bold">No custom bonuses found.</p>
            <p className="text-xs text-slate-500">Click "Add Bonus" above to publish a promotion.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-slate-400 border-b border-white/10 font-black uppercase text-xs">
                <tr>
                  <th className="py-4 px-6">Casino</th>
                  <th className="py-4 px-6">Bonus Title</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Promo Code</th>
                  <th className="py-4 px-6">Wagering</th>
                  <th className="py-4 px-6">Min Deposit</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                {bonuses.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition">
                    <td className="py-4 px-6 font-black text-white">{b.casino?.name}</td>
                    <td className="py-4 px-6 font-bold text-white">{b.title}</td>
                    <td className="py-4 px-6 font-bold text-red-400">{b.type}</td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-400">{b.bonusCode || "-"}</td>
                    <td className="py-4 px-6">{b.wagering}</td>
                    <td className="py-4 px-6">{b.minDeposit}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingBonus(b);
                          setShowAddModal(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 inline-flex items-center gap-1 text-xs font-bold transition"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(b.id, b.title)}
                        className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-400 border border-red-500/30 inline-flex items-center gap-1 text-xs font-bold transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {showAddModal && editingBonus && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101726] border border-white/15 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white">
                {editingBonus.id ? "Edit Bonus" : "Add New Bonus"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingBonus(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBonus} className="space-y-4">
              {!editingBonus.id && (
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Select Casino</label>
                  <select
                    value={editingBonus.casinoId}
                    onChange={(e) => setEditingBonus({ ...editingBonus, casinoId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    {casinos.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Bonus Title</label>
                <input
                  type="text"
                  required
                  value={editingBonus.title}
                  onChange={(e) => setEditingBonus({ ...editingBonus, title: e.target.value })}
                  placeholder="e.g. 100% Up to $1,000 + 100 Free Spins"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Type</label>
                  <select
                    value={editingBonus.type}
                    onChange={(e) => setEditingBonus({ ...editingBonus, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="WELCOME">WELCOME</option>
                    <option value="NO_DEPOSIT">NO_DEPOSIT</option>
                    <option value="FREE_SPINS">FREE_SPINS</option>
                    <option value="CASHBACK">CASHBACK</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Bonus Code</label>
                  <input
                    type="text"
                    value={editingBonus.bonusCode || ""}
                    onChange={(e) => setEditingBonus({ ...editingBonus, bonusCode: e.target.value })}
                    placeholder="e.g. WELCOME100"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Wagering</label>
                  <input
                    type="text"
                    value={editingBonus.wagering}
                    onChange={(e) => setEditingBonus({ ...editingBonus, wagering: e.target.value })}
                    placeholder="e.g. 35x"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Min Deposit</label>
                  <input
                    type="text"
                    value={editingBonus.minDeposit || ""}
                    onChange={(e) => setEditingBonus({ ...editingBonus, minDeposit: e.target.value })}
                    placeholder="e.g. $20"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Claim URL</label>
                <input
                  type="url"
                  required
                  value={editingBonus.claimUrl}
                  onChange={(e) => setEditingBonus({ ...editingBonus, claimUrl: e.target.value })}
                  placeholder="https://casino.com/?ref=..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Bonus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
