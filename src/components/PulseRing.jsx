export default function PulseRing({ percent, label, sub }) {
  const r = 66;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  const color = percent < 70 ? "#35D08F" : percent < 90 ? "#F5B942" : "#FF6B5D";

  return (
    <div className="relative w-full flex items-center justify-center py-2">
      <div
        className="absolute w-40 h-40 rounded-full blur-2xl opacity-40 animate-pulse-glow"
        style={{ backgroundColor: color }}
      />
      <svg width="176" height="176" viewBox="0 0 176 176" className="relative">
        <circle cx="88" cy="88" r={r} fill="none" stroke="#1A4536" strokeWidth="12" />
        <circle
          cx="88"
          cy="88"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 88 88)"
          style={{ transition: "stroke-dashoffset 1s ease, stroke 1s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-[11px] tracking-widest uppercase text-muted font-medium">
          {label}
        </span>
        <span className="font-mono text-3xl font-semibold text-text mt-1">{percent}%</span>
        <span className="text-[11px] text-muted mt-0.5">{sub}</span>
      </div>
    </div>
  );
}
