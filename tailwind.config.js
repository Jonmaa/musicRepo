/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900,
      },
      colors: {
        spotify: {
          green: "#1ed760",
          black: "#000000",
          dark: "#121212",
          gray: "#181818",
          lightgray: "#282828",
        },
      },
    },
  },
  plugins: [],
};