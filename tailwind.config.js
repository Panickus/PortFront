/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Habilitar el modo oscuro con la clase 'dark'
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Colores para el modo claro
        light: {
          background: '#ffffff',
          text: '#1f2937',
          primary: '#3b82f6',
          secondary: '#f59e0b',
          accent: '#10b981',
        },
        // Colores para el modo oscuro
        dark: {
          background: '#1f2937',
          text: '#f3f4f6',
          primary: '#2563eb',
          secondary: '#d97706',
          accent: '#059669',
        },
      },
    },
  },
  plugins: [],
};