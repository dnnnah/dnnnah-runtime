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

// ─── Terminal ─────────────────────────────────────────────────────────────────

/**
 * Una línea de output en el terminal.
 * Cada tipo tiene su color CSS asignado en globals.css.
 */
export interface TerminalLine {
  id:      string
  type:    'prompt' | 'output' | 'error' | 'success' | 'accent' | 'warning' | 'pink'
  content: string
}

/**
 * Estado completo del hook useTerminal.
 */
export interface TerminalState {
  lines:      TerminalLine[]   // Historial visual de líneas
  input:      string           // Valor actual del input
  history:    string[]         // Historial de comandos (↑↓)
  historyIdx: number           // Índice activo en history (-1 = nuevo)
  isOpen:     boolean          // Visibilidad del modal
}

// ─── Virtual File System ──────────────────────────────────────────────────────

/**
 * Nodo archivo: tiene contenido renderizable como TerminalLine[].
 */
export interface VFSFile {
  kind:    'file'
  content: TerminalLine[]
}

/**
 * Nodo directorio: tiene hijos (archivos u otros directorios).
 */
export interface VFSDir {
  kind:     'dir'
  children: Record<string, VFSNode>
}

/**
 * Unión discriminada. Se usa `node.kind` para narrowing:
 *   if (node.kind === 'file') → VFSFile
 *   if (node.kind === 'dir')  → VFSDir
 */
export type VFSNode = VFSFile | VFSDir

/**
 * Estado mutable del VFS que vive dentro de useTerminal.
 * `cwd` es un array de segmentos del path actual:
 *   []              → ~
 *   ['bin']         → ~/bin
 *   ['bin','projects'] → ~/bin/projects
 */
export interface VFSState {
  cwd:  string[]
  root: VFSDir
}