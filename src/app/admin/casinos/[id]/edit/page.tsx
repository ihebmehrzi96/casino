"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditCasinoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    logoUrl: "",
    rating: "9.5",
    safetyIndex: "9.8",
    safetyTier: "VERY_HIGH",
    status: "ACTIVE",
    blacklistReason: "",
    establishedYear: "2023",
    license: "Malta Gaming Authority (MGA)",
    minDeposit: "$20",
    payoutSpeed: "Instant - 24 Hours",
    withdrawalLimit: "$50,000 / month",
    supportTypes: "24/7 Live Chat & Email",
    websiteUrl: "https://",
    affiliateUrl: "https://",
    pros: "",
    cons: "",
    summary: "",
    fullReview: "",
    bonusTitle: "",
    bonusType: "WELCOME",
    bonusCode: "",
    bonusWagering: "35x",
    featured: true,
    isNew: true,
    cryptoFriendly: true,
    vpnFriendly: false,
  });

  useEffect(() => {
    async function fetchCasino() {
      try {
        const res = await fetch(`/api/casinos/${params.id}`);
        if (!res.ok) throw new Error("Failed to load casino data");
        const data = await res.json();

        let parsedPros = "";
        let parsedCons = "";
        try {
          parsedPros = Array.isArray(JSON.parse(data.pros)) ? JSON.parse(data.pros).join("\n") : data.pros;
          parsedCons = Array.isArray(JSON.parse(data.cons)) ? JSON.parse(data.cons).join("\n") : data.cons;
        } catch {
          parsedPros = data.pros || "";
          parsedCons = data.cons || "";
        }

        const topBonus = data.bonuses && data.bonuses.length > 0 ? data.bonuses[0] : null;

        setFormData({
          name: data.name || "",
          slug: data.slug || "",
          logoUrl: data.logoUrl || "",
          rating: String(data.rating || "9.0"),
          safetyIndex: String(data.safetyIndex || "9.5"),
          safetyTier: data.safetyTier || "VERY_HIGH",
          status: data.status || "ACTIVE",
          blacklistReason: data.blacklistReason || "",
          establishedYear: String(data.establishedYear || "2023"),
          license: data.license || "",
          minDeposit: data.minDeposit || "$20",
          payoutSpeed: data.payoutSpeed || "Instant",
          withdrawalLimit: data.withdrawalLimit || "",
          supportTypes: data.supportTypes || "",
          websiteUrl: data.websiteUrl || "",
          affiliateUrl: data.affiliateUrl || "",
          pros: parsedPros,
          cons: parsedCons,
          summary: data.summary || "",
          fullReview: data.fullReview || "",
          bonusTitle: topBonus?.title || "",
          bonusType: topBonus?.type || "WELCOME",
          bonusCode: topBonus?.bonusCode || "",
          bonusWagering: topBonus?.wagering || "35x",
          featured: Boolean(data.featured),
          isNew: data.isNew !== undefined ? Boolean(data.isNew) : true,
          cryptoFriendly: Boolean(data.cryptoFriendly),
          vpnFriendly: Boolean(data.vpnFriendly),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCasino();
  }, [params.id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/casinos/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update casino");

      router.push("/admin/casinos");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${formData.name}"?`)) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/casinos/${params.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete casino");

      router.push("/admin/casinos");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        <p className="text-sm font-bold">Loading casino details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/casinos"
            className="p-3 rounded-2xl bg-[#111728] border border-white/10 text-slate-400 hover:text-white shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-white">Edit Casino: {formData.name}</h1>
            <p className="text-sm text-slate-400 font-medium">
              Update audit ratings, promotional bonuses, pros/cons, and media assets.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-400 hover:text-red-300 font-bold text-xs flex items-center gap-2 border border-red-500/40 transition disabled:opacity-50"
        >
          {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Delete Casino
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-300 text-sm font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info & Image Upload */}
        <div className="p-8 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md space-y-5">
          <h2 className="text-base font-black text-red-400 uppercase tracking-wider">
            1. Casino Details & Brand Media
          </h2>

          <ImageUpload
            value={formData.logoUrl}
            onChange={(url) => setFormData((prev) => ({ ...prev, logoUrl: url }))}
            label="Upload Casino Logo (Saved on your server)"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Casino Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Slug (URL Path)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Affiliate Link *</label>
              <input
                type="url"
                name="affiliateUrl"
                required
                value={formData.affiliateUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Safety & Rating */}
        <div className="p-8 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md space-y-5">
          <h2 className="text-base font-black text-red-400 uppercase tracking-wider">
            2. Safety Scores & Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Overall Rating (1 - 10)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Safety Index (1 - 10)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                name="safetyIndex"
                value={formData.safetyIndex}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition font-medium"
              >
                <option value="ACTIVE">ACTIVE (Recommended)</option>
                <option value="WARNING">WARNING (Under Review)</option>
                <option value="BLACKLISTED">BLACKLISTED (Rogue Scam)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Regulatory License</label>
              <input
                type="text"
                name="license"
                value={formData.license}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Minimum Deposit</label>
              <input
                type="text"
                name="minDeposit"
                value={formData.minDeposit}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Payout Speed</label>
              <input
                type="text"
                name="payoutSpeed"
                value={formData.payoutSpeed}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>
          </div>

          {/* Visibility and Flags */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/10 cursor-pointer hover:bg-slate-900 transition">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
              />
              <div>
                <div className="text-xs font-bold text-white">New Casino</div>
                <div className="text-[10px] text-slate-400">Adds to &quot;New Casinos&quot; counter</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/10 cursor-pointer hover:bg-slate-900 transition">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
              />
              <div>
                <div className="text-xs font-bold text-white">Featured</div>
                <div className="text-[10px] text-slate-400">Highlight in directories</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/10 cursor-pointer hover:bg-slate-900 transition">
              <input
                type="checkbox"
                name="cryptoFriendly"
                checked={formData.cryptoFriendly}
                onChange={handleChange}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
              />
              <div>
                <div className="text-xs font-bold text-white">Crypto Ready</div>
                <div className="text-[10px] text-slate-400">BTC, ETH, USDT deposits</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/10 cursor-pointer hover:bg-slate-900 transition">
              <input
                type="checkbox"
                name="vpnFriendly"
                checked={formData.vpnFriendly}
                onChange={handleChange}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
              />
              <div>
                <div className="text-xs font-bold text-white">VPN Allowed</div>
                <div className="text-[10px] text-slate-400">Permits VPN play</div>
              </div>
            </label>
          </div>
        </div>

        {/* Pros, Cons, and Review Content */}
        <div className="p-8 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md space-y-5">
          <h2 className="text-base font-black text-red-400 uppercase tracking-wider">
            3. Editorial Review, Pros & Cons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Pros (One per line)</label>
              <textarea
                name="pros"
                rows={4}
                value={formData.pros}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Cons (One per line)</label>
              <textarea
                name="cons"
                rows={4}
                value={formData.cons}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Short Summary</label>
            <textarea
              name="summary"
              rows={2}
              value={formData.summary}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Full Editorial Review</label>
            <textarea
              name="fullReview"
              rows={4}
              value={formData.fullReview}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
            />
          </div>
        </div>

        {/* Bonus Editing */}
        <div className="p-8 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md space-y-5">
          <h2 className="text-base font-black text-red-400 uppercase tracking-wider">
            4. Welcome Bonus Package
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Bonus Title</label>
              <input
                type="text"
                name="bonusTitle"
                value={formData.bonusTitle}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 uppercase">Bonus Code</label>
              <input
                type="text"
                name="bonusCode"
                value={formData.bonusCode}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/casinos"
            className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-bold border border-white/10"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-red-600/40 transition disabled:opacity-50 flex items-center gap-2 border border-red-400/30"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
