import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Check, ArrowRight } from "lucide-react";
import { money } from "../data/mockData.js";

const DEFAULT_MESSAGES = [
  {
    id: 1,
    from: "ai",
    text: "Hey Tobi! 👋 I noticed you've spent ₦9,800 on transport this week — that's 40% higher than your average. Want me to balance your weekend entertainment budget to keep you in the safe zone?",
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
      {/* Floating Sparkle Trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="absolute bottom-24 right-4 z-20 w-14 h-14 rounded-full bg-ink border-2 border-cyan flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all group"
          title="Open Budtrack AI"
        >
          <span className="absolute inset-0 rounded-full bg-cyan/20 animate-pulse-glow" />
          <Sparkles size={22} className="relative text-cyan group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-lime border-2 border-ink" />
        </button>
      )}

      {/* Slide-up Chat Sheet */}
      {open && (
        <div className="absolute inset-x-0 bottom-0 z-30 animate-slide-up">
          <div className="mx-2 mb-2 rounded-[32px] bg-surface border border-border shadow-2xl overflow-hidden flex flex-col max-h-[560px]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-ink/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-cyan/15 border border-cyan/40 flex items-center justify-center text-cyan">
                  <Bot size={17} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13.5px] text-text font-semibold font-display">Budtrack AI</p>
                    <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                  </div>
                  <p className="text-[10px] text-muted font-mono">OPay Financial Intelligence</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-surface2 flex items-center justify-center text-muted hover:text-text transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Message Area */}
            <div className="p-3.5 space-y-3 overflow-y-auto max-h-[320px] no-scrollbar">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 items-start ${
                    m.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.from === "ai" && (
                    <div className="w-7 h-7 rounded-full bg-cyan/15 border border-cyan/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={12} className="text-cyan" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] text-[12.5px] leading-relaxed ${
                      m.from === "user"
                        ? "bg-cyan/20 border border-cyan/40 text-text rounded-tr-sm"
                        : "bg-ink border border-border text-text/90 rounded-tl-sm"
                    }`}
                  >
                    <p>{m.text}</p>
                  </div>
                  {m.from === "user" && (
                    <div className="w-7 h-7 rounded-full bg-surface2 border border-border flex items-center justify-center shrink-0 mt-0.5 text-muted">
                      <User size={12} />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center text-muted text-[11px] font-mono pl-9">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce [animation-delay:0.4s]" />
                  <span>Budtrack thinking...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Chips Carousel */}
            <div className="px-3 py-1.5 border-t border-border/40 overflow-x-auto no-scrollbar flex gap-1.5">
              {PROMPT_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  className="whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full border border-cyan/30 text-cyan hover:bg-cyan/15 bg-ink/40 transition-colors shrink-0"
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
              className="p-3 border-t border-border/80 bg-ink/70 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about savings, T-Bills, or budget..."
                className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-[12.5px] text-text placeholder:text-muted/60 focus:outline-none focus:border-cyan transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  input.trim()
                    ? "bg-cyan text-ink hover:brightness-110 shadow-sm"
                    : "bg-surface2 text-muted/50 cursor-not-allowed"
                }`}
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
