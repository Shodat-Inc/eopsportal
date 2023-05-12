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
        yellow :{
          950:'#fed136'
        },
        gray: {
          950: '#B3B3B3',
          951: '#A4ADBC'
        },
        blue: {
          951: '#B4BBD2',
          952: '#9AAEE2'
        },
        green: {
          951: '#C2D9C4'
        },
        pink: {
          951: '#E29A9A'
        }
      },
      backdropBrightness: {
        25: '.25',
      }
    },
  },
  plugins: [],
}
