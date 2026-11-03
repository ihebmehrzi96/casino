import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#F04464",
          hover: "#e03353",
          light: "rgba(240, 68, 100, 0.15)",
        },
        ice: {
          DEFAULT: "#A9D8F5",
          hover: "#8ecbf2",
          light: "rgba(169, 216, 245, 0.15)",
        },
        obsidian: {
          DEFAULT: "#17131B",
          card: "#1F1A25",
          surface: "#26202D",
          border: "rgba(169, 216, 245, 0.15)",
        },
        porcelain: {
          DEFAULT: "#F8F5F2",
          muted: "rgba(248, 245, 242, 0.7)",
          subtle: "rgba(248, 245, 242, 0.4)",
        },
        matte: {
          950: "#0F0C12",
          900: "#17131B",
          850: "#1F1A25",
          800: "#26202D",
          750: "#2F2837",
          700: "#3A3244",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        tanker: ['"Tanker"', '"Poppins"', "sans-serif"],
        heading: ['"Tanker"', '"Poppins"', "sans-serif"],
        serif: ['"Sreda"', "Georgia", "serif"],
        sreda: ['"Sreda"', "Georgia", "serif"],
      },
      boxShadow: {
        "white-glow": "0 0 25px -4px rgba(255, 255, 255, 0.25)",
        "white-glow-lg": "0 0 45px -5px rgba(255, 255, 255, 0.4)",
        "matte-card": "0 10px 30px -10px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        "matte-hover": "0 20px 40px -12px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.35), 0 0 30px -5px rgba(255, 255, 255, 0.15)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float-slow": "floatSlow 5s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
