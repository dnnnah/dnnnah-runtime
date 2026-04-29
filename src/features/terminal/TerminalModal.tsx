'use client'

import { createPortal }  from 'react-dom'
import { useState }      from 'react'
import { useTerminal }   from './useTerminal'
import { TerminalInput } from './TerminalInput'
import { TerminalOutput } from './TerminalOutput'

/**
 * Modal del terminal sys/terminal.
 *
 * Responsive fixes:
 * - dvh en lugar de vh — descuenta la barra del browser en mobile
 * - env(safe-area-inset-bottom) en el input — no lo tapa el teclado iOS
 * - calc(100vw - 32px) — margen garantizado en pantallas ≤ 375px
 */

type ModalState = 'normal' | 'minimized' | 'maximized'

/** Devuelve los estilos del modal según su estado */
function getModalStyle(state: ModalState): React.CSSProperties {
  const base: React.CSSProperties = {
    position:        'fixed',
    zIndex:          9998,
    backgroundColor: 'var(--color-bg-surface)',
    border:          '1px solid var(--color-border)',
    borderRadius:    '8px',
    overflow:        'hidden',
    display:         'flex',
    flexDirection:   'column',
  }

  if (state === 'maximized') {
    return {
      ...base,
      top:    '5dvh',
      left:   '5vw',
      right:  '5vw',
      bottom: '5dvh',
    }
  }

  if (state === 'minimized') {
    return {
      ...base,
      bottom:    '24px',
      left:      '50%',
      transform: 'translateX(-50%)',
      width:     'min(680px, calc(100vw - 32px))',
    }
  }

  /* normal */
  return {
    ...base,
    top:       '50%',
    left:      '50%',
    transform: 'translate(-50%, -50%)',
    width:     'min(680px, calc(100vw - 32px))',
    /*
      dvh (dynamic viewport height) descuenta la barra del browser
      en Chrome/Safari mobile. 85vh en desktop donde dvh = vh.
    */
    height:    'min(480px, 80dvh)',
    animation: 'terminalOpen 0.2s cubic-bezier(0.16,1,0.3,1) forwards',
  }
}

export function TerminalModal() {
  const { state, setState, execute, navigateHistory } = useTerminal()
  const { isOpen, lines } = state

  const [uiState, setUiState] = useState<ModalState>('normal')

  if (!isOpen) return null

  function close() {
    setState(s => ({ ...s, isOpen: false }))
    setUiState('normal')
  }

  function toggleMinimize() {
    setUiState(s => s === 'minimized' ? 'normal' : 'minimized')
  }

  function toggleMaximize() {
    setUiState(s => s === 'maximized' ? 'normal' : 'maximized')
  }

  const isMinimized = uiState === 'minimized'
  const isMaximized = uiState === 'maximized'

  return createPortal(
    <>
      {/* Overlay — oculto si minimizado */}
      {!isMinimized && (
        <div
          onClick={close}
          aria-hidden="true"
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          9997,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter:  'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            animation:       'fadeIn 0.2s ease forwards',
          }}
        />
      )}

      {/* Modal */}
      <div
        role="dialog"
        aria-label="DNNNAH terminal"
        aria-modal="true"
        style={getModalStyle(uiState)}
      >
        {/* ── Header ─────────────────────────────────────── */}
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
            <TrafficLight color="#ff5555" label="Cerrar"    onClick={close} />
            <TrafficLight color="#f1fa8c" label="Minimizar" onClick={toggleMinimize} />
            <TrafficLight color="#50fa7b" label="Maximizar" onClick={toggleMaximize} />
          </div>

          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
            sys/terminal // DNNNAH_RUNTIME v1.0.0
          </span>

          <span className="font-mono" style={{ fontSize: '9px', color: 'var(--color-text-muted)' }}>
            {isMinimized ? '[ minimized ]' : isMaximized ? '[ fullscreen ]' : '[ ESC to close ]'}
          </span>
        </div>

        {/* ── Body — oculto si minimizado ────────────────── */}
        {!isMinimized && (
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

/* ── Subcomponente interno — traffic light button ───────── */
interface TrafficLightProps {
  color:   string
  label:   string
  onClick: () => void
}

function TrafficLight({ color, label, onClick }: TrafficLightProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      style={{
        width:        '12px',
        height:       '12px',
        borderRadius: '50%',
        background:   color,
        border:       'none',
        cursor:       'pointer',
        padding:      0,
        flexShrink:   0,
        transition:   'opacity 0.15s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    />
  )
}