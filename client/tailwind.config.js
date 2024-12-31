/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainLightBg: '#f7f7f7', 
        secLightBg: '#f2f4f8', 
        lightCyen:'#f2f4f8',
        secDarkBg: '#001428', 
        mainDarkBg: '#002040', 
        textLightColor: '#1c1c1c', 
        textSecLightColor: '#3f3f3f', 
        textDarkColor: '#e0e0e0',
        textSecDarkColor: '#a8a8a8', 
        darkPrimary: '#002060', 
        primary: '#423cf3', 
        secPrimary: '#9292d4', 
        blueish:'#423cf3',
        accent: '#ff5c5c', 
        darkAccent: '#c62839',
      },
    },
  }
}
