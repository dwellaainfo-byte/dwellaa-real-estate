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
        primary: {
          50: '#f8f7f4',
          100: '#f0ede4',
          200: '#e0d9c4',
          300: '#cec29f',
          400: '#bda67a',
          500: '#b0915f',
          600: '#a17f53',
          700: '#866547',
          800: '#6e533f',
          900: '#5a4436',
          950: '#30241c',
        },
        secondary: {
          50: '#f6f7f9',
          100: '#edeef2',
          200: '#d6dae2',
          300: '#b3bcc9',
          400: '#8a97ab',
          500: '#6b7b91',
          600: '#566278',
          700: '#465062',
          800: '#3c4453',
          900: '#353c47',
          950: '#23272f',
        },
        luxury: {
          gold: '#d4af37',
          darkGold: '#b8941f',
          cream: '#faf8f5',
          charcoal: '#2d2d2d',
          silver: '#c0c0c0',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #faf8f5 0%, #f0ede4 100%)',
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        'luxury-lg': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}