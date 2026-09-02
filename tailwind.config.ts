import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B3D33", // deep kiswah green — hero / dark surfaces
        inkdeep: "#082921",
        gold: "#C6992E", // single accent, used sparingly
        goldsoft: "#E7CE8C",
        sand: "#F1EAD9", // warm neutral section background
        sandline: "#E2D7BE",
        charcoal: "#1A1814", // body text
        stone: "#5C574C", // secondary text
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      maxWidth: {
        prose: "38rem",
      },
      animation: {
        "spin-slow": "spin 2.2s linear infinite",
        "pulse-slow": "pulse-slow 2.4s ease-in-out infinite",
        "toast-in": "toast-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(0.94)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
