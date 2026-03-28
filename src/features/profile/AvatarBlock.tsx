'use client'

/**
 * Bloque de avatar y datos básicos del perfil.
 * Avatar: imagen local en /public/avatar.png
 * Placeholder: ◈ centrado si no hay imagen.
 */

export function AvatarBlock() {
  return (
    <div style={{
      display:    'flex',
      alignItems: 'center',
      gap:        '16px',
    }}>
      {/* Avatar */}
      <div style={{
        width:           '80px',
        height:          '80px',
        borderRadius:    '8px',
        backgroundColor: 'var(--color-bg-elevated)',
        border:          '1px solid var(--color-border)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        flexShrink:      0,
        overflow:        'hidden',
      }}>
        {/* Reemplaza src con tu imagen real cuando la tengas */}
        <span
          className="font-mono"
          style={{
            fontSize: '24px',
            color:    'var(--color-accent)',
          }}
        >
          ◈
        </span>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p
          className="font-mono"
          style={{
            fontWeight: 700,
            fontSize:   '13px',
            color:      'var(--color-text)',
            margin:     0,
          }}
        >
          DNNNAH
        </p>
        <p
          className="font-mono"
          style={{
            fontSize: '11px',
            color:    'var(--color-text-muted)',
            margin:   0,
          }}
        >
          Junior Go Developer
        </p>
        <p
          className="font-mono"
          style={{
            fontSize: '10px',
            color:    'var(--color-status-live)',
            margin:   0,
          }}
        >
          ● Available for hire
        </p>
      </div>
    </div>
  )
}