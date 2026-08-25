/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAF7",
        surface: "#FFFFFF",
        primary: "#164E45",
        secondary: "#2563EB",
        accent: "#3F8F6B",
        "soft-green": "#E8F3EC",
        "soft-blue": "#EAF1FB",
        text: "#17211D",
        muted: "#66736D",
        border: "#DDE5DF",
        warning: "#B3413A",
        amber: "#B8863A",
        "warning-bg": "#FDF0EF",
        "amber-bg": "#FDF5E8",
      },
      fontFamily: {
        sans: ["Inter", "Geist", "Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["44px", { lineHeight: "1.1", fontWeight: "600" }],
        h1: ["30px", { lineHeight: "1.25", fontWeight: "600" }],
        h2: ["21px", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["17px", { lineHeight: "1.4", fontWeight: "500" }],
        body: ["15px", { lineHeight: "1.55" }],
        sm: ["13px", { lineHeight: "1.45" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(23,33,29,0.06), 0 1px 3px rgba(23,33,29,0.04)",
        modal: "0 4px 16px rgba(23,33,29,0.1), 0 2px 6px rgba(23,33,29,0.06)",
        focus: "0 0 0 3px rgba(22,78,69,0.25)",
      },
      spacing: {
        "4.5": "18px",
        "18": "72px",
        "sidebar": "240px",
      },
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease both",
        "slide-up": "slideUp 0.3s ease both",
        "count-up": "countUp 1s ease both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
