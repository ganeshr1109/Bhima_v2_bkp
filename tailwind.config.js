/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E85A1C',
          green: '#0D6832',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        hindi: ['"Tiro Devanagari Hindi"', 'serif'],
      },
    },
  },
  plugins: [],
}
