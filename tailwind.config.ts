import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          crimson:     "#C8102E",
          "crimson-dark": "#8B0A1E",
          "crimson-light": "#E8294A",
          gold:        "#FFD700",
          "gold-dark": "#C9A800",
          "gold-light":"#FFE44D",
        },
        surface: {
          950: "#09090f",
          900: "#111118",
          800: "#18181f",
          700: "#22222c",
          600: "#2e2e3a",
          500: "#3d3d4d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(200,16,46,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 120%, rgba(255,215,0,0.08) 0%, transparent 50%)",
        "gold-shimmer":
          "linear-gradient(135deg, #C9A800 0%, #FFD700 50%, #C9A800 100%)",
        "crimson-shimmer":
          "linear-gradient(135deg, #8B0A1E 0%, #C8102E 50%, #8B0A1E 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(24,24,31,0.95) 0%, rgba(34,34,44,0.90) 100%)",
      },
      boxShadow: {
        "gold-glow":  "0 0 24px rgba(255,215,0,0.25), 0 4px 16px rgba(0,0,0,0.4)",
        "crimson-glow": "0 0 24px rgba(200,16,46,0.30), 0 4px 16px rgba(0,0,0,0.4)",
        "card-shadow": "0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05) inset",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "shimmer":  "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
