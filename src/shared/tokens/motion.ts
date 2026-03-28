/**
 * DNNNAH_RUNTIME — Motion Tokens
 *
 * Sistema de animación equilibrado:
 * → Narrativa reforzada, no decorativa
 * → prefers-reduced-motion siempre respetado
 * → GSAP para scroll/flip, CSS para micro-interacciones
 *
 * Uso: import { motion } from '@/tokens/motion'
 */

// ─── EASINGS ───────────────────────────────────────────────
export const easing = {
  // Navegación principal, scroll horizontal, page transitions
  // Sensación: rápido al inicio, suave al final → retroalimentación inmediata
  outExpo:   'cubic-bezier(0.16, 1, 0.3, 1)',

  // CTAs, cards hover, badges → elementos pequeños con energía
  // Sensación: supera el destino y vuelve → vivo, táctil
  spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',

  // Cursor blink, typing effect, progress bars
  // Sensación: mecánico, predecible → estilo terminal
  linear:    'linear',

  // panic() easter egg, status BUILDING pulse
  // Sensación: orgánico, respiración → alerta sin agresividad
  sineInOut: 'cubic-bezier(0.37, 0, 0.63, 1)',

  // Equivalentes para GSAP (CustomEase o ease string)
  gsap: {
    outExpo: 'expo.out',
    spring:  'elastic.out(1, 0.5)',
    linear:  'none',
    sineInOut: 'sine.inOut',
  },
} as const

// ─── DURACIONES ────────────────────────────────────────────
export const duration = {
  instant:    100,  // ms — feedback inmediato (click, focus)
  fast:       200,  // ms — hover states, badges
  normal:     400,  // ms — cards, modales, toggles
  slow:       600,  // ms — navegación principal, page sections
  cinematic:  1200, // ms — hero entrance, scroll horizontal init
  loop:       1500, // ms — pulse animations (● BUILDING)
} as const

// ─── DELAYS ────────────────────────────────────────────────
export const delay = {
  none:       0,
  stagger:    80,   // ms — entre items de una lista/grid
  section:    200,  // ms — entre secciones en scroll
  hero:       400,  // ms — delay del hero después de load
} as const

// ─── ANIMACIONES CSS PREDEFINIDAS ──────────────────────────
// Pega estas keyframes en globals.css

export const keyframes = {
  // Cursor parpadeante — terminal input
  blink: `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }
  `,

  // Typing effect — texto que aparece letra a letra
  // Combinar con JS que agrega caracteres al DOM
  scanline: `
    @keyframes scanline {
      from { transform: translateY(-100%); }
      to   { transform: translateY(100%); }
    }
  `,

  // panic() — flash rojo de pantalla
  panicFlash: `
    @keyframes panicFlash {
      0%, 100% { background-color: transparent; }
      10%, 30%, 50% { background-color: rgba(255, 85, 85, 0.15); }
      20%, 40%      { background-color: transparent; }
    }
  `,

  // Status BUILDING badge pulse
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }
  `,

  // Goroutine leak cursors — fade in ghost cursors
  ghostFadeIn: `
    @keyframes ghostFadeIn {
      from { opacity: 0; transform: translate(0, 0); }
      to   { opacity: 0.25; transform: translate(var(--dx), var(--dy)); }
    }
  `,

  // Hero entrance — DNNNAH title
  heroReveal: `
    @keyframes heroReveal {
      from { 
        opacity: 0; 
        transform: translateY(20px); 
        filter: blur(4px);
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
        filter: blur(0px);
      }
    }
  `,

  // Konami — Gopher ASCII entry
  slideInFromBottom: `
    @keyframes slideInFromBottom {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
  `,
} as const

// ─── CONFIGURACIÓN GSAP (para useGSAP hooks) ───────────────
export const gsapConfig = {
  // ScrollTrigger — activación del scroll horizontal
  horizontalScroll: {
    trigger:   '#horizontal-section',
    start:     'top top',
    end:       '+=300%',
    pin:       true,
    scrub:     1,
    snap: {
      snapTo:   1 / 3, // 3 secciones
      duration: { min: 0.3, max: 0.6 },
      ease:     easing.gsap.outExpo,
    },
  },

  // Hero title entrance
  heroEntrance: {
    duration:  duration.cinematic / 1000,
    ease:      easing.gsap.outExpo,
    delay:     delay.hero / 1000,
    y:         20,
    opacity:   0,
    filter:    'blur(4px)',
  },

  // Cards stagger en bin/projects
  projectCardsStagger: {
    duration: duration.slow / 1000,
    ease:     easing.gsap.outExpo,
    stagger:  delay.stagger / 1000,
    y:        30,
    opacity:  0,
  },

  // FLIP animation para card expansion
  flip: {
    duration: duration.normal / 1000,
    ease:     easing.gsap.outExpo,
  },
} as const

// ─── REDUCED MOTION ────────────────────────────────────────
// Siempre envuelve animaciones en este check
export const reducedMotion = {
  // En CSS: @media (prefers-reduced-motion: reduce)
  // En JS:
  check: () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  // Fallback: si reducedMotion es true, usar estas duraciones
  fallbackDuration: {
    fast:   0,
    normal: 0,
    slow:   duration.instant,
  },
} as const
