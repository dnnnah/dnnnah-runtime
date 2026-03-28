/**
 * Configuración centralizada de GSAP.
 *
 * Registra todos los plugins necesarios en un solo lugar.
 * Importar este archivo UNA sola vez (en el hook o layout que
 * lo use primero). Nunca registrar plugins dentro de componentes
 * de presentación.
 *
 * Plugins registrados:
 * - ScrollTrigger: animaciones basadas en scroll
 * - Flip: animaciones de transición entre estados de layout
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, Flip)

export { gsap, ScrollTrigger, Flip }