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



// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {
//       fontFamily: {
//         display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
//       },
//       colors: {
//         wine: {
//           DEFAULT: '#D4AF37', // The exact rich, shiny gold you liked
//           50: '#FDFCEF',
//           100: '#F9F1D8',
//           200: '#F0DFA0',
//           300: '#E6C85E', // Slightly lighter gold for dark backgrounds
//           400: '#FFD700', // The pure bright gold (useful for hover states)
//           500: '#D4AF37', // Your new primary rich metallic gold
//           600: '#B8960C', // Slightly darker gold
//           700: '#8F7209', // Deep antique gold
//           800: '#654F06', // Dark bronze-gold
//           900: '#3B2D03', // Very dark gold
//           950: '#1F1701', // Almost black gold
//         },
//       },
//       letterSpacing: {
//         ultrawide: '0.3em',
//         mega: '0.5em',
//       },
//     },
//   },
//   plugins: [],
// };