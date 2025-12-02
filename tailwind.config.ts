import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cv: {
          bg: "#f5f5f5",
          panel: "#ffffff",
          text: "#111111",
          muted: "#4b4b4b",
          border: "#e0e0e0",
          accent: "#000000",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      letterSpacing: {
        cvtight: "-0.04em",
        cvwide: "0.18em",
      },
    },
  },
  plugins: [],
} satisfies Config;
