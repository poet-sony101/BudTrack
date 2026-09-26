import { Flame, Trophy } from "lucide-react";
import { BADGES, JOURNEY_NODES } from "../data/mockData.js";

export default function YouScreen() {
  const doneCount = JOURNEY_NODES.filter((n) => n.status === "done").length;

  return (
    <div className="px-5 pt-5 pb-32">
      <h1 className="font-display text-2xl text-text font-semibold mb-1">You</h1>
      <p className="text-[13px] text-muted mb-5">Your progress and rewards</p>

      <div className="rounded-3xl bg-surface border border-border p-5 flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lime to-cyan flex items-center justify-center text-3xl mb-3">
          🌱
        </div>
        <p className="font-display text-lg text-text font-semibold">Tobi</p>
        <div className="flex items-center gap-1.5 mt-1.5 bg-[#3A2416] border border-pink/30 rounded-full px-2.5 py-1">
          <Flame size={13} className="text-pink" />
          <span className="text-[12px] font-mono text-pink">7-day streak</span>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <div className="flex-1 rounded-2xl bg-surface border border-border p-4 text-center">
          <p className="font-mono text-xl text-lime font-bold">{doneCount}</p>
          <p className="text-[11px] text-muted mt-0.5">Stops complete</p>
        </div>
        <div className="flex-1 rounded-2xl bg-surface border border-border p-4 text-center">
          <p className="font-mono text-xl text-gold font-bold">
            {BADGES.filter((b) => b.earned).length}
          </p>
          <p className="text-[11px] text-muted mt-0.5">Badges earned</p>
        </div>
      </div>

      <h2 className="text-[13px] font-medium text-muted uppercase tracking-wide mb-3">Badges</h2>
      <div className="grid grid-cols-4 gap-2.5">
        {BADGES.map((b) => (
          <div key={b.id} className="flex flex-col items-center gap-1.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                b.earned ? "bg-lime/15 border-lime/40" : "bg-surface border-border"
              }`}
            >
              <Trophy size={18} className={b.earned ? "text-lime" : "text-surface2"} />
            </div>
            <span className="text-[9.5px] text-center text-muted leading-tight">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
