'use client'

import { useRef, useEffect } from 'react'

/**
 * Input del terminal con historial y autocompletado.
 * ↑↓ navega el historial.
 * Tab autocompleta comandos.
 */

const AUTOCOMPLETE = [
  'help', 'whoami', 'pwd', 'ls', 'ls projects', 'ls -la',
  'cat stack', 'cat about', 'contact', 'cv', 'clear',
  'easter', 'hint', 'konami', 'panic', 'exit',
  'open project pwa', 'open project ai',
  'open project mq', 'open project cli',
]

interface Props {
  value:      string
  onChange:   (v: string) => void
  onExecute:  (cmd: string) => void
  onNavigate: (dir: 'up' | 'down') => void
}

export function TerminalInput({ value, onChange, onExecute, onNavigate }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus al montar
  useEffect(() => { inputRef.current?.focus() }, [])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onExecute(value)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      onNavigate('up')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      onNavigate('down')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = AUTOCOMPLETE.find(c => c.startsWith(value) && c !== value)
      if (match) onChange(match)
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
      {/* Prompt */}
      <span className="font-mono" style={{
        fontSize:   '11px',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}>
        <span style={{ color: 'var(--color-accent)' }}>dnnnah@runtime</span>
        <span style={{ color: 'var(--color-text-muted)' }}>:</span>
        <span style={{ color: 'var(--color-accent-cyan)' }}>~</span>
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
          flex:        1,
          background:  'transparent',
          border:      'none',
          outline:     'none',
          fontFamily:  'inherit',
          fontSize:    '11px',
          color:       'var(--color-text)',
          caretColor:  'var(--color-accent)',
        }}
      />
    </div>
  )
}