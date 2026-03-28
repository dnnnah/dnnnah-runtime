'use client'

import { useEffect } from 'react'

/**
 * Modal del easter egg Konami.
 * Muestra al Gopher de Go con efecto terminal y go build en loop.
 * Se cierra con ESC o click fuera.
 */

interface KonamiModalProps {
  onClose: () => void
}

export function KonamiModal({ onClose }: KonamiModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-label="Easter egg — Gopher"
      onClick={onClose}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          9000,
        backgroundColor: 'rgba(30, 31, 41, 0.95)',
        backdropFilter:  'blur(8px)',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             '24px',
        animation:       'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
      }}
    >
      {/* Gopher SVG oficial */}
      <img
        src="https://go.dev/blog/gopher/gopher.png"
        alt="Go Gopher"
        style={{
          width:     '180px',
          height:    'auto',
          animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
          filter:    'drop-shadow(0 0 24px rgba(139,233,253,0.3))',
        }}
      />

      {/* Terminal output */}
      <div
        className="font-mono"
        style={{
          color:         'var(--color-status-live)',
          fontSize:      '13px',
          letterSpacing: '0.05em',
          display:       'flex',
          alignItems:    'center',
          gap:           '2px',
        }}
      >
        <span>$ go build .</span>
        <span style={{ animation: 'blink 1s linear infinite' }}>_</span>
      </div>

      {/* Versión de Go */}
      <p
        className="font-mono"
        style={{
          color:         'var(--color-accent-cyan)',
          fontSize:      '11px',
          letterSpacing: '0.08em',
        }}
      >
        go version go1.22 darwin/arm64
      </p>

      {/* Hint cerrar */}
      <p
        className="font-mono"
        style={{
          color:         'var(--color-text-muted)',
          fontSize:      '10px',
          letterSpacing: '0.08em',
        }}
      >
        // press ESC or click to close
      </p>
    </div>
  )
}