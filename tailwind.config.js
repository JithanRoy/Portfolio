/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: "#161a23",
          surface: "#222831",
          elevated: "#393E46",
        },
        accent: {
          teal: "#00ADB5",
          coral: "#FF6B6B",
          amber: "#FFB454",
          violet: "#A78BFA",
        },
        text: {
          primary: "#EEEEEE",
          muted: "#B8BCC4",
        },
        // legacy aliases kept so any stray reference doesn't crash
        primary: "#00ADB5",
        secondary: "#A78BFA",
        texlight: "#B8BCC4",
        bgPrimary: "#161a23",
      },
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Outfit", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #00ADB5 0%, #A78BFA 100%)",
        "gradient-decor": "linear-gradient(135deg, #FF6B6B 0%, #FFB454 100%)",
        "gradient-teal-amber": "linear-gradient(90deg, #00ADB5 0%, #FFB454 100%)",
      },
      keyframes: {
        "blob-drift": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(20px,-30px) scale(1.1)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "blob-drift": "blob-drift 12s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
