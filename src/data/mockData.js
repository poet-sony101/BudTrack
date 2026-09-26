import { Wallet, BookOpen, Gem, Flame, ShieldAlert, Award, TrendingUp, PiggyBank } from "lucide-react";

export const money = (n) => `₦${Math.round(n).toLocaleString("en-NG")}`;

// The unified path: budgeting check-ins, lessons, and investment unlocks
export const JOURNEY_NODES = [
  {
    id: 1,
    type: "checkin",
    title: "Set your first budget",
    icon: Wallet,
    status: "done",
    xp: 30,
    summary: "Allocated ₦25,000 weekly budget across essentials, emergency stash, and flexibility.",
  },
  {
    id: 2,
    type: "lesson",
    title: "Needs vs. Wants",
    icon: BookOpen,
    status: "done",
    xp: 40,
    summary: "Mastered the 50/30/20 rule adapted for Naija living: essentials first before enjoyment.",
  },
  {
    id: 3,
    type: "streak",
    title: "7-day streak",
    icon: Flame,
    status: "done",
    xp: 50,
    summary: "Checked your finances 7 days in a row without breaking the chain! 🔥",
  },
  {
    id: 4,
    type: "lesson",
    title: "Spotting a Scam Message",
    icon: ShieldAlert,
    status: "active",
    xp: 50,
    quiz: {
      title: "Scam Detection Challenge",
      subtitle: "Protect your OPay wallet from phishing & social engineering",
      scenario: "You receive an SMS from '+234 803 000 1199' saying: 'OPAY ALERT: Your account has a pending freeze due to BVN discrepancy. Click https://opay-verify-bvn.ng to verify immediately.'",
      question: "What is your immediate and safest response?",
      options: [
        {
          id: "a",
          text: "Click the link immediately to prevent my funds from being frozen.",
          isCorrect: false,
          explanation: "Never click suspicious links! Phishing links steal your password, OTP, and debit card details.",
        },
        {
          id: "b",
          text: "Reply with your 4-digit PIN and last 4 digits of your BVN to verify via SMS.",
          isCorrect: false,
          explanation: "OPay will NEVER ask for your transaction PIN, OTP, or password via SMS or phone call.",
        },
        {
          id: "c",
          text: "Ignore the link, report the sender as spam, and check your status only inside the official OPay app.",
          isCorrect: true,
          explanation: "Spot on! Official OPay notifications never ask for credentials through random external domains.",
        },
      ],
    },
  },
  {
    id: 5,
    type: "invest",
    title: "Try FGN Treasury Bills",
    icon: Gem,
    status: "locked",
    xp: 60,
    summary: "Invest in sovereign Nigerian debt with guaranteed 18.2% annual return.",
    targetProductId: "tbills",
  },
  {
    id: 6,
    type: "lesson",
    title: "Building an Emergency Fund",
    icon: BookOpen,
    status: "locked",
    xp: 50,
    summary: "Keep 3 months of basic feeding and transport in daily-interest OPay OWealth.",
  },
  {
    id: 7,
    type: "invest",
    title: "Balanced Mutual Fund",
    icon: Gem,
    status: "locked",
    xp: 75,
    summary: "Diversify across equities and bonds for steady long-term compounding.",
    targetProductId: "mutual",
  },
  {
    id: 8,
    type: "streak",
    title: "Investor badge",
    icon: Award,
    status: "locked",
    xp: 100,
    summary: "Complete your first live investment and graduate to Certified Investor status!",
  },
];

export const NODE_COLOR = {
  done: "#B4FF39",
  active: "#FFB627",
  locked: "#4A3A7A",
};

export const TRANSACTIONS = [
  { id: 1, merchant: "Chicken Republic", category: "Food", amount: 4200, time: "2:14 PM", ref: "OPY-88421941", status: "Successful" },
  { id: 2, merchant: "Bolt Ride", category: "Transport", amount: 2600, time: "11:02 AM", ref: "OPY-88392019", status: "Successful" },
  { id: 3, merchant: "MTN Airtime", category: "Airtime", amount: 1000, time: "9:40 AM", ref: "OPY-88129033", status: "Successful" },
  { id: 4, merchant: "Netflix", category: "Entertainment", amount: 3500, time: "Yesterday", ref: "OPY-87994320", status: "Successful" },
  { id: 5, merchant: "IKEDC Bill", category: "Utilities", amount: 8000, time: "Yesterday", ref: "OPY-87820194", status: "Successful" },
];

export const CATEGORY_COLORS = {
  Food: "#B4FF39",
  Transport: "#FFB627",
  Airtime: "#3ECFFF",
  Entertainment: "#FF4D6D",
  Utilities: "#9C8FC4",
  Investment: "#F5B942",
};

export const WEEKLY_SPEND = [
  { name: "Food", thisWeek: 14200, avg: 11000 },
  { name: "Transport", thisWeek: 9800, avg: 7000 },
  { name: "Airtime", thisWeek: 2000, avg: 2200 },
  { name: "Ent.", thisWeek: 6500, avg: 4800 },
  { name: "Utilities", thisWeek: 8000, avg: 8200 },
];

export const PRODUCTS = [
  {
    id: "tbills",
    name: "FGN Treasury Bills",
    risk: "Low risk",
    riskColor: "#B4FF39",
    rate: "18.2% p.a.",
    annualYield: 0.182,
    min: 1000,
    tenures: [
      { days: 91, label: "91 Days", rate: "16.5% p.a.", yield: 0.165 },
      { days: 182, label: "182 Days", rate: "17.4% p.a.", yield: 0.174 },
      { days: 364, label: "364 Days", rate: "18.2% p.a.", yield: 0.182 },
    ],
    blurb: "Backed by the Federal Government of Nigeria. Zero capital loss risk.",
    details: "Treasury Bills are short-term sovereign debt securities issued by the Central Bank of Nigeria. Interest is paid upfront (discounted rate) and principal is 100% guaranteed.",
  },
  {
    id: "mutual",
    name: "Balanced Mutual Fund",
    risk: "Medium risk",
    riskColor: "#FFB627",
    rate: "~14.0% p.a.",
    annualYield: 0.14,
    min: 2000,
    tenures: [
      { days: 90, label: "Quarterly", rate: "~13.2% p.a.", yield: 0.132 },
      { days: 180, label: "Semi-Annual", rate: "~14.0% p.a.", yield: 0.14 },
      { days: 365, label: "1 Year", rate: "~15.2% p.a.", yield: 0.152 },
    ],
    blurb: "A vetted mix of high-grade commercial papers, bonds, and blue-chip equities.",
    details: "Managed by SEC-licensed asset managers. Smooths out volatility by balancing income-generating bonds with dividend-yielding stocks.",
  },
  {
    id: "stocks",
    name: "Fractional US & NG Stocks",
    risk: "Higher risk",
    riskColor: "#FF4D6D",
    rate: "Variable",
    annualYield: 0.22,
    min: 5000,
    tenures: [
      { days: 180, label: "6 Months", rate: "Market Driven", yield: 0.10 },
      { days: 365, label: "1 Year+", rate: "Long Term", yield: 0.22 },
    ],
    blurb: "Own shares of global leaders like Apple, NVIDIA, and top Nigerian banks from ₦5,000.",
    details: "Invest in fractional shares of global market giants with dollar-cost averaging. High potential for capital appreciation over a 2–5 year horizon.",
  },
];

export const BADGES = [
  { id: 1, label: "First Save", description: "Created first emergency savings pocket", earned: true, icon: PiggyBank },
  { id: 2, label: "7-Day Streak", description: "Maintained a 7-day budgeting check-in streak", earned: true, icon: Flame },
  { id: 3, label: "Budget Keeper", description: "Stayed under weekly budget limits", earned: true, icon: Wallet },
  { id: 4, label: "Investor", description: "Executed first verified micro-investment", earned: false, icon: Gem },
];

export const RISK_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "When your allowance or salary arrives, what's your immediate instinct?",
    options: [
      { label: "Lock 40% into guaranteed savings before touching anything else", points: 1 },
      { label: "Pay bills, save 20%, and keep a comfortable buffer for outings", points: 2 },
      { label: "Put everything left into high-growth opportunities or trading", points: 3 },
    ],
  },
  {
    id: 2,
    question: "If an investment dropped 10% in a week due to market news, how would you react?",
    options: [
      { label: "Panic and withdraw immediately — I hate seeing red!", points: 1 },
      { label: "Stay calm and wait it out, as long as the long-term fundamentals look good", points: 2 },
      { label: "Buy more while it's discounted! Market dips are buying opportunities", points: 3 },
    ],
  },
  {
    id: 3,
    question: "What is your primary financial mission for the next 12 months?",
    options: [
      { label: "Protecting my money from inflation with zero chance of losing capital", points: 1 },
      { label: "Building a balanced portfolio with predictable, healthy annual returns", points: 2 },
      { label: "Aggressive wealth multiplication to hit a major tech/laptop or travel milestone", points: 3 },
    ],
  },
];

export const ARCHETYPES = {
  conservative: {
    title: "Fortress Saver",
    tagline: "Capital Preservation Specialist",
    emoji: "🛡️",
    badgeColor: "#B4FF39",
    summary: "You prioritize safety above all else. You believe in steady compounding without sleepless nights.",
    recommendation: "FGN Treasury Bills (18.2% p.a.) & OPay OWealth daily interest.",
  },
  balanced: {
    title: "Smart Balancer",
    tagline: "Strategic Wealth Builder",
    emoji: "⚖️",
    badgeColor: "#FFB627",
    summary: "You balance safe fixed-income yields with moderate growth opportunities to outpace inflation.",
    recommendation: "60% Treasury Bills + 40% Balanced Mutual Funds.",
  },
  growth: {
    title: "Alpha Chaser",
    tagline: "High-Growth Trendseeker",
    emoji: "🚀",
    badgeColor: "#3ECFFF",
    summary: "You're comfortable with market volatility for the chance to achieve superior capital appreciation.",
    recommendation: "Balanced Mutual Funds + Fractional US & NG Tech Stocks.",
  },
};
