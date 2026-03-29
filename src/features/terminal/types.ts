/**
 * Tipos del feature sys/terminal.
 */

export type LineType =
  | 'output'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'pink'
  | 'command'
  | 'prompt'

export interface TerminalLine {
  id:      string
  type:    LineType
  content: string
}

export interface TerminalState {
  lines:      TerminalLine[]
  input:      string
  history:    string[]
  historyIdx: number
  isOpen:     boolean
}