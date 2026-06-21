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
        semibold: '700',
        bold: '700',
        extrabold: '800',
        black: '800',
      },
      colors: {
        ink: '#222222',
        muted: '#666666',
        subtle: '#A0A5AD',
        page: '#F6F7F9',
        soft: '#F2F4F6',
        blush: '#FFF5F8',
        petal: '#FFB6CD',
        berry: '#FF5C93',
        shell: '#FFE8F0',
        moss: '#65A986',
        mint: '#E9F7EF',
        cream: '#FFF7E8',
        white: '#FFFFFF',
        line: '#ECECEC',
        blue: '#EAF5FF',
      },
    },
  },
  plugins: [],
};
