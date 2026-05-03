'use client'

import { useState, useEffect } from 'react'
import type { Project }  from '@/features/projects/types'
import { StatusBadge }   from '@/features/projects/StatusBadge'

type NavGroup = 'overview' | 'technical' | 'engineering'

interface NavSection {
  id:    string
  label: string
  group: NavGroup
}

const NAV_SECTIONS: NavSection[] = [
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

const GROUPS: NavGroup[] = ['overview', 'technical', 'engineering']

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

/** Devuelve el id de la sección activa según la posición del scroll */
function getActiveSection(sections: { id: string; el: HTMLElement }[]): string {
  const scrollY  = window.scrollY
  const windowH  = window.innerHeight
  const docH     = document.documentElement.scrollHeight
  const atBottom = scrollY + windowH >= docH - 40

  if (atBottom) return sections[sections.length - 1].id

  let current = sections[0].id
  for (const { id, el } of sections) {
    if (el.getBoundingClientRect().top <= windowH * 0.3) current = id
  }
  return current
}

export function SidebarNav({ project }: { project: Project }) {
  const [active, setActive] = useState<string>('overview')

  useEffect(() => {
    /*
      reduce en lugar de map+filter — evita el type guard.
      Solo incluye secciones cuyo elemento existe en el DOM.
    */
    const sections = NAV_SECTIONS.reduce<{ id: string; el: HTMLElement }[]>((acc, s) => {
      const el = document.getElementById(s.id)
      if (el) acc.push({ id: s.id, el })
      return acc
    }, [])

    function onScroll() {
      setActive(getActiveSection(sections))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // estado inicial
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside
      className="showcase-sidebar"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRight:     '1px solid var(--color-border)',
      }}
    >
      {/* Project identity — zona fija superior */}
      <div style={{
        padding:      '16px',
        borderBottom: '1px solid var(--color-border)',
        flexShrink:   0,
      }}>
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
          /* Título largo se trunca sin desbordar */
          overflow:     'hidden',
          textOverflow: 'ellipsis',
          whiteSpace:   'nowrap',
        }}>
          {project.title}
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Navegación por secciones — zona scrollable del medio */}
      <nav style={{
        flex:      1,
        minHeight: 0,           /* permite shrink dentro del flex parent */
        overflowY: 'auto',
        padding:   '8px 0',
      }}>
        {GROUPS.map(group => (
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

            {NAV_SECTIONS.filter(s => s.group === group).map(s => {
              const isActive = active === s.id
              return (
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
                    color:          isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    background:     isActive ? 'rgba(189,147,249,0.06)' : 'transparent',
                    borderLeft:     `2px solid ${isActive ? 'var(--color-accent)' : 'transparent'}`,
                    textDecoration: 'none',
                    transition:     'all 0.15s ease',
                    whiteSpace:     'nowrap',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-accent)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-text-muted)'
                  }}
                >
                  <div style={{
                    width:        '5px',
                    height:       '5px',
                    borderRadius: '50%',
                    background:   isActive ? 'var(--color-accent)' : 'var(--color-text-disabled)',
                    flexShrink:   0,
                    transition:   'background 0.15s ease',
                  }} />
                  {s.label}
                </a>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Stack tags — zona fija inferior */}
      <div style={{
        padding:    '16px',
        borderTop:  '1px solid var(--color-border)',
        flexShrink: 0,
      }}>
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