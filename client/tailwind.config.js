/** @type {import('tailwindcss').Config} */

// import forms from '@tailwindcss/forms';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainLightBg: '#f2f2f2', // Slightly darker off-white background
        secLightBg: '#f2f4f8', // Medium light gray background
        lightCyen:'#f2f4f8',
        secDarkBg: '#001428', // Deeper navy blue background
        mainDarkBg: '#002040', // Darker blue background
        textLightColor: '#1c1c1c', // Darker gray text
        textSecLightColor: '#3f3f3f', // Darker medium gray text
        textDarkColor: '#e0e0e0', // Lighter almost white text
        textSecDarkColor: '#a8a8a8', // Slightly darker light gray text
        darkPrimary: '#002060', // Darker blue
        primary: '#423cf3', // Darker bright blue
        secPrimary: '#9292d4', // Darker bright blue
        blueish:'#423cf3',
        accent: '#ff5c5c', // Darker coral
        darkAccent: '#c62839', // Darker deep pink
      },
    },
  }
  // plugins: [
  //   forms,
  // ],
}
