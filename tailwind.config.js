
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bungee': ["Bungee Shade","sans serif"], },
    },
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#7C00FE",
          "secondary": "#F9E400",
          "accent": "#FFDE95",
          "neutral": "white",
          "base-100": "white",
          "error": "#C70039",
        },
      },
    ],

  },


  plugins: [require('daisyui')],
}

