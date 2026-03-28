'use client'

import { useEffect, useState } from 'react'
import { NavBar }     from '@/shared/components/NavBar'
import { LeftPanel }  from './LeftPanel'
import { RightPanel } from './RightPanel'

/**
 * Sección kernel/profile.
 * Desktop: grid 2 columnas, panel izquierdo sticky.
 * Mobile: 1 columna, sin sticky.
 */

export function ProfileSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < 768)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      id="profile"
      style={{
        backgroundColor: 'var(--color-bg-base)',
        minHeight:       '100vh',
        paddingTop:      '80px',
      }}
    >
      <NavBar />

      <div style={{
        padding: 'clamp(32px, 5vw, 64px) clamp(24px, 5vw, 64px)',
      }}>
        {/* Breadcrumb */}
        <p
          className="font-mono"
          style={{
            fontSize:      'clamp(9px, 2vw, 11px)',
            color:         'var(--color-text-muted)',
            letterSpacing: '0.08em',
            marginBottom:  '48px',
          }}
        >
          <span style={{ color: 'var(--color-accent)' }}>~/</span>
          kernel/profile
        </p>

        {/* Grid */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
          gap:                 'clamp(24px, 4vw, 48px)',
          alignItems:          'start',
        }}>
          {/* Panel izquierdo */}
          <div style={{
            position: isMobile ? 'relative' : 'sticky',
            top:      isMobile ? 'auto' : '80px',
          }}>
            <LeftPanel />
          </div>

          {/* Panel derecho */}
          <RightPanel />
        </div>

        {/* Scroll hint */}
        <div style={{ textAlign: 'center', paddingTop: '48px' }}>
          <span
            className="font-mono"
            style={{
              fontSize:      'clamp(9px, 2vw, 11px)',
              letterSpacing: '0.08em',
              color:         'var(--color-text-disabled)',
            }}
          >
            // SCROLL_VERTICAL_TO_VIEW_EXPERIENCE_RUNTIME
          </span>
          <div style={{
            width:        '8px',
            height:       '8px',
            margin:       '8px auto 0',
            borderRight:  '1.5px solid var(--color-text-disabled)',
            borderBottom: '1.5px solid var(--color-text-disabled)',
            transform:    'rotate(45deg)',
            animation:    'bounce 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  )
}