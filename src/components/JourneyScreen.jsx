import { useState } from "react";
import { Lock, Check, Sparkles, Trophy } from "lucide-react";
import { NODE_COLOR } from "../data/mockData.js";
import LessonModal from "./LessonModal.jsx";

const TYPE_LABEL = {
  checkin: "Money check-in",
  lesson: "Lesson",
  invest: "Investment unlock",
  streak: "Streak reward",
};

const OFFSET = 64; // px each node shifts left/right of center

export default function JourneyScreen({ nodes, xp, onSelectNode, onCompleteNode }) {
  const [activeModalNode, setActiveModalNode] = useState(null);
  const [lockedNotice, setLockedNotice] = useState(null);

  const doneCount = nodes.filter((n) => n.status === "done").length;
  const progressPct = Math.round((doneCount / nodes.length) * 100);

  const handleNodeClick = (node) => {
    if (node.status === "locked") {
      setLockedNotice(`Complete earlier stops to unlock "${node.title}"!`);
      setTimeout(() => setLockedNotice(null), 2500);
      return;
    }

    if (node.type === "invest") {
      onSelectNode?.(node);
      return;
    }

    // Open lesson modal for checkin, lesson, streak
    setActiveModalNode(node);
  };

  return (
    <div className="px-5 pt-5 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="font-display text-2xl text-text font-bold">Keep going, Tobi!</h1>
          <p className="text-[12.5px] text-muted">Budgeting, lessons & micro-investing</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime/15 border border-lime/30 text-lime font-mono text-[12px] font-bold">
          <Trophy size={13} /> {xp} XP
        </div>
      </div>

      {/* Progress Card */}
      <div className="rounded-2xl bg-surface border border-border px-4 py-3.5 flex items-center justify-between mt-4 mb-7 shadow-sm">
        <p className="text-[12.5px] text-muted">
          <span className="text-lime font-mono font-bold">{doneCount}</span> of{" "}
          {nodes.length} milestones complete
        </p>
        <div className="flex-1 max-w-[100px] h-2 rounded-full bg-border ml-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-lime transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Temporary locked alert */}
      {lockedNotice && (
        <div className="mb-4 rounded-xl bg-pink/15 border border-pink/30 p-2.5 text-center text-pink text-[12px] animate-fade-in">
          {lockedNotice}
        </div>
      )}

      {/* Progression Path */}
      <div className="relative">
        {/* Center Connecting line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-7 bottom-7 w-1.5 rounded-full"
          style={{
            background: `linear-gradient(to bottom, #B4FF39 0%, #B4FF39 ${progressPct}%, #35245F ${progressPct}%, #35245F 100%)`,
          }}
        />

        <div className="relative flex flex-col gap-9">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            const offset = i % 2 === 0 ? -OFFSET : OFFSET;
            const color = NODE_COLOR[node.status];
            const isActive = node.status === "active";
            const isLocked = node.status === "locked";

            return (
              <div key={node.id} className="flex justify-center">
                <button
                  onClick={() => handleNodeClick(node)}
                  className="flex flex-col items-center gap-2 group transition-transform active:scale-95"
                  style={{ transform: `translateX(${offset}px)` }}
                >
                  <div
                    className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all ${
                      isActive ? "animate-float-bob shadow-lg ring-2 ring-gold/40" : ""
                    }`}
                    style={{
                      backgroundColor: isLocked ? "#271A47" : `${color}22`,
                      borderColor: color,
                    }}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-2xl animate-pulse-glow"
                        style={{ backgroundColor: color }}
                      />
                    )}
                    {node.status === "done" ? (
                      <Check size={20} className="relative stroke-[2.5]" style={{ color }} />
                    ) : isLocked ? (
                      <Lock size={16} className="relative text-muted/60" />
                    ) : (
                      <Icon size={20} className="relative" style={{ color }} />
                    )}
                  </div>

                  <div className="flex flex-col items-center max-w-[130px]">
                    <span
                      className={`text-[9.5px] uppercase tracking-wider font-mono font-medium text-center ${
                        isLocked ? "text-muted/50" : "text-muted"
                      }`}
                    >
                      {TYPE_LABEL[node.type]}
                    </span>
                    <p
                      className={`text-[12px] leading-tight text-center font-medium mt-0.5 ${
                        isLocked ? "text-muted/70" : "text-text"
                      }`}
                    >
                      {node.title}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
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
