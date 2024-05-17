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
          100: '#FDF7E4',
          200: '#FFFBDA',
          300: '#FFEC9E',
          400: '#FFBB70',
          500: '#ED9455'
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}