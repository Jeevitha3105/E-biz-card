/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#010851",
        "secondary": "#9A7AF1",
        "tartiary":"#707070",
        "pink":"#EE9AE5"
      },
      boxShadow:{
        '3xl':'0 10px 50px 0px rgba(0,0,0,0.15)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
      },
      background:{
        site:"url('./assets/Premium Vector _ Gradient geometric shape background.jpg')"
      }
    },
  plugins: [],
}
}