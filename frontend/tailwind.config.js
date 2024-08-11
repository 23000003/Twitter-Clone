/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      filter: {
        'invert-white': 'invert(100%) sepia(100%) saturate(0%) hue-rotate(73deg) brightness(100%) contrast(103%)',
      },
      fontFamily: {
        twitterChirp: ['TwitterChirp', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-filters'), //dependency
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.filter-invert-white': {
          filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(73deg) brightness(100%) contrast(103%)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }),
  ],
}
