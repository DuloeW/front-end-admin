/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#041C32',
        'secondary': '#04293A',
        'tertiary': '#ECB365',
        'quaternary': '#064663',
      }
    },
  },
  plugins: [],
}