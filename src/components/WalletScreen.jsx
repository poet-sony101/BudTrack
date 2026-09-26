import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Utensils, Bus, Zap, Film, Smartphone, Gem, PlusCircle, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { CATEGORY_COLORS, money } from "../data/mockData.js";
import PulseRing from "./PulseRing.jsx";
import TransactionModal from "./TransactionModal.jsx";

const CATEGORY_ICON = {
  Food: Utensils,
  Transport: Bus,
  Airtime: Smartphone,
  Entertainment: Film,
  Utilities: Zap,
  Investment: Gem,
};

export default function WalletScreen({
  walletBalance,
  transactions,
  weeklySpend,
  spendPulse,
  onOpenReceipt,
  onAskAI,
  onSimulateSpend,
}) {
  const [selectedTx, setSelectedTx] = useState(null);
  const [showSimulate, setShowSimulate] = useState(false);

  const total = weeklySpend.reduce((s, d) => s + d.thisWeek, 0);
  const totalAvg = weeklySpend.reduce((s, d) => s + d.avg, 0);
  const delta = Math.round(((total - totalAvg) / totalAvg) * 100);
  const barColors = Object.values(CATEGORY_COLORS);

  return (
    <div className="px-5 pt-5 pb-32">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="font-display text-2xl text-text font-bold">Wallet</h1>
          <p className="text-[12.5px] text-muted">{money(walletBalance)} available</p>
        </div>
        <button
          onClick={() => setShowSimulate(!showSimulate)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-border text-muted hover:text-text hover:border-lime/40 text-[11px] font-mono transition-all"
        >
          <PlusCircle size={13} className="text-lime" />
          <span>Simulate</span>
        </button>
      </div>

      {/* Simulator bar (for hackathon demo) */}
      {showSimulate && (
        <div className="mt-3 mb-2 p-3 rounded-2xl bg-ink/90 border border-lime/30 text-[12px] space-y-2 animate-slide-up">
          <p className="text-text font-medium text-[11.5px] flex items-center justify-between">
            <span>Demo Quick-Spend Simulation:</span>
            <button onClick={() => setShowSimulate(false)} className="text-muted hover:text-text">✕</button>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onSimulateSpend?.({ merchant: "Shawarma Spot", category: "Food", amount: 2500 });
                setShowSimulate(false);
              }}
              className="flex-1 py-1.5 rounded-xl bg-surface border border-border hover:border-lime text-text text-[11px]"
            >
              + ₦2,500 Food
            </button>
            <button
              onClick={() => {
                onSimulateSpend?.({ merchant: "Uber Campus", category: "Transport", amount: 1800 });
                setShowSimulate(false);
              }}
              className="flex-1 py-1.5 rounded-xl bg-surface border border-border hover:border-lime text-text text-[11px]"
            >
              + ₦1,800 Transport
            </button>
          </div>
        </div>
      )}

      {/* Signature Cash-Flow Pulse Gauge */}
      <div className="rounded-3xl bg-surface border border-border p-4 my-4 shadow-sm">
        <PulseRing percent={spendPulse} label="Weekly Spend Pulse" sub="of budget used" />
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border/60 text-center">
          <div>
            <p className="text-[10.5px] uppercase font-mono tracking-wider text-muted">Spent this week</p>
            <p className="font-mono text-[16px] text-text font-bold mt-0.5">{money(total)}</p>
          </div>
          <div className="border-l border-border/60">
            <p className="text-[10.5px] uppercase font-mono tracking-wider text-muted">Vs. Typical Spend</p>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              {delta >= 0 ? (
                <ArrowUpRight size={14} className="text-pink" />
              ) : (
                <ArrowDownRight size={14} className="text-lime" />
              )}
              <p className={`font-mono text-[16px] font-bold ${delta >= 0 ? "text-pink" : "text-lime"}`}>
                {delta >= 0 ? `+${delta}%` : `${delta}%`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spend by Category Chart */}
      <div className="rounded-3xl bg-surface border border-border p-4 pb-3 mb-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[13px] text-text font-bold">Category Breakdown</p>
          <div className="flex items-center gap-3 text-[10px] text-muted font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#35245F]" /> Avg
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-lime" /> This week
            </span>
          </div>
        </div>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySpend} barGap={4}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#9C8FC4", fontSize: 10.5 }}
                axisLine={{ stroke: "#4A3A7A" }}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#1B1035",
                  border: "1px solid #4A3A7A",
                  borderRadius: 12,
                  fontSize: 11,
                  color: "#F5F3FF",
                }}
                formatter={(v) => money(v)}
                cursor={{ fill: "#ffffff08" }}
              />
              <Bar dataKey="avg" fill="#35245F" radius={[5, 5, 0, 0]} />
              <Bar dataKey="thisWeek" radius={[5, 5, 0, 0]}>
                {weeklySpend.map((d, i) => (
                  <Cell key={i} fill={barColors[i] || "#B4FF39"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[12px] font-bold text-muted uppercase tracking-wider font-mono">
          Recent Activity
        </h2>
        <span className="text-[10.5px] text-muted">Tap for receipt</span>
      </div>

      <div className="space-y-2">
        {transactions.map((t) => {
          const Icon = CATEGORY_ICON[t.category] || Utensils;
          const color = CATEGORY_COLORS[t.category] || "#B4FF39";
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTx(t)}
              className="w-full text-left flex items-center gap-3 rounded-2xl bg-surface/75 border border-border px-3.5 py-3 hover:border-lime/40 hover:bg-surface transition-all active:scale-[0.99] group"
            >
              <div
                className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${color}22` }}
              >
                <Icon size={16} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-text font-medium truncate">{t.merchant}</p>
                <p className="text-[11px] text-muted">
                  {t.category} · {t.time}
                </p>
              </div>
              <p className="font-mono text-[13px] text-text font-semibold">
                −{money(t.amount)}
              </p>
            </button>
          );
        })}
      </div>

      {/* Transaction Modal Receipt */}
      {selectedTx && (
        <TransactionModal
          transaction={selectedTx}
          onClose={() => setSelectedTx(null)}
          onAskAI={onAskAI}
        />
      )}
    </div>
  );
}
