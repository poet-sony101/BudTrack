import { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Gem, ArrowRight, Loader2, Award } from "lucide-react";
import { money } from "../data/mockData.js";

export default function InvestModal({ product, amount, tenure, expectedReturn, walletBalance, onClose, onConfirm }) {
  const [step, setStep] = useState("review"); // review -> pin -> processing -> success
  const [pin, setPin] = useState("");

  const handleKeyClick = (num) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin.length === 4) {
        // Automatically proceed to processing after brief delay
        setTimeout(() => {
          setStep("processing");
          setTimeout(() => {
            onConfirm({
              productId: product.id,
              productName: product.name,
              amount,
              tenure,
              expectedReturn,
            });
            setStep("success");
          }, 1200);
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-[360px] max-h-[92vh] overflow-y-auto rounded-[32px] bg-surface border border-border p-5 text-text shadow-2xl flex flex-col no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
              <Gem size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-muted">
                OPay Micro-Invest
              </p>
              <h3 className="font-display text-[15px] font-semibold text-text leading-tight">
                {product.name}
              </h3>
            </div>
          </div>
          {step !== "processing" && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-surface2 flex items-center justify-center text-muted hover:text-text"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* STEP 1: REVIEW */}
        {step === "review" && (
          <div className="py-4 space-y-4">
            <div className="rounded-2xl bg-ink/70 border border-border p-4 text-center">
              <p className="text-[11.5px] text-muted">Investment Principal</p>
              <p className="font-mono text-3xl font-bold text-text mt-1">{money(amount)}</p>
              <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-lime/10 border border-lime/30 text-lime text-[11px] font-mono">
                <span>{tenure.rate || product.rate}</span> · <span>{tenure.label || "Annual"}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-ink/40 border border-border/70 p-3.5 space-y-2.5 text-[12.5px]">
              <div className="flex justify-between items-center text-muted">
                <span>Lockup Period</span>
                <span className="font-medium text-text">{tenure.label || "91 Days"}</span>
              </div>
              <div className="flex justify-between items-center text-muted">
                <span>Projected Profit</span>
                <span className="font-mono font-semibold text-lime">+{money(expectedReturn)}</span>
              </div>
              <div className="flex justify-between items-center text-muted border-t border-border/50 pt-2">
                <span>Total Maturity Payout</span>
                <span className="font-mono font-bold text-text">{money(amount + expectedReturn)}</span>
              </div>
              <div className="flex justify-between items-center text-muted border-t border-border/50 pt-2">
                <span>Funding Source</span>
                <span className="text-text font-medium">OPay Wallet ({money(walletBalance)})</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-gold/10 border border-gold/20 p-2.5 text-[11.5px] text-gold">
              <ShieldCheck size={16} className="shrink-0" />
              <span>CBN-regulated · Capital protected & insured.</span>
            </div>

            <button
              onClick={() => setStep("pin")}
              className="w-full py-2.5 rounded-xl bg-lime text-ink font-bold text-[13.5px] hover:brightness-110 flex items-center justify-center gap-1.5 transition-all mt-2"
            >
              Continue to PIN <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* STEP 2: PIN ENTRY */}
        {step === "pin" && (
          <div className="py-4 space-y-4 text-center">
            <p className="font-display font-semibold text-text text-[15px]">Enter OPay PIN</p>
            <p className="text-[12px] text-muted">
              Enter your 4-digit security PIN to authorize {money(amount)}
            </p>

            {/* PIN Dots */}
            <div className="flex justify-center gap-3.5 py-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    pin.length > i ? "bg-lime border-lime scale-110" : "bg-ink border-border"
                  }`}
                />
              ))}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto pt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={() => handleKeyClick(n.toString())}
                  className="h-11 rounded-xl bg-ink border border-border text-[15px] font-mono font-medium hover:bg-surface2 active:scale-95 transition-all"
                >
                  {n}
                </button>
              ))}
              <div />
              <button
                onClick={() => handleKeyClick("0")}
                className="h-11 rounded-xl bg-ink border border-border text-[15px] font-mono font-medium hover:bg-surface2 active:scale-95 transition-all"
              >
                0
              </button>
              <button
                onClick={handleDelete}
                className="h-11 rounded-xl bg-ink border border-border text-[12px] text-muted font-medium hover:bg-surface2 active:scale-95 transition-all flex items-center justify-center"
              >
                DEL
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PROCESSING */}
        {step === "processing" && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <Loader2 size={38} className="text-lime animate-spin" />
            <p className="font-display font-semibold text-[16px] text-text">Securing Your Investment</p>
            <p className="text-[12px] text-muted max-w-[200px]">
              Locking yield with the Central Bank of Nigeria...
            </p>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === "success" && (
          <div className="py-4 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-lime/20 border border-lime/40 flex items-center justify-center text-lime mx-auto animate-bounce">
              <CheckCircle2 size={30} />
            </div>

            <div>
              <h4 className="font-display font-bold text-lg text-text">Investment Active! 🎉</h4>
              <p className="text-[12px] text-muted mt-0.5">
                Successfully locked {money(amount)} in {product.name}
              </p>
            </div>

            {/* Badge award banner */}
            <div className="rounded-2xl bg-gradient-to-r from-gold/20 via-surface2 to-lime/20 border border-gold/40 p-3.5 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold shrink-0">
                <Award size={20} />
              </div>
              <div>
                <p className="font-display font-semibold text-[13px] text-text">
                  New Badge Unlocked: "Investor"!
                </p>
                <p className="text-[11px] text-muted leading-tight">
                  You've taken your first verified leap toward financial freedom.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-ink/50 border border-border p-3 text-[12px] space-y-1.5 text-left font-mono">
              <div className="flex justify-between text-muted">
                <span>Reference:</span>
                <span className="text-text font-bold">OPY-INV-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Total Payout:</span>
                <span className="text-lime font-bold">{money(amount + expectedReturn)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-lime text-ink font-bold text-[13.5px] hover:brightness-110 transition-all"
            >
              Back to Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
