/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#09BBE6",
        secondary: "#00ACD6",
        darkPrimary: "0086D3",
        dark: "#000000",
      },
    },
  },
  plugins: [],
};
