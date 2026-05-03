'use client'

import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'struct Profile',   id: 'struct-profile' },
  { label: 'type Automation',  id: 'type-automation' },
  { label: 'experience[]',     id: 'experience' },
  { label: 'education[]',      id: 'education' },
  { label: 'certifications[]', id: 'certifications' },
  { label: '// soft skills',   id: 'soft-skills' },
]

/**
 * Devuelve el id de la sección activa según scroll.
 * Misma lógica que SidebarNav — función pura, testeable.
 */
function getActiveId(sections: { id: string; el: HTMLElement }[]): string {
  const windowH  = window.innerHeight
  const scrollY  = window.scrollY
  const docH     = document.documentElement.scrollHeight
  const atBottom = scrollY + windowH >= docH - 40

  if (atBottom) return sections[sections.length - 1].id

  let current = sections[0].id
  for (const { id, el } of sections) {
    if (el.getBoundingClientRect().top <= windowH * 0.35) current = id
  }
  return current
}

export function LeftPanel() {
  const [active, setActive] = useState<string>('struct-profile')

  useEffect(() => {
    /* Resuelve elementos una sola vez al montar */
    const sections = NAV_ITEMS.reduce<{ id: string; el: HTMLElement }[]>((acc, item) => {
      const el = document.getElementById(item.id)
      if (el) acc.push({ id: item.id, el })
      return acc
    }, [])

    if (sections.length === 0) return

    function onScroll() {
      setActive(getActiveId(sections))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // estado inicial

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside style={{

      height:        'fit-content',
      display:       'flex',
      flexDirection: 'column',
      gap:           '24px',
    }}>

      {/* Identity */}
      <div style={{
        background:   'var(--color-bg-surface)',
        border:       '1px solid var(--color-border)',
        borderRadius: '8px',
        padding:      '16px',
        display:      'flex',
        gap:          '12px',
        alignItems:   'flex-start',
      }}>
        {/* Avatar */}
        <div
          aria-hidden="true"
          className="font-mono"
          style={{
            width:          '64px',
            height:         '64px',
            borderRadius:   '8px',
            background:     'var(--color-bg-elevated)',
            border:         '1px solid var(--color-border)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
            fontWeight:     700,
            fontSize:       '20px',
            color:          'var(--color-accent)',
          }}
        >
          DN
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span className="font-mono" style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-text)' }}>
            DNNNAH
          </span>
          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
            Junior Go Developer
          </span>
          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
            LATAM → Remote
          </span>
          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--color-status-live)', marginTop: '4px' }}>
            ● Active
          </span>
        </div>
      </div>

      {/* Navegación con scroll spy */}
      <nav aria-label="Profile sections">
        <ul style={{
          listStyle:     'none',
          margin:        0,
          padding:       0,
          display:       'flex',
          flexDirection: 'column',
          gap:           '2px',
        }}>
          {NAV_ITEMS.map(item => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="font-mono"
                  style={{
                    display:        'block',
                    fontSize:       '11px',
                    padding:        '6px 10px',
                    textDecoration: 'none',
                    borderLeft:     `2px solid ${isActive ? 'var(--color-accent)' : 'transparent'}`,
                    borderRadius:   '0 4px 4px 0',
                    color:          isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    background:     isActive ? 'rgba(189, 147, 249, 0.08)' : 'transparent',
                    transition:     'color 0.2s ease, background 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color      = 'var(--color-accent)'
                      e.currentTarget.style.background = 'rgba(189, 147, 249, 0.05)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color      = 'var(--color-text-muted)'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

    </aside>
  )
}