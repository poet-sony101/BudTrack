import { useState } from "react";
import { Flame, Trophy, Award, Sparkles, Target, CheckCircle2, ChevronRight, Info, ShieldCheck, UserCheck, Lock } from "lucide-react";
import RiskQuizModal from "./RiskQuizModal.jsx";
import { money } from "../data/mockData.js";

export default function YouScreen({
  nodes,
  badges,
  xp,
  streak,
  archetype,
  walletBalance,
  totalInvested = 0,
  onSetArchetype,
  onCheckinStreak,
  hasCheckedInToday,
}) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const doneCount = nodes.filter((n) => n.status === "done").length;
  const earnedBadgesCount = badges.filter((b) => b.earned).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile & Identity Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-surface via-surface2 to-surface border border-border p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-lime via-cyan to-gold flex items-center justify-center text-4xl shadow-xl shadow-lime/10">
              🌱
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-lime border-4 border-ink flex items-center justify-center text-ink font-bold text-[10px]">
              ✓
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-lime/15 border border-lime/30 text-lime font-mono text-xs font-bold">
                OPAY TIER 3
              </span>
              <span className="text-muted text-xs font-mono">BVN & NIN Verified</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-text font-bold">Tobi Adeyemi</h1>
            <p className="text-muted text-xs sm:text-sm mt-0.5">
              Personal Wealth Portfolio · Member since August 2026
            </p>
          </div>
        </div>

        {/* Streak Counter & Daily Check-In Action */}
        <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row items-center gap-3 bg-ink/70 border border-border p-4 rounded-2xl">
          <div className="flex items-center gap-2.5 px-3 py-1">
            <div className="w-10 h-10 rounded-xl bg-[#3A2416] border border-pink/40 flex items-center justify-center text-pink">
              <Flame size={20} className="animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-[10.5px] uppercase font-mono tracking-wider text-muted">Daily Streak</p>
              <p className="font-mono text-lg font-bold text-pink">{streak} Days Consistent</p>
            </div>
          </div>

          <button
            onClick={onCheckinStreak}
            disabled={hasCheckedInToday}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              hasCheckedInToday
                ? "bg-lime/15 border border-lime/30 text-lime cursor-default"
                : "bg-lime text-ink hover:brightness-110 active:scale-95 shadow-lime/20"
            }`}
          >
            {hasCheckedInToday ? "✓ Checked In Today" : "Check In (+10 XP)"}
          </button>
        </div>
      </div>

      {/* 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Investor DNA & Financial Metrics (~50%) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Investor DNA Card */}
          <div className="rounded-3xl bg-surface border border-border p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <div>
                <h3 className="font-display font-bold text-lg text-text">Investor DNA & Risk Profile</h3>
                <p className="text-xs text-muted">Personalized financial archetype</p>
              </div>
              <button
                onClick={() => setShowQuiz(true)}
                className="text-xs text-cyan hover:underline font-mono"
              >
                {archetype ? "Retake Quiz" : "Take Quiz"}
              </button>
            </div>

            {archetype ? (
              <div className="p-5 rounded-2xl bg-ink/70 border border-border space-y-3">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner"
                    style={{ backgroundColor: `${archetype.badgeColor}22` }}
                  >
                    {archetype.emoji}
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${archetype.badgeColor}22`,
                        color: archetype.badgeColor,
                      }}
                    >
                      {archetype.tagline}
                    </span>
                    <h4 className="font-display text-xl font-bold text-text mt-1">
                      {archetype.title}
                    </h4>
                  </div>
                </div>

                <p className="text-muted text-xs sm:text-sm leading-relaxed">
                  {archetype.summary}
                </p>

                <div className="pt-2 border-t border-border/50 text-xs">
                  <span className="text-muted font-mono uppercase tracking-wider text-[10px] block mb-1">
                    Recommended Strategy
                  </span>
                  <p className="text-text font-medium">{archetype.recommendation}</p>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan/15 via-surface2 to-surface border border-cyan/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan mx-auto">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-text">
                    Discover Your Investor Archetype
                  </h4>
                  <p className="text-muted text-xs mt-1 max-w-sm mx-auto">
                    Take the 60-second quiz to uncover your psychological risk appetite and tailored wealth strategies.
                  </p>
                </div>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-5 py-2.5 rounded-xl bg-cyan text-ink font-bold text-xs hover:brightness-110 shadow-md transition-all"
                >
                  Start 60-Second Quiz
                </button>
              </div>
            )}
          </div>

          {/* Key Milestone Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-3xl bg-surface border border-border p-5 text-center">
              <p className="font-mono text-2xl sm:text-3xl text-lime font-bold">{doneCount}</p>
              <p className="text-xs text-muted mt-1 uppercase font-mono tracking-wider">Stops Complete</p>
            </div>
            <div className="rounded-3xl bg-surface border border-border p-5 text-center">
              <p className="font-mono text-2xl sm:text-3xl text-gold font-bold">{earnedBadgesCount}</p>
              <p className="text-xs text-muted mt-1 uppercase font-mono tracking-wider">Badges Won</p>
            </div>
            <div className="rounded-3xl bg-surface border border-border p-5 text-center">
              <p className="font-mono text-2xl sm:text-3xl text-cyan font-bold">{xp}</p>
              <p className="text-xs text-muted mt-1 uppercase font-mono tracking-wider">Total XP Earned</p>
            </div>
          </div>
        </div>

        {/* Right Column: Achievement Badges Showcase (~50%) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <h3 className="font-display font-bold text-lg text-text">Achievement Badges</h3>
              <p className="text-xs text-muted">Click any badge to inspect verification criteria</p>
            </div>
            <span className="text-xs text-muted font-mono">{earnedBadgesCount} / {badges.length} Unlocked</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((b) => {
              const Icon = b.icon || Award;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBadge(b)}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex items-start gap-3.5 group hover:shadow-lg ${
                    b.earned
                      ? "bg-surface border-lime/40 hover:border-lime shadow-sm"
                      : "bg-surface/50 border-border/80 opacity-60 hover:opacity-80"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                      b.earned
                        ? "bg-lime/15 border-lime/40 text-lime shadow-sm"
                        : "bg-ink border-border text-muted/50"
                    }`}
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="font-display font-bold text-text text-sm group-hover:text-lime transition-colors">
                        {b.label}
                      </h4>
                      {b.earned && (
                        <span className="text-lime text-[11px] font-mono">✓</span>
                      )}
                    </div>
                    <p className="text-muted text-xs leading-snug line-clamp-2">
                      {b.description}
                    </p>
                    <span
                      className={`inline-block mt-2 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        b.earned
                          ? "bg-lime/10 text-lime"
                          : "bg-ink border border-border text-muted"
                      }`}
                    >
                      {b.earned ? "Unlocked" : "Locked Milestone"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* OPay Security Assurance Card */}
          <div className="rounded-3xl bg-surface border border-border p-5 flex items-center gap-4 mt-6">
            <div className="w-12 h-12 rounded-2xl bg-lime/15 border border-lime/30 flex items-center justify-center text-lime shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-display font-bold text-text text-sm">
                Bank-Grade Protection & Privacy
              </p>
              <p className="text-muted text-xs leading-relaxed">
                All financial data is tokenized and stored in compliance with Nigeria Data Protection Regulation (NDPR).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-[340px] rounded-3xl bg-surface border border-border p-6 text-text text-center space-y-4 shadow-2xl">
            <div
              className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto border ${
                selectedBadge.earned
                  ? "bg-lime/15 border-lime/40 text-lime shadow-lg"
                  : "bg-surface2 border-border text-muted"
              }`}
            >
              <Award size={32} />
            </div>
            <div>
              <span className="text-[10.5px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-ink border border-border text-muted">
                {selectedBadge.earned ? "Achievement Unlocked ✓" : "Milestone Locked"}
              </span>
              <h4 className="font-display font-bold text-xl text-text mt-2">{selectedBadge.label}</h4>
              <p className="text-[12.5px] text-muted mt-1 leading-relaxed">
                {selectedBadge.description || "Earned by actively engaging with your financial health."}
              </p>
            </div>
            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 rounded-xl bg-lime text-ink font-bold text-sm hover:brightness-110 transition-all"
            >
              Close
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
