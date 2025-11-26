/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Circular Spotify Text"', 'system-ui', 'sans-serif'],
      },
      colors: {
        spotify: {
          green: "#1ed760",
          dark: "#121212",
          gray: "#181818",
          lightgray: "#282828",
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};