/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX files in src
    "./public/index.html",
  ],
  theme: {
    extend: {
       // Add custom theme settings here if needed (e.g., colors, fonts)
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example: Add a custom font
      },
      colors: {
        'primary': '#1E40AF', // Example primary color (blue-800)
        'secondary': '#DB2777', // Example secondary color (pink-600)
        'light-bg': '#F9FAFB', // Example light background (gray-50)
        'dark-text': '#1F2937', // Example dark text (gray-800)
        'medium-text': '#4B5563', // Example medium text (gray-600)
      }
    },
  },
  plugins: [],
}