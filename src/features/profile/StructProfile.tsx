'use client'

import { CodeBlock } from './CodeBlock'

/**
 * Bloque 1 — type Profile struct + instancia.
 * Idiomático Go: definición del tipo + variable.
 */

export function StructProfile() {
  return (
    <CodeBlock id="struct-profile" delay={0}>

      {/* type Profile struct { */}
      <div>
        <span className="kw">type</span>
        <span className="val"> Profile </span>
        <span className="kw">struct</span>
        <span className="val"> {'{'}</span>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <span className="kw3">Name</span>
        <span className="val">      </span>
        <span className="kw">string</span>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <span className="kw3">Role</span>
        <span className="val">      </span>
        <span className="kw">string</span>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <span className="kw3">Philosophy</span>
        <span className="val"> </span>
        <span className="kw">string</span>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <span className="kw3">Objective</span>
        <span className="val">  </span>
        <span className="kw">string</span>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <span className="kw3">Stack</span>
        <span className="val">     []</span>
        <span className="kw">string</span>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <span className="val">{'}'}</span>
      </div>

      {/* var me = Profile{ */}
      <div>
        <span className="kw">var</span>
        <span className="val"> me = Profile{'{'}</span>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <span className="kw3">Name</span>
        <span className="val">:      </span>
        <span className="str">"DNNNAH"</span>
        <span className="val">,</span>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <span className="kw3">Role</span>
        <span className="val">:      </span>
        <span className="str">"Junior Go Developer"</span>
        <span className="val">,</span>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <span className="kw3">Philosophy</span>
        <span className="val">: </span>
        <span className="str">"Solve complex problems with clean, scalable code."</span>
        <span className="val">,</span>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <span className="kw3">Objective</span>
        <span className="val">:  </span>
        <span className="str">"Remote Go role — LATAM → USA/EU"</span>
        <span className="val">,</span>
      </div>

      <div style={{ paddingLeft: '20px' }}>
        <span className="kw3">Stack</span>
        <span className="val">:     []</span>
        <span className="kw">string</span>
        <span className="val">{'{'}</span>
        {['Go', 'Python', 'TypeScript', 'AI'].map((item, i, arr) => (
          <span key={item}>
            <span className="str">"{item}"</span>
            {i < arr.length - 1 && <span className="val">, </span>}
          </span>
        ))}
        <span className="val">{'},'}</span>
      </div>

      <div>
        <span className="val">{'}'}</span>
      </div>

    </CodeBlock>
  )
}