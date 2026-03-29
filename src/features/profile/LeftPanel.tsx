'use client'

const navItems = [
  { label: 'struct Profile',             href: '#struct-profile' },
  { label: 'type Automation',            href: '#type-automation' },
  { label: 'experience[]',               href: '#experience' },
  { label: 'education[]',                href: '#education' },
  { label: 'certifications[]',           href: '#certifications' },
  { label: '// soft skills',             href: '#soft-skills' },
]

interface LeftPanelProps {
  activeSection?: string
}

export function LeftPanel({ activeSection = 'struct-profile' }: LeftPanelProps) {
  return (
    <aside
      style={{
        position:      'sticky',
        top:           '80px',
        height:        'fit-content',
        display:       'flex',
        flexDirection: 'column',
        gap:           '24px',
      }}
    >

      {/* Identity — sin código Go */}
      <div
        style={{
          background:   'var(--color-bg-surface)',
          border:       '1px solid var(--color-border)',
          borderRadius: '8px',
          padding:      '16px',
          display:      'flex',
          gap:          '12px',
          alignItems:   'flex-start',
        }}
      >
        {/* Avatar initials */}
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
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            gap:           '3px',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontWeight: 700,
              fontSize:   '13px',
              color:      'var(--color-text)',
            }}
          >
            DNNNAH
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: '10px',
              color:    'var(--color-text-muted)',
            }}
          >
            Junior Go Developer
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: '10px',
              color:    'var(--color-text-muted)',
            }}
          >
            LATAM → Remote
          </span>
          <span
            className="font-mono"
            style={{
              fontSize:  '10px',
              color:     'var(--color-status-live)',
              marginTop: '4px',
            }}
          >
            ● Available for hire
          </span>
        </div>
      </div>

      {/* Section navigation */}
      <nav aria-label="Profile sections">
        <ul
          style={{
            listStyle:     'none',
            margin:        0,
            padding:       0,
            display:       'flex',
            flexDirection: 'column',
            gap:           '2px',
          }}
        >
          {navItems.map((item) => {
            const active = activeSection === item.href.replace('#', '')
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono"
                  style={{
                    display:        'block',
                    fontSize:       '11px',
                    padding:        '6px 10px',
                    textDecoration: 'none',
                    borderLeft:     `2px solid ${active ? 'var(--color-accent)' : 'transparent'}`,
                    borderRadius:   '0 4px 4px 0',
                    color:          active
                      ? 'var(--color-accent)'
                      : 'var(--color-text-muted)',
                    background: active
                      ? 'rgba(189, 147, 249, 0.08)'
                      : 'transparent',
                    transition: 'color 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.color      = 'var(--color-accent)'
                      e.currentTarget.style.background = 'rgba(189, 147, 249, 0.05)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
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