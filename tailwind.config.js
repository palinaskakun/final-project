/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        topPurple: {
          DEFAULT: 'rgb(230,223,253)',
        },
      },

    },
  },
  plugins: [],
}
