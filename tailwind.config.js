 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./script/**/*.js",   ],
   theme: {
     extend: {
      backgroundImage:{
        carpenter: "url('/images/backgroundcarpenter1.jpg')",
        cart: "url('/images/backgroundcart1.jpg')"
      }
     },
   },
   plugins: [],
 }