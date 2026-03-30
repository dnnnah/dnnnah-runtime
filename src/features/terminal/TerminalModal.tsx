'use client'

import { createPortal }   from 'react-dom'
import { useState }       from 'react'
import { useTerminal }    from './useTerminal'
import { TerminalInput }  from './TerminalInput'
import { TerminalOutput } from './TerminalOutput'

export function TerminalModal() {
  const { state, setState, execute, navigateHistory } = useTerminal()
  const { isOpen, lines } = state

  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)

  if (!isOpen) return null

  const modalStyle: React.CSSProperties = maximized
    ? {
        position:        'fixed',
        top:             '5vh',
        left:            '5vw',
        right:           '5vw',
        bottom:          '5vh',
        zIndex:          9998,
        backgroundColor: 'var(--color-bg-surface)',
        border:          '1px solid var(--color-border)',
        borderRadius:    '8px',
        overflow:        'hidden',
        display:         'flex',
        flexDirection:   'column',
      }
    : minimized
    ? {
        position:        'fixed',
        bottom:          '24px',
        left:            '50%',
        transform:       'translateX(-50%)',
        zIndex:          9998,
        width:           'min(680px, 92vw)',
        backgroundColor: 'var(--color-bg-surface)',
        border:          '1px solid var(--color-border)',
        borderRadius:    '8px',
        overflow:        'hidden',
        display:         'flex',
        flexDirection:   'column',
      }
    : {
        position:        'fixed',
        top:             '50%',
        left:            '50%',
        transform:       'translate(-50%, -50%)',
        zIndex:          9998,
        width:           'min(680px, 92vw)',
        height:          'min(520px, 85vh)',
        backgroundColor: 'var(--color-bg-surface)',
        border:          '1px solid var(--color-border)',
        borderRadius:    '8px',
        overflow:        'hidden',
        display:         'flex',
        flexDirection:   'column',
        animation:       'terminalOpen 0.2s cubic-bezier(0.16,1,0.3,1) forwards',
      }

  return createPortal(
    <>
      {/* Overlay — no se muestra si minimizado */}
      {!minimized && (
        <div
          onClick={() => {
            setState(s => ({ ...s, isOpen: false }))
            setMinimized(false)
            setMaximized(false)
          }}
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          9997,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter:  'blur(8px)',
            animation:       'fadeIn 0.2s ease forwards',
          }}
        />
      )}

      {/* Modal */}
      <div role="dialog" aria-label="DNNNAH terminal" aria-modal="true" style={modalStyle}>

        {/* Header */}
        <div style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderBottom:    '1px solid var(--color-border)',
          padding:         '8px 14px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          flexShrink:      0,
        }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {/* Rojo — cierra */}
            <button
              onClick={() => {
                setState(s => ({ ...s, isOpen: false }))
                setMinimized(false)
                setMaximized(false)
              }}
              aria-label="Cerrar terminal"
              title="Cerrar"
              style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: '#ff5555', border: 'none', cursor: 'pointer', padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            />
            {/* Amarillo — minimiza */}
            <button
              onClick={() => {
                setMinimized(m => !m)
                setMaximized(false)
              }}
              aria-label="Minimizar terminal"
              title="Minimizar"
              style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: '#f1fa8c', border: 'none', cursor: 'pointer', padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            />
            {/* Verde — maximiza */}
            <button
              onClick={() => {
                setMaximized(m => !m)
                setMinimized(false)
              }}
              aria-label="Maximizar terminal"
              title="Maximizar"
              style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: '#50fa7b', border: 'none', cursor: 'pointer', padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            />
          </div>

          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
            sys/terminal // DNNNAH_RUNTIME v1.0.0
          </span>

          <span className="font-mono" style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>
            {minimized ? '[ minimized ]' : maximized ? '[ fullscreen ]' : '[ ESC to close ]'}
          </span>
        </div>

        {/* Body — oculto si minimizado */}
        {!minimized && (
          <>
            <TerminalOutput lines={lines} />
            <TerminalInput
              value={state.input}
              onChange={v => setState(s => ({ ...s, input: v }))}
              onExecute={execute}
              onNavigate={navigateHistory}
            />
          </>
        )}
      </div>
    </>,
    document.body
  )
}