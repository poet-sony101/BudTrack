import { useState } from "react";
import {
  Compass,
  Wallet,
  Gem,
  User,
  Sparkles,
  Flame,
  Trophy,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
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
  money,
} from "./data/mockData.js";

const TABS = [
  { id: "journey", label: "Financial Journey", shortLabel: "Journey", icon: Compass, description: "Milestones & Literacy" },
  { id: "wallet", label: "Wallet & Cashflow", shortLabel: "Wallet", icon: Wallet, description: "Spend Pulse & Analytics" },
  { id: "grow", label: "Grow & Invest", shortLabel: "Grow", icon: Gem, description: "T-Bills & Mutual Funds" },
  { id: "you", label: "Rewards & DNA", shortLabel: "Rewards", icon: User, description: "Profile, Streaks & Badges" },
];

export default function App() {
  const [tab, setTab] = useState("journey");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [externalPrompt, setExternalPrompt] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen w-full bg-[#0D0620] text-text flex flex-col font-sans selection:bg-lime selection:text-ink">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#170B36] via-[#24134E] to-[#170B36] border-b border-border/60 py-1.5 px-4 text-center">
        <p className="text-[12px] text-muted flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <strong className="text-text font-medium">Budtrack Web Portal</strong>
          <span>— Official AI Financial Intelligence for OPay Nigeria</span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-lime/15 border border-lime/30 text-lime font-mono text-[10.5px]">
            Hackathon Submission
          </span>
        </p>
      </div>

      {/* Main Desktop Header & Navigation */}
      <header className="sticky top-0 z-30 bg-ink/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-lime via-cyan to-gold flex items-center justify-center text-ink font-bold shadow-lg shadow-lime/10">
                <span className="font-display text-2xl font-black">B</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-bold tracking-tight text-text">
                    Budtrack
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-lime/15 border border-lime/30 text-lime text-[11px] font-mono font-bold">
                    OPAY
                  </span>
                </div>
                <p className="text-[11px] text-muted hidden sm:block">
                  AI Financial Intelligence & Micro-Wealth
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-surface/70 border border-border p-1.5 rounded-2xl shadow-inner">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
                      active
                        ? "bg-lime text-ink font-bold shadow-md shadow-lime/20 scale-[1.02]"
                        : "text-muted hover:text-text hover:bg-surface2/60"
                    }`}
                  >
                    <Icon size={16} className={active ? "text-ink" : "text-muted"} />
                    <span>{t.shortLabel}</span>
                  </button>
                );
              })}
            </nav>

            {/* Top Right User & Wallet Stats */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Wallet Balance Pill */}
              <div
                onClick={() => setTab("wallet")}
                className="cursor-pointer flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-surface border border-border hover:border-lime/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-lime/15 flex items-center justify-center text-lime font-bold text-xs">
                  ₦
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-mono tracking-wider text-muted">OPay Wallet</p>
                  <p className="font-mono text-[13.5px] font-bold text-text leading-none">{money(walletBalance)}</p>
                </div>
              </div>

              {/* XP Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-surface border border-border text-gold font-mono text-[12.5px] font-bold">
                <Trophy size={14} className="text-gold" />
                <span>{xp} XP</span>
              </div>

              {/* Streak Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#3A2416] border border-pink/30 text-pink font-mono text-[12.5px] font-semibold">
                <Flame size={14} className="text-pink animate-pulse" />
                <span>{streak}d</span>
              </div>

              {/* User Avatar */}
              <button
                onClick={() => setTab("you")}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-2xl bg-surface hover:bg-surface2 border border-border transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime to-cyan flex items-center justify-center text-sm shadow-sm">
                  🌱
                </div>
                <div className="text-left">
                  <p className="text-[12.5px] font-semibold text-text leading-tight">Tobi A.</p>
                  <p className="text-[9.5px] text-lime font-mono">Tier 3 Verified</p>
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setTab("wallet")}
                className="px-2.5 py-1 rounded-xl bg-surface border border-border text-xs font-mono font-bold text-text"
              >
                {money(walletBalance)}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-ink px-4 py-3 space-y-2 animate-slide-up">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTab(t.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-[13.5px] ${
                    active ? "bg-lime text-ink font-bold" : "bg-surface text-text"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={18} />
                    <span>{t.label}</span>
                  </div>
                  <ChevronRight size={16} />
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tab === "journey" && (
          <JourneyScreen
            nodes={journeyNodes}
            xp={xp}
            streak={streak}
            onSelectNode={handleSelectNode}
            onCompleteNode={handleCompleteNode}
            onNavigateGrow={() => setTab("grow")}
          />
        )}
        {tab === "wallet" && (
          <WalletScreen
            walletBalance={walletBalance}
            transactions={transactions}
            weeklySpend={weeklySpend}
            spendPulse={spendPulse}
            totalInvested={totalInvested}
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
            walletBalance={walletBalance}
            totalInvested={totalInvested}
            onSetArchetype={setArchetype}
            onCheckinStreak={handleCheckinStreak}
            hasCheckedInToday={hasCheckedInToday}
          />
        )}
      </main>

      {/* Global Floating AI Copilot (Bottom Right) */}
      <AICompanion
        onAdjustBudget={handleAdjustBudget}
        onNavigateTab={(t) => setTab(t)}
        externalPrompt={externalPrompt}
      />

      {/* Modern Fintech Web Footer */}
      <footer className="border-t border-border bg-ink/60 mt-12 py-8 text-muted text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-text text-base">Budtrack</span>
            <span>·</span>
            <span>Personal Financial Intelligence & Micro-Wealth for Gen Z & Alpha</span>
          </div>
          <div className="flex items-center gap-6 text-[11.5px]">
            <span className="flex items-center gap-1.5 text-lime">
              <ShieldCheck size={14} /> CBN Regulated Partner Safe
            </span>
            <span className="flex items-center gap-1.5 text-gold">
              <TrendingUp size={14} /> SEC-Licensed Custody
            </span>
            <span className="text-muted/60">OPay Hackathon Prototype</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
