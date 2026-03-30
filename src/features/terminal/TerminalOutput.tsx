'use client'

import { useEffect, useRef } from 'react'
import type { TerminalLine } from './types'

/**
 * Área de output del terminal.
 * Auto-scroll al fondo con cada nueva línea.
 */

const LINE_COLORS: Record<string, string> = {
  output:  'var(--color-text-muted)',
  accent:  'var(--color-accent-cyan)',
  success: 'var(--color-status-live)',
  warning: 'var(--color-status-build)',
  error:   'var(--color-status-off)',
  pink:    'var(--color-accent-2)',
  command: 'var(--color-text)',
  prompt:  'var(--color-text)',
}

export function TerminalOutput({ lines }: { lines: TerminalLine[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <div style={{
      flex:          1,
      overflowY:     'auto',
      padding:       '16px',
      display:       'flex',
      flexDirection: 'column',
      gap:           '2px',
    }}>
      {lines.map((line) => (
        <div
          key={line.id}
          className="font-mono"
          style={{
            fontSize:   '11px',
            lineHeight: 1.7,
            color:      LINE_COLORS[line.type] ?? 'var(--color-text-muted)',
            whiteSpace: 'pre-wrap',
            wordBreak:  'break-word',
          }}
        >
          {line.type === 'prompt' ? (
            <>
              <span style={{ color: 'var(--color-accent)' }}>dnnnah@runtime</span>
              <span style={{ color: 'var(--color-text-muted)' }}>:</span>
              <span style={{ color: 'var(--color-accent-cyan)' }}>~</span>
              <span style={{ color: 'var(--color-text-muted)' }}>$ </span>
              <span style={{ color: 'var(--color-text)' }}>{line.content}</span>
            </>
          ) : line.content}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}