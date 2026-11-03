"use client";

import { X, Check, ExternalLink, ShieldCheck, Clock, CreditCard, Star } from "lucide-react";
import Link from "next/link";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  casinos: any[];
}

export default function CompareModal({ isOpen, onClose, casinos }: CompareModalProps) {
  if (!isOpen) return null;

  const compareList = casinos.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="max-w-4xl w-full bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-white/15">
              CasinoFreak Tool
            </span>
            <h3 className="text-2xl font-black text-white mt-1.5">Side-by-Side Casino Comparison</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="grid grid-cols-3 gap-4">
          {compareList.map((casino) => (
            <div
              key={casino.id}
              className="p-5 rounded-2xl bg-zinc-900/90 border border-white/15 flex flex-col justify-between space-y-4 text-center"
            >
              <div>
                <div className="w-16 h-16 rounded-xl bg-black border border-white/20 p-2 mx-auto overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={casino.logoUrl} alt={casino.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <h4 className="text-lg font-black text-white mt-3">{casino.name}</h4>
                <div className="inline-flex items-center gap-1 text-xs font-black bg-white text-black px-2.5 py-0.5 rounded mt-1">
                  <Star className="w-3 h-3 fill-black" />
                  {casino.rating.toFixed(1)} / 10
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-3 text-xs text-left pt-4 border-t border-white/10">
                <div>
                  <span className="text-zinc-500 block uppercase font-bold text-[10px]">Safety Index</span>
                  <strong className="text-white font-mono text-sm">{casino.safetyIndex.toFixed(1)} / 10</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase font-bold text-[10px]">Min Deposit</span>
                  <strong className="text-white">{casino.minDeposit}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase font-bold text-[10px]">Payout Speed</span>
                  <strong className="text-white">{casino.payoutSpeed}</strong>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase font-bold text-[10px]">License</span>
                  <span className="text-zinc-300 font-medium block truncate">{casino.license}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={casino.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-white w-full py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  Visit Casino
                  <ExternalLink className="w-3 h-3 text-black" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
