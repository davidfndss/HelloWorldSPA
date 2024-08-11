/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'right': '50px 0px 0px 50px',
        'left': '0px 50px 50px 0px',
        'right-sm': '4px 0px 0px 4px',
        'left-sm': '0px 4px 4px 0px',
      },
    },
  },
  plugins: [],
}