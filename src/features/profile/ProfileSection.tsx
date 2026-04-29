'use client'

import { LeftPanel }  from './LeftPanel'
import { RightPanel } from './RightPanel'

/**
 * Sección kernel/profile.
 *
 * Layout manejado 100% por CSS (.profile-grid / .profile-left).
 * Sin window.innerWidth — elimina el FOUC en SSR y simplifica el componente.
 */
export function ProfileSection() {
  return (
    <section
      id="profile"
      style={{
        backgroundColor: 'var(--color-bg-base)',
        minHeight:       '100vh',
        paddingTop:      'var(--navbar-h)',
        
       }}
    >
      <div style={{ padding: 'var(--page-y) var(--page-x)' }}>

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

        {/*
          .profile-grid — definido en globals.css:
          - Desktop: 280px | 1fr
          - Mobile ≤ 767px: 1fr (single column)

          .profile-left — sticky en desktop, relative en mobile.
        */}
        <div className="profile-grid">
          <div className="profile-left">
            <LeftPanel />
          </div>
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
          <div
            aria-hidden="true"
            style={{
              width:        '8px',
              height:       '8px',
              margin:       '8px auto 0',
              borderRight:  '1.5px solid var(--color-text-disabled)',
              borderBottom: '1.5px solid var(--color-text-disabled)',
              transform:    'rotate(45deg)',
              animation:    'bounce 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}