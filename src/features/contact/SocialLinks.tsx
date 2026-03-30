'use client'

/**
 * Sidebar de contacto — status, email directo y links sociales.
 */

const SOCIAL_LINKS = [
  {
    icon:  'in',
    label: 'LinkedIn',
    sub:   'linkedin.com/in/dnnnah',
    href:  'https://linkedin.com/in/dnnnah',
  },
  {
    icon:  'gh',
    label: 'GitHub',
    sub:   'github.com/dnnnah',
    href:  'https://github.com/dnnnah',
  },
  {
    icon:  'cv',
    label: 'CV / Resume',
    sub:   'dnnnah_cv.pdf',
    href:  '/dnnnah_cv.pdf',
  },
]

export function SocialLinks() {
  return (
    <aside style={{
      display:       'flex',
      flexDirection: 'column',
      gap:           '0',
      backgroundColor: 'var(--color-bg-surface)',
      border:        '1px solid var(--color-border)',
      borderRadius:  '8px',
      overflow:      'hidden',
    }}>

      {/* Runtime status */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
        <p className="font-mono" style={{
          fontSize:      '10px',
          color:         'var(--color-accent-cyan)',
          letterSpacing: '0.08em',
          marginBottom:  '12px',
        }}>
          // runtime_status
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { key: 'Response time', val: '< 24h' },
            { key: 'Timezone',      val: 'UTC-5 (LATAM)' },
            { key: 'Open to',       val: 'Remote · Full-time · Contract' },
          ].map(item => (
            <div key={item.key} className="font-mono" style={{
              display:  'flex',
              gap:      '8px',
              fontSize: 'clamp(9px, 1.8vw, 11px)',
            }}>
              <span style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
                {item.key}:
              </span>
              <span style={{ color: 'var(--color-text)' }}>
                {item.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Direct contact */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
        <p className="font-mono" style={{
          fontSize:      '10px',
          color:         'var(--color-accent-cyan)',
          letterSpacing: '0.08em',
          marginBottom:  '12px',
        }}>
          // direct_contact
        </p>
        <a
          href="mailto:dnnnah@icloud.com"
          className="font-mono"
          style={{
            fontSize:       'clamp(9px, 1.8vw, 11px)',
            color:          'var(--color-text-muted)',
            textDecoration: 'none',
            transition:     'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
        >
          dnnnah[at]icloud[dot]com
        </a>
      </div>

      {/* Social links */}
      <div style={{ padding: '16px' }}>
        <p className="font-mono" style={{
          fontSize:      '10px',
          color:         'var(--color-accent-cyan)',
          letterSpacing: '0.08em',
          marginBottom:  '12px',
        }}>
          // social_links
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {SOCIAL_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:         'flex',
                alignItems:      'center',
                gap:             '10px',
                padding:         '10px 12px',
                border:          '1px solid var(--color-border)',
                borderRadius:    '4px',
                backgroundColor: 'var(--color-bg-base)',
                textDecoration:  'none',
                transition:      'border-color 0.2s ease, background-color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor       = 'var(--color-accent)'
                e.currentTarget.style.backgroundColor   = 'var(--color-bg-elevated)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor       = 'var(--color-border)'
                e.currentTarget.style.backgroundColor   = 'var(--color-bg-base)'
              }}
            >
              <span className="font-mono" style={{
                color:     'var(--color-accent)',
                minWidth:  '16px',
                fontSize:  '11px',
                fontWeight: 700,
              }}>
                {link.icon}
              </span>
              <div style={{ flex: 1 }}>
                <div className="font-mono" style={{
                  fontSize: '11px',
                  color:    'var(--color-text)',
                }}>
                  {link.label}
                </div>
                <div className="font-mono" style={{
                  fontSize: '9px',
                  color:    'var(--color-text-muted)',
                }}>
                  {link.sub}
                </div>
              </div>
              <span style={{
                fontSize: '9px',
                color:    'var(--color-text-muted)',
              }}>
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}