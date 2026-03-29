'use client'

import { useEffect, useRef }  from 'react'
import ReactMarkdown           from 'react-markdown'
import { createPortal }        from 'react-dom'
import type { Project }        from './types'
import { StatusBadge }         from './StatusBadge'
import { MetricCard }          from './MetricCard'

interface ProjectDetailProps {
  project: Project | null
  open:    boolean
  onClose: () => void
}

export function ProjectDetail({ project, open, onClose }: ProjectDetailProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Bloquea scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Focus trap — devuelve el foco al cerrar
  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus()
    }
  }, [open])

  if (!project) return null

  return createPortal(
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position:        'fixed',
          inset:           0,
          zIndex:          9997,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          opacity:         open ? 1 : 0,
          pointerEvents:   open ? 'auto' : 'none',
          transition:      'opacity 0.3s ease',
        }}
      />

      {/* Panel — slide desde la derecha */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} detail`}
        tabIndex={-1}
        style={{
          position:        'fixed',
          top:             0,
          right:           0,
          bottom:          0,
          width:           'min(100vw, 900px)',
          zIndex:          9998,
          backgroundColor: 'var(--color-bg-base)',
          borderLeft:      '1px solid var(--color-border)',
          overflowY:       'auto',
          transform:       open ? 'translateX(0)' : 'translateX(100%)',
          transition:      'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          outline:         'none',
        }}
      >

        {/* ── HEADER ── */}
        <div
          style={{
            position:        'sticky',
            top:             0,
            zIndex:          10,
            backgroundColor: 'rgba(40, 42, 54, 0.92)',
            backdropFilter:  'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom:    '1px solid var(--color-border)',
            padding:         '16px 24px',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'space-between',
            gap:             '16px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              className="font-mono"
              style={{ fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}
            >
              // man {project.execId}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span
                className="font-mono"
                style={{ fontSize: 'clamp(13px, 2.5vw, 16px)', fontWeight: 700, color: 'var(--color-text)' }}
              >
                {project.title}
              </span>
              <StatusBadge status={project.status} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono btn-primary"
                style={{
                  fontSize:       '10px',
                  minHeight:      '36px',
                  padding:        '6px 14px',
                  textDecoration: 'none',
                  display:        'flex',
                  alignItems:     'center',
                }}
              >
                ↗ DEMO
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              style={{
                fontSize:       '10px',
                color:          'var(--color-text-muted)',
                textDecoration: 'none',
                border:         '1px solid var(--color-border)',
                padding:        '6px 14px',
                borderRadius:   '4px',
                minHeight:      '36px',
                display:        'flex',
                alignItems:     'center',
                transition:     'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color       = 'var(--color-text)'
                e.currentTarget.style.borderColor = 'var(--color-border-hover)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color       = 'var(--color-text-muted)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
              }}
            >
              GitHub ↗
            </a>
            <button
              onClick={onClose}
              aria-label="Cerrar detalle"
              className="font-mono"
              style={{
                background:    'transparent',
                border:        '1px solid var(--color-border)',
                color:         'var(--color-text-muted)',
                cursor:        'pointer',
                borderRadius:  '4px',
                minHeight:     '44px',
                minWidth:      '44px',
                fontSize:      '14px',
                transition:    'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color       = 'var(--color-status-off)'
                e.currentTarget.style.borderColor = 'var(--color-status-off)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color       = 'var(--color-text-muted)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── BODY ── */}
        <div
          className="detail-body"
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 280px',
            gap:                 0,
            alignItems:          'start',
          }}
        >

          {/* MAIN — izquierda */}
          <div style={{ padding: '32px 28px', borderRight: '1px solid var(--color-border)' }}>

            {/* README */}
            <div style={{ marginBottom: '40px' }}>
              <p
                className="font-mono"
                style={{
                  fontSize:      '9px',
                  color:         'var(--color-text-muted)',
                  letterSpacing: '0.12em',
                  marginBottom:  '16px',
                  paddingBottom: '8px',
                  borderBottom:  '1px solid var(--color-border)',
                }}
              >
                // README.md
              </p>
              <div
                className="font-mono readme-content"
                style={{
                  fontSize:   'clamp(11px, 1.8vw, 13px)',
                  lineHeight: 1.9,
                  color:      'var(--color-text)',
                }}
              >
                <ReactMarkdown>{project.readme}</ReactMarkdown>
              </div>
            </div>

            {/* Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div>
                <p
                  className="font-mono"
                  style={{
                    fontSize:      '9px',
                    color:         'var(--color-text-muted)',
                    letterSpacing: '0.12em',
                    marginBottom:  '16px',
                    paddingBottom: '8px',
                    borderBottom:  '1px solid var(--color-border)',
                  }}
                >
                  // screenshots
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {project.screenshots.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      style={{
                        width:        '100%',
                        borderRadius: '6px',
                        border:       '1px solid var(--color-border)',
                        objectFit:    'cover',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR — derecha */}
          <div style={{ padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Métricas */}
            <div>
              <p
                className="font-mono"
                style={{
                  fontSize:      '9px',
                  color:         'var(--color-text-muted)',
                  letterSpacing: '0.12em',
                  marginBottom:  '12px',
                  paddingBottom: '6px',
                  borderBottom:  '1px solid var(--color-border)',
                }}
              >
                // metrics
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {project.metrics.buildTime  && <MetricCard value={project.metrics.buildTime}  label="build_time"   />}
                {project.metrics.uptime     && <MetricCard value={project.metrics.uptime}     label="uptime"       />}
                {project.metrics.requests   && <MetricCard value={project.metrics.requests}   label="req/day"      />}
                {project.metrics.binarySize && <MetricCard value={project.metrics.binarySize} label="binary"       />}
              </div>
            </div>

            {/* Stack técnico */}
            <div>
              <p
                className="font-mono"
                style={{
                  fontSize:      '9px',
                  color:         'var(--color-text-muted)',
                  letterSpacing: '0.12em',
                  marginBottom:  '12px',
                  paddingBottom: '6px',
                  borderBottom:  '1px solid var(--color-border)',
                }}
              >
                // stack
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {project.stack.map(item => (
                  <div
                    key={item}
                    style={{
                      display:         'flex',
                      alignItems:      'center',
                      gap:             '8px',
                      padding:         '6px 10px',
                      backgroundColor: 'var(--color-bg-elevated)',
                      borderRadius:    '4px',
                      border:          '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      style={{
                        width:           '6px',
                        height:          '6px',
                        borderRadius:    '50%',
                        backgroundColor: 'var(--color-accent)',
                        flexShrink:      0,
                      }}
                    />
                    <span
                      className="font-mono"
                      style={{ fontSize: '11px', color: 'var(--color-text)' }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decisiones de arquitectura */}
            <div>
              <p
                className="font-mono"
                style={{
                  fontSize:      '9px',
                  color:         'var(--color-text-muted)',
                  letterSpacing: '0.12em',
                  marginBottom:  '12px',
                  paddingBottom: '6px',
                  borderBottom:  '1px solid var(--color-border)',
                }}
              >
                // architecture
              </p>
              <p
                className="font-mono"
                style={{
                  fontSize:   'clamp(10px, 1.6vw, 11px)',
                  color:      'var(--color-text-muted)',
                  lineHeight: 1.9,
                }}
              >
                {project.architecture}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>,
    document.body
  )
}