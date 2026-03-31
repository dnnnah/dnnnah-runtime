'use client'

import { CodeBlock } from './CodeBlock'

/**
 * Bloque 4 — education[] 
 * Historial educativo en formato array de Go.
 */

const EDUCATION = [
  {
    degree:      'B.S. in Software Development',
    institution: 'University of Guadalajara',
    year:        '2023 — present',
  },
]

export function EducationBlock() {
  return (
    <CodeBlock id="education" delay={240}>
      {/* var education = []Education{ */}
      <div style={{ marginBottom: '8px' }}>
        <span className="kw">var</span>
        <span className="val"> education </span>
        <span className="val">= </span>
        <span className="kw">[]Education</span>
        <span className="val">{'{'}</span>
      </div>

      {EDUCATION.map((item, i) => (
        <div
          key={i}
          style={{
            paddingLeft:  '20px',
            marginBottom: '8px',
          }}
        >
          <div>
            <span className="val">{'{'}</span>
          </div>

          <div style={{ paddingLeft: '20px' }}>
            <span className="kw3">degree</span>
            <span className="val">: </span>
            <span className="str">"{item.degree}"</span>
            <span className="val">,</span>
          </div>

          <div style={{ paddingLeft: '20px' }}>
            <span className="kw3">institution</span>
            <span className="val">: </span>
            <span className="str">"{item.institution}"</span>
            <span className="val">,</span>
          </div>

          <div style={{ paddingLeft: '20px' }}>
            <span className="kw3">year</span>
            <span className="val">: </span>
            <span className="str">"{item.year}"</span>
          </div>

          <div>
            <span className="val">{'}'}</span>
            {i < EDUCATION.length - 1 && <span className="val">,</span>}
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