# Budtrack ⚡

> **AI-Powered Financial Intelligence & Wealth Mini-Program for OPay**  
> Designed for Nigeria's Gen Z and Gen Alpha to turn everyday spending into long-term wealth. Interactive front-end prototype for the OPay Hackathon submission.

---

## ✨ Features & Architecture

### 1. 🗺️ Unified Progression Path (`Journey`)
- **Single Continuous Journey**: Replaces fragmented finance tabs with a gamified Duolingo-style progression.
- **Interactive Literacy Challenges**: Tapping active stops opens realistic scenarios (e.g., **"Spotting a Scam Message"** with Nigerian phishing defenses, immediate feedback, and XP rewards).
- **Milestone Unlocks**: Completing financial literacy stops automatically unlocks verified sovereign wealth products like FGN Treasury Bills.

### 2. 🤖 Budtrack AI (`AI Companion`)
- **Conversational Financial Coach**: Built with authentic Nigerian youth financial context (Naira, OPay daily interest, essentials vs flex, Bolt, shawarma, inflation hedging).
- **Intelligent Q&A**: Answers questions on T-Bills, allowance budgeting (50/30/20 framework), and scam avoidance.
- **One-Tap Action Rebalancing**: Tapping `"Adjust budget"` trims overspent categories and immediately re-stabilizes the user's Weekly Spend Pulse.

### 3. 💳 Wallet & Signature Cash-Flow Pulse (`Wallet`)
- **Signature Pulse Gauge**: Animated SVG radial gauge measuring spend pace against personal weekly benchmarks.
- **Interactive Spend Insights**: Category breakdown (Food, Transport, Airtime, Entertainment, Utilities) with Recharts visual comparison of current spend vs historical average.
- **Digital OPay Receipts**: Tap any transaction to inspect reference IDs, category badges, and instant `"Ask AI Financial Analysis"` hand-off.
- **Spend Simulator**: Built-in interactive simulator for testing real-time cashflow adjustments during hackathon demos.

### 4. 💎 Micro-Investment Marketplace (`Grow`)
- **Sovereign & Managed Yields**: FGN Treasury Bills (18.2% p.a.), Balanced Mutual Funds (~14.0% p.a.), and Fractional US & Nigerian Equities.
- **Tenure & Yield Calculator**: Select lockup periods (91, 182, 364 days) with real-time maturity profit projections.
- **Authentic OPay Checkout**: Simulated 4-digit PIN authorization, live wallet debiting, certificate generation, and instant **"Investor"** badge award.

### 5. 🎯 Investor DNA & Gamification (`You`)
- **60-Second Risk Profiler**: 3-question interactive assessment identifying the user's archetype:
  - 🛡️ **Fortress Saver**: Capital preservation & risk-free sovereign bills.
  - ⚖️ **Smart Balancer**: Steady fixed-income combined with growth funds.
  - 🚀 **Alpha Chaser**: High-growth equity and long-term trend portfolios.
- **Daily Streak Booster**: Daily check-in button with XP gains and achievement badges showcase.

---

## 🎨 Design System

| Token | Hex | Role |
|---|---|---|
| **Ink** | `#1B1035` | App frame & card backings |
| **Surface** | `#271A47` | Interactive cards & containers |
| **Surface 2** | `#35245F` | Elevated badges & button bases |
| **Border** | `#4A3A7A` | Subtle dividers & borders |
| **Lime** | `#B4FF39` | Brand primary, positive status & completed nodes |
| **Gold** | `#FFB627` | Wealth milestones, active challenges & warnings |
| **Pink** | `#FF4D6D` | Overspend alerts & risk indicators |
| **Cyan** | `#3ECFFF` | AI companion highlights & DNA assessments |

**Typography**: `Baloo 2` (Display), `Inter` (Body), `Space Mono` (Numbers & currency).

---

## 🛠️ Tech Stack

- **React 18** (SPA component architecture)
- **Vite 5** (Fast bundling & HMR)
- **Tailwind CSS 3** (Utility styling & keyframe animations)
- **Recharts 2** (Interactive data visualization)
- **Lucide React** (Consistent modern iconography)

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/poet-sony101/BudTrack.git

# Enter project directory
cd BudTrack

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` to test the in-app phone simulator.

### Production Build

```bash
npm run build
```

Production artifacts are bundled into the `/dist` directory.
