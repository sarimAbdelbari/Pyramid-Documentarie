module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       mainLightBg: '#fcfcfc', // Elegant white background
  //       secLightBg: '#e2e2e2', // Classy light gray background
  //       mainDarkBg: '#001f3f', // Elegant dark blue background
  //       secDarkBg: '#002d72', // Sophisticated navy background
  //       textLightColor: '#1a1a1a', // Very dark gray text
  //       textSecLightColor: '#4f4f4f', // Medium gray text
  //       textDarkColor: '#fcfcfc', // Elegant white text
  //       textSecDarkColor: '#d0d0d0', // Light gray text
  //       darkPrimary: '#003f6c', // Deep navy blue
  //       primary: '#0056a0', // Vibrant blue
  //       accent: '#ff6f61', // Coral
  //       darkAccent: '#c71585', // Medium violet red
  //     },
  //   },
  // },
  
  theme: {
    extend: {
      colors: {
        mainLightBg: '#f2f2f2', // Slightly darker off-white background
        secLightBg: '#d0d0d0', // Medium light gray background
        mainDarkBg: '#001f3f', // Deeper navy blue background
        secDarkBg: '#00274d', // Darker blue background
        textLightColor: '#1c1c1c', // Darker gray text
        textSecLightColor: '#3f3f3f', // Darker medium gray text
        textDarkColor: '#e0e0e0', // Lighter almost white text
        textSecDarkColor: '#a8a8a8', // Slightly darker light gray text
        darkPrimary: '#002060', // Darker blue
        primary: '#0056b3', // Darker bright blue
        accent: '#ff5c5c', // Darker coral
        darkAccent: '#c62839', // Darker deep pink
      },
    },
  },
  
  
  
  
  
  
  // theme: {
  //   extend: {
  //     colors: {
  //       mainLightBg: '#f9f9f9', // Slightly off-white background
  //       secLightBg: '#e5e5e5', // Light gray background
  //       mainDarkBg: '#0a1f3b', // Deep navy blue background
  //       secDarkBg: '#003366', // Dark blue background
  //       textLightColor: '#212121', // Dark gray text
  //       textSecLightColor: '#484848', // Medium gray text
  //       textDarkColor: '#f9f9f9', // Almost white text
  //       textSecDarkColor: '#c0c0c0', // Light gray text
  //       darkPrimary: '#004080', // Dark blue
  //       primary: '#0073e6', // Bright blue
  //       accent: '#ff6f61', // Coral
  //       darkAccent: '#e63e4b', // Deep pink
  //     },
  //   },
  // },
  
  
  
  
  // theme: {
  //   extend: {
  //     colors: {
  //       mainLightBg: '#f3f3f3', // mainLightBackground
  //       secLightBg: '#e2e2e2', // secondaryLightBackground
  //       mainDarkBg: '#111827', // mainDarkBackground
  //       secDarkBg: '#202E4B', // secondaryDarkBackground
  //       textlightColor : '#010101',
  //       textSecLightColor : '#1A1A1A',
  //       textDarkColor : '#f3f3f3',
  //       textSecDarkColor : '#D9D9D9',
  //       darkPrimary: '#0554a2',
  //       primary: '#0a74da',
  //       accent: '#e10614',
  //       darkAccent: '#ff4b5c',
  //     },
  //   },
  // },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

