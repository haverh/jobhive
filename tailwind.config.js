/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          100: '#fee9d2',
          200: '#ffd2a1',
          300: '#ffbb70',
          400: '#ffa33f',
          500: '#ff8c0e',
          600: '#dc7300',
          700: '#ab5900',
          800: '#ab5900'
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}