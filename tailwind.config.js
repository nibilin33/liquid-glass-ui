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
      colors: {
        glass: 'rgba(220,240,220,0.6)',
        emerald: {
          DEFAULT: '#1A7F64',
          50: '#E6F4EE',
          100: '#C8E9DB',
          200: '#A3DCC7',
          300: '#7ECFB3',
          400: '#59C29F',
          500: '#34B58B',
          600: '#1A7F64',
          700: '#166A54',
          800: '#115544',
          900: '#0D4034',
        },
      },
      backdropBlur: { xl: '20px' },
      boxShadow: { glass: '0 8px 32px rgba(0,0,0,0.1)' }
    },
  },
  plugins: [],
});
