"use client";

import Link from "next/link";
import SafetyScoreBadge from "@/components/SafetyScoreBadge";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import {
  Star,
  ShieldCheck,
  Check,
  X,
  ExternalLink,
  Zap,
  Clock,
  CreditCard,
  Building,
  HelpCircle,
  ThumbsUp,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";

interface CasinoDetailClientViewProps {
  casino: any;
  pros: string[];
  cons: string[];
}

export default function CasinoDetailClientView({
  casino,
  pros,
  cons,
}: CasinoDetailClientViewProps) {
  const { t } = useLanguage();
  const isBlacklist = casino.status === "BLACKLISTED";

  return (
    <div className="pb-24 bg-black text-white min-h-screen">
      {/* Top Breadcrumb */}
      <div className="border-b border-white/10 bg-zinc-950/80 py-4 text-xs font-bold text-zinc-400 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition">
            {t.reviewPage.home}
          </Link>
          <span>/</span>
          <Link href="/casinos" className="hover:text-white transition">
            {t.reviewPage.casinos}
          </Link>
          <span>/</span>
          <span className="text-white font-bold">{casino.name} {t.reviewPage.review}</span>
        </div>
      </div>

      {/* Main Review Hero */}
      <div className="bg-zinc-950 border-b border-white/10 py-12 shadow-2xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-28 h-28 rounded-2xl bg-black border-2 border-white/20 p-2 overflow-hidden shadow-xl shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={casino.logoUrl}
                  alt={casino.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl sm:text-4xl font-black text-white">{casino.name}</h1>
                  {casino.featured && (
                    <span className="px-3 py-0.5 rounded-md text-[10px] font-black bg-white text-black uppercase tracking-wider">
                      {t.reviewPage.verified}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-zinc-400 font-semibold">
                  <span className="flex items-center gap-1.5 text-black font-black bg-white px-2.5 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-black text-black" />
                    {casino.rating.toFixed(1)} / 10
                  </span>
                  <span>•</span>
                  <span>{t.reviewPage.established} {casino.establishedYear || "N/A"}</span>
                  <span>•</span>
                  <span>{casino.license}</span>
                </div>

                <div>
                  <SafetyScoreBadge score={casino.safetyIndex} tier={casino.safetyTier} size="md" />
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 w-full lg:w-72">
              {!isBlacklist ? (
                <>
                  <a
                    href={casino.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn-white w-full text-center py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    {t.reviewPage.visitCasino}
                    <ExternalLink className="w-4 h-4 text-black" />
                  </a>
                  <p className="text-[10px] text-zinc-500 text-center font-medium">
                    18+ | Terms & Conditions Apply | Play Responsibly
                  </p>
                </>
              ) : (
                <div className="p-4 rounded-xl bg-black border-2 border-white text-center text-xs text-white font-black flex items-center justify-center gap-2 uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-white" />
                  BLACK MEDAL ROGUE - DO NOT PLAY
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main 2-columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Blacklist Warning Box if applicable */}
          {isBlacklist && (
            <ScrollReveal direction="down">
              <div className="p-8 rounded-2xl bg-zinc-900 border-2 border-white/40 space-y-3 shadow-xl">
                <div className="flex items-center gap-2.5 text-white font-black text-lg">
                  <ShieldAlert className="w-5 h-5 text-white" />
                  {t.blacklistPage.badge}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                  {casino.blacklistReason || casino.summary}
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Quick Specifications */}
          <ScrollReveal direction="up">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 shadow-lg">
                <div className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5 mb-1.5 uppercase">
                  <CreditCard className="w-3.5 h-3.5 text-white" />
                  {t.card.minDeposit}
                </div>
                <div className="text-base font-black text-white">{casino.minDeposit}</div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 shadow-lg">
                <div className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5 mb-1.5 uppercase">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  {t.reviewPage.payoutSpeed}
                </div>
                <div className="text-base font-black text-white">{casino.payoutSpeed}</div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 shadow-lg">
                <div className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5 mb-1.5 uppercase">
                  <Building className="w-3.5 h-3.5 text-white" />
                  {t.reviewPage.license}
                </div>
                <div className="text-base font-black text-white line-clamp-1">{casino.license}</div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 shadow-lg">
                <div className="text-[10px] text-zinc-400 font-bold flex items-center gap-1.5 mb-1.5 uppercase">
                  <HelpCircle className="w-3.5 h-3.5 text-white" />
                  Support
                </div>
                <div className="text-base font-black text-white line-clamp-1">{casino.supportTypes || "Live Chat"}</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Pros & Cons */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl space-y-6">
              <h3 className="text-2xl font-black text-white">{t.reviewPage.whatWeLike} & {t.reviewPage.whatToWatchOut}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Pros */}
                <div className="space-y-3.5">
                  <div className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-white" />
                    {t.card.whatWeLike}
                  </div>
                  {pros.length > 0 ? (
                    pros.map((pro, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-medium">
                        <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-500">None</p>
                  )}
                </div>

                {/* Cons */}
                <div className="space-y-3.5">
                  <div className="text-xs font-black text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-white" />
                    {t.card.whatToWatchOut}
                  </div>
                  {cons.length > 0 ? (
                    cons.map((con, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-medium">
                        <X className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-500">None</p>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Available Bonuses */}
          {casino.bonuses && casino.bonuses.length > 0 && (
            <ScrollReveal direction="up" delay={0.15}>
              <div className="p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-2.5">
                  <Zap className="w-5 h-5 text-white" />
                  {t.bonusesSection.title}
                </h3>

                <div className="space-y-4">
                  {casino.bonuses.map((bonus: any) => (
                    <div
                      key={bonus.id}
                      className="p-5 rounded-xl bg-black border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-black bg-white px-2 py-0.5 rounded uppercase tracking-wider">
                            {bonus.type}
                          </span>
                        </div>
                        <h4 className="text-base font-black text-white">{bonus.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium pt-1">
                          <span>{t.bonusesPage.wagering}: <strong className="text-white">{bonus.wagering}</strong></span>
                          <span>•</span>
                          <span>{t.bonusesPage.minDeposit}: <strong className="text-white">{bonus.minDeposit}</strong></span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <a
                          href={bonus.claimUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="btn-white px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
                        >
                          {t.bonusesPage.claimThisBonus}
                          <ExternalLink className="w-3.5 h-3.5 text-black" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Full In-Depth Review */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl space-y-4">
              <h3 className="text-2xl font-black text-white">CASINOVA Editorial Audit</h3>
              <div className="text-sm text-zinc-300 leading-relaxed space-y-4 font-normal">
                <p>{casino.fullReview}</p>
                <p>{casino.summary}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Safety Summary Widget */}
          <ScrollReveal direction="left">
            <div className="p-7 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl space-y-5">
              <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                {t.reviewPage.safetyIndex}
              </h4>
              <div className="space-y-3.5 text-xs font-semibold">
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-zinc-400">{t.reviewPage.license}</span>
                  <span className="text-white font-bold">{casino.license}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-zinc-400">RNG Game Audit</span>
                  <span className="text-white font-bold">Certified Authentic</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/5">
                  <span className="text-zinc-400">Unresolved Complaints</span>
                  <span className="text-white font-bold">0 Active Tickets</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">VPN Friendly</span>
                  <span className="text-white font-bold">{casino.vpnFriendly ? "Yes" : "Check T&Cs"}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Community Review Form */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="p-7 rounded-2xl bg-zinc-900 border border-white/10 shadow-xl space-y-4">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-white" />
                {t.reviewPage.playerFeedback}
              </h4>
              <p className="text-xs text-zinc-400 font-medium">
                {t.reviewPage.playerNotice}
              </p>
              <form action="/api/reviews" method="POST" className="space-y-3.5">
                <input type="hidden" name="casinoId" value={casino.id} />
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Your Name / Handle</label>
                  <input
                    type="text"
                    name="authorName"
                    required
                    placeholder="e.g. VaultPlayer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Rating (1 - 10)</label>
                  <select
                    name="rating"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-xs text-white focus:outline-none focus:border-white transition"
                  >
                    <option value="10">10 - Exceptional</option>
                    <option value="9">9 - Excellent</option>
                    <option value="8">8 - Very Good</option>
                    <option value="7">7 - Average</option>
                    <option value="5">5 - Mediocre</option>
                    <option value="1">1 - Scam / Warning</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Review Headline</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Fast 15-minute crypto withdrawal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Detailed Review</label>
                  <textarea
                    name="comment"
                    required
                    rows={3}
                    placeholder="Tell us about verification, game selection, or payout speeds..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-white w-full py-2.5 rounded-xl text-xs uppercase tracking-wider"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
