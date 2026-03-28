/**
 * DNNNAH_RUNTIME — Typography Tokens
 *
 * Fuentes:
 *   Monument Extended → solo hero /boot (weight 700/900)
 *   JetBrains Mono    → todo el sistema (UI, body, data)
 *
 * Uso: import { typography } from '@/tokens/typography'
 */

export const fontFamily = {
  hero: ['Monument Extended', 'Impact', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
} as const

// ─── ESCALA TIPOGRÁFICA (Mobile-first, clamp() para fluid) ─
export const fontSize = {
  // Hero — /boot
  hero: {
    desktop: '72px',
    fluid:   'clamp(40px, 15vw, 72px)', // responsive sin media queries
  },

  // Sección headers — struct Profile {}, class AutomationEnthusiast {}
  sectionHeader: {
    desktop: '18px',
    mobile:  '14px',
    fluid:   'clamp(14px, 3.5vw, 18px)',
  },

  // Body / data display — propiedades de struct, valores
  body: {
    desktop: '13px',
    mobile:  '12px',
    fluid:   'clamp(11px, 2.5vw, 13px)',
  },

  // Metadata / muted — build_time, EXEC_PROJ, status
  meta: {
    desktop: '11px',
    mobile:  '10px',
    fluid:   'clamp(9px, 2vw, 11px)',
  },

  // Botones y CTAs
  cta: {
    desktop: '12px',
    mobile:  '11px',
    fluid:   'clamp(10px, 2.5vw, 12px)',
  },
} as const

export const fontWeight = {
  regular: '400', // body, metadata, valores
  medium:  '500', // labels de struct, keys
  bold:    '700', // hero, CTAs, títulos de sección
} as const

export const lineHeight = {
  tight:   '1.1', // Hero — DNNNAH
  snug:    '1.4', // Headers de sección
  normal:  '1.6', // Body text, data
  relaxed: '1.8', // Párrafos largos (bio)
} as const

export const letterSpacing = {
  tight:  '-0.03em', // Hero display
  normal: '0em',     // Body
  wide:   '0.08em',  // Metadata, labels uppercase
  wider:  '0.15em',  // SYSTEM_STATUS labels
} as const

// ─── ESTILOS PREDEFINIDOS (composición de tokens) ──────────
// Úsalos directamente en tus componentes como className o style

export const textStyles = {
  hero: {
    fontFamily:    fontFamily.hero.join(', '),
    fontSize:      fontSize.hero.fluid,
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  sectionHeader: {
    fontFamily:    fontFamily.mono.join(', '),
    fontSize:      fontSize.sectionHeader.fluid,
    fontWeight:    fontWeight.medium,
    lineHeight:    lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontFamily:    fontFamily.mono.join(', '),
    fontSize:      fontSize.body.fluid,
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  meta: {
    fontFamily:    fontFamily.mono.join(', '),
    fontSize:      fontSize.meta.fluid,
    fontWeight:    fontWeight.regular,
    lineHeight:    lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  cta: {
    fontFamily:    fontFamily.mono.join(', '),
    fontSize:      fontSize.cta.fluid,
    fontWeight:    fontWeight.bold,
    lineHeight:    lineHeight.tight,
    letterSpacing: letterSpacing.wider,
  },
} as const
