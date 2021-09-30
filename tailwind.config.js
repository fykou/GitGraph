module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        bestGray: {
          lighter: '#313757',
          light: '#272C45',
          DEFAULT: '#24252A',
          dark: '#24252A',
          darker: '#141417',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
