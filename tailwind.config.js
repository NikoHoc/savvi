/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        afacadFlux: ["Afacad Flux", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui"), 
    
    // require("flowbite/plugin")({
    //   charts: true,
    // })
  
  ],
    
  daisyui: {
    themes: ["bumblebee"],
  },
};
