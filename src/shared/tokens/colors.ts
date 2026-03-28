/**
 * DNNNAH_RUNTIME — Color Tokens
 * Dark:  Dracula palette
 * Light: Go/Gopher official palette
 *
 * Uso: import { colors } from '@/tokens/colors'
 */

export const colors = {
  // ─── DARK MODE (Dracula) ───────────────────────────────
  dark: {
    bg: {
      base:     '#282a36', // Fondo principal de página
      surface:  '#1e1f29', // Cards, paneles, modales
      elevated: '#343746', // Hover state, inputs, tooltips
    },
    accent: {
      primary:   '#bd93f9', // Purple — CTAs, focus rings, links activos
      secondary: '#ff79c6', // Pink — Easter eggs, hover secondary
      cyan:      '#8be9fd', // Cyan — Labels de sistema, data display
      orange:    '#ffb86c', // Orange — Warnings, highlights ocasionales
      yellow:    '#f1fa8c', // Yellow — status BUILDING
    },
    text: {
      primary:  '#f8f8f2', // Body text principal
      muted:    '#6272a4', // Metadata, comentarios, placeholders
      disabled: '#44475a', // Estados deshabilitados
    },
    status: {
      live:    '#50fa7b', // ● LIVE
      building:'#f1fa8c', // ● BUILDING
      offline: '#ff5555', // ● OFFLINE / panic()
      error:   '#ff5555', // Stack traces, errores
    },
    border: {
      default: 'rgba(189, 147, 249, 0.15)', // Bordes sutiles
      hover:   'rgba(189, 147, 249, 0.35)', // Bordes en hover
      focus:   '#bd93f9',                   // Focus rings accesibles
    },
  },

  // ─── LIGHT MODE (Go / Gopher) ─────────────────────────
  light: {
    bg: {
      base:     '#e8f4fc', // Fondo principal — azul cielo Go
      surface:  '#ffffff', // Cards, paneles
      elevated: '#dbedf7', // Hover, inputs
    },
    accent: {
      primary:   '#00acd7', // Go blue oficial — golang.org
      secondary: '#5dc9e2', // Go light blue — hover
      cyan:      '#00add8', // Go cyan — links, labels
      orange:    '#ce3262', // Gopher nose/ears — accent cálido
      yellow:    '#f0a500', // Warnings en light mode
    },
    text: {
      primary:  '#003a5c', // Go dark — body text
      muted:    '#0077be', // Metadata, labels secundarios
      disabled: '#8ab8d4', // Estados deshabilitados
    },
    status: {
      live:     '#1a8a3a', // ● LIVE accesible en light
      building: '#b8860b', // ● BUILDING accesible en light
      offline:  '#c0392b', // ● OFFLINE accesible en light
      error:    '#c0392b', // Errores en light
    },
    border: {
      default: 'rgba(0, 172, 215, 0.18)', // Bordes sutiles Go
      hover:   'rgba(0, 172, 215, 0.40)', // Bordes hover
      focus:   '#00acd7',                  // Focus rings
    },
  },
} as const

// ─── ALIAS SEMÁNTICOS (para uso en componentes) ──────────
// Úsalos con CSS custom properties vía Tailwind / globals.css
export const semanticTokens = {
  '--color-bg-base':       { dark: colors.dark.bg.base,       light: colors.light.bg.base },
  '--color-bg-surface':    { dark: colors.dark.bg.surface,    light: colors.light.bg.surface },
  '--color-bg-elevated':   { dark: colors.dark.bg.elevated,   light: colors.light.bg.elevated },
  '--color-accent':        { dark: colors.dark.accent.primary, light: colors.light.accent.primary },
  '--color-accent-2':      { dark: colors.dark.accent.secondary, light: colors.light.accent.orange },
  '--color-accent-cyan':   { dark: colors.dark.accent.cyan,   light: colors.light.accent.cyan },
  '--color-text':          { dark: colors.dark.text.primary,  light: colors.light.text.primary },
  '--color-text-muted':    { dark: colors.dark.text.muted,    light: colors.light.text.muted },
  '--color-border':        { dark: colors.dark.border.default, light: colors.light.border.default },
  '--color-border-hover':  { dark: colors.dark.border.hover,  light: colors.light.border.hover },
  '--color-focus':         { dark: colors.dark.border.focus,  light: colors.light.border.focus },
  '--color-status-live':   { dark: colors.dark.status.live,   light: colors.light.status.live },
  '--color-status-build':  { dark: colors.dark.status.building, light: colors.light.status.building },
  '--color-status-off':    { dark: colors.dark.status.offline, light: colors.light.status.offline },
} as const

export type ColorMode = 'dark' | 'light'
