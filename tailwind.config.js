/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        OpenSans: ["'Open Sans'", "sans-serif"]
      },
      colors: {
        themeYellow: '#fed136',       
        yellow: {
          950: '#fed136',
          951: '#fed136',
          957: '#FFF3CD',
          958: '#FFEEBA',
          959: '#856404'
        },
        gray: {
          950: '#B3B3B3',
          951: '#A4ADBC',
          952: '#7F7F7F',
          953: '#F8F8F8',
          954: '#A7A7A7',
          955: '#272727',
          956: '#F5F5F5'
        },
        blue: {
          951: '#B4BBD2',
          952: '#9AAEE2',
          953: '#2B4C74',
          957: '#CCE5FF',
          958: '#B8DAFF',
          959: '#004085'
        },
        green: {
          951: '#C2D9C4',
          952: '#626F48',
          957: '#D4EDDA',
          958: '#C3E6CB',
          959: '#155724'
        },
        pink: {
          951: '#E29A9A'
        },
        red: {
          951: '#AB3939',
          952: '#DC3545',
          957: '#F8D7DA',
          958: '#F5C6CB',
          959: '#721C24',
          500: '#F5C6CB',
        },
        brown: {
          951: '#9A7122'
        },
        orange: {
          951: '#FFF2C6'
        }
      },
      backdropBrightness: {
        25: '.25',
      }
    },
  },
  plugins: [],
})
