/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2C4F63',
          DEFAULT: '#1E3A4A',
          dark: '#152A36',
        },
        accent: {
          light: '#DDBE71',
          DEFAULT: '#C9A84C',
          dark: '#B08F3A',
        },
        offwhite: '#F8F6F1',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
      },
      maxWidth: {
        wrap: '1200px',
      },
    },
  },
  plugins: [],
}
