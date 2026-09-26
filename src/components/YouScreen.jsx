import { useState } from "react";
import { Flame, Trophy, Award, Sparkles, Target, CheckCircle2, ChevronRight, Info } from "lucide-react";
import RiskQuizModal from "./RiskQuizModal.jsx";

export default function YouScreen({
  nodes,
  badges,
  xp,
  streak,
  archetype,
  onSetArchetype,
  onCheckinStreak,
  hasCheckedInToday,
}) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const doneCount = nodes.filter((n) => n.status === "done").length;
  const earnedBadgesCount = badges.filter((b) => b.earned).length;

  return (
    <div className="px-5 pt-5 pb-32">
      {/* Header */}
      <h1 className="font-display text-2xl text-text font-bold mb-1">You</h1>
      <p className="text-[12.5px] text-muted mb-4">Identity, streaks & achievement badges</p>

      {/* Profile Card */}
      <div className="rounded-3xl bg-surface border border-border p-5 flex flex-col items-center mb-4 shadow-sm relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lime to-cyan flex items-center justify-center text-3xl mb-2.5 shadow-md">
          🌱
        </div>
        <p className="font-display text-lg text-text font-bold">Tobi Adeyemi</p>
        <p className="text-[11px] text-muted font-mono">OPay Tier 3 Verified Account</p>

        {/* Streak counter & Daily Check-in */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-1.5 bg-[#3A2416] border border-pink/40 rounded-full px-3 py-1">
            <Flame size={14} className="text-pink animate-pulse" />
            <span className="text-[12px] font-mono text-pink font-semibold">
              {streak}-day streak
            </span>
          </div>

          <button
            onClick={onCheckinStreak}
            disabled={hasCheckedInToday}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              hasCheckedInToday
                ? "bg-lime/15 border border-lime/30 text-lime cursor-default"
                : "bg-lime text-ink font-bold hover:brightness-110 active:scale-95"
            }`}
          >
            {hasCheckedInToday ? "✓ Checked in today" : "Check in (+10 XP)"}
          </button>
        </div>
      </div>

      {/* Investor Archetype Card */}
      <div className="mb-4">
        {archetype ? (
          <div className="rounded-3xl bg-surface border border-border p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
                style={{ backgroundColor: `${archetype.badgeColor}20` }}
              >
                {archetype.emoji}
              </div>
              <div>
                <span
                  className="text-[9.5px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${archetype.badgeColor}22`,
                    color: archetype.badgeColor,
                  }}
                >
                  {archetype.tagline}
                </span>
                <p className="font-display text-[15px] font-bold text-text mt-0.5">
                  {archetype.title}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowQuiz(true)}
              className="text-[11px] text-muted hover:text-text underline font-mono"
            >
              Retake
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowQuiz(true)}
            className="w-full text-left rounded-3xl bg-gradient-to-r from-cyan/15 via-surface to-surface border border-cyan/40 p-4 shadow-sm hover:border-cyan transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan">
                <Target size={18} />
              </div>
              <div>
                <p className="font-display text-[14px] font-bold text-text group-hover:text-cyan transition-colors">
                  Discover Your Investor Archetype
                </p>
                <p className="text-[11px] text-muted leading-tight">
                  Take the 60-second quiz to personalize your recommendations.
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-cyan group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <div className="rounded-2xl bg-surface border border-border p-3 text-center">
          <p className="font-mono text-lg text-lime font-bold">{doneCount}</p>
          <p className="text-[10.5px] text-muted mt-0.5">Stops Done</p>
        </div>
        <div className="rounded-2xl bg-surface border border-border p-3 text-center">
          <p className="font-mono text-lg text-gold font-bold">{earnedBadgesCount}</p>
          <p className="text-[10.5px] text-muted mt-0.5">Badges Won</p>
        </div>
        <div className="rounded-2xl bg-surface border border-border p-3 text-center">
          <p className="font-mono text-lg text-cyan font-bold">{xp}</p>
          <p className="text-[10.5px] text-muted mt-0.5">Total XP</p>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[12px] font-bold text-muted uppercase tracking-wider font-mono">
          Achievement Badges
        </h2>
        <span className="text-[10.5px] text-muted">Tap to inspect</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {badges.map((b) => {
          const Icon = b.icon || Award;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBadge(b)}
              className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-surface/60 border border-border hover:border-lime/40 transition-all text-center group active:scale-95"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-105 ${
                  b.earned
                    ? "bg-lime/15 border-lime/40 text-lime shadow-sm"
                    : "bg-ink/60 border-border/80 text-muted/40"
                }`}
              >
                <Icon size={20} />
              </div>
              <span className={`text-[10px] leading-tight font-medium ${b.earned ? "text-text" : "text-muted/60"}`}>
                {b.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Badge detail popup */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-[300px] rounded-3xl bg-surface border border-border p-5 text-text text-center space-y-3">
            <div
              className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto border ${
                selectedBadge.earned
                  ? "bg-lime/15 border-lime/40 text-lime"
                  : "bg-surface2 border-border text-muted"
              }`}
            >
              <Award size={30} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-ink border border-border text-muted">
                {selectedBadge.earned ? "Unlocked ✓" : "Milestone Locked"}
              </span>
              <h4 className="font-display font-bold text-lg text-text mt-1.5">{selectedBadge.label}</h4>
              <p className="text-[12px] text-muted mt-1 leading-relaxed">
                {selectedBadge.description || "Earned by actively engaging with your financial health."}
              </p>
            </div>
            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2 rounded-xl bg-surface2 text-text font-medium text-[12.5px] hover:bg-surface"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Risk Quiz Modal */}
      {showQuiz && (
        <RiskQuizModal
          onClose={() => setShowQuiz(false)}
          onComplete={(arch) => {
            onSetArchetype?.(arch);
          }}
        />
      )}
    </div>
  );
}
