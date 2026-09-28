/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        paper: '#f4f4ef',
        pink: '#ff63b4',
        plum: '#982456',
        acid: '#e5fa48',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        display: ['Anton', 'Impact', '"Arial Narrow"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
