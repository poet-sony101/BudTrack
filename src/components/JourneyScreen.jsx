import { Lock, Check } from "lucide-react";
import { JOURNEY_NODES, NODE_COLOR } from "../data/mockData.js";

const TYPE_LABEL = {
  checkin: "Money check-in",
  lesson: "Lesson",
  invest: "Investment unlock",
  streak: "Streak reward",
};

const OFFSET = 68; // px each node shifts left/right of the center line

export default function JourneyScreen({ onSelectNode }) {
  const doneCount = JOURNEY_NODES.filter((n) => n.status === "done").length;
  const progressPct = (doneCount / JOURNEY_NODES.length) * 100;

  return (
    <div className="px-5 pt-5 pb-32">
      <h1 className="font-display text-2xl text-text font-semibold mb-1">Keep going, Tobi!</h1>
      <p className="text-[13px] text-muted mb-5">
        Budgeting, lessons, and investing — one path.
      </p>

      <div className="rounded-2xl bg-surface border border-border px-4 py-3.5 flex items-center justify-between mb-8">
        <p className="text-[12.5px] text-muted">
          <span className="text-lime font-mono font-bold">{doneCount}</span> of{" "}
          {JOURNEY_NODES.length} stops complete
        </p>
        <div className="flex-1 max-w-[110px] h-2 rounded-full bg-border ml-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-lime transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="relative">
        {/* connecting line, centered */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-7 bottom-7 w-1 rounded-full"
          style={{
            background: `linear-gradient(to bottom, #B4FF39 0%, #B4FF39 ${progressPct}%, #35245F ${progressPct}%, #35245F 100%)`,
          }}
        />

        <div className="relative flex flex-col gap-9">
          {JOURNEY_NODES.map((node, i) => {
            const Icon = node.icon;
            const offset = i % 2 === 0 ? -OFFSET : OFFSET;
            const color = NODE_COLOR[node.status];
            const isActive = node.status === "active";
            const isLocked = node.status === "locked";

            return (
              <div key={node.id} className="flex justify-center">
                <button
                  onClick={() => !isLocked && onSelectNode?.(node)}
                  disabled={isLocked}
                  className="flex flex-col items-center gap-2"
                  style={{ transform: `translateX(${offset}px)` }}
                >
                  <div
                    className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 ${
                      isActive ? "animate-float-bob" : ""
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
                      <Check size={20} className="relative" style={{ color }} />
                    ) : isLocked ? (
                      <Lock size={16} className="relative text-muted" />
                    ) : (
                      <Icon size={20} className="relative" style={{ color }} />
                    )}
                  </div>
                  <div className="flex flex-col items-center max-w-[128px]">
                    <p
                      className={`text-[10px] uppercase tracking-wide font-medium text-center ${
                        isLocked ? "text-muted/60" : "text-muted"
                      }`}
                    >
                      {TYPE_LABEL[node.type]}
                    </p>
                    <p
                      className={`text-[12.5px] leading-tight text-center font-medium ${
                        isLocked ? "text-muted" : "text-text"
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
    </div>
  );
}
