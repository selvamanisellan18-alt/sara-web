/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#060309',
          900: '#0B0612',
          850: '#120A1E',
          800: '#1B0E2E',
          700: '#2A1747',
        },
        roseGold: {
          100: '#FDF2F4',
          200: '#F9D8DE',
          300: '#F3B4C0',
          400: '#E87D94',
          500: '#DC4C6E',
          600: '#C23055',
        },
        champagne: {
          100: '#FFFDF5',
          200: '#FEF9E3',
          300: '#FBF0C0',
          400: '#F5DE88',
          500: '#EAC352',
          600: '#C99E2F',
        },
        crimson: {
          500: '#E11D48',
          600: '#BE123C',
          700: '#9F1239',
          900: '#4C0519',
        }
      },
      fontFamily: {
        caveat: ['"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        cursive: ['"Caveat"', 'cursive'],
        script: ['"Alex Brush"', 'cursive'],
        cinzel: ['"Cinzel Decorative"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-very-slow': 'spin 40s linear infinite',
        'border-blink': 'borderBlink 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.08)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderBlink: {
          '0%, 100%': { borderColor: 'rgba(244, 114, 182, 0.4)', boxShadow: '0 0 15px rgba(244, 114, 182, 0.3)' },
          '50%': { borderColor: 'rgba(225, 29, 72, 0.85)', boxShadow: '0 0 25px rgba(225, 29, 72, 0.65)' },
        }
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'aurora-glow': 'conic-gradient(from 180deg at 50% 50%, #e11d48 0deg, #7c3aed 120deg, #db2777 240deg, #e11d48 360deg)',
      }
    },
  },
  plugins: [],
}
