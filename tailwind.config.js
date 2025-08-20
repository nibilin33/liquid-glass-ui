// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/liquid-tailwind-react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: { glass: 'rgba(255,255,255,0.2)' },
      backdropBlur: { xl: '20px' },
      boxShadow: { glass: '0 8px 32px rgba(0,0,0,0.1)' }
    },
  },
  plugins: [],
});
