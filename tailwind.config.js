/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007AFF',
          dark: '#0A84FF',
        },
        background: {
          DEFAULT: '#F2F2F7',
          dark: '#000000',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1C1C1E',
        },
        'text-primary': {
          DEFAULT: '#000000',
          dark: '#FFFFFF',
        },
        'text-secondary': {
          DEFAULT: '#8E8E93',
          dark: '#98989D',
        },
        border: {
          DEFAULT: '#C6C6C8',
          dark: '#38383A',
        },
        error: {
          DEFAULT: '#FF3B30',
          dark: '#FF453A',
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
      },
    },
  },
  plugins: [],
}
