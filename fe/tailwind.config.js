/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        milk: ['TAEBAEKmilkyway', 'sans-serif'], //로드 안 될 때를 대비
      },
      fontSize: {
        15: '15px',
        18: '18px',
        25: '25px',
      },
      colors: {
        'hot-pink': '#FF6D79',
        pink: '#FDDADA',
        yellow: '#F8FDDF',
        black: '#000000',
        white: '#FFFFFF',
        'light-gray': '#D7D7D7',
        gray: '#7D7D7D',
        'kakao-yellow': '#FEE500',
      },
    },
  },
  plugins: [],
};
