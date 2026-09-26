import { useState } from "react";
import { ChevronRight, Gem, ShieldCheck, TrendingUp, Info } from "lucide-react";
import { PRODUCTS, money } from "../data/mockData.js";
import InvestModal from "./InvestModal.jsx";

export default function GrowScreen({ selected, setSelected, walletBalance, totalInvested, onInvest }) {
  const [selectedAmounts, setSelectedAmounts] = useState({});
  const [selectedTenures, setSelectedTenures] = useState({});
  const [modalData, setModalData] = useState(null);

  const getAmount = (p) => selectedAmounts[p.id] || p.min * 5;
  const getTenure = (p) => selectedTenures[p.id] || p.tenures?.[0] || { days: 91, label: "91 Days", rate: p.rate, yield: p.annualYield };

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
    <div className="px-5 pt-5 pb-32">
      {/* Header */}
      <h1 className="font-display text-2xl text-text font-bold mb-1">Grow</h1>
      <p className="text-[12.5px] text-muted mb-4">
        Matched to your risk profile · Backed by licensed custodians
      </p>

      {/* Portfolio overview card */}
      <div className="rounded-3xl bg-surface border border-border p-4 mb-5 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[11px] text-muted font-mono uppercase tracking-wider">Total Invested</p>
          <p className="font-mono text-xl text-gold font-bold mt-0.5">{money(totalInvested)}</p>
          <p className="text-[10.5px] text-lime mt-0.5 flex items-center gap-1">
            <TrendingUp size={12} /> Compounding daily
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-muted font-mono uppercase tracking-wider">Available Cash</p>
          <p className="font-mono text-xl text-text font-bold mt-0.5">{money(walletBalance)}</p>
          <p className="text-[10.5px] text-muted mt-0.5">In OPay Wallet</p>
        </div>
      </div>

      {/* Products list */}
      <div className="space-y-3.5">
        {PRODUCTS.map((p) => {
          const open = selected === p.id;
          const currentAmount = getAmount(p);
          const currentTenure = getTenure(p);
          const expectedGain = calculateReturn(currentAmount, currentTenure);

          return (
            <div
              key={p.id}
              className="rounded-3xl bg-surface border-2 overflow-hidden transition-all duration-200"
              style={{ borderColor: open ? p.riskColor : "#4A3A7A" }}
            >
              {/* Product Header row */}
              <button
                onClick={() => setSelected(open ? null : p.id)}
                className="w-full flex items-center justify-between p-4 text-left transition-colors"
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display text-[15px] text-text font-bold">{p.name}</p>
                    <span
                      className="text-[9.5px] px-2 py-0.5 rounded-full font-mono font-medium"
                      style={{ backgroundColor: `${p.riskColor}22`, color: p.riskColor }}
                    >
                      {p.risk}
                    </span>
                  </div>
                  <p className="text-[12px] text-muted leading-snug">{p.blurb}</p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <p className="font-mono text-[14.5px] font-bold" style={{ color: p.riskColor }}>
                    {p.rate}
                  </p>
                  <ChevronRight
                    size={16}
                    className={`text-muted transition-transform mt-1 ${
                      open ? "rotate-90 text-text" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Accordion expanded content */}
              {open && (
                <div className="px-4 pb-4 border-t border-border pt-3.5 space-y-3.5 bg-ink/30">
                  {/* Tenure picker */}
                  {p.tenures && (
                    <div>
                      <p className="text-[11px] text-muted mb-1.5 font-mono uppercase tracking-wider">
                        Select Tenure
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {p.tenures.map((t) => {
                          const isTenureSelected = currentTenure.days === t.days;
                          return (
                            <button
                              key={t.days}
                              onClick={() => handleSetTenure(p.id, t)}
                              className={`py-2 px-1 rounded-xl text-center border transition-all ${
                                isTenureSelected
                                  ? "bg-surface border-lime text-lime shadow-sm"
                                  : "bg-ink border-border text-muted hover:text-text"
                              }`}
                            >
                              <p className="text-[11.5px] font-bold leading-tight">{t.label}</p>
                              <p className="text-[10px] font-mono opacity-80">{t.rate}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Amount picker */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-[11px] text-muted font-mono uppercase tracking-wider">
                        Amount to Invest
                      </p>
                      <span className="text-[10.5px] text-muted">Min. {money(p.min)}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[p.min, p.min * 3, p.min * 5, p.min * 10].map((amt) => {
                        const isAmtSelected = currentAmount === amt;
                        return (
                          <button
                            key={amt}
                            onClick={() => handleSetAmount(p.id, amt)}
                            className={`py-2 rounded-xl text-[12px] font-mono transition-all border ${
                              isAmtSelected
                                ? "bg-lime text-ink font-bold border-lime"
                                : "bg-ink border-border text-text hover:border-lime/50"
                            }`}
                          >
                            {money(amt)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Return projection calculator */}
                  <div className="rounded-2xl bg-ink/70 border border-border p-3 space-y-1.5">
                    <div className="flex justify-between items-center text-[12px] text-muted">
                      <span>Projected Yield ({currentTenure.label || "Maturity"})</span>
                      <span className="font-mono text-lime font-bold">+{money(expectedGain)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[12.5px] text-text font-medium border-t border-border/40 pt-1.5">
                      <span>Total Payout at Maturity</span>
                      <span className="font-mono text-gold font-bold">
                        {money(currentAmount + expectedGain)}
                      </span>
                    </div>
                  </div>

                  {/* Invest Button */}
                  <button
                    onClick={() => handleOpenInvest(p)}
                    className="w-full rounded-2xl text-ink font-bold text-[13.5px] py-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-md"
                    style={{ backgroundColor: p.riskColor }}
                  >
                    Invest {money(currentAmount)} Now
                  </button>
                </div>
              )}
            </div>
          );
        })}
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
