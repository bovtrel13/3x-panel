/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a2a44', // Фон страницы (оставляем как есть)
        'dark-panel': '#1e2a44', // Темнее, как на фото
        'dark-input': '#2a3b5a', // Светлее, как на фото
        'teal-accent': '#00c4b4', // Яркий бирюзовый для кнопки
        'gray-divider': '#4a5b7a', // Цвет разделителя перед глазиком
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};