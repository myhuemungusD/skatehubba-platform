import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class', // We force dark via CSS variables — no light mode ever
  content: [
    // Web app
    './apps/web/src/**/*.{ts,tsx}',
    './apps/web/components/**/*.{ts,tsx}',
    
    // Mobile app (Expo)
    './apps/mobile/app/**/*.{ts,tsx}',
    './apps/mobile/components/**/*.{ts,tsx}',
    
    // Shared UI package
    './packages/ui/src/**/*.{ts,tsx}',
    
    // Any other packages
    './packages/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        ink: '#0a0a0a',
        paper: '#f5f3ef',
        neon: '#39ff14',
        grime: '#1c1c1c',
        blood: '#b80f0a',
        gold: '#e3c300',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        pressstart: ['var(--font-pressstart)', 'monospace'],
      },
      boxShadow: {
        grit: '4px 4px 0px #000',
        'neon-glow': '0 0 20px rgba(57, 255, 20, 0.6)',
        'blood-glow': '0 0 20px rgba(184, 15, 10, 0.6)',
      },
      backgroundImage: {
        'grime-texture': "url('/textures/grime.png')",
        'radial-grime': 'radial-gradient(ellipse at top, var(--grime) 0%, var(--ink) 70%)',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(57, 255, 20, 0.6)' },
          '50%': { boxShadow: '0 0 40px rgba(57, 255, 20, 1)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.4s ease-out',
        'pulse-neon': 'pulse-neon 2s infinite',
      },
    },
  },
  plugins: [animate],
};

export default config;
