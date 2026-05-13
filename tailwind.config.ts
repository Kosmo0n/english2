import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1020',
          800: '#0f1630',
          700: '#131a3a',
          600: '#1a2347',
        },
        primary: {
          DEFAULT: '#7B61FF',
          light: '#9d87ff',
          dark: '#5a43d9',
        },
        accent: {
          DEFAULT: '#FF4DCE',
          light: '#ff7ddd',
          dark: '#d926a6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7B61FF, #FF4DCE)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(123,97,255,0.15) 0%, transparent 70%)',
        'gradient-card': 'linear-gradient(135deg, rgba(123,97,255,0.1), rgba(255,77,206,0.05))',
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(123,97,255,0.4), 0 0 40px rgba(123,97,255,0.1)',
        'neon-pink': '0 0 20px rgba(255,77,206,0.4), 0 0 40px rgba(255,77,206,0.1)',
        'neon-sm': '0 0 10px rgba(123,97,255,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(123,97,255,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(123,97,255,0.8), 0 0 60px rgba(255,77,206,0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
