import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,pcss}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f1115",
        foreground: "#f5f5f0",
        muted: "#1c1e24",
        accent: "#9ec6ff",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      screens: {
        xs: "400px",
      },
      boxShadow: {
        floating: "0 20px 40px -20px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
