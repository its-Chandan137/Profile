import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        night: "#0a0a0f",
        cyan: "#00d4ff",
        violet: "#7c3aed"
      },
      fontFamily: {
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 32px rgba(0, 212, 255, 0.28)",
        violet: "0 0 32px rgba(124, 58, 237, 0.24)"
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)"
      }
    }
  },
  plugins: []
};

export default config;
