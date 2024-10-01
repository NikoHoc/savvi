# Setup Tailwind
npm install -D tailwindcss
npx tailwindcss init

# Setup DaisyUI
npm i -D daisyui@latest

in tailwind.config.js, add require('daisyui') in plugins
module.exports = {
  //...
  plugins: [
    require('daisyui'),
  ],
}

# Run Project
npm run build
