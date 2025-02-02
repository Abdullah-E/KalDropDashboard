/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#FFCA3A",
        black: "#000004",
        white: "#FFFFFF",
        blue: "#2774FB",
        brown: "#8A716A",
        // Complementary colors
        teal: "#2DD4BF", // A fresh teal for accents
        gray: {
          100: "#F3F4F6", // Light gray for backgrounds
          700: "#374151", // Dark gray for text
        },
        indigo: "#4B244A",
        purple:"#AEC7FF",
      },
    },
  },
  plugins: [],
}