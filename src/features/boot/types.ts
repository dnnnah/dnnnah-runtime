/**
 * Tipos del feature /boot — Hero section.
 * Definimos las interfaces antes de implementar la lógica.
 */

/**
 * Props del componente principal BootSection.
 * Por ahora sin props externas, pero la interfaz
 * nos permite escalar sin romper el contrato.
 */
export interface BootSectionProps {
  className?: string
}

/**
 * Configuración de la animación hero.
 * Refleja los tokens de motion.ts pero tipados
 * para el contexto específico del hero.
 */
export interface HeroRevealConfig {
  duration: number      // Duración en segundos
  ease: string          // Easing string compatible con GSAP
  delay: number         // Delay inicial en segundos
  fromY: number         // Posición Y inicial en px
  fromBlur: string      // Blur inicial (ej: '4px')
}

/**
 * Estado interno del easter egg panic trace.
 * Se activa cuando el usuario hace rage scroll.
 */
export interface PanicState {
  active: boolean
  scrollDelta: number   // Acumulado de scroll en la ventana de tiempo
  lastTimestamp: number // Timestamp del último evento de scroll
}