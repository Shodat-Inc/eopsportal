/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        OpenSans : ["'Open Sans'", "sans-serif"]
      },
      colors: {
        themeYellow: '#fed136',
        yellow :{
          950:'#fed136', 
          951:'#fed136'
        },
        gray: {
          950: '#B3B3B3',
          951: '#A4ADBC',
          952: '#7F7F7F',
          953: '#F8F8F8',
          954: '#A7A7A7',
          955: '#272727'
        },
        blue: {
          951: '#B4BBD2',
          952: '#9AAEE2',
          953: '#2B4C74'
        },
        green: {
          951: '#C2D9C4',
          952: '#626F48'
        },
        pink: {
          951: '#E29A9A'
        },
        red: {
          951: '#AB3939'
        },
        brown: {
          951: '#9A7122'
        }
      },
      backdropBrightness: {
        25: '.25',
      }
    },
  },
  plugins: [],
})
