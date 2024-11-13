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
        '1.28/1': '1.28 / 1'
      },
      maxWidth: {
        '1920': '1920px',
      },
      screens: {
        'xs': '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      zIndex: {
        '100': '100',
      }
    },
    
  },
  plugins: [],
};
