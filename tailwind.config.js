/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apex-black': '#050505',
        'apex-graphite': '#0f0f11',
        'apex-card': '#16161a',
        'apex-blue': '#0052FF',
        'apex-blue-neon': '#00d2ff',
        'apex-green': '#00FF66',
        'apex-gray-dark': '#222226',
        'apex-gray-light': '#a1a1aa',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Unbounded', 'sans-serif'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 3s infinite alternate',
        'pulse-neon-green': 'pulse-neon-green 3s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'grid-scroll': 'grid-scroll 20s linear infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { boxShadow: '0 0 10px rgba(0, 82, 255, 0.2), 0 0 20px rgba(0, 82, 255, 0.1)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 82, 255, 0.6), 0 0 50px rgba(0, 82, 255, 0.3)' }
        },
        'pulse-neon-green': {
          '0%': { boxShadow: '0 0 10px rgba(0, 255, 102, 0.2), 0 0 20px rgba(0, 255, 102, 0.1)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 255, 102, 0.6), 0 0 50px rgba(0, 255, 102, 0.3)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'grid-scroll': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50px)' },
        }
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
