import { useState, useMemo } from "react";
import { Compass, Wallet, Gem, User, Signal, Wifi, BatteryFull } from "lucide-react";
import JourneyScreen from "./components/JourneyScreen.jsx";
import WalletScreen from "./components/WalletScreen.jsx";
import GrowScreen from "./components/GrowScreen.jsx";
import YouScreen from "./components/YouScreen.jsx";
import AICompanion from "./components/AICompanion.jsx";
import {
  JOURNEY_NODES,
  BADGES,
  TRANSACTIONS,
  WEEKLY_SPEND,
  ARCHETYPES,
} from "./data/mockData.js";

const TABS = [
  { id: "journey", label: "Journey", icon: Compass },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "grow", label: "Grow", icon: Gem },
  { id: "you", label: "You", icon: User },
];

export default function App() {
  const [tab, setTab] = useState("journey");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [externalPrompt, setExternalPrompt] = useState(null);

  // App-wide interactive state
  const [walletBalance, setWalletBalance] = useState(142300);
  const [totalInvested, setTotalInvested] = useState(0);
  const [spendPulse, setSpendPulse] = useState(78);
  const [xp, setXp] = useState(120);
  const [streak, setStreak] = useState(7);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [journeyNodes, setJourneyNodes] = useState(JOURNEY_NODES);
  const [badges, setBadges] = useState(BADGES);
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  const [weeklySpend, setWeeklySpend] = useState(WEEKLY_SPEND);
  const [archetype, setArchetype] = useState(null);

  const time = useMemo(() => {
    const d = new Date();
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  }, []);

  // When clicking an investment milestone node on Journey
  const handleSelectNode = (node) => {
    if (node.type === "invest") {
      setSelectedProduct(node.targetProductId || "tbills");
      setTab("grow");
    }
  };

  // When completing a lesson or quiz on Journey
  const handleCompleteNode = (nodeId, earnedXp) => {
    setXp((prev) => prev + earnedXp);

    setJourneyNodes((prev) => {
      let foundNext = false;
      return prev.map((n) => {
        if (n.id === nodeId) {
          return { ...n, status: "done" };
        }
        if (!foundNext && n.status === "locked" && n.id > nodeId) {
          foundNext = true;
          return { ...n, status: "active" };
        }
        return n;
      });
    });
  };

  // When executing an investment on Grow screen
  const handleInvest = ({ productId, productName, amount, tenure, expectedReturn }) => {
    // 1. Deduct from balance
    setWalletBalance((prev) => Math.max(prev - amount, 0));
    setTotalInvested((prev) => prev + amount);

    // 2. Add investment transaction
    const newTx = {
      id: Date.now(),
      merchant: `${productName} (${tenure.label || "Lockup"})`,
      category: "Investment",
      amount,
      time: "Just now",
      ref: `OPY-INV-${Math.floor(100000 + Math.random() * 900000)}`,
      status: "Successful",
    };
    setTransactions((prev) => [newTx, ...prev]);

    // 3. Award Investor badge
    setBadges((prev) =>
      prev.map((b) => (b.label === "Investor" ? { ...b, earned: true } : b))
    );

    // 4. Award XP
    setXp((prev) => prev + 100);

    // 5. Complete matching journey node if unlocked
    setJourneyNodes((prev) => {
      let foundNext = false;
      return prev.map((n) => {
        if (n.type === "invest" && (n.status === "active" || n.targetProductId === productId)) {
          return { ...n, status: "done" };
        }
        if (!foundNext && n.status === "locked") {
          foundNext = true;
          return { ...n, status: "active" };
        }
        return n;
      });
    });
  };

  // AI-driven budget adjustment
  const handleAdjustBudget = () => {
    setSpendPulse(64); // Cooled down to green zone
    setWeeklySpend((prev) =>
      prev.map((item) =>
        item.name === "Ent."
          ? { ...item, thisWeek: Math.max(item.thisWeek - 3500, 3000) }
          : item
      )
    );
  };

  // Simulated transaction demo
  const handleSimulateSpend = ({ merchant, category, amount }) => {
    setWalletBalance((prev) => Math.max(prev - amount, 0));

    const newTx = {
      id: Date.now(),
      merchant,
      category,
      amount,
      time: "Just now",
      ref: `OPY-${Math.floor(10000000 + Math.random() * 90000000)}`,
      status: "Successful",
    };
    setTransactions((prev) => [newTx, ...prev]);

    setWeeklySpend((prev) =>
      prev.map((item) =>
        item.name.toLowerCase().includes(category.toLowerCase().slice(0, 3))
          ? { ...item, thisWeek: item.thisWeek + amount }
          : item
      )
    );

    setSpendPulse((prev) => Math.min(prev + 4, 98));
  };

  // Daily streak check-in
  const handleCheckinStreak = () => {
    if (!hasCheckedInToday) {
      setStreak((s) => s + 1);
      setXp((x) => x + 10);
      setHasCheckedInToday(true);
    }
  };

  // Hand-off from receipt to AI Companion
  const handleAskAI = (prompt) => {
    setExternalPrompt(prompt);
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
              {tab === "journey" && (
                <JourneyScreen
                  nodes={journeyNodes}
                  xp={xp}
                  onSelectNode={handleSelectNode}
                  onCompleteNode={handleCompleteNode}
                />
              )}
              {tab === "wallet" && (
                <WalletScreen
                  walletBalance={walletBalance}
                  transactions={transactions}
                  weeklySpend={weeklySpend}
                  spendPulse={spendPulse}
                  onAskAI={handleAskAI}
                  onSimulateSpend={handleSimulateSpend}
                />
              )}
              {tab === "grow" && (
                <GrowScreen
                  selected={selectedProduct}
                  setSelected={setSelectedProduct}
                  walletBalance={walletBalance}
                  totalInvested={totalInvested}
                  onInvest={handleInvest}
                />
              )}
              {tab === "you" && (
                <YouScreen
                  nodes={journeyNodes}
                  badges={badges}
                  xp={xp}
                  streak={streak}
                  archetype={archetype}
                  onSetArchetype={setArchetype}
                  onCheckinStreak={handleCheckinStreak}
                  hasCheckedInToday={hasCheckedInToday}
                />
              )}
            </div>

            {/* Sits outside the scroll area, floating over tabs */}
            <AICompanion
              onAdjustBudget={handleAdjustBudget}
              onNavigateTab={(t) => setTab(t)}
              externalPrompt={externalPrompt}
            />

            {/* Bottom nav */}
            <div className="absolute bottom-0 left-0 right-0 bg-ink/95 backdrop-blur border-t border-border px-3 pt-2 pb-6 z-10">
              <div className="flex items-center justify-between">
                {TABS.map((t) => {
                  const Icon = t.icon;
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className="flex-1 flex flex-col items-center gap-1 py-1.5 transition-transform active:scale-95"
                    >
                      <div
                        className={`w-12 h-8 rounded-full flex items-center justify-center transition-all ${
                          active ? "bg-lime/15 shadow-sm" : ""
                        }`}
                      >
                        <Icon size={17} className={active ? "text-lime" : "text-muted"} />
                      </div>
                      <span
                        className={`text-[10px] font-medium ${
                          active ? "text-lime font-bold" : "text-muted"
                        }`}
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
