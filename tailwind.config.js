/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@ultivis-iot/react/tailwind.config")],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@ultivis-iot/react/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00FF00",
        "dark-primary": "#00FF00",
      },
    },
  },
  plugins: [],
};
