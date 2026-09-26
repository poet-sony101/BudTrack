import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Check, ArrowRight, Minimize2, MessageSquare } from "lucide-react";
import { money } from "../data/mockData.js";

const DEFAULT_MESSAGES = [
  {
    id: 1,
    from: "ai",
    text: "Hey Tobi! 👋 I'm your Budtrack AI Financial Copilot. I'm monitoring your OPay cashflow — you've spent ₦9,800 on transport this week (40% higher than average). Want me to rebalance your weekend entertainment budget to keep you in the safe zone?",
  },
];

const PROMPT_CHIPS = [
  "Adjust budget",
  "Why did transport spike?",
  "Explain T-Bills simply",
  "How to avoid OPay scams",
  "How to budget ₦50,000 allowance?",
];

export default function AICompanion({ onAdjustBudget, onNavigateTab, externalPrompt }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (externalPrompt) {
      setOpen(true);
      handleSendMessage(externalPrompt);
    }
  }, [externalPrompt]);

  const generateAIResponse = (userText) => {
    const lower = userText.toLowerCase();

    if (lower.includes("adjust budget") || lower.includes("adjust")) {
      onAdjustBudget?.();
      return "Done deal! 🎯 I've trimmed ₦3,500 from your upcoming Entertainment budget and reallocated it into your Safe Stash. Your Weekly Spend Pulse just cooled down to a healthy 64%. You're fully on track!";
    }

    if (lower.includes("transport") || lower.includes("bolt")) {
      return "Here's the breakdown: You took 2 Bolt rides (₦2,600 and ₦3,400) plus campus transit, totaling ₦9,800. That's ₦2,800 over your ₦7,000 usual benchmark. Tip: Leaving 20 minutes earlier avoids surge pricing and saves up to 35%!";
    }

    if (lower.includes("t-bill") || lower.includes("treasury")) {
      return "Think of FGN Treasury Bills like lending money directly to the Nigerian Federal Government. You get a guaranteed 18.2% annual return, zero stock market panic, and your principal is 100% sovereign-backed. Head to the 'Grow' tab to test it with as little as ₦1,000!";
    }

    if (lower.includes("scam") || lower.includes("phishing") || lower.includes("fraud")) {
      return "Rule #1: OPay will NEVER call or WhatsApp you asking for your 4-digit PIN, card CVV, or OTP. If anyone sends a link saying 'OPay BVN Discrepancy' or 'Account Freeze', report them inside the app. Complete node 4 on your Journey to earn +50 XP on this!";
    }

    if (lower.includes("50,000") || lower.includes("allowance") || lower.includes("salary")) {
      return "For a ₦50,000 monthly inflow, try the 50/30/20 Naija framework: ₦25,000 for essentials (feeding, data, transport), ₦15,000 for emergency & savings in OPay OWealth (earning daily interest), and ₦10,000 for guilt-free flex! 💡";
    }

    if (lower.includes("mutual fund") || lower.includes("stocks")) {
      return "Mutual funds pool money with licensed asset managers into diversified bonds and blue-chip equities (~14% p.a.). US and NG stocks let you own fractions of Apple or Nigerian banking leaders from ₦5,000 for high long-term growth!";
    }

    if (lower.includes("chicken republic") || lower.includes("food") || lower.includes("4200") || lower.includes("4,200")) {
      return "Your ₦4,200 Chicken Republic spend is within your Food allowance, but food is currently at ₦14,200 this week (vs ₦11,000 average). Meal prepping 2 days a week could save you ₦6,000 every month!";
    }

    return "Great question! Budtrack continuously analyzes your cashflow patterns, detects inflation leaks, and identifies verified wealth products on OPay. Let me know if you want to optimize your budget, review recent transactions, or explore Treasury Bills!";
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAIResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "ai", text: reply },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Sparkle Trigger for Desktop/Web */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-surface hover:bg-surface2 border-2 border-cyan/60 shadow-2xl hover:scale-105 active:scale-95 transition-all group"
          title="Open Budtrack AI Copilot"
        >
          <div className="relative w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center text-cyan">
            <span className="absolute inset-0 rounded-full bg-cyan/30 animate-pulse-glow" />
            <Sparkles size={18} className="relative group-hover:rotate-12 transition-transform" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-[13px] font-bold text-text flex items-center gap-1.5 leading-tight">
              Budtrack AI
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            </p>
            <p className="text-[10px] text-muted font-mono">Financial Copilot</p>
          </div>
        </button>
      )}

      {/* Floating Desktop Web AI Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-full sm:w-[420px] max-w-[94vw] max-h-[620px] rounded-3xl bg-surface border border-border shadow-2xl overflow-hidden flex flex-col animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/80 bg-ink/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan shadow-sm">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[14px] text-text font-bold font-display">Budtrack AI Copilot</p>
                  <span className="px-1.5 py-0.5 rounded-full bg-lime/15 border border-lime/30 text-lime font-mono text-[9px] font-bold">
                    ONLINE
                  </span>
                </div>
                <p className="text-[10.5px] text-muted">OPay Financial Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-xl bg-surface2 flex items-center justify-center text-muted hover:text-text transition-colors"
                title="Close Copilot"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Message Area */}
          <div className="p-4 space-y-3.5 overflow-y-auto max-h-[360px] no-scrollbar">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 items-start ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.from === "ai" && (
                  <div className="w-8 h-8 rounded-xl bg-cyan/15 border border-cyan/30 flex items-center justify-center shrink-0 mt-0.5 text-cyan">
                    <Sparkles size={14} />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[85%] text-[13px] leading-relaxed shadow-sm ${
                    m.from === "user"
                      ? "bg-cyan/25 border border-cyan/40 text-text rounded-tr-sm"
                      : "bg-ink/80 border border-border text-text/90 rounded-tl-sm"
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                {m.from === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-surface2 border border-border flex items-center justify-center shrink-0 mt-0.5 text-muted">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-muted text-[11.5px] font-mono pl-10">
                <span className="w-2 h-2 rounded-full bg-cyan animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-cyan animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-cyan animate-bounce [animation-delay:0.4s]" />
                <span>Budtrack analyzing your cashflow...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2 border-t border-border/50 bg-ink/40 overflow-x-auto no-scrollbar flex gap-2">
            {PROMPT_CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap text-[11.5px] px-3 py-1.5 rounded-full border border-cyan/30 text-cyan hover:bg-cyan/15 bg-surface transition-all shrink-0 active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3.5 border-t border-border/80 bg-ink/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about savings, T-Bills, or your budget..."
              className="flex-1 bg-surface border border-border rounded-xl px-4 py-2.5 text-[13px] text-text placeholder:text-muted/60 focus:outline-none focus:border-cyan transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                input.trim()
                  ? "bg-cyan text-ink hover:brightness-110 shadow-md font-bold"
                  : "bg-surface2 text-muted/50 cursor-not-allowed"
              }`}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
