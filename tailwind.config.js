/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './assets/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '6rem',
        xl: '6rem',
        '2xl': '8rem',
      },
    },
    extend: {
      colors: {
        'bm-blue': '#3173D0',
        'action-red': '#EE6161',
      },
      fontSize: {
        sm: '12px',
        xsm: '13px',
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      spacing: {
        40: '40px',
        64: '64px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
