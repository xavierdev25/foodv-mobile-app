/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}", 
    "./src/**/*.{js,ts,jsx,tsx}",  
    "./App.{js,ts,jsx,tsx}",      
  ],
  darkMode: "class", //<- para el toggle
  presets: [require("nativewind/preset")],
  theme: {
    extend: {

      colors: {
        background: {
          light: "#ffffffff",
          dark: "#121212",
        },
        text: {
          light: "#1A1A1A",
          dark: "#E5E7EB",
        },
        affirmative: {
          light: "#34D399",
          dark: "#10B981",
        },
        negative: {
          light: "#F87171",
          dark: "#EF4444",
        },
        tertiary: {
          light: "#93C5FD",
          dark: "#60A5FA",
        },
      },
    },
  },
};

 /*Tal vez en el futuro:
 `muted` text       : Textos secundarios
 `accent` color     : Resaltar algún elemento extra
 `surface` color    : Cards, modales, contenedores
 `border` principal : Para inputs, cards, etc.
 */