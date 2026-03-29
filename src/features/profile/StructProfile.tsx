'use client'

import { CodeBlock } from './CodeBlock'

/**
 * Bloque 1 — var me Profile
 * Go idiomático: solo la instancia con valores reales.
 * La declaración del tipo no aporta nada al reclutador.
 * Formato: gofmt — campos alineados con tabs.
 */

const stack = ['Go', 'Python', 'TypeScript', 'AI']

export function StructProfile() {
  return (
    <CodeBlock id="struct-profile" delay={0}>

      {/* Comentario de paquete — contexto */}
      <div style={{ marginBottom: '8px' }}>
        <span className="cm">// package main — kernel/profile</span>
      </div>

      {/* var me = Profile{ */}
      <div>
        <span className="kw">var</span>
        <span className="val"> me </span>
        <span className="val">= Profile</span>
        <span className="val">{'{'}</span>
      </div>

      {/* Name — alineado con gofmt */}
      <div style={{ paddingLeft: '24px' }}>
        <span className="kw3">Name</span>
        <span className="val">:{'      '}</span>
        <span className="str">"DNNNAH"</span>
        <span className="val">,</span>
      </div>

      {/* Role */}
      <div style={{ paddingLeft: '24px' }}>
        <span className="kw3">Role</span>
        <span className="val">:{'      '}</span>
        <span className="str">"Junior Go Developer"</span>
        <span className="val">,</span>
      </div>

      {/* Location */}
      <div style={{ paddingLeft: '24px' }}>
        <span className="kw3">Location</span>
        <span className="val">:{'  '}</span>
        <span className="str">"LATAM → Remote"</span>
        <span className="val">,</span>
      </div>

      {/* Philosophy — campo destacado */}
      <div style={{ paddingLeft: '24px' }}>
        <span className="kw3">Philosophy</span>
        <span className="val">:</span>
        <span className="val"> </span>
        <span className="str"
          style={{ color: 'var(--color-text)' }}
        >
          "Solve complex problems with clean, scalable code."
        </span>
        <span className="val">,</span>
      </div>

      {/* Objective — campo destacado */}
      <div style={{ paddingLeft: '24px' }}>
        <span className="kw3">Objective</span>
        <span className="val">:{'  '}</span>
        <span className="str"
          style={{ color: 'var(--color-text)' }}
        >
          "Remote Go role — LATAM → USA/EU"
        </span>
        <span className="val">,</span>
      </div>

      {/* Stack — multiline gofmt style */}
      <div style={{ paddingLeft: '24px' }}>
        <span className="kw3">Stack</span>
        <span className="val">:{'     []'}</span>
        <span className="kw">string</span>
        <span className="val">{'{'}</span>
      </div>

      {stack.map((item) => (
        <div key={item} style={{ paddingLeft: '48px' }}>
          <span className="str">"{item}"</span>
          <span className="val">,</span>
        </div>
      ))}

      <div style={{ paddingLeft: '24px' }}>
        <span className="val">{'}'}</span>
        <span className="val">,</span>
      </div>

      {/* Cierre */}
      <div>
        <span className="val">{'}'}</span>
      </div>

    </CodeBlock>
  )
}