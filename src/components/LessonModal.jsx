import { useState } from "react";
import { X, CheckCircle2, AlertCircle, Sparkles, Trophy, ArrowRight, ShieldCheck } from "lucide-react";

export default function LessonModal({ node, onClose, onCompleteNode }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(node.status === "done");

  const quiz = node.quiz;
  const isCorrect = selectedOption && quiz?.options.find((o) => o.id === selectedOption)?.isCorrect;

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
    if (isCorrect) {
      setIsCompleted(true);
    }
  };

  const handleFinish = () => {
    onCompleteNode(node.id, node.xp || 50);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-[360px] max-h-[90vh] overflow-y-auto rounded-[32px] bg-surface border border-border p-5 text-text shadow-2xl flex flex-col no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-lime/15 border border-lime/30 flex items-center justify-center text-lime">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-muted">
                {node.type === "invest" ? "Unlock Milestone" : "Financial Literacy"}
              </p>
              <h3 className="font-display text-[15px] font-semibold text-text leading-tight">
                {node.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface2 flex items-center justify-center text-muted hover:text-text"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content body */}
        <div className="py-4 space-y-4">
          {/* XP Banner */}
          <div className="flex items-center justify-between rounded-xl bg-ink/70 border border-border px-3.5 py-2">
            <span className="text-[12px] text-muted flex items-center gap-1.5">
              <Trophy size={14} className="text-gold" /> Reward upon completion
            </span>
            <span className="font-mono text-[12px] font-bold text-lime">+{node.xp || 50} XP</span>
          </div>

          {/* If already completed review */}
          {node.status === "done" && !quiz && (
            <div className="rounded-2xl bg-ink/50 border border-lime/30 p-4 text-center">
              <CheckCircle2 size={32} className="text-lime mx-auto mb-2" />
              <p className="font-display font-semibold text-text text-[15px] mb-1">
                Lesson Completed!
              </p>
              <p className="text-[12.5px] text-muted leading-relaxed">{node.summary}</p>
            </div>
          )}

          {/* Active Quiz content */}
          {quiz && (
            <div className="space-y-3.5">
              {/* Scenario SMS Card */}
              <div className="rounded-2xl bg-[#170E2E] border border-gold/30 p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-gold text-[11px] font-mono font-medium">
                  <ShieldCheck size={13} /> {quiz.subtitle || "Real-world Scenario"}
                </div>
                <div className="rounded-xl bg-ink/90 p-3 border border-border/80">
                  <p className="text-[12.5px] text-text/90 italic leading-snug font-mono">
                    "{quiz.scenario}"
                  </p>
                </div>
              </div>

              {/* Question */}
              <p className="text-[13px] font-medium text-text">{quiz.question}</p>

              {/* Options */}
              <div className="space-y-2">
                {quiz.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  let borderStyle = "border-border bg-ink/60";
                  if (isSelected) {
                    borderStyle = "border-cyan bg-cyan/10";
                  }
                  if (submitted) {
                    if (opt.isCorrect) {
                      borderStyle = "border-lime bg-lime/15 text-lime";
                    } else if (isSelected && !opt.isCorrect) {
                      borderStyle = "border-pink bg-pink/15 text-pink";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !submitted && setSelectedOption(opt.id)}
                      disabled={submitted && isCorrect}
                      className={`w-full text-left p-3 rounded-xl border text-[12.5px] transition-all flex items-start gap-2.5 ${borderStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-surface2 text-muted text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {opt.id.toUpperCase()}
                      </span>
                      <span className="flex-1 leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation message after submission */}
              {submitted && (
                <div
                  className={`rounded-2xl p-3 border text-[12px] leading-snug flex items-start gap-2 ${
                    isCorrect
                      ? "bg-lime/10 border-lime/30 text-lime"
                      : "bg-pink/10 border-pink/30 text-pink"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold mb-0.5">
                      {isCorrect ? "Correct! You nailed it." : "Not quite! Watch out for phishing."}
                    </p>
                    <p className="text-text/80">
                      {quiz.options.find((o) => o.id === selectedOption)?.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Non-quiz summary */}
          {!quiz && node.status !== "done" && (
            <div className="rounded-2xl bg-ink/50 border border-border p-4 space-y-2">
              <p className="text-[12.5px] text-muted leading-relaxed">{node.summary}</p>
              <div className="flex items-center gap-2 text-lime text-[11.5px] font-medium pt-1">
                <CheckCircle2 size={14} /> Ready to complete this milestone
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-border/80">
          {quiz && !submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`w-full py-2.5 rounded-xl font-medium text-[13.5px] transition-all ${
                selectedOption
                  ? "bg-lime text-ink font-bold hover:brightness-110"
                  : "bg-surface2 text-muted cursor-not-allowed"
              }`}
            >
              Verify Answer
            </button>
          ) : isCorrect || (!quiz && node.status !== "done") ? (
            <button
              onClick={handleFinish}
              className="w-full py-2.5 rounded-xl bg-lime text-ink font-bold text-[13.5px] hover:brightness-110 flex items-center justify-center gap-1.5 transition-all"
            >
              Complete & Claim +{node.xp || 50} XP <ArrowRight size={15} />
            </button>
          ) : submitted && !isCorrect ? (
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedOption(null);
              }}
              className="w-full py-2.5 rounded-xl bg-surface2 text-text font-medium text-[13.5px] hover:bg-surface transition-all"
            >
              Try Again
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-surface2 text-text font-medium text-[13.5px] hover:bg-surface"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
