# Budtrack

AI-powered financial intelligence layer for OPay — a personal finance and
wealth-education mini-program targeting Nigeria's Gen Z and Gen Alpha.

This is the interactive front-end prototype for the OPay Hackathon submission.

## Stack

- React 18 + Vite
- Tailwind CSS
- Recharts (spend insights chart)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (defaults to `http://localhost:5173`).

## Project structure

```
src/
  App.jsx                 # Phone-frame shell, tab navigation, status bar
  index.css               # Tailwind entry + global styles
  components/
    PulseRing.jsx          # Signature "cash-flow pulse" gauge
    HomeScreen.jsx         # Dashboard: balance, pulse ring, nudge, activity feed
    InsightsScreen.jsx     # Category spend chart, this-week-vs-average
    InvestScreen.jsx       # Micro-investment marketplace (T-Bills, funds, stocks)
    LearnScreen.jsx        # Gamified financial literacy modules + badges
  data/
    mockData.js            # All mock transactions, products, and copy
```

## Design system

| Token | Hex | Use |
|---|---|---|
| Ink | `#0B1F17` | Background |
| Surface | `#12332A` | Cards |
| Surface 2 | `#1A4536` | Elevated surfaces |
| Mint | `#35D08F` | Brand / primary actions |
| Gold | `#F5B942` | Wealth / investment moments |
| Coral | `#FF6B5D` | Alerts, overspend |

Fonts: Space Grotesk (display), Inter (body), IBM Plex Mono (numbers/data).

## Next steps

- Wire `HomeScreen`'s nudge copy to a real AI call (Claude API) over live
  transaction data instead of `mockData.js`
- Replace `mockData.js` with OPay's read-only transaction webhook once
  sandbox API access is available
- Add an onboarding / risk-profile quiz flow ahead of the `invest` tab
