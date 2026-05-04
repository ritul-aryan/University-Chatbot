/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        background: '#03040A',
        surface: '#07080F',
        krmu: {
          // ─ Official KRMU Brand Colors ─
          blue: '#0060AA',   // Endeavour — PRIMARY ACCENT
          'blue-lt': '#1A7EC4',   // Lighter variant for gradients
          'blue-xs': '#5BB3E8',   // Extra-light for subtle glows
          red: '#E31E24',   // Alizarin Crimson — SECONDARY
          'red-lt': '#FF4A4F',   // Lighter red for highlights
        },
      },
      boxShadow: {
        'blue-glow': '0 0 24px rgba(0,96,170,0.55), 0 0 60px rgba(0,96,170,0.2)',
        'blue-glow-lg': '0 0 48px rgba(0,96,170,0.65), 0 0 100px rgba(0,96,170,0.28)',
        'red-glow': '0 0 20px rgba(227,30,36,0.45)',
        'glass': '0 32px 64px -12px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.08)',
        'input-focus': '0 0 0 1px rgba(0,96,170,0.45), 0 0 32px rgba(0,96,170,0.14)',
      },
      animation: {
        'aurora-1': 'aurora-1 28s ease-in-out infinite alternate',
        'aurora-2': 'aurora-2 35s ease-in-out infinite alternate',
        'aurora-3': 'aurora-3 22s ease-in-out infinite alternate',
        'wave-1': 'wave-shift-1 20s ease-in-out infinite alternate',
        'wave-2': 'wave-shift-2 26s ease-in-out infinite alternate',
        'wave-3': 'wave-shift-3 18s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in-up': 'fade-in-up 0.65s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-soft': 'pulse-soft 3.5s ease-in-out infinite',
        'mic-pulse': 'mic-pulse 1.6s ease-in-out infinite',
        'thinking': 'thinking 1.4s ease-in-out infinite',
      },
      keyframes: {
        'aurora-1': {
          '0%': { transform: 'translate(-8%,-8%) rotate(-6deg) scale(1)', },
          '50%': { transform: 'translate(6%,10%)  rotate(5deg)  scale(1.15)', },
          '100%': { transform: 'translate(2%,-2%)  rotate(-2deg) scale(1.05)', },
        },
        'aurora-2': {
          '0%': { transform: 'translate(8%,8%)    rotate(6deg)  scale(1)', },
          '50%': { transform: 'translate(-6%,-10%) rotate(-5deg) scale(1.15)', },
          '100%': { transform: 'translate(-2%,2%)   rotate(2deg)  scale(1.05)', },
        },
        'aurora-3': {
          '0%': { transform: 'translate(0%,-5%)  scale(1)', opacity: '0.7' },
          '50%': { transform: 'translate(-4%,5%)  scale(1.2)', opacity: '1' },
          '100%': { transform: 'translate(4%,-2%)  scale(0.95)', opacity: '0.7' },
        },
        'wave-shift-1': {
          '0%': { transform: 'translateX(-6%) scaleY(1)' },
          '50%': { transform: 'translateX(3%)  scaleY(1.12)' },
          '100%': { transform: 'translateX(-3%) scaleY(0.92)' },
        },
        'wave-shift-2': {
          '0%': { transform: 'translateX(5%)  scaleY(0.9)' },
          '50%': { transform: 'translateX(-4%) scaleY(1.15)' },
          '100%': { transform: 'translateX(2%)  scaleY(1)' },
        },
        'wave-shift-3': {
          '0%': { transform: 'translateX(-3%) scaleY(1.05)' },
          '50%': { transform: 'translateX(5%)  scaleY(0.88)' },
          '100%': { transform: 'translateX(-1%) scaleY(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.65', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        'mic-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(227,30,36,0)' },
          '50%': { boxShadow: '0 0 0 10px rgba(227,30,36,0.1)' },
        },
        'thinking': {
          '0%, 80%, 100%': { transform: 'scale(0.55)', opacity: '0.2' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}