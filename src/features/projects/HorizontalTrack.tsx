'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useHorizontalScroll } from './useHorizontalScroll'
import { ProjectCard }         from './ProjectCard'
import type { Project }        from './types'

interface HorizontalTrackProps {
  projects: Project[]
}

/* ── Desktop: GSAP track — original sin cambios ─────────── */
function DesktopTrack({ projects }: HorizontalTrackProps) {
  const trackRef = useHorizontalScroll()

  return (
    <div
      ref={trackRef}
      style={{
        display:       'flex',
        gap:           '32px',
        paddingTop:    '24px',
        paddingBottom: '24px',
        paddingLeft:   'clamp(24px, 5vw, 64px)',
        paddingRight:  'clamp(24px, 5vw, 64px)',
        ['--card-w' as string]: 'clamp(300px, 78vw, 820px)',
      }}
    >
      {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      <div aria-hidden="true" style={{ flexShrink: 0, width: 'clamp(60px, 10vw, 120px)' }} />
    </div>
  )
}

/* ── Mobile: carrusel ────────────────────────────────────── */
function MobileCarousel({ projects }: HorizontalTrackProps) {
  const [current, setCurrent] = useState(0)
  const total = projects.length

  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent(i => (i + 1) % total), [total])

  /* Swipe táctil */
  const touchStartX = useRef(0)

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev()
  }

  return (
    /*
      .carousel-wrapper: width 100%, overflow hidden.
      Ningún hijo puede salirse de este contenedor.
    */
    <div className="carousel-wrapper">

      {/* Card — .carousel-card define padding y box-sizing */}
      <div
        className="carousel-card"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ userSelect: 'none' }}
      >
        <ProjectCard project={projects[current]} />
      </div>

      {/* Controles — .carousel-controls: flex, padding lateral incluido */}
      <div className="carousel-controls">

        <button
          onClick={prev}
          aria-label="Proyecto anterior"
          className="font-mono"
          style={{
            background:   'transparent',
            border:       '1px solid var(--color-border)',
            color:        'var(--color-text-muted)',
            borderRadius: '4px',
            padding:      '8px 16px',
            fontSize:     '12px',
            cursor:       'pointer',
            minHeight:    '44px',
            transition:   'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--color-accent)'
            e.currentTarget.style.color       = 'var(--color-accent)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.color       = 'var(--color-text-muted)'
          }}
        >
          ← prev
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Proyecto ${i + 1}`}
              style={{
                width:        i === current ? '20px' : '6px',
                height:       '6px',
                borderRadius: '3px',
                background:   i === current ? 'var(--color-accent)' : 'var(--color-border)',
                border:       'none',
                cursor:       'pointer',
                padding:      0,
                transition:   'width 0.3s ease, background 0.2s ease',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Proyecto siguiente"
          className="font-mono"
          style={{
            background:   'transparent',
            border:       '1px solid var(--color-accent)',
            color:        'var(--color-accent)',
            borderRadius: '4px',
            padding:      '8px 16px',
            fontSize:     '12px',
            cursor:       'pointer',
            minHeight:    '44px',
            transition:   'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--color-accent)'
            e.currentTarget.style.color      = 'var(--color-bg-base)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color      = 'var(--color-accent)'
          }}
        >
          next →
        </button>
      </div>

      {/* Counter */}
      <p className="font-mono carousel-counter">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>
    </div>
  )
}

/* ── Export — elige componente por breakpoint ────────────── */
export function HorizontalTrack({ projects }: HorizontalTrackProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
    ? <MobileCarousel projects={projects} />
    : <DesktopTrack   projects={projects} />
}