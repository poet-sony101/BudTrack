import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { WEEKLY_SPEND, CATEGORY_COLORS, money } from "../data/mockData.js";

export default function InsightsScreen() {
  const total = WEEKLY_SPEND.reduce((s, d) => s + d.thisWeek, 0);
  const totalAvg = WEEKLY_SPEND.reduce((s, d) => s + d.avg, 0);
  const delta = Math.round(((total - totalAvg) / totalAvg) * 100);
  const barColors = Object.values(CATEGORY_COLORS);

  return (
    <div className="px-5 pt-4 pb-28">
      <h1 className="font-display text-xl text-text font-semibold mb-1">Insights</h1>
      <p className="text-[13px] text-muted mb-4">This week vs. your usual pattern</p>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 rounded-2xl bg-surface border border-border p-3.5">
          <p className="text-[11px] text-muted mb-1">Total spent</p>
          <p className="font-mono text-lg text-text font-semibold">{money(total)}</p>
        </div>
        <div className="flex-1 rounded-2xl bg-surface border border-border p-3.5">
          <p className="text-[11px] text-muted mb-1">Vs. average</p>
          <div className="flex items-center gap-1">
            {delta >= 0 ? (
              <ArrowUpRight size={15} className="text-coral" />
            ) : (
              <ArrowDownRight size={15} className="text-mint" />
            )}
            <p
              className={`font-mono text-lg font-semibold ${
                delta >= 0 ? "text-coral" : "text-mint"
              }`}
            >
              {Math.abs(delta)}%
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-surface border border-border p-3.5 pb-2">
        <p className="text-[13px] text-text mb-2 font-medium">Spend by category</p>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEEKLY_SPEND} barGap={4}>
              <XAxis
                dataKey="name"
                tick={{ fill: "#8FB3A4", fontSize: 11 }}
                axisLine={{ stroke: "#1F4A3A" }}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#0B1F17",
                  border: "1px solid #1F4A3A",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "#F1F7F4",
                }}
                formatter={(v) => money(v)}
                cursor={{ fill: "#ffffff08" }}
              />
              <Bar dataKey="avg" fill="#1F4A3A" radius={[6, 6, 0, 0]} />
              <Bar dataKey="thisWeek" radius={[6, 6, 0, 0]}>
                {WEEKLY_SPEND.map((d, i) => (
                  <Cell key={i} fill={barColors[i] || "#35D08F"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-1 px-1">
          <span className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className="w-2.5 h-2.5 rounded-sm bg-border" /> Your average
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className="w-2.5 h-2.5 rounded-sm bg-mint" /> This week
          </span>
        </div>
      </div>
    </div>
  );
}
