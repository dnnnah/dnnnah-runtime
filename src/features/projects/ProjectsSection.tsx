'use client'

import { projects }        from './data/projects'
import { HorizontalTrack } from './HorizontalTrack'
import { StatusBadge }     from './StatusBadge'

export function ProjectsSection() {
  const live     = projects.filter(p => p.status === 'live').length
  const building = projects.filter(p => p.status === 'building').length
  const offline  = projects.filter(p => p.status === 'offline').length

  return (
    <section
      id="bin-projects"
      style={{
        backgroundColor: 'var(--color-bg-base)',
        minHeight:       '100vh',
        paddingTop:      '56px',
      }}
    >
      <div style={{ padding: 'clamp(32px, 5vw, 64px) clamp(24px, 5vw, 64px) 0' }}>

        <p className="font-mono" style={{
          fontSize:      'clamp(9px, 2vw, 11px)',
          color:         'var(--color-text-muted)',
          letterSpacing: '0.08em',
          marginBottom:  '16px',
        }}>
          <span style={{ color: 'var(--color-accent)' }}>~/</span>
          bin/projects
        </p>

        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-start',
          flexWrap:       'wrap',
          gap:            '16px',
          marginBottom:   '8px',
        }}>
          <h2 className="font-mono" style={{
            fontSize:      'clamp(16px, 4vw, 24px)',
            fontWeight:    700,
            color:         'var(--color-text)',
            margin:        0,
            letterSpacing: '-0.02em',
          }}>
            EXEC_PROJ
            <span style={{ color: 'var(--color-accent)' }}>_RUNTIME</span>
          </h2>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <StatusBadge status="live"     count={live} />
            <StatusBadge status="building" count={building} />
            <StatusBadge status="offline"  count={offline} />
          </div>
        </div>

        <p className="font-mono" style={{
          fontSize:     'clamp(10px, 2vw, 12px)',
          color:        'var(--color-text-muted)',
          marginBottom: '32px',
        }}>
          // {projects.length} executables deployed · Horizontal scroll to inspect
        </p>
      </div>

      <div style={{ padding: '0' }}>
        <HorizontalTrack projects={projects} />
      </div>
    </section>
  )
}