"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import { ArrowLeft, Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function NewCasinoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    logoUrl: "",
    rating: "9.5",
    safetyIndex: "9.8",
    safetyTier: "VERY_HIGH",
    status: "ACTIVE",
    establishedYear: "2023",
    license: "Malta Gaming Authority (MGA)",
    minDeposit: "$20",
    payoutSpeed: "Instant - 24 Hours",
    withdrawalLimit: "$50,000 / month",
    supportTypes: "24/7 Live Chat & Email",
    websiteUrl: "https://",
    affiliateUrl: "https://",
    pros: "Instant crypto & fiat withdrawals\nLicensed by reputable tier-1 regulator\nOver 3,000+ certified slots",
    cons: "KYC required on high withdrawals",
    summary: "A premier online casino with lightning-fast cashouts and rigorous regulatory oversight.",
    fullReview: "Our audit confirms that this operator holds legitimate game server connections with no history of predatory payout clauses.",
    bonusTitle: "100% Up to $1,000 + 100 Free Spins",
    bonusType: "WELCOME",
    bonusCode: "WELCOME100",
    bonusWagering: "35x",
    featured: true,
    isNew: true,
    cryptoFriendly: true,
    vpnFriendly: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/casinos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create casino");
      }

      router.push("/admin/casinos");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/casinos"
          className="p-3 rounded-2xl bg-[#111728] border border-white/10 text-slate-400 hover:text-white shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-white">Add New Casino Review</h1>
          <p className="text-sm text-slate-400 font-medium">
            Publish a new operator review with REDSHIELD safety ratings, pros/cons, and affiliate bonuses.
          </p>
        </div>
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
                placeholder="e.g. Royal Vegas Casino"
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
                placeholder="e.g. royal-vegas"
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
                placeholder="https://casino.com/?ref=your_id"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-sm text-white focus:outline-none focus:border-red-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Safety & Rating */}
        <div className="p-8 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md space-y-5">
          <h2 className="text-base font-black text-red-400 uppercase tracking-wider">
            2. Safety Scores & Licensing
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
                placeholder="e.g. Malta Gaming Authority (MGA)"
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
                placeholder="e.g. $10 or €20"
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
                placeholder="e.g. 0 - 24 hours"
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

        {/* Pros & Cons */}
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

        {/* Initial Bonus */}
        <div className="p-8 rounded-3xl bg-[#111728]/90 border border-white/10 shadow-xl backdrop-blur-md space-y-5">
          <h2 className="text-base font-black text-red-400 uppercase tracking-wider">
            4. Welcome Bonus Offer
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
            disabled={loading}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-red-600/40 transition disabled:opacity-50 flex items-center gap-2 border border-red-400/30"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            Publish Casino Review
          </button>
        </div>
      </form>
    </div>
  );
}
