/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{tsx,css,js}"
  ],
  theme: {
    extend: {
      backgroundColor:{
        bodyColor:"#e5e7eb",
        primeColor:"#fa7316",
        sideBarButtonBackground:"#fff1e7"
      },
      textColor:{
        textColor:"#e5e7eb"
      }
      // fontFamily:{
      //   'Roboto':['Roboto', 'sans-serif']
      // }
     
    },
  },
  plugins: [],
}

