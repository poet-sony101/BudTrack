import { Wallet, BookOpen, Gem, Flame, ShieldAlert } from "lucide-react";

export const money = (n) => `₦${n.toLocaleString("en-NG")}`;

// The unified path: budgeting check-ins, lessons, and investment unlocks
// all live on one progression instead of separate tabs.
export const JOURNEY_NODES = [
  {
    id: 1,
    type: "checkin",
    title: "Set your first budget",
    icon: Wallet,
    status: "done",
  },
  {
    id: 2,
    type: "lesson",
    title: "Needs vs. Wants",
    icon: BookOpen,
    status: "done",
  },
  {
    id: 3,
    type: "streak",
    title: "7-day streak",
    icon: Flame,
    status: "done",
  },
  {
    id: 4,
    type: "lesson",
    title: "Spotting a Scam Message",
    icon: ShieldAlert,
    status: "active",
  },
  {
    id: 5,
    type: "invest",
    title: "Try FGN Treasury Bills",
    icon: Gem,
    status: "locked",
  },
  {
    id: 6,
    type: "lesson",
    title: "Building an Emergency Fund",
    icon: BookOpen,
    status: "locked",
  },
  {
    id: 7,
    type: "invest",
    title: "Balanced Mutual Fund",
    icon: Gem,
    status: "locked",
  },
  {
    id: 8,
    type: "streak",
    title: "Investor badge",
    icon: Flame,
    status: "locked",
  },
];

export const NODE_COLOR = {
  done: "#B4FF39",
  active: "#FFB627",
  locked: "#4A3A7A",
};

export const TRANSACTIONS = [
  { id: 1, merchant: "Chicken Republic", category: "Food", amount: 4200, time: "2:14 PM" },
  { id: 2, merchant: "Bolt Ride", category: "Transport", amount: 2600, time: "11:02 AM" },
  { id: 3, merchant: "MTN Airtime", category: "Airtime", amount: 1000, time: "9:40 AM" },
  { id: 4, merchant: "Netflix", category: "Entertainment", amount: 3500, time: "Yesterday" },
  { id: 5, merchant: "IKEDC Bill", category: "Utilities", amount: 8000, time: "Yesterday" },
];

export const CATEGORY_COLORS = {
  Food: "#B4FF39",
  Transport: "#FFB627",
  Airtime: "#3ECFFF",
  Entertainment: "#FF4D6D",
  Utilities: "#9C8FC4",
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
    min: 1000,
    blurb: "Backed by the Federal Government. Lock in for 91–364 days.",
  },
  {
    id: "mutual",
    name: "Balanced Mutual Fund",
    risk: "Medium risk",
    riskColor: "#FFB627",
    rate: "~14% p.a.",
    min: 2000,
    blurb: "A vetted mix of bonds and equities, managed for steady growth.",
  },
  {
    id: "stocks",
    name: "Fractional US Stocks",
    risk: "Higher risk",
    riskColor: "#FF4D6D",
    rate: "Variable",
    min: 5000,
    blurb: "Own a slice of global companies. Value moves with the market.",
  },
];

export const BADGES = [
  { id: 1, label: "First Save", earned: true },
  { id: 2, label: "7-Day Streak", earned: true },
  { id: 3, label: "Budget Keeper", earned: true },
  { id: 4, label: "Investor", earned: false },
];

export const COMPANION_MESSAGES = [
  {
    id: 1,
    from: "ai",
    text: "You've spent 40% more on transport this week than your average. Want to adjust your weekend entertainment budget to stay on track?",
  },
];

export const COMPANION_CHIPS = ["Adjust budget", "Show transport spend", "Not now"];
