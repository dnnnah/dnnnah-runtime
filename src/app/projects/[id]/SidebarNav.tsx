'use client'

import { useState, useEffect } from 'react'
import type { Project } from '@/features/projects/types'
import { StatusBadge }  from '@/features/projects/StatusBadge'

const NAV_SECTIONS = [
  { id: 'overview',     label: 'overview',        group: 'overview' },
  { id: 'screenshots',  label: 'screenshots',     group: 'overview' },
  { id: 'architecture', label: 'architecture',    group: 'technical' },
  { id: 'data-flow',    label: 'data flow',       group: 'technical' },
  { id: 'stack',        label: 'stack decisions', group: 'technical' },
  { id: 'patterns',     label: 'code patterns',   group: 'technical' },
  { id: 'challenges',   label: 'challenges',      group: 'engineering' },
  { id: 'scalability',  label: 'scalability',     group: 'engineering' },
  { id: 'results',      label: 'results',         group: 'engineering' },
  { id: 'lessons',      label: 'lessons',         group: 'engineering' },
]

const TAG_STYLES: Record<string, string> = {
  go:         'tag-go',
  python:     'tag-py',
  typescript: 'tag-ts',
  react:      'tag-ts',
  postgresql: 'tag-db',
  redis:      'tag-db',
  supabase:   'tag-db',
  docker:     'tag-inf',
  rabbitmq:   'tag-inf',
  linux:      'tag-inf',
  langchain:  'tag-py',
  cobra:      'tag-go',
}

export function SidebarNav({ project }: { project: Project }) {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    // Scroll spy basado en posición — más robusto que IntersectionObserver
    // para la última sección
    function onScroll() {
      const sections = NAV_SECTIONS.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      })).filter(s => s.el !== null)

      const scrollY     = window.scrollY
      const windowH     = window.innerHeight
      const docH        = document.documentElement.scrollHeight
      const atBottom    = scrollY + windowH >= docH - 40

      // Si está al fondo, activa la última sección
      if (atBottom) {
        setActive(sections[sections.length - 1].id)
        return
      }

      // Busca la sección más cercana al top del viewport
      let current = sections[0].id
      for (const { id, el } of sections) {
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= windowH * 0.3) {
          current = id
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // inicial

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const groups = ['overview', 'technical', 'engineering'] as const

  return (
    <aside
      className="showcase-sidebar"
      style={{
        position:        'sticky',
        top:             '112px',
        height:          'calc(100vh - 112px)',
        overflowY:       'auto',
        backgroundColor: 'var(--color-bg-surface)',
        borderRight:     '1px solid var(--color-border)',
        flexDirection:   'column',
      }}
    >
      {/* Project identity */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
        <div className="font-mono" style={{
          fontSize:      '8px',
          color:         'var(--color-text-muted)',
          letterSpacing: '0.1em',
          marginBottom:  '4px',
        }}>
          {project.execId}
        </div>
        <div className="font-mono" style={{
          fontSize:     '13px',
          fontWeight:   700,
          color:        'var(--color-text)',
          marginBottom: '8px',
        }}>
          {project.title}
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Nav sections */}
      <nav style={{ flex: 1, padding: '8px 0' }}>
        {groups.map(group => (
          <div key={group}>
            <div className="font-mono" style={{
              fontSize:      '8px',
              color:         'var(--color-text-disabled)',
              letterSpacing: '0.12em',
              padding:       '8px 16px 4px',
              textTransform: 'uppercase',
            }}>
              {group}
            </div>
            {NAV_SECTIONS.filter(s => s.group === group).map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-mono"
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  gap:            '8px',
                  padding:        '6px 16px',
                  fontSize:       '10px',
                  color:          active === s.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  background:     active === s.id ? 'rgba(189,147,249,0.06)' : 'transparent',
                  borderLeft:     `2px solid ${active === s.id ? 'var(--color-accent)' : 'transparent'}`,
                  textDecoration: 'none',
                  transition:     'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (active !== s.id) e.currentTarget.style.color = 'var(--color-accent)'
                }}
                onMouseLeave={e => {
                  if (active !== s.id) e.currentTarget.style.color = 'var(--color-text-muted)'
                }}
              >
                <div style={{
                  width:        '5px',
                  height:       '5px',
                  borderRadius: '50%',
                  background:   active === s.id ? 'var(--color-accent)' : 'var(--color-text-disabled)',
                  flexShrink:   0,
                  transition:   'background 0.15s ease',
                }} />
                {s.label}
              </a>
            ))}
          </div>
        ))}
      </nav>

      {/* Stack tags */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--color-border)' }}>
        <div className="font-mono" style={{
          fontSize:      '8px',
          color:         'var(--color-text-muted)',
          letterSpacing: '0.1em',
          marginBottom:  '8px',
        }}>
          {'// stack'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              className={`tag-base ${TAG_STYLES[tag] ?? 'tag-go'} font-mono`}
              style={{ fontSize: '8px' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}