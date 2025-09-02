/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        weather: {
          sunny: '#FDB813',
          cloudy: '#9CA3AF',
          rainy: '#3B82F6',
          stormy: '#6B46C1',
        },
      },
      animation: {
        'weather-float': 'weatherFloat 6s ease-in-out infinite',
        'rain-drop': 'rainDrop 1s ease-in infinite',
      },
      keyframes: {
        weatherFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rainDrop: {
          '0%': { transform: 'translateY(-100px)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'translateY(100px)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
