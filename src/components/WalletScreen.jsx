import { ArrowUpRight, ArrowDownRight, Utensils, Bus, Zap, Film, Smartphone } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { TRANSACTIONS, CATEGORY_COLORS, WEEKLY_SPEND, money } from "../data/mockData.js";

const CATEGORY_ICON = {
  Food: Utensils,
  Transport: Bus,
  Airtime: Smartphone,
  Entertainment: Film,
  Utilities: Zap,
};

export default function WalletScreen() {
  const total = WEEKLY_SPEND.reduce((s, d) => s + d.thisWeek, 0);
  const totalAvg = WEEKLY_SPEND.reduce((s, d) => s + d.avg, 0);
  const delta = Math.round(((total - totalAvg) / totalAvg) * 100);
  const barColors = Object.values(CATEGORY_COLORS);

  return (
    <div className="px-5 pt-5 pb-32">
      <h1 className="font-display text-2xl text-text font-semibold mb-1">Wallet</h1>
      <p className="text-[13px] text-muted mb-5">₦142,300 available</p>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 rounded-2xl bg-surface border border-border p-4">
          <p className="text-[11px] text-muted mb-1">Spent this week</p>
          <p className="font-mono text-lg text-text font-bold">{money(total)}</p>
        </div>
        <div className="flex-1 rounded-2xl bg-surface border border-border p-4">
          <p className="text-[11px] text-muted mb-1">Vs. average</p>
          <div className="flex items-center gap-1">
            {delta >= 0 ? (
              <ArrowUpRight size={15} className="text-pink" />
            ) : (
              <ArrowDownRight size={15} className="text-lime" />
            )}
            <p className={`font-mono text-lg font-bold ${delta >= 0 ? "text-pink" : "text-lime"}`}>
              {Math.abs(delta)}%
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-surface border border-border p-4 pb-2 mb-6">
        <p className="text-[13px] text-text mb-2 font-medium">Spend by category</p>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_SPEND} barGap={4}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#9C8FC4", fontSize: 11 }}
                axisLine={{ stroke: "#4A3A7A" }}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#1B1035",
                  border: "1px solid #4A3A7A",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "#F5F3FF",
                }}
                formatter={(v) => money(v)}
                cursor={{ fill: "#ffffff08" }}
              />
              <Bar dataKey="avg" fill="#35245F" radius={[6, 6, 0, 0]} />
              <Bar dataKey="thisWeek" radius={[6, 6, 0, 0]}>
                {WEEKLY_SPEND.map((d, i) => (
                  <Cell key={i} fill={barColors[i] || "#B4FF39"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2 className="text-[13px] font-medium text-muted uppercase tracking-wide mb-3">
        Recent activity
      </h2>
      <div className="space-y-2">
        {TRANSACTIONS.map((t) => {
          const Icon = CATEGORY_ICON[t.category];
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-2xl bg-surface/70 border border-border px-3.5 py-3"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${CATEGORY_COLORS[t.category]}22` }}
              >
                <Icon size={16} style={{ color: CATEGORY_COLORS[t.category] }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] text-text truncate">{t.merchant}</p>
                <p className="text-[11px] text-muted">
                  {t.category} · {t.time}
                </p>
              </div>
              <p className="font-mono text-[13.5px] text-text">−{money(t.amount)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
