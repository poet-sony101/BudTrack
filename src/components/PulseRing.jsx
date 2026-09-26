export default function PulseRing({ percent = 68, label = "Weekly Spend Pulse", sub = "of budget used" }) {
  const r = 62;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(Math.max(percent, 0), 100);
  const offset = c - (clamped / 100) * c;
  const color = clamped < 70 ? "#B4FF39" : clamped < 90 ? "#FFB627" : "#FF4D6D";

  return (
    <div className="relative w-full flex items-center justify-center py-2">
      {/* Background glow */}
      <div
        className="absolute w-36 h-36 rounded-full blur-2xl opacity-25 animate-pulse-glow pointer-events-none"
        style={{ backgroundColor: color }}
      />
      <svg width="160" height="160" viewBox="0 0 160 160" className="relative">
        <circle cx="80" cy="80" r={r} fill="none" stroke="#35245F" strokeWidth="11" />
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 80 80)"
          style={{ transition: "stroke-dashoffset 0.8s ease-out, stroke 0.6s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center pointer-events-none">
        <span className="text-[10.5px] tracking-wider uppercase text-muted font-medium">
          {label}
        </span>
        <span className="font-mono text-2xl font-bold text-text mt-0.5" style={{ color }}>
          {clamped}%
        </span>
        <span className="text-[11px] text-muted">{sub}</span>
      </div>
    </div>
  );
}
