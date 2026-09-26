import { useState } from "react";
import { Lock, Check, Sparkles, Trophy, Flame, ArrowRight, ShieldCheck, BookOpen, Gem, Wallet, Play } from "lucide-react";
import { NODE_COLOR } from "../data/mockData.js";
import LessonModal from "./LessonModal.jsx";

const TYPE_LABEL = {
  checkin: "Money Check-in",
  lesson: "Financial Literacy",
  invest: "Investment Milestone",
  streak: "Streak Milestone",
};

export default function JourneyScreen({ nodes, xp, streak, onSelectNode, onCompleteNode, onNavigateGrow }) {
  const [activeModalNode, setActiveModalNode] = useState(null);
  const [lockedNotice, setLockedNotice] = useState(null);

  const doneCount = nodes.filter((n) => n.status === "done").length;
  const progressPct = Math.round((doneCount / nodes.length) * 100);
  const activeNode = nodes.find((n) => n.status === "active") || nodes[0];

  const handleNodeClick = (node) => {
    if (node.status === "locked") {
      setLockedNotice(`Complete earlier milestones to unlock "${node.title}"!`);
      setTimeout(() => setLockedNotice(null), 3000);
      return;
    }

    if (node.type === "invest") {
      onSelectNode?.(node);
      return;
    }

    // Open lesson/quiz modal
    setActiveModalNode(node);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Page Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-surface via-surface2 to-surface border border-border p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-lime/15 border border-lime/30 text-lime font-mono text-xs font-bold uppercase tracking-wider">
              Level 1 · The Foundation
            </span>
            <span className="text-muted text-xs hidden sm:inline-block">OPay Academy</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-text font-bold tracking-tight">
            Financial Mastery Journey
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
            Gamified money check-ins, Nigerian scam detection challenges, and sovereign wealth milestones — all on one unified progression.
          </p>
        </div>

        {/* Big Progress Gauge Card */}
        <div className="w-full md:w-auto shrink-0 bg-ink/70 border border-border rounded-2xl p-5 min-w-[260px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-muted">Journey Progress</span>
            <span className="font-mono text-lime font-bold text-sm">{progressPct}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-border overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-lime transition-all duration-700 shadow-sm shadow-lime/50"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted">
            <span>{doneCount} of {nodes.length} Completed</span>
            <span className="text-gold font-mono font-bold flex items-center gap-1">
              <Trophy size={13} /> {xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Temporary locked alert */}
      {lockedNotice && (
        <div className="rounded-2xl bg-pink/15 border border-pink/40 p-4 text-center text-pink text-sm animate-fade-in">
          {lockedNotice}
        </div>
      )}

      {/* 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Milestone Cards (~65%) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h2 className="font-display text-lg font-bold text-text">Milestone Path</h2>
            <span className="text-xs text-muted font-mono">Tap any milestone to interact</span>
          </div>

          <div className="space-y-4">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isDone = node.status === "done";
              const isActive = node.status === "active";
              const isLocked = node.status === "locked";
              const color = NODE_COLOR[node.status];

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`group relative rounded-3xl border-2 p-5 transition-all cursor-pointer ${
                    isActive
                      ? "bg-surface/90 border-gold shadow-lg shadow-gold/10 ring-1 ring-gold/40 scale-[1.01]"
                      : isDone
                      ? "bg-surface/60 border-border hover:border-lime/60 hover:bg-surface"
                      : "bg-surface/30 border-border/60 opacity-65 hover:opacity-85"
                  }`}
                >
                  <div className="flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Node Icon Avatar */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-transform group-hover:scale-105 ${
                          isActive ? "animate-float-bob" : ""
                        }`}
                        style={{
                          backgroundColor: isLocked ? "#271A47" : `${color}22`,
                          borderColor: color,
                        }}
                      >
                        {isDone ? (
                          <Check size={24} className="stroke-[3]" style={{ color }} />
                        ) : isLocked ? (
                          <Lock size={20} className="text-muted/60" />
                        ) : (
                          <Icon size={24} style={{ color }} />
                        )}
                      </div>

                      {/* Node Details */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-md bg-ink border border-border text-muted">
                            Stop #{index + 1} · {TYPE_LABEL[node.type]}
                          </span>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-md bg-gold/20 border border-gold/40 text-gold text-[10px] font-mono font-bold animate-pulse">
                              CURRENT CHALLENGE
                            </span>
                          )}
                          {isDone && (
                            <span className="px-2 py-0.5 rounded-md bg-lime/15 border border-lime/30 text-lime text-[10px] font-mono font-semibold">
                              COMPLETED ✓
                            </span>
                          )}
                        </div>

                        <h3 className="font-display text-base sm:text-lg font-bold text-text group-hover:text-lime transition-colors">
                          {node.title}
                        </h3>
                        <p className="text-muted text-xs sm:text-sm mt-0.5 line-clamp-2 max-w-xl">
                          {node.summary || "Master this essential finance milestone to build permanent wealth habits."}
                        </p>
                      </div>
                    </div>

                    {/* Right Action & XP */}
                    <div className="flex flex-col items-end shrink-0 gap-2">
                      <span className="font-mono text-xs font-bold text-lime bg-lime/10 px-2.5 py-1 rounded-full border border-lime/20">
                        +{node.xp || 50} XP
                      </span>

                      {isActive && (
                        <button className="px-3.5 py-1.5 rounded-xl bg-gold text-ink font-bold text-xs hover:brightness-110 shadow-md flex items-center gap-1.5 transition-all">
                          <Play size={13} fill="currentColor" /> Play Now
                        </button>
                      )}
                      {isDone && (
                        <span className="text-xs text-muted group-hover:text-text font-medium flex items-center gap-1">
                          Review <ArrowRight size={13} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Challenge Spotlight & Knowledge Cards (~35%) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Challenge Spotlight Card */}
          <div className="rounded-3xl bg-gradient-to-br from-surface to-ink border-2 border-gold/60 p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-gold text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} /> Spotlight Challenge
            </div>
            <h3 className="font-display text-xl font-bold text-text mb-2">
              {activeNode.title}
            </h3>
            <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
              Learn how to detect real-world Nigerian phishing SMS traps, safeguard your OPay credentials, and earn <strong className="text-lime font-mono">+{activeNode.xp || 50} XP</strong>.
            </p>
            <button
              onClick={() => handleNodeClick(activeNode)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold to-lime text-ink font-bold text-sm hover:brightness-110 shadow-lg shadow-gold/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Play size={15} fill="currentColor" /> Launch Challenge Now
            </button>
          </div>

          {/* OPay Youth Finance Principles Card */}
          <div className="rounded-3xl bg-surface border border-border p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-lime" />
              <h3 className="font-display font-bold text-base text-text">
                OPay Financial Principles
              </h3>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-2xl bg-ink/60 border border-border/80">
                <p className="font-bold text-text mb-0.5">1. The 50/30/20 Naija Rule</p>
                <p className="text-muted">
                  50% for basic living (food, data, transport), 30% for savings & T-Bills, 20% for guilt-free weekend flex.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-ink/60 border border-border/80">
                <p className="font-bold text-text mb-0.5">2. Guaranteed 18.2% Sovereign Yield</p>
                <p className="text-muted">
                  Never leave idle cash sitting around. Lock in with Federal Government Treasury Bills right from the Grow tab.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-ink/60 border border-border/80">
                <p className="font-bold text-text mb-0.5">3. Zero PIN Sharing Ever</p>
                <p className="text-muted">
                  OPay staff will never request your transaction PIN or OTP via phone call or SMS.
                </p>
              </div>
            </div>
          </div>

          {/* Streak & Consistency Card */}
          <div className="rounded-3xl bg-surface border border-border p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#3A2416] border border-pink/40 flex items-center justify-center text-pink shrink-0">
              <Flame size={24} className="animate-pulse" />
            </div>
            <div>
              <p className="font-display font-bold text-text text-sm">
                {streak}-Day Check-In Streak 🔥
              </p>
              <p className="text-muted text-xs leading-snug">
                You're building financial momentum! Check in daily to climb leaderboards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson / Quiz Modal */}
      {activeModalNode && (
        <LessonModal
          node={activeModalNode}
          onClose={() => setActiveModalNode(null)}
          onCompleteNode={onCompleteNode}
        />
      )}
    </div>
  );
}
