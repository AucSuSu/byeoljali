/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        milk: ['TAEBAEKmilkyway', 'sans-serif'], //로드 안 될 때를 대비
        big: ['TAEBAEKfont', 'sans-serif'],
        ridi: ['RIDIBatang', 'sans-serif'],
      },
      fontSize: {
        12: '12px',
        15: '15px',
        18: '18px',
        25: '25px',
        27: '27px',
        30: '30px',
        35: '35px',
        40: '40px',
        48: '48px',
        60: '60px',
      },
      colors: {
        'hot-pink': '#FF6D79',
        violet: '#8F00FF',
        yellow: '#F8FDDF',
        black: '#000000',
        white: '#FFFFFF',
        'light-gray': '#D7D7D7',
        gray: '#ADADAD',
        'dark-gray': '#626262',
        'blue-gray': '#343444',
        'kakao-yellow': '#FEE500',
        'sky-blue': '#00FFFF',
        red: '#FF0000',
        neonBlue: '#00FFFF',
        neonGreen: '#39FF14',
      },
      spacing: {
        96: '24rem', // 기존의 값
        100: '25rem', // 400px
        104: '26rem', // 416px
        108: '27rem', // 432px
        112: '28rem', // 448px
        116: '29rem', // 464px
        120: '30rem', // 480px
        124: '31rem', // 496px
        128: '32rem', // 512px
        132: '33rem', // 528px
        136: '34rem', // 544px
        140: '35rem', // 560px
        144: '36rem', // 576px
        148: '37rem', // 592px
        152: '38rem', // 608px
        // 계속 추가 가능
      },
    },
  },
  plugins: [],
};
