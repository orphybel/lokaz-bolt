/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        paper: '#f4f4ef',
        accent: { DEFAULT: '#ff6b2c', dark: '#b3400b' },
        acid: '#e5fa48',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        display: ['Anton', 'Impact', '"Arial Narrow"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
