/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#2596be',
      },
      backgroundImage: {
        banner: `url(../public/images/banner.jpg)`,
      },
    },
  },
  plugins: [],
};
