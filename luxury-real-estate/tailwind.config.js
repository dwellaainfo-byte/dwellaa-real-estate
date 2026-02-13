/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: '#1e40af',      // Blue instead of gold
          darkGold: '#1d4ed8',  // Darker blue
          charcoal: '#2d2d2d',
        }
      }
    },
  },
  plugins: [],
}