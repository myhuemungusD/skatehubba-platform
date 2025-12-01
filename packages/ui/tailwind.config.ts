import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    '../../apps/**/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        paper: '#f5f3ef',
        neon: '#39ff14',
        grime: '#1c1c1c',
        blood: '#b80f0a',
        gold: '#e3c300',
      },
      boxShadow: {
        grit: '4px 4px 0px #000',
        'neon-glow': '0 0 20px rgba(57, 255, 20, 0.6)',
      },
      backgroundImage: {
        'grime-texture': "url('/textures/grime.png')", // put in public/textures/
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
