'use client'

import { useRef } from 'react'
import { useLenis } from '@/shared/hooks/useLenis'
import { useHeroReveal } from './useHeroReveal'
import type { BootSectionProps, PanicState } from './types'
import { NavBar } from './NavBar'

/**
 * Sección hero del portfolio — /boot
 * Componente de presentación puro: solo JSX y clases.
 * Toda la lógica vive en los hooks.
 */
export function BootSection({ className = '' }: BootSectionProps) {
  useLenis()
  const titleRef = useHeroReveal()

  const panicRef = useRef<PanicState>({
    active:        false,
    scrollDelta:   0,
    lastTimestamp: 0,
  })

  function handleWheel(e: React.WheelEvent<HTMLElement>) {
    const now   = Date.now()
    const state = panicRef.current

    if (now - state.lastTimestamp > 400) {
      state.scrollDelta = 0
    }

    state.scrollDelta    += Math.abs(e.deltaY)
    state.lastTimestamp   = now

    if (state.scrollDelta > 3000 && !state.active) {
      state.active = true
      document.body.classList.add('panic')

      setTimeout(() => {
        document.body.classList.remove('panic')
        state.active      = false
        state.scrollDelta = 0
      }, 2500)
    }
  }

  return (
    <section
      id="boot"
      className={`relative flex h-screen w-full flex-col overflow-hidden bg-[var(--color-bg-base)] ${className}`}
      onWheel={handleWheel}
      aria-label="Hero — DNNNAH Runtime"
    >
      <NavBar />

      {/* Scanline overlay — efecto CRT sutil */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
        aria-hidden="true"
      />

      {/* Contenido hero — centrado verticalmente */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6">

        {/* System badge */}
        <p
          className="font-mono"
          style={{
            fontSize:      'clamp(9px, 2vw, 11px)',
            letterSpacing: '0.08em',
            color:         'var(--color-text-muted)',
            textAlign:     'center',
          }}
        >
          <span
            style={{
              color:     'var(--color-status-live)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          >
            ●
          </span>
          {' '}SYSTEM_STATUS: STABLE // Junior Go Developer
        </p>

        {/* Título principal */}
        <h1
          ref={titleRef}
          className="select-none text-center"
          style={{
            fontFamily:    'var(--font-monument), var(--font-jetbrains), monospace',
            fontSize:      'clamp(48px, 15vw, 120px)',
            fontWeight:    900,
            lineHeight:    1.05,
            letterSpacing: '-0.03em',
            color:         'var(--color-text)',
            display:       'flex',
            alignItems:    'baseline',
            justifyContent:'center',
          }}
        >
          <span>DNNNAH</span>
          <span
            aria-hidden="true"
            style={{
              color:       'var(--color-accent)',
              animation:   'blink 1s linear infinite',
              marginLeft:  '4px',
            }}
          >
            _
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          className="font-mono text-center"
          style={{
            fontSize:      'clamp(11px, 2.5vw, 13px)',
            color:         'var(--color-text-muted)',
            marginTop:     '4px',
          }}
        >
          Software Engineer · Automation Enthusiast · Go Runtime
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col gap-3 tablet:flex-row"
          style={{ marginTop: '24px' }}
        >
          <button
            className="btn-primary"
            style={{ minHeight: '44px', minWidth: '160px' }}
          >
            [ VIEW_PROJECTS ]
          </button>

          <button
            className="font-mono"
            style={{
              minHeight:     '44px',
              minWidth:      '160px',
              background:    'transparent',
              color:         'var(--color-accent-cyan)',
              border:        '1px solid rgba(139,233,253,0.35)',
              padding:       '8px 20px',
              fontSize:      'clamp(10px, 2.5vw, 12px)',
              fontWeight:    700,
              letterSpacing: '0.1em',
              borderRadius:  '4px',
              cursor:        'pointer',
              transition:    'background-color 0.2s ease',
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor = 'rgba(139,233,253,0.08)')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            [ SSH_CONTACT ]
          </button>
        </div>
      </div>

      {/* Scroll hint — anclado al fondo */}
      <div
        style={{
          position:   'absolute',
          bottom:     '48px',
          left:       '50%',
          transform:  'translateX(-50%)',
          display:    'flex',
          flexDirection:'column',
          alignItems: 'center',
          gap:        '8px',
        }}
        aria-hidden="true"
      >
        <span
          className="font-mono"
          style={{
            fontSize:      'clamp(9px, 2vw, 11px)',
            letterSpacing: '0.08em',
            color:         'var(--color-text-disabled)',
            whiteSpace:    'nowrap',
          }}
        >
          // SCROLL_TO_INITIALIZE_RUNTIME
        </span>
        <div
          style={{
            width:       '8px',
            height:      '8px',
            borderRight: '1.5px solid var(--color-text-disabled)',
            borderBottom:'1.5px solid var(--color-text-disabled)',
            transform:   'rotate(45deg)',
            animation:   'bounce 1.5s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}