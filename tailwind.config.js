/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'win': {
          'bg': '#c0c0c0',
          'dark': '#808080',
          'darker': '#404040',
          'light': '#dfdfdf',
          'white': '#ffffff',
          'black': '#000000',
          'desktop': '#008080',
          'title': '#000080',
          'highlight': '#000080',
        }
      },
      fontFamily: {
        'win': ['Tahoma', '"MS Sans Serif"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}