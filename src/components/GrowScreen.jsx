import { ChevronRight } from "lucide-react";
import { PRODUCTS, money } from "../data/mockData.js";

export default function GrowScreen({ selected, setSelected }) {
  return (
    <div className="px-5 pt-5 pb-32">
      <h1 className="font-display text-2xl text-text font-semibold mb-1">Grow</h1>
      <p className="text-[13px] text-muted mb-5">
        Matched to your risk profile · ₦12,400 available to invest
      </p>

      <div className="space-y-3">
        {PRODUCTS.map((p) => {
          const open = selected === p.id;
          return (
            <div
              key={p.id}
              className="rounded-2xl bg-surface border-2 overflow-hidden transition-all"
              style={{ borderColor: open ? p.riskColor : "#4A3A7A" }}
            >
              <button
                onClick={() => setSelected(open ? null : p.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display text-[15px] text-text font-semibold">{p.name}</p>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${p.riskColor}22`, color: p.riskColor }}
                    >
                      {p.risk}
                    </span>
                  </div>
                  <p className="text-[12px] text-muted leading-snug">{p.blurb}</p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <p className="font-mono text-[14px] font-bold" style={{ color: p.riskColor }}>
                    {p.rate}
                  </p>
                  <ChevronRight
                    size={16}
                    className={`text-muted transition-transform mt-1 ${
                      open ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </button>
              {open && (
                <div className="px-4 pb-4 border-t border-border pt-3">
                  <p className="text-[11px] text-muted mb-2">Min. investment {money(p.min)}</p>
                  <div className="flex gap-2 mb-3">
                    {[p.min, p.min * 3, p.min * 6].map((amt) => (
                      <button
                        key={amt}
                        className="flex-1 rounded-xl bg-ink border border-border py-2 text-[12.5px] font-mono text-text hover:border-lime transition-colors"
                      >
                        {money(amt)}
                      </button>
                    ))}
                  </div>
                  <button
                    className="w-full rounded-xl text-ink font-bold text-[13.5px] py-2.5 hover:brightness-110 transition-all"
                    style={{ backgroundColor: p.riskColor }}
                  >
                    Invest now
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
