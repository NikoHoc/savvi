/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        afacadFlux: ['Afacad Flux', 'sans-serif']
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ['bumblebee']
  }
}

