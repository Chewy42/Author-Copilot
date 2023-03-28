module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#2563EB",
        background: "#F3F4F6",
        accent: "#F59E0B",
        danger: "#DC2626",
        textPrimary: "#111827",
        textSecondary: "#4B5563",
        cta: "#F87171", // Call-to-action color
        success: "#34D399",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      fontWeight: {
        normal: 400,
        bold: 700,
      },
      boxShadow: {
        md: "0px 4px 4px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        md: "0.5rem",
      },
    },
  },
  plugins: [],
};
