/**
 * Barrel export del feature /boot.
 * Importar siempre desde '@/features/boot', nunca desde archivos internos.
 * Esto nos permite reorganizar internamente sin romper imports externos.
 */
export { BootSection } from './BootSection'
export type { BootSectionProps, HeroRevealConfig, PanicState } from './types'