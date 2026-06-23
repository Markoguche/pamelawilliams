/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          300: '#E8C97A',
          400: '#D4A853',
          500: '#C49A3C',
          600: '#A67C2E',
        },
      },
      letterSpacing: {
        ultrawide: '0.3em',
        mega: '0.5em',
      },
    },
  },
  plugins: [],
};