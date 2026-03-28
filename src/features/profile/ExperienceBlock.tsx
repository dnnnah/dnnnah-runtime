'use client'

import { CodeBlock } from './CodeBlock'

/**
 * Bloque 3 — experience[] timeline.
 * Dots de color según antigüedad del rol.
 */

const EXPERIENCE = [
  {
    year:    '2024 — presente',
    title:   'Go Backend Developer',
    company: 'Startup · Remote',
    dot:     'var(--color-accent)',
  },
  {
    year:    '2023 — 2024',
    title:   'Automation Engineer',
    company: 'Freelance · Python + Go',
    dot:     'var(--color-text-muted)',
  },
  {
    year:    '2022 — 2023',
    title:   'Primer proyecto Go',
    company: 'Side project · Open source',
    dot:     'var(--color-text-disabled)',
  },
]

export function ExperienceBlock() {
  return (
    <CodeBlock id="experience" delay={160}>
      {/* var experience = []Experience{ */}
      <div style={{ marginBottom: '8px' }}>
        <span className="kw">var</span>
        <span className="val"> experience </span>
        <span className="val">= </span>
        <span className="kw">[]Experience</span>
        <span className="val">{'{'}</span>
      </div>

      {/* Timeline items */}
      {EXPERIENCE.map((item, i) => (
        <div
          key={i}
          style={{
            paddingLeft:  '20px',
            marginBottom: i < EXPERIENCE.length - 1 ? '16px' : '8px',
            display:      'flex',
            gap:          '12px',
            alignItems:   'flex-start',
          }}
        >
          {/* Dot + línea vertical */}
          <div style={{
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            paddingTop:    '4px',
            gap:           '4px',
          }}>
            <span style={{
              width:           '8px',
              height:          '8px',
              borderRadius:    '50%',
              backgroundColor: item.dot,
              flexShrink:      0,
            }} />
            {i < EXPERIENCE.length - 1 && (
              <span style={{
                width:           '1px',
                height:          '32px',
                backgroundColor: 'var(--color-border)',
              }} />
            )}
          </div>

          {/* Contenido */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span className="cm" style={{ fontSize: '10px' }}>
              {item.year}
            </span>
            <span className="val" style={{ fontWeight: 700, fontSize: '13px' }}>
              {item.title}
            </span>
            <span className="cm" style={{ fontSize: '11px' }}>
              {item.company}
            </span>
          </div>
        </div>
      ))}

      {/* } */}
      <div>
        <span className="val">{'}'}</span>
      </div>
    </CodeBlock>
  )
}