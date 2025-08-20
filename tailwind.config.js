// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",   
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/liquid-tailwind-react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: { glass: 'rgba(255,255,255,0.2)' },
      backdropBlur: { xl: '20px' },
      boxShadow: { glass: '0 8px 32px rgba(0,0,0,0.1)' }
    },
  },
  plugins: [],
}
