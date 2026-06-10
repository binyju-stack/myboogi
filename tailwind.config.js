/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ink: '#31272B',
        muted: '#8B7C82',
        blush: '#FFF7FA',
        petal: '#F7B8CB',
        berry: '#D95783',
        shell: '#FBE1EA',
        moss: '#6F9B82',
        mint: '#DBF0E4',
        cream: '#FFF9ED',
      },
    },
  },
  plugins: [],
};
