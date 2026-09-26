/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B1035",
        surface: "#271A47",
        surface2: "#35245F",
        border: "#4A3A7A",
        lime: "#B4FF39",
        gold: "#FFB627",
        pink: "#FF4D6D",
        cyan: "#3ECFFF",
        text: "#F5F3FF",
        muted: "#9C8FC4",
      },
      fontFamily: {
        display: ["'Baloo 2'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: 0.3, transform: "scale(0.9)" },
          "50%": { opacity: 0.6, transform: "scale(1.08)" },
        },
        floatBob: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        slideUp: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2.4s ease-in-out infinite",
        "float-bob": "floatBob 2.8s ease-in-out infinite",
        "slide-up": "slideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};
