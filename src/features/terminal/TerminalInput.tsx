'use client'

import { useRef, useEffect } from 'react'

/**
 * Input del terminal con historial y autocompletado VFS.
 *
 * ↑↓  → navega el historial de comandos
 * Tab → autocompleta usando VFS + comandos builtin
 *
 * Props:
 *   prompt    — string del cwd actual (ej: '~', '~/bin')
 *   onTab     — función que recibe texto parcial y retorna texto completado
 */

interface Props {
  value:      string
  prompt:     string                            // ← NUEVO: cwd dinámico
  onChange:   (v: string) => void
  onExecute:  (cmd: string) => void
  onNavigate: (dir: 'up' | 'down') => void
  onTab:      (partial: string) => string       // ← NUEVO: Tab completion
}

export function TerminalInput({
  value,
  prompt,
  onChange,
  onExecute,
  onNavigate,
  onTab,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus al montar (y re-focus cuando el modal abre)
  useEffect(() => { inputRef.current?.focus() }, [])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case 'Enter':
        onExecute(value)
        break

      case 'ArrowUp':
        e.preventDefault()
        onNavigate('up')
        break

      case 'ArrowDown':
        e.preventDefault()
        onNavigate('down')
        break

      case 'Tab':
        e.preventDefault()
        // Delega la lógica al hook — el input solo recibe el resultado
        onChange(onTab(value))
        break
    }
  }

  return (
    <div style={{
      display:         'flex',
      alignItems:      'center',
      gap:             '8px',
      padding:         '10px 16px',
      borderTop:       '1px solid var(--color-border)',
      backgroundColor: 'var(--color-bg-base)',
      flexShrink:      0,
    }}>
      {/* Prompt dinámico — refleja el cwd actual del VFS */}
      <span className="font-mono" style={{
        fontSize:   '11px',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}>
        <span style={{ color: 'var(--color-accent)' }}>dnnnah@runtime</span>
        <span style={{ color: 'var(--color-text-muted)' }}>:</span>
        <span style={{ color: 'var(--color-accent-cyan)' }}>{prompt}</span>
        <span style={{ color: 'var(--color-text-muted)' }}>$ </span>
      </span>

      {/* Input */}
      <input
        ref={inputRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        aria-label="Terminal input"
        style={{
          flex:       1,
          background: 'transparent',
          border:     'none',
          outline:    'none',
          fontFamily: 'inherit',
          fontSize:   '11px',
          color:      'var(--color-text)',
          caretColor: 'var(--color-accent)',
        }}
      />
    </div>
  )
}