/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Rajdhani"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: '#0b1120',
        neon: '#7dd3fc',
        amber: '#fbbf24',
        emerald: '#34d399',
      },
      boxShadow: {
        'glow-lg': '0 0 40px rgba(125, 211, 252, 0.35)',
        'glow-sm': '0 0 15px rgba(248, 113, 113, 0.25)',
      },
    },
  },
  plugins: [],
};

