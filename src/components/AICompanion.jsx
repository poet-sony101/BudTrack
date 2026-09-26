import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { COMPANION_MESSAGES, COMPANION_CHIPS } from "../data/mockData.js";

export default function AICompanion() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="absolute bottom-24 right-4 z-20 w-14 h-14 rounded-full bg-ink border-2 border-cyan flex items-center justify-center"
        >
          <span className="absolute inset-0 rounded-full bg-cyan animate-pulse-glow" />
          <Sparkles size={22} className="relative text-cyan" />
        </button>
      )}

      {open && (
        <div className="absolute inset-x-0 bottom-0 z-30 animate-slide-up">
          <div className="mx-3 mb-3 rounded-3xl bg-surface border border-border shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-cyan/15 flex items-center justify-center">
                  <Sparkles size={14} className="text-cyan" />
                </div>
                <p className="text-[13.5px] text-text font-medium">Budtrack AI</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted hover:text-text">
                <X size={16} />
              </button>
            </div>

            <div className="p-4 space-y-3">
              {COMPANION_MESSAGES.map((m) => (
                <div key={m.id} className="flex gap-2 items-start">
                  <div className="w-7 h-7 rounded-full bg-cyan/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={12} className="text-cyan" />
                  </div>
                  <div className="bg-ink border border-border rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
                    <p className="text-[13px] text-text leading-snug">{m.text}</p>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-2 pl-9">
                {COMPANION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setOpen(false)}
                    className="text-[12px] px-3 py-1.5 rounded-full border border-cyan/40 text-cyan hover:bg-cyan/10 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
