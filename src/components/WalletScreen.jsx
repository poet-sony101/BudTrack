import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Utensils, Bus, Zap, Film, Smartphone, Gem, PlusCircle, Receipt, TrendingUp, ShieldCheck, Wallet, RefreshCw } from "lucide-react";
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
  totalInvested = 0,
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
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-text font-bold tracking-tight">
            Wallet & Cashflow Intelligence
          </h1>
          <p className="text-muted text-sm mt-1">
            Real-time balance telemetry, AI spend pulse monitoring, and verified OPay transactions.
          </p>
        </div>

        {/* Demo Quick Simulator Button */}
        <button
          onClick={() => setShowSimulate(!showSimulate)}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface hover:bg-surface2 border border-border hover:border-lime/40 text-text font-mono text-xs font-semibold transition-all shadow-sm active:scale-95"
        >
          <PlusCircle size={15} className="text-lime" />
          <span>Simulate Live Spend</span>
        </button>
      </div>

      {/* Simulator Quick Bar (for Hackathon Demonstrations) */}
      {showSimulate && (
        <div className="p-4 rounded-3xl bg-ink border-2 border-lime/40 text-xs space-y-3 animate-slide-up shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw size={15} className="text-lime animate-spin" />
              <p className="font-bold text-text text-sm">Demo Live Spend Engine</p>
            </div>
            <button
              onClick={() => setShowSimulate(false)}
              className="text-muted hover:text-text px-2 py-1"
            >
              ✕ Close
            </button>
          </div>
          <p className="text-muted text-xs">
            Trigger simulated transactions to see how Budtrack immediately updates the Cash-Flow Pulse and Recharts analytics.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <button
              onClick={() => {
                onSimulateSpend?.({ merchant: "Shawarma Spot", category: "Food", amount: 2500 });
                setShowSimulate(false);
              }}
              className="px-4 py-2 rounded-xl bg-surface border border-border hover:border-lime text-text font-medium text-xs transition-all hover:scale-105"
            >
              🍔 +₦2,500 Shawarma Spot (Food)
            </button>
            <button
              onClick={() => {
                onSimulateSpend?.({ merchant: "Uber Campus Ride", category: "Transport", amount: 1800 });
                setShowSimulate(false);
              }}
              className="px-4 py-2 rounded-xl bg-surface border border-border hover:border-lime text-text font-medium text-xs transition-all hover:scale-105"
            >
              🚕 +₦1,800 Uber Campus (Transport)
            </button>
            <button
              onClick={() => {
                onSimulateSpend?.({ merchant: "Airtel 10GB Data", category: "Airtime", amount: 3000 });
                setShowSimulate(false);
              }}
              className="px-4 py-2 rounded-xl bg-surface border border-border hover:border-lime text-text font-medium text-xs transition-all hover:scale-105"
            >
              📶 +₦3,000 Airtel Data (Airtime)
            </button>
          </div>
        </div>
      )}

      {/* Top 4 KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-3xl bg-surface border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted text-xs font-mono uppercase tracking-wider mb-2">
            <span>OPay Wallet Balance</span>
            <Wallet size={15} className="text-lime" />
          </div>
          <p className="font-mono text-2xl lg:text-3xl font-bold text-text">{money(walletBalance)}</p>
          <p className="text-[11px] text-muted mt-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-lime" /> Tier 3 Account Linked
          </p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-3xl bg-surface border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted text-xs font-mono uppercase tracking-wider mb-2">
            <span>Spent This Week</span>
            <TrendingUp size={15} className="text-gold" />
          </div>
          <p className="font-mono text-2xl lg:text-3xl font-bold text-text">{money(total)}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            {delta >= 0 ? (
              <span className="inline-flex items-center gap-0.5 text-pink font-semibold">
                <ArrowUpRight size={14} /> +{delta}%
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-lime font-semibold">
                <ArrowDownRight size={14} /> {delta}%
              </span>
            )}
            <span className="text-muted text-[11px]">vs. your average</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-3xl bg-surface border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted text-xs font-mono uppercase tracking-wider mb-2">
            <span>Cash-Flow Pulse</span>
            <span className="font-mono text-xs font-bold text-gold">{spendPulse}%</span>
          </div>
          <p className="font-mono text-2xl lg:text-3xl font-bold text-text">
            {spendPulse < 70 ? "Healthy" : spendPulse < 85 ? "Moderate" : "Elevated"}
          </p>
          <p className="text-[11px] text-muted mt-1.5">
            {spendPulse < 70 ? "Pacing comfortably below limit" : "Approaching weekly threshold"}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-3xl bg-surface border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between text-muted text-xs font-mono uppercase tracking-wider mb-2">
            <span>Total Invested</span>
            <Gem size={15} className="text-gold" />
          </div>
          <p className="font-mono text-2xl lg:text-3xl font-bold text-gold">{money(totalInvested)}</p>
          <p className="text-[11px] text-lime mt-1.5">
            Up to 18.2% annual sovereign yield
          </p>
        </div>
      </div>

      {/* Main 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Pulse Meter & Spend Analytics (~58%) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Signature Cashflow Pulse Gauge Card */}
          <div className="rounded-3xl bg-surface border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-border/70 mb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-text">Signature Spend Pulse</h3>
                <p className="text-xs text-muted">Weekly cash outflow velocity gauge</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-surface2 border border-border text-xs font-mono font-medium text-text">
                Live OPay Telemetry
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
              <div className="w-48 shrink-0">
                <PulseRing percent={spendPulse} label="Weekly Pulse" sub="of budget used" />
              </div>

              <div className="flex-1 space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-ink/70 border border-border/80">
                  <p className="font-bold text-text text-sm mb-1">
                    {spendPulse < 70 ? "Safe Green Zone 🌿" : "Transport Surge Detected ⚠️"}
                  </p>
                  <p className="text-muted leading-relaxed">
                    {spendPulse < 70
                      ? "Your outflow is steady. You have room in your budget for savings or micro-investing into Treasury Bills."
                      : "Transport expenses reached ₦9,800 this week. Tap the AI Copilot to rebalance your weekend budget automatically."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-ink/50 border border-border">
                    <p className="text-[10px] text-muted">Historical Avg</p>
                    <p className="text-sm font-bold text-text mt-0.5">{money(totalAvg)}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-ink/50 border border-border">
                    <p className="text-[10px] text-muted">Current Run-Rate</p>
                    <p className="text-sm font-bold text-gold mt-0.5">{money(total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Spend Analytics Card */}
          <div className="rounded-3xl bg-surface border border-border p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/70 mb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-text">Category Spend Breakdown</h3>
                <p className="text-xs text-muted">Comparing current week vs. your typical expenditure</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-muted">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#35245F]" /> Average
                </span>
                <span className="flex items-center gap-1.5 text-lime">
                  <span className="w-2.5 h-2.5 rounded-sm bg-lime" /> This Week
                </span>
              </div>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySpend} barGap={6}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#9C8FC4", fontSize: 12 }}
                    axisLine={{ stroke: "#4A3A7A" }}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "#1B1035",
                      border: "1px solid #4A3A7A",
                      borderRadius: 14,
                      fontSize: 12,
                      color: "#F5F3FF",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                    }}
                    formatter={(v) => money(v)}
                    cursor={{ fill: "#ffffff0a" }}
                  />
                  <Bar dataKey="avg" fill="#35245F" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="thisWeek" radius={[6, 6, 0, 0]}>
                    {weeklySpend.map((d, i) => (
                      <Cell key={i} fill={barColors[i] || "#B4FF39"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity Feed (~42%) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <h3 className="font-display font-bold text-lg text-text">Recent Transactions</h3>
              <p className="text-xs text-muted">Click any item for digital receipt & AI insight</p>
            </div>
            <span className="text-xs text-muted font-mono">{transactions.length} items</span>
          </div>

          <div className="space-y-3">
            {transactions.map((t) => {
              const Icon = CATEGORY_ICON[t.category] || Utensils;
              const color = CATEGORY_COLORS[t.category] || "#B4FF39";

              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTx(t)}
                  className="w-full text-left flex items-center justify-between p-4 rounded-2xl bg-surface/70 hover:bg-surface border border-border hover:border-lime/40 transition-all shadow-sm active:scale-[0.99] group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${color}22` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text truncate group-hover:text-lime transition-colors">
                        {t.merchant}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted mt-0.5">
                        <span
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium"
                          style={{ backgroundColor: `${color}18`, color }}
                        >
                          {t.category}
                        </span>
                        <span>·</span>
                        <span>{t.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-mono text-sm font-bold text-text">
                      −{money(t.amount)}
                    </p>
                    <span className="text-[10px] text-lime font-mono">Verified ✓</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
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
