'use client'

import { ContactForm }  from './ContactForm'
import { SocialLinks }  from './SocialLinks'

/**
 * Sección std/output — formulario de contacto estilo terminal.
 * Narrativa sys/exit: última sección antes de cerrar el runtime.
 */

const TERMINAL_LINES = [
  { color: 'var(--color-accent)',      text: '> sys/terminal: EXIT_CODE: CONTACT_RUNTIME' },
  { color: 'var(--color-status-live)', text: '> sys/terminal: RUNTIME_SESSION: COMPLETED ✓' },
  { color: 'var(--color-text-muted)',  text: '> sys/terminal: Ready to dispatch contact payload... OK // _' },
]

const FOOTER_LINKS = [
  { label: '> linkedin.com/in/dnnnah', href: 'https://linkedin.com/in/dnnnah' },
  { label: '> github.com/dnnnah',      href: 'https://github.com/dnnnah' },
  { label: '> dnnnah_cv.pdf',          href: '/dnnnah_cv.pdf' },
]

export function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'var(--color-bg-base)',
        minHeight:       '100vh',
        paddingTop:      '56px',
      }}
    >

      <div style={{
        padding: 'clamp(32px, 5vw, 64px) clamp(24px, 5vw, 64px)',
        maxWidth: '1100px',
        margin:   '0 auto',
      }}>

        {/* Breadcrumb */}
        <p className="font-mono" style={{
          fontSize:      'clamp(9px, 2vw, 11px)',
          color:         'var(--color-text-muted)',
          letterSpacing: '0.08em',
          marginBottom:  '32px',
        }}>
          <span style={{ color: 'var(--color-accent)' }}>~/</span>
          std/output
        </p>

        {/* Terminal frame */}
        <div style={{
          border:       '1px solid var(--color-border)',
          borderRadius: '8px',
          overflow:     'hidden',
        }}>

          {/* Terminal header */}
          <div style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderBottom:    '1px solid var(--color-border)',
            padding:         '8px 16px',
            display:         'flex',
            alignItems:      'center',
            gap:             '8px',
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff5555' }} />
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f1fa8c' }} />
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#50fa7b' }} />
            </div>
            <span className="font-mono" style={{
              fontSize:      '10px',
              color:         'var(--color-text-muted)',
              marginLeft:    '6px',
              letterSpacing: '0.06em',
            }}>
              sys/exit // DNNNAH_RUNTIME
            </span>
          </div>

          {/* Terminal body */}
          <div style={{
            backgroundColor: 'var(--color-bg-surface)',
            padding:         'clamp(24px, 4vw, 40px)',
          }}>

            {/* Terminal lines */}
            <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {TERMINAL_LINES.map((line, i) => (
                <p key={i} className="font-mono" style={{
                  fontSize:   'clamp(10px, 2vw, 12px)',
                  color:      line.color,
                  margin:     0,
                  lineHeight: 1.8,
                }}>
                  {line.text}
                </p>
              ))}
            </div>

            {/* Grid — form + sidebar */}
            <div
              className="contact-grid"
              style={{
                display:             'grid',
                gridTemplateColumns: 'minmax(0, 1fr) 260px',
                gap:                 '48px',
                alignItems:          'start',
              }}
            >
              {/* Form */}
              <div>
                <p className="font-mono" style={{
                  fontSize:      '10px',
                  color:         'var(--color-accent-cyan)',
                  letterSpacing: '0.08em',
                  marginBottom:  '24px',
                }}>
                  // DISPATCH PAYLOAD
                </p>
                <ContactForm />
              </div>

              {/* Sidebar */}
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div style={{
          borderTop:      '1px solid var(--color-border)',
          marginTop:      '48px',
          paddingTop:     '24px',
          display:        'flex',
          justifyContent: 'center',
          gap:            'clamp(16px, 4vw, 48px)',
          flexWrap:       'wrap',
        }}>
          {FOOTER_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
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
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}