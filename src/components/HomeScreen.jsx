import { TrendingUp, ShieldCheck, Sparkles, X } from "lucide-react";
import PulseRing from "./PulseRing.jsx";
import { TRANSACTIONS, CATEGORY_COLORS, money } from "../data/mockData.js";

export default function HomeScreen({ dismissed, setDismissed }) {
  return (
    <div className="px-5 pt-4 pb-28">
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-[13px] text-muted">Good afternoon,</p>
          <h1 className="font-display text-xl text-text font-semibold">Tobi 👋</h1>
        </div>
        <div className="w-9 h-9 rounded-full bg-surface2 border border-border flex items-center justify-center">
          <Sparkles size={16} className="text-mint" />
        </div>
      </div>

      <div className="rounded-3xl bg-surface border border-border mt-4 p-4">
        <PulseRing percent={78} label="Weekly Spend Pulse" sub="of your budget used" />
        <div className="flex justify-between mt-2 px-2 text-center">
          <div className="flex-1">
            <p className="text-[11px] text-muted">Wallet balance</p>
            <p className="font-mono text-[15px] text-text font-medium">₦142,300</p>
          </div>
          <div className="flex-1 border-l border-border">
            <p className="text-[11px] text-muted">This week</p>
            <p className="font-mono text-[15px] text-gold font-medium">₦40,500</p>
          </div>
        </div>
      </div>

      {!dismissed && (
        <div className="mt-4 rounded-2xl bg-[#2A2016] border border-[#4A3620] p-3.5 flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
            <TrendingUp size={16} className="text-gold" />
          </div>
          <div className="flex-1">
            <p className="text-[13.5px] text-text leading-snug">
              You've spent <span className="text-gold font-medium">40% more</span> on transport
              this week than your average. Consider adjusting your weekend entertainment budget
              to stay on track.
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-muted hover:text-text mt-0.5"
          >
            <X size={15} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-6 mb-2">
        <h2 className="text-[13px] font-medium text-muted uppercase tracking-wide">
          Recent activity
        </h2>
        <ShieldCheck size={14} className="text-mint" />
      </div>

      <div className="space-y-1.5">
        {TRANSACTIONS.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-2xl bg-surface/70 border border-border px-3 py-2.5"
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
