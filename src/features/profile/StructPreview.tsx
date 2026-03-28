'use client'

/**
 * Vista previa compacta del struct Profile.
 * Va en el panel izquierdo sticky.
 * Usa las clases de syntax highlighting de globals.css.
 */

export function StructPreview() {
  return (
    <div
      className="font-mono"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        border:          '1px solid var(--color-border)',
        borderRadius:    '6px',
        padding:         '16px',
        fontSize:        'clamp(10px, 1.8vw, 12px)',
        lineHeight:      1.8,
      }}
    >
      {/* struct Profile { */}
      <div>
        <span className="kw">struct</span>
        <span className="val"> Profile </span>
        <span className="val">{'{'}</span>
      </div>

      {/* Name */}
      <div style={{ paddingLeft: '16px' }}>
        <span className="kw3">Name</span>
        <span className="val">: </span>
        <span className="str">"DNNNAH"</span>
        <span className="val">,</span>
      </div>

      {/* Role */}
      <div style={{ paddingLeft: '16px' }}>
        <span className="kw3">Role</span>
        <span className="val">: </span>
        <span className="str">"Go Developer"</span>
        <span className="val">,</span>
      </div>

      {/* Location */}
      <div style={{ paddingLeft: '16px' }}>
        <span className="kw3">Location</span>
        <span className="val">: </span>
        <span className="str">"LATAM → Remote"</span>
      </div>

      {/* } */}
      <div>
        <span className="val">{'}'}</span>
      </div>
    </div>
  )
}