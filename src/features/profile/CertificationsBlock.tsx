'use client'

import { CodeBlock } from './CodeBlock'

/**
 * Bloque 5 — certifications[]
 * Lista de certificaciones en formato array de Go.
 */

const CERTIFICATIONS = [
  {
    name:   'Go Fundamentals',
    issuer: 'Coursera',
  },
  {
    name:   'AWS Cloud Practitioner',
    issuer: 'Amazon',
  },
]

export function CertificationsBlock() {
  return (
    <CodeBlock id="certifications" delay={320}>
      {/* var certifications = []Cert{ */}
      <div style={{ marginBottom: '8px' }}>
        <span className="kw">var</span>
        <span className="val"> certifications </span>
        <span className="val">= </span>
        <span className="kw">[]Cert</span>
        <span className="val">{'{'}</span>
      </div>

      {CERTIFICATIONS.map((cert, i) => (
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
            <span className="kw3">name</span>
            <span className="val">: </span>
            <span className="str">"{cert.name}"</span>
            <span className="val">,</span>
          </div>

          <div style={{ paddingLeft: '20px' }}>
            <span className="kw3">issuer</span>
            <span className="val">: </span>
            <span className="str">"{cert.issuer}"</span>
          </div>

          <div>
            <span className="val">{'}'}</span>
            {i < CERTIFICATIONS.length - 1 && <span className="val">,</span>}
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