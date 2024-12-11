/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Custom primary color
        secondary: "#9333EA", // Custom secondary color
        accent: "#F59E0B", // Custom accent color
        neutral: "#3D4451",
        base: "#FFFFFF", // Custom base color
      },
      spacing: {
        128: "32rem", // Custom spacing
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem", // Custom border radius
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Custom font family
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
    },
  },
  plugins: [],
};
