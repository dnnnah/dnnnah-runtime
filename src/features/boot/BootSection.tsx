'use client'

import { useRef } from 'react'
import { useLenis }      from '@/shared/hooks/useLenis'
import { useHeroReveal } from './useHeroReveal'
import type { BootSectionProps, PanicState } from './types'

export function BootSection({ className = '' }: BootSectionProps) {
  const lenisRef = useLenis()
  const titleRef = useHeroReveal()

  const panicRef = useRef<PanicState>({
    active:        false,
    scrollDelta:   0,
    lastTimestamp: 0,
  })

  function handleWheel(e: React.WheelEvent<HTMLElement>) {
    const now   = Date.now()
    const state = panicRef.current
    if (now - state.lastTimestamp > 400) state.scrollDelta = 0
    state.scrollDelta  += Math.abs(e.deltaY)
    state.lastTimestamp = now
  }

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    lenisRef.current
      ? lenisRef.current.scrollTo(el, { offset: -56 })
      : el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="boot"
      className={`relative flex h-screen w-full flex-col overflow-hidden bg-[var(--color-bg-base)] ${className}`}
      onWheel={handleWheel}
      aria-label="Hero — DNNNAH Runtime"
    >
      {/* Scanline overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4">

        {/* Status badge */}
        <p
          className="font-mono text-center"
          style={{
            fontSize:      'clamp(8px, 2vw, 11px)',
            letterSpacing: '0.08em',
            color:         'var(--color-text-muted)',
          }}
        >
          <span style={{ color: 'var(--color-status-live)', animation: 'pulse 2s ease-in-out infinite' }}>
            ●
          </span>
          {' '}SYSTEM_STATUS: STABLE // Junior Go Developer
        </p>

        {/* Título principal —
            clamp ajustado para no desbordarse en iPhone SE (320px).
            En 320px → 44px, en 768px → ~107px, cap en 120px.        */}
        <h1
          ref={titleRef}
          className="select-none text-center"
          style={{
            fontFamily:     'var(--font-monument), var(--font-jetbrains), monospace',
            fontSize:       'clamp(44px, 13.5vw, 120px)',
            fontWeight:     900,
            lineHeight:     1.05,
            letterSpacing:  '-0.03em',
            color:          'var(--color-text)',
            display:        'flex',
            alignItems:     'baseline',
            justifyContent: 'center',
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
            fontSize:  'clamp(10px, 2.2vw, 13px)',
            color:     'var(--color-text-muted)',
            marginTop: '4px',
            padding:   '0 8px',
          }}
        >
          Backend Engineer · Automation Enthusiast · Go Developer
        </p>

        {/*
          CTAs — usa .hero-ctas de globals.css:
          - Desktop: flex-row, gap 12px
          - Mobile ≤ 767px: flex-col, centrado, max-width 300px
        */}
        <div className="hero-ctas">
          <button
            className="btn-primary font-mono"
            onClick={() => scrollTo('bin-projects')}
          >
            [ VIEW_PROJECTS ]
          </button>

          <button
            className="font-mono"
            onClick={() => scrollTo('contact')}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(139,233,253,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            style={{
              minHeight:     '44px',
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
              display:       'inline-flex',
              alignItems:    'center',
              justifyContent:'center',
              whiteSpace:    'nowrap',
            }}
          >
            [ SSH_CONTACT ]
          </button>
        </div>
      </div>

      {/* Scroll hint —
          bottom: env(safe-area-inset-bottom) garantiza que no
          tape el home indicator en iPhones con notch.            */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          bottom:        'max(40px, calc(32px + env(safe-area-inset-bottom)))',
          left:          '50%',
          transform:     'translateX(-50%)',
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '8px',
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize:      'clamp(8px, 2vw, 11px)',
            letterSpacing: '0.08em',
            color:         'var(--color-text-disabled)',
            whiteSpace:    'nowrap',
          }}
        >
          // SCROLL_TO_INITIALIZE_RUNTIME
        </span>
        <div
          style={{
            width:        '8px',
            height:       '8px',
            borderRight:  '1.5px solid var(--color-text-disabled)',
            borderBottom: '1.5px solid var(--color-text-disabled)',
            transform:    'rotate(45deg)',
            animation:    'bounce 1.5s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}