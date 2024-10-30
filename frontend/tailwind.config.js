/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
        '3500': '3500ms'
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      maxWidth: {
        '1920': '1920px', // 사용자 정의 max-width 클래스 추가
      },
    },
  },
  plugins: [],
};
