import { useState } from "react";
import { X, Target, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { RISK_QUIZ_QUESTIONS, ARCHETYPES } from "../data/mockData.js";

export default function RiskQuizModal({ onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState([]);
  const [result, setResult] = useState(null);

  const question = RISK_QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (points) => {
    const newScores = [...scores, points];
    setScores(newScores);

    if (currentStep + 1 < RISK_QUIZ_QUESTIONS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate archetype
      const total = newScores.reduce((a, b) => a + b, 0);
      let archetypeKey = "balanced";
      if (total <= 4) archetypeKey = "conservative";
      else if (total >= 7) archetypeKey = "growth";

      const outcome = ARCHETYPES[archetypeKey];
      setResult(outcome);
      onComplete?.(outcome);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-[360px] max-h-[92vh] overflow-y-auto rounded-[32px] bg-surface border border-border p-5 text-text shadow-2xl flex flex-col no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan/15 border border-cyan/30 flex items-center justify-center text-cyan">
              <Target size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-muted">
                OPay Financial DNA
              </p>
              <h3 className="font-display text-[15px] font-semibold text-text leading-tight">
                {result ? "Your Investor Archetype" : `Risk Assessment (${currentStep + 1}/3)`}
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

        {/* QUIZ IN PROGRESS */}
        {!result ? (
          <div className="py-4 space-y-4">
            {/* Progress indicators */}
            <div className="flex gap-2">
              {RISK_QUIZ_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    i <= currentStep ? "bg-cyan" : "bg-surface2"
                  }`}
                />
              ))}
            </div>

            <p className="font-display font-medium text-[14.5px] text-text leading-snug">
              {question.question}
            </p>

            <div className="space-y-2.5 pt-1">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.points)}
                  className="w-full text-left p-3.5 rounded-2xl bg-ink/60 border border-border hover:border-cyan/60 hover:bg-cyan/5 transition-all flex items-start gap-3 group active:scale-[0.98]"
                >
                  <span className="w-6 h-6 rounded-full bg-surface2 text-muted text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyan group-hover:text-ink transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-[13px] text-text leading-snug">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="py-4 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-surface2 border-2 flex items-center justify-center text-3xl mx-auto shadow-lg" style={{ borderColor: result.badgeColor }}>
              {result.emoji}
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider font-mono px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${result.badgeColor}22`, color: result.badgeColor }}>
                {result.tagline}
              </span>
              <h4 className="font-display font-bold text-xl text-text mt-1.5">{result.title}</h4>
              <p className="text-[12.5px] text-muted mt-2 leading-relaxed px-1">
                {result.summary}
              </p>
            </div>

            <div className="rounded-2xl bg-ink/70 border border-border p-3.5 text-left space-y-1.5">
              <div className="flex items-center gap-1.5 text-lime text-[11px] font-mono font-medium">
                <Sparkles size={13} /> Recommended Strategy
              </div>
              <p className="text-[12px] text-text/90 font-medium">
                {result.recommendation}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-lime text-ink font-bold text-[13.5px] hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
            >
              Apply to My Portfolio <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
