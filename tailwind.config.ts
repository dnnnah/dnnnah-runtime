import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Estrategia de clase — ThemeToggle agrega/quita .light en <html>
  darkMode: 'class',

  theme: {
    extend: {
      // ─── COLORES ────────────────────────────────────────
      colors: {
        'bg-base':     'var(--color-bg-base)',
        'bg-surface':  'var(--color-bg-surface)',
        'bg-elevated': 'var(--color-bg-elevated)',
        'accent':      'var(--color-accent)',
        'accent-2':    'var(--color-accent-2)',
        'accent-cyan': 'var(--color-accent-cyan)',
        'content':     'var(--color-text)',
        'content-muted': 'var(--color-text-muted)',
      },

      // ─── TIPOGRAFÍA ─────────────────────────────────────
      fontFamily: {
        hero: ['var(--font-monument)', 'Impact', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(40px, 15vw, 72px)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'h1':   ['clamp(14px, 3.5vw, 18px)', { lineHeight: '1.4' }],
        'body': ['clamp(11px, 2.5vw, 13px)', { lineHeight: '1.6' }],
        'meta': ['clamp(9px, 2vw, 11px)',    { lineHeight: '1.6', letterSpacing: '0.08em' }],
        'cta':  ['clamp(10px, 2.5vw, 12px)', { lineHeight: '1.1', letterSpacing: '0.15em' }],
      },

      // ─── ANIMACIONES ────────────────────────────────────
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        heroReveal: {
          from: { opacity: '0', transform: 'translateY(20px)', filter: 'blur(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)',    filter: 'blur(0px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'blink':       'blink 1s linear infinite',
        'pulse-build': 'pulse 1.5s ease-in-out infinite',
        'hero-reveal': 'heroReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up':    'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}

export default config