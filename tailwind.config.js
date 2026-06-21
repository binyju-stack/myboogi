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
        muted: '#6B7280',
        subtle: '#9CA3AF',
        page: '#F6F7F9',
        soft: '#F3F4F6',
        blush: '#FFF1F6',
        petal: '#FFB6CD',
        berry: '#FF5C93',
        shell: '#FFE8F0',
        moss: '#65A986',
        mint: '#E9F7EF',
        cream: '#FFF7E8',
        white: '#FFFFFF',
        line: '#E5E7EB',
        blue: '#EAF5FF',
      },
    },
  },
  plugins: [],
};
