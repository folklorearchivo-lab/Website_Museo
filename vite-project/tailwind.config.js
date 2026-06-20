/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        linen: '#FFF9F3',
        'warm-sand': '#E2C1A1',
        'sage-archive': '#B0AC91',
        'form-bg': '#C5A687',
        'dark-umber': '#291804',
        mauve: '#755151',
        'deep-olive': '#44422D',
        primary: '#72583E',
        secondary: '#7C7960',
        tertiary: '#755151',
        'cafe-noir': '#443223',
        'gallery-cream': '#FFEEE0',
      },
      fontFamily: {
        serif: ['"Libre Caslon Text"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
