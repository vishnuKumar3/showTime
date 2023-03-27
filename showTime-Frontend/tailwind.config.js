/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        appRedColor: "#E50914"
      },
      borderWidth: {
        '1': '1px'
      }
    },
  },
  plugins: [],
}
