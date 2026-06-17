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
        normal: '500',
        medium: '500',
        semibold: '700',
        bold: '700',
        extrabold: '800',
        black: '800',
      },
      colors: {
        ink: '#191F28',
        muted: '#8B95A1',
        subtle: '#B0B8C1',
        page: '#F7F8FA',
        soft: '#F2F4F6',
        blush: '#FFF5F8',
        petal: '#FFB6CD',
        berry: '#F0447D',
        shell: '#FFE8F0',
        moss: '#65A986',
        mint: '#E9F7EF',
        cream: '#FFF7E8',
        white: '#FFFFFF',
        line: '#E9ECEF',
        blue: '#EAF5FF',
      },
    },
  },
  plugins: [],
};
