"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  X,
  RefreshCw,
  BarChart3,
  Clock,
  Eye,
} from "lucide-react";

interface Guide {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  published: boolean;
  createdAt?: string;
}

const GUIDE_CATEGORIES = ["Beginner", "Strategy", "Payment", "Safety", "Bonuses", "General"];

export default function AdminGuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Beginner",
    excerpt: "",
    content: "",
    readTime: "5 min read",
    published: true,
  });

  const fetchGuides = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/guides");
      const data = await res.json();
      if (data.success && data.guides) {
        setGuides(data.guides);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete guide "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/guides/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setGuides((prev) => prev.filter((g) => g.id !== id));
        setStatusMessage(`Guide "${title}" deleted.`);
        setTimeout(() => setStatusMessage(""), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddGuide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success && data.guide) {
        setGuides((prev) => [data.guide, ...prev]);
        setIsAddModalOpen(false);
        setFormData({
          title: "",
          category: "Beginner",
          excerpt: "",
          content: "",
          readTime: "5 min read",
          published: true,
        });
        setStatusMessage("Guide published successfully! It is now counted in Gambling Guides.");
        setTimeout(() => setStatusMessage(""), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(search.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-red-500" />
            <h1 className="text-2xl font-black text-white">Gambling Guides & Strategies</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Author and manage expert guides, casino tutorials, and strategy articles. Each active guide directly feeds the{" "}
            <span className="text-emerald-400 font-bold">Gambling Guides counter</span> on the homepage.
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
            <span>Create New Guide</span>
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
            placeholder="Search guides by title or keywords..."
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
            <option value="All">All Categories ({guides.length})</option>
            {GUIDE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Guides List */}
      <div className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs text-slate-400 font-bold">
          <span>Showing {filteredGuides.length} published guides</span>
          <button
            onClick={fetchGuides}
            className="hover:text-white flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading guides...</div>
        ) : filteredGuides.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No guides found matching your search.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {guide.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white hover:text-red-400 transition cursor-pointer">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 max-w-2xl">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDelete(guide.id, guide.title)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition"
                    title="Delete Guide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Guide Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0D1322] border border-white/10 rounded-2xl w-full max-w-xl p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-black text-white">Create New Gambling Guide</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGuide} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Guide Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Guide to Live Dealer Blackjack"
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
                    {GUIDE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 6 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Brief Excerpt / Summary</label>
                <textarea
                  rows={2}
                  placeholder="Short teaser shown in directory and search..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Guide Content *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write or paste your guide content here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                  {submitting ? "Publishing..." : "Publish Guide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
