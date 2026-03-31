'use client'

import type { Project } from './types'
import { StatusBadge }  from './StatusBadge'
import { useRouter }    from 'next/navigation'

const TAG_STYLES: Record<string, string> = {
  go:         'tag-go',
  python:     'tag-py',
  typescript: 'tag-ts',
  postgresql: 'tag-db',
  redis:      'tag-db',
  supabase:   'tag-db',
  docker:     'tag-inf',
  rabbitmq:   'tag-inf',
  linux:      'tag-inf',
  langchain:  'tag-py',
  react:      'tag-ts',
  cobra:      'tag-go',
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project}: ProjectCardProps) {
  const router = useRouter()

  return (
    <article
      onClick={() => router.push(`/projects/${project.id}`)}
      aria-label={project.title}
      style={{
        width: 'clamp(320px, 78vw, 820px)',
        flexShrink:      0,
        cursor:          'pointer',
        backgroundColor: 'var(--color-bg-surface)',
        border:          '1px solid var(--color-border)',
        borderRadius:    '8px',
        overflow:        'hidden',
        transition:      'border-color 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-accent)'
        e.currentTarget.style.transform   = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.transform   = 'translateY(0)'
      }}
    >
      {/* Screenshot — más alto */}
      <div
        style={{
          position:        'relative',
          height:          '280px',
          overflow:        'hidden',
          backgroundColor: 'var(--color-bg-elevated)',
        }}
      >
        {project.screenshot.startsWith('/projects') ? (
          <div
            style={{
              width:          '100%',
              height:         '100%',
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '8px',
            }}
          >
            <span
              className="font-mono"
              style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}
            >
              {project.execId}
            </span>
            <span
              className="font-mono"
              style={{ fontSize: '9px', color: 'var(--color-disabled)' }}
            >
              // screenshot pending
            </span>
          </div>
        ) : (
          <img
            src={project.screenshot}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        {/* Hover overlay */}
        <div className="card-overlay">
          <p
            className="font-mono"
            style={{
              fontSize:      '11px',
              color:         'var(--color-text)',
              textAlign:     'center',
              padding:       '0 24px',
              letterSpacing: '0.05em',
              lineHeight:    1.8,
            }}
          >
            {project.stack.join(' · ')}
          </p>
        </div>

        {/* ExecId label — top left */}
        <div
          style={{
            position:        'absolute',
            top:             '12px',
            left:            '12px',
            backgroundColor: 'var(--color-bg-elevated)',
            backdropFilter:  'blur(4px)',
            padding:         '3px 8px',
            borderRadius:    '3px',
            border:          '1px solid var(--color-border)',
          }}
        >
          <span
            className="font-mono"
            style={{ fontSize: '9px', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}
          >
            {project.execId}
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding:       '16px',
          display:       'flex',
          flexDirection: 'column',
          gap:           '10px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-start',
            gap:            '12px',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize:   'clamp(12px, 2vw, 14px)',
              fontWeight: 700,
              color:      'var(--color-text)',
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </span>
          <StatusBadge status={project.status} />
        </div>

        {/* Build time */}
        <p
          className="font-mono"
          style={{ fontSize: '10px', color: 'var(--color-text-muted)', margin: 0 }}
        >
          build_time: {project.buildTime} · {project.stack[0]}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              className={`tag-base ${TAG_STYLES[tag] ?? 'tag-go'} font-mono`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            paddingTop:     '10px',
            borderTop:      '1px solid var(--color-border)',
          }}
        >
          <span
            className="font-mono"
            style={{ fontSize: '10px', color: 'var(--color-accent)' }}
          >
            {'>'} inspect_project
          </span>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="font-mono"
                style={{
                  fontSize:       '10px',
                  color:          'var(--color-accent-cyan)',
                  textDecoration: 'none',
                  border:         '1px solid rgba(139,233,253,0.3)',
                  padding:        '2px 8px',
                  borderRadius:   '3px',
                  transition:     'background 0.2s ease',
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.background = 'rgba(139,233,253,0.08)')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.background = 'transparent')
                }
              >
                ↗ demo
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="font-mono"
              style={{
                fontSize:       '10px',
                color:          'var(--color-text-muted)',
                textDecoration: 'none',
                border:         '1px solid var(--color-border)',
                padding:        '2px 8px',
                borderRadius:   '3px',
                transition:     'color 0.2s ease',
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.color = 'var(--color-text)')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.color = 'var(--color-text-muted)')
              }
            >
              ↗ github
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}