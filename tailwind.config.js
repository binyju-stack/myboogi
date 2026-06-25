/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '700',
        black: '700',
      },
      colors: {
        ink: '#111827',
        muted: '#94A3B8',
        subtle: '#94A3B8',
        page: '#FFFFFF',
        soft: '#F8FAFC',
        blush: '#FFF2F6',
        petal: '#FF8AB0',
        berry: '#FF2E6F',
        shell: '#FFF5F8',
        moss: '#65A986',
        mint: '#E9F7EF',
        cream: '#FFF7E8',
        white: '#FFFFFF',
        line: '#EEF2F6',
        blue: '#EAF5FF',
      },
    },
  },
  plugins: [],
};
