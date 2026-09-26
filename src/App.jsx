import { useState, useMemo } from "react";
import { Compass, Wallet, Gem, User, Signal, Wifi, BatteryFull } from "lucide-react";
import JourneyScreen from "./components/JourneyScreen.jsx";
import WalletScreen from "./components/WalletScreen.jsx";
import GrowScreen from "./components/GrowScreen.jsx";
import YouScreen from "./components/YouScreen.jsx";
import AICompanion from "./components/AICompanion.jsx";

const TABS = [
  { id: "journey", label: "Journey", icon: Compass },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "grow", label: "Grow", icon: Gem },
  { id: "you", label: "You", icon: User },
];

export default function App() {
  const [tab, setTab] = useState("journey");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const time = useMemo(() => {
    const d = new Date();
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  }, []);

  const handleSelectNode = (node) => {
    if (node.type === "invest") {
      setSelectedProduct(node.title.includes("Treasury") ? "tbills" : "mutual");
      setTab("grow");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0D0620] py-10 px-4">
      <div className="relative">
        {/* Phone frame */}
        <div className="w-[380px] h-[780px] rounded-[46px] bg-ink border-[6px] border-[#241640] shadow-2xl overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="shrink-0 relative flex items-center justify-between px-7 pt-4 pb-2 text-text">
            <span className="text-[13px] font-medium font-mono">{time}</span>
            <div className="w-24 h-6 bg-ink rounded-full absolute left-1/2 -translate-x-1/2 top-2.5" />
            <div className="flex items-center gap-1.5">
              <Signal size={13} />
              <Wifi size={13} />
              <BatteryFull size={15} />
            </div>
          </div>

          {/* Bounded region between status bar and nav */}
          <div className="relative flex-1 min-h-0">
            <div className="absolute inset-0 overflow-y-auto no-scrollbar">
              {tab === "journey" && <JourneyScreen onSelectNode={handleSelectNode} />}
              {tab === "wallet" && <WalletScreen />}
              {tab === "grow" && (
                <GrowScreen selected={selectedProduct} setSelected={setSelectedProduct} />
              )}
              {tab === "you" && <YouScreen />}
            </div>

            {/* Sits outside the scroll area, so it never scrolls off screen */}
            <AICompanion />

            {/* Bottom nav — floats over the scrollable content */}
            <div className="absolute bottom-0 left-0 right-0 bg-ink/95 backdrop-blur border-t border-border px-3 pt-2 pb-6 z-10">
              <div className="flex items-center justify-between">
                {TABS.map((t) => {
                  const Icon = t.icon;
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className="flex-1 flex flex-col items-center gap-1 py-1.5"
                    >
                      <div
                        className={`w-12 h-8 rounded-full flex items-center justify-center transition-colors ${
                          active ? "bg-lime/15" : ""
                        }`}
                      >
                        <Icon size={17} className={active ? "text-lime" : "text-muted"} />
                      </div>
                      <span
                        className={`text-[10px] font-medium ${active ? "text-lime" : "text-muted"}`}
                      >
                        {t.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-[#4A3A7A] text-xs mt-5 font-mono">
          Budtrack · in-app OPay experience
        </p>
      </div>
    </div>
  );
}
