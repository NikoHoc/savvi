How to setup tailwind:
npm install -D tailwindcss
npx tailwindcss init

run: npm run build




DaisyUI:
npm i -D daisyui@latest

in tailwind.config.js, add require('daisyui') in plugins
module.exports = {
  //...
  plugins: [
    require('daisyui'),
  ],
}
