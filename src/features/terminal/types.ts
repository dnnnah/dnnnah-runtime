/**
 * Tipos del feature /boot — Hero section.
 */

export interface BootSectionProps {
  className?: string
}

export interface HeroRevealConfig {
  duration:  number
  ease:      string
  delay:     number
  fromY:     number
  fromBlur:  string
}

export interface PanicState {
  active:        boolean
  scrollDelta:   number
  lastTimestamp: number
}

// ─── Terminal ────────────────────────────────────────────────────────────────

export interface TerminalLine {
  id:      string
  type:    'output' | 'accent' | 'success' | 'error' | 'warning' | 'pink' | 'prompt'
  content: string
}

export interface TerminalState {
  lines:        TerminalLine[]
  input:        string
  history:      string[]
  historyIdx:   number
  isOpen:       boolean
  hasConnected: boolean   // true después de la primera apertura (SSH intro)
  isGlitching:  boolean   // true durante el efecto de cierre con exit
}

// ─── VFS ─────────────────────────────────────────────────────────────────────

export interface VFSNode {
  type:     'dir' | 'file'
  children?: Record<string, VFSNode>
  content?: string[]
}

export interface VFSState {
  cwd:  string[]
  root: VFSNode
}