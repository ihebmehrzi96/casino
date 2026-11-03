"use client";

import { useState } from "react";
import { X, Calculator, DollarSign, Percent, RotateCcw } from "lucide-react";

interface BonusCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BonusCalculatorModal({ isOpen, onClose }: BonusCalculatorModalProps) {
  const [deposit, setDeposit] = useState<number>(100);
  const [matchPercent, setMatchPercent] = useState<number>(100);
  const [wagering, setWagering] = useState<number>(35);

  if (!isOpen) return null;

  const bonusAmount = (deposit * matchPercent) / 100;
  const totalBalance = deposit + bonusAmount;
  const totalWageringRequired = (deposit + bonusAmount) * wagering;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="max-w-md w-full bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-white" />
            <h3 className="text-xl font-black text-white">Bonus Wagering Calculator</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs font-bold text-zinc-300">
          <div>
            <label className="block mb-1.5 uppercase tracking-wider text-[11px] text-zinc-400">
              Deposit Amount ($)
            </label>
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block mb-1.5 uppercase tracking-wider text-[11px] text-zinc-400">
              Match Percentage (%)
            </label>
            <input
              type="number"
              value={matchPercent}
              onChange={(e) => setMatchPercent(Number(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="block mb-1.5 uppercase tracking-wider text-[11px] text-zinc-400">
              Wagering Requirement (Multiplier)
            </label>
            <input
              type="number"
              value={wagering}
              onChange={(e) => setWagering(Number(e.target.value) || 0)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-white"
            />
          </div>
        </div>

        {/* Calculated Results Box */}
        <div className="p-5 rounded-2xl bg-zinc-900 border border-white/15 space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Bonus Cash Awarded:</span>
            <strong className="text-white font-mono">${bonusAmount.toFixed(2)}</strong>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Total Bankroll to Play:</span>
            <strong className="text-white font-mono">${totalBalance.toFixed(2)}</strong>
          </div>
          <div className="flex justify-between text-xs pt-2 border-t border-white/10">
            <span className="text-white font-black">Total Wagering to Cashout:</span>
            <strong className="text-white font-mono text-sm">${totalWageringRequired.toLocaleString()}</strong>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-white w-full py-2.5 rounded-xl text-xs uppercase tracking-wider"
        >
          Got It / Close
        </button>
      </div>
    </div>
  );
}
