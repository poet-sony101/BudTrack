import { Flame, Trophy, GraduationCap, Lock } from "lucide-react";
import { MODULES, BADGES } from "../data/mockData.js";

export default function LearnScreen() {
  return (
    <div className="px-5 pt-4 pb-28">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-xl text-text font-semibold">Learn</h1>
        <div className="flex items-center gap-1.5 bg-[#2A2016] border border-[#4A3620] rounded-full px-2.5 py-1">
          <Flame size={13} className="text-gold" />
          <span className="text-[12px] font-mono text-gold">7-day streak</span>
        </div>
      </div>
      <p className="text-[13px] text-muted mb-4">Bite-sized lessons, gamified</p>

      <div className="space-y-2 mb-6">
        {MODULES.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl bg-surface border border-border p-3.5 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-surface2 flex items-center justify-center shrink-0">
              {m.progress === 100 ? (
                <Trophy size={15} className="text-gold" />
              ) : m.progress > 0 ? (
                <GraduationCap size={15} className="text-mint" />
              ) : (
                <Lock size={14} className="text-muted" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-[13.5px] text-text">{m.title}</p>
              <p className="text-[11px] text-muted">{m.minutes} min</p>
              <div className="h-1 rounded-full bg-border mt-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-mint transition-all"
                  style={{ width: `${m.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-[13px] font-medium text-muted uppercase tracking-wide mb-2">Badges</h2>
      <div className="grid grid-cols-4 gap-2.5">
        {BADGES.map((b) => (
          <div key={b.id} className="flex flex-col items-center gap-1.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                b.earned ? "bg-mint/15 border-mint/40" : "bg-surface border-border"
              }`}
            >
              <Trophy size={18} className={b.earned ? "text-mint" : "text-surface2"} />
            </div>
            <span className="text-[9.5px] text-center text-muted leading-tight">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
