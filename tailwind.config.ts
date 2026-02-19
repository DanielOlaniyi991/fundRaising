import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        checkBg: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        check: {
          "0%": { strokeDashoffset: "48" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        ripple: "ripple 1s ease-out infinite",
        "check-bg": "checkBg 0.5s ease-in-out forwards",
        check: "check 0.5s ease-in-out 0.5s forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
