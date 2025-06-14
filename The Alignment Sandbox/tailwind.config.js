/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neon highlights
        'neon-magenta': '#FF2D55',
        'neon-cyan': '#00E0FF',
        
        // Deep space charcoals  
        'space-deep': '#0A0A0C',
        'space-mid': '#121218',
        
        // Organic accent colors
        'chai-warm': '#FFB57E',
        'banyan-green': '#2B8F5E',
        
        // Neural palette
        'neural-light': '#E5E7EB',
        'neural-dark': '#1F2937',
        
        // Terminal mode
        'terminal-bg': '#000000',
        'terminal-green': '#00FF00',
        'terminal-dark': '#001100',
      },
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
        'spectral': ['"Spectral"', 'serif'],
        'jetbrains': ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};