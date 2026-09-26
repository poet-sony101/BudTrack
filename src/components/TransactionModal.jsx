import { X, CheckCircle2, Share2, Sparkles, ReceiptText } from "lucide-react";
import { money, CATEGORY_COLORS } from "../data/mockData.js";

export default function TransactionModal({ transaction, onClose, onAskAI }) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-[340px] rounded-[32px] bg-surface border border-border p-5 text-text shadow-2xl flex flex-col no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface2 flex items-center justify-center text-text">
              <ReceiptText size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-muted">
                OPay Official Receipt
              </p>
              <h3 className="font-display text-[15px] font-semibold text-text leading-tight">
                Transaction Details
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

        {/* Receipt Body */}
        <div className="py-4 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-lime/15 border border-lime/30 flex items-center justify-center text-lime mx-auto">
            <CheckCircle2 size={24} />
          </div>

          <div>
            <p className="text-[11.5px] text-muted">Amount Paid</p>
            <p className="font-mono text-2xl font-bold text-text mt-0.5">
              −{money(transaction.amount)}
            </p>
            <p className="text-[14px] font-display font-medium text-text mt-1">
              {transaction.merchant}
            </p>
          </div>

          <div className="rounded-2xl bg-ink/60 border border-border/80 p-3.5 space-y-2 text-[12px] text-left font-mono">
            <div className="flex justify-between items-center text-muted">
              <span>Category</span>
              <span
                className="font-sans px-2 py-0.5 rounded-full text-[10.5px] font-semibold"
                style={{
                  backgroundColor: `${CATEGORY_COLORS[transaction.category] || "#B4FF39"}20`,
                  color: CATEGORY_COLORS[transaction.category] || "#B4FF39",
                }}
              >
                {transaction.category}
              </span>
            </div>
            <div className="flex justify-between items-center text-muted">
              <span>Status</span>
              <span className="text-lime font-bold">Successful</span>
            </div>
            <div className="flex justify-between items-center text-muted">
              <span>Time</span>
              <span className="text-text">{transaction.time}</span>
            </div>
            <div className="flex justify-between items-center text-muted">
              <span>Reference</span>
              <span className="text-text text-[11px]">{transaction.ref || "OPY-88421941"}</span>
            </div>
            <div className="flex justify-between items-center text-muted">
              <span>Payment Type</span>
              <span className="text-text font-sans">OPay Wallet Balance</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-2 border-t border-border/80 space-y-2">
          <button
            onClick={() => {
              onClose();
              onAskAI?.(`Tell me about my ${money(transaction.amount)} spend at ${transaction.merchant} and how it impacts my weekly budget.`);
            }}
            className="w-full py-2.5 rounded-xl bg-cyan/15 border border-cyan/40 text-cyan font-medium text-[13px] hover:bg-cyan/25 flex items-center justify-center gap-1.5 transition-all"
          >
            <Sparkles size={14} /> Ask AI Financial Analysis
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-surface2 text-muted hover:text-text font-medium text-[12.5px] transition-all"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
