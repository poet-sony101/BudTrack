import { useState } from "react";
import { ChevronRight, Gem, ShieldCheck, TrendingUp, Info, CheckCircle2, Lock, ArrowRight, Sparkles } from "lucide-react";
import { PRODUCTS, money } from "../data/mockData.js";
import InvestModal from "./InvestModal.jsx";

export default function GrowScreen({ selected, setSelected, walletBalance, totalInvested = 0, onInvest }) {
  const [selectedAmounts, setSelectedAmounts] = useState({});
  const [selectedTenures, setSelectedTenures] = useState({});
  const [modalData, setModalData] = useState(null);

  const getAmount = (p) => selectedAmounts[p.id] || p.min * 5;
  const getTenure = (p) =>
    selectedTenures[p.id] ||
    p.tenures?.[0] || { days: 91, label: "91 Days", rate: p.rate, yield: p.annualYield };

  const handleSetAmount = (productId, amt) => {
    setSelectedAmounts((prev) => ({ ...prev, [productId]: amt }));
  };

  const handleSetTenure = (productId, tenure) => {
    setSelectedTenures((prev) => ({ ...prev, [productId]: tenure }));
  };

  const calculateReturn = (amt, tenure) => {
    const annualRate = tenure.yield || 0.15;
    const fractionOfYear = (tenure.days || 365) / 365;
    return Math.round(amt * annualRate * fractionOfYear);
  };

  const handleOpenInvest = (p) => {
    const amt = getAmount(p);
    const tenure = getTenure(p);
    const expectedReturn = calculateReturn(amt, tenure);

    setModalData({
      product: p,
      amount: amt,
      tenure,
      expectedReturn,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-r from-surface via-surface2 to-surface border border-border p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold font-mono text-xs font-bold uppercase tracking-wider">
              Micro-Wealth Marketplace
            </span>
            <span className="text-muted text-xs hidden sm:inline-block">Regulated by CBN & SEC</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-text font-bold tracking-tight">
            Grow & Compound Wealth
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
            Put idle Naira to work. Lock into sovereign Federal Government Treasury Bills or professionally managed mutual funds starting from just ₦1,000.
          </p>
        </div>

        {/* Portfolio Stats Card */}
        <div className="w-full md:w-auto shrink-0 bg-ink/80 border border-border rounded-2xl p-5 min-w-[280px] grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase font-mono tracking-wider text-muted">Total Invested</p>
            <p className="font-mono text-xl sm:text-2xl font-bold text-gold mt-1">{money(totalInvested)}</p>
            <p className="text-[11px] text-lime mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> Compounding
            </p>
          </div>
          <div className="border-l border-border pl-4">
            <p className="text-xs uppercase font-mono tracking-wider text-muted">Available Cash</p>
            <p className="font-mono text-xl sm:text-2xl font-bold text-text mt-1">{money(walletBalance)}</p>
            <p className="text-[11px] text-muted mt-1">In OPay Wallet</p>
          </div>
        </div>
      </div>

      {/* 3-Column Responsive Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => {
          const currentAmount = getAmount(p);
          const currentTenure = getTenure(p);
          const expectedGain = calculateReturn(currentAmount, currentTenure);
          const isSelected = selected === p.id;

          return (
            <div
              key={p.id}
              className={`rounded-3xl bg-surface border-2 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                isSelected ? "border-gold shadow-gold/10 ring-1 ring-gold/40" : "border-border hover:border-lime/50"
              }`}
            >
              <div>
                {/* Product Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-[10.5px] font-mono font-semibold uppercase tracking-wider mb-2"
                      style={{ backgroundColor: `${p.riskColor}22`, color: p.riskColor }}
                    >
                      {p.risk}
                    </span>
                    <h3 className="font-display text-xl font-bold text-text leading-tight">{p.name}</h3>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-mono text-xl font-bold" style={{ color: p.riskColor }}>
                      {currentTenure.rate || p.rate}
                    </p>
                    <span className="text-[10.5px] text-muted font-mono">{currentTenure.label || "Annual"}</span>
                  </div>
                </div>

                <p className="text-muted text-xs leading-relaxed mb-4">{p.blurb}</p>

                {/* Tenure Selector */}
                {p.tenures && (
                  <div className="mb-4">
                    <p className="text-[11px] uppercase font-mono tracking-wider text-muted mb-2">
                      Lockup Period
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {p.tenures.map((t) => {
                        const isTenureActive = currentTenure.days === t.days;
                        return (
                          <button
                            key={t.days}
                            onClick={() => handleSetTenure(p.id, t)}
                            className={`py-2 px-1 rounded-xl text-center border transition-all text-xs ${
                              isTenureActive
                                ? "bg-surface2 border-lime text-lime font-bold shadow-sm"
                                : "bg-ink border-border text-muted hover:text-text hover:bg-surface2"
                            }`}
                          >
                            <p className="font-medium text-[11.5px]">{t.label}</p>
                            <p className="text-[9.5px] font-mono opacity-80">{t.rate}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quick Amount Selector */}
                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-[11px] uppercase font-mono tracking-wider text-muted">
                      Select Amount
                    </span>
                    <span className="text-muted font-mono text-[11px]">Min. {money(p.min)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[p.min, p.min * 3, p.min * 5, p.min * 10].map((amt) => {
                      const isAmtActive = currentAmount === amt;
                      return (
                        <button
                          key={amt}
                          onClick={() => handleSetAmount(p.id, amt)}
                          className={`py-2 rounded-xl text-xs font-mono transition-all border ${
                            isAmtActive
                              ? "bg-lime text-ink font-bold border-lime shadow-sm"
                              : "bg-ink border-border text-text hover:border-lime/40"
                          }`}
                        >
                          {money(amt)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Profit Projection Card */}
                <div className="rounded-2xl bg-ink/70 border border-border p-3.5 space-y-1.5 mb-5 text-xs">
                  <div className="flex justify-between items-center text-muted">
                    <span>Projected Profit ({currentTenure.label})</span>
                    <span className="font-mono text-lime font-bold text-sm">+{money(expectedGain)}</span>
                  </div>
                  <div className="flex justify-between items-center text-text font-medium border-t border-border/50 pt-2 text-sm">
                    <span>Total Maturity Payout</span>
                    <span className="font-mono text-gold font-bold">{money(currentAmount + expectedGain)}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenInvest(p)}
                className="w-full py-3 rounded-2xl text-ink font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
                style={{ backgroundColor: p.riskColor }}
              >
                <span>Invest {money(currentAmount)} Now</span>
                <ArrowRight size={15} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust & Investor Protection Banner */}
      <div className="rounded-3xl bg-surface border border-border p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-lime/15 border border-lime/30 flex items-center justify-center text-lime shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="font-display font-bold text-text text-sm">Central Bank of Nigeria Backed</h4>
            <p className="text-muted text-xs leading-relaxed mt-0.5">
              Treasury Bills carry zero credit default risk, directly backed by the full faith of the Federal Government.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <h4 className="font-display font-bold text-text text-sm">SEC-Licensed Fund Managers</h4>
            <p className="text-muted text-xs leading-relaxed mt-0.5">
              Mutual funds and fractional shares are custodied by licensed Nigerian trustees and global custodians.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-cyan/15 border border-cyan/30 flex items-center justify-center text-cyan shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="font-display font-bold text-text text-sm">Instant OPay Settlement</h4>
            <p className="text-muted text-xs leading-relaxed mt-0.5">
              Upon maturity, your principal plus interest automatically sweeps right back into your OPay wallet.
            </p>
          </div>
        </div>
      </div>

      {/* Invest Modal */}
      {modalData && (
        <InvestModal
          product={modalData.product}
          amount={modalData.amount}
          tenure={modalData.tenure}
          expectedReturn={modalData.expectedReturn}
          walletBalance={walletBalance}
          onClose={() => setModalData(null)}
          onConfirm={(inv) => {
            onInvest(inv);
          }}
        />
      )}
    </div>
  );
}
