/*******************/
/** Tailwind Config **/
/*******************/
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#84d9e3ff',
          600: '#46e5ddff'
        }
      }
    },
  },
  plugins: [],
}
