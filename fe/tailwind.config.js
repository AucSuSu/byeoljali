/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        milk: ['TAEBAEKmilkyway', 'sans-serif'], //로드 안 될 때를 대비
        big: ['TAEBAEKfont', 'sans-serif'],
        ridi: ['RIDIBatang', 'sans-serif'],
        isa: ['GongGothicMedium', 'sans-serif'],
        hambuguer : ['LOTTERIACHAB', 'sans-serif'],
        pre : ['Pretendard-Regular', 'sans-serif' ],
        jamsil : ['TheJamsil5Bold', 'sans-serif']
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
        'hot-pink': '#FF2990',
        'neon-red': '#FF007F',
        violet: '#8F00FF',
        yellow: '#F8FDDF',
        black: '#000000',
        white: '#FFFFFF',
        'light-gray': '#D7D7D7',
        gray: '#ADADAD',
        'dark-gray': '#626262',
        'blue-gray': '#343444',
        'deep-dark': '#222222',
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
        156: '39rem', // 624px
        160: '40rem', // 640px
        164: '41rem', // 656px
        168: '42rem', // 672px
        172: '43rem', // 688px
        176: '44rem', // 704px
        180: '45rem', // 720px
        184: '46rem', // 736px
        188: '47rem', // 752px
        192: '48rem', // 768px
        196: '49rem', // 784px
        200: '50rem', // 800px
        204: '51rem', // 816px
        208: '52rem', // 832px
        212: '53rem', // 848px
        216: '54rem', // 864px
        220: '55rem', // 880px
        224: '56rem', // 896px
        228: '57rem', // 912px
        232: '58rem', // 928px
        236: '59rem', // 944px
        240: '60rem', // 960px
        244: '61rem', // 976px
        248: '62rem', // 992px
        252: '63rem', // 1008px
        256: '64rem', // 1024px
        260: '65rem', // 1040px
        264: '66rem', // 1056px
        268: '67rem', // 1072px
        272: '68rem', // 1088px
        276: '69rem', // 1104px
        280: '70rem', // 1120px
        284: '71rem', // 1136px
        288: '72rem', // 1152px
        292: '73rem', // 1168px
        296: '74rem', // 1184px
        300: '75rem', // 1200px
      },
    },
  },
  plugins: [],
};
