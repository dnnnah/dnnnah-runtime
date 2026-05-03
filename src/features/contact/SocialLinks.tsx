'use client'

import { useState } from 'react'
import { copyEmailToClipboard, openMailto, getDisplayEmail } from '@/shared/lib/email'

/**
 * Sidebar de contacto.
 * Email ofuscado — Zero Spam Policy: no existe en plano en el bundle.
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
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const ok = await copyEmailToClipboard()
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

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

      {/* Direct contact — Zero Spam Policy */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
        <p className="font-mono" style={{
          fontSize:      '10px',
          color:         'var(--color-accent-cyan)',
          letterSpacing: '0.08em',
          marginBottom:  '12px',
        }}>
          // direct_contact
        </p>

        {/* Email visualmente ofuscado — humanos lo leen, regex no */}
        <p className="font-mono" style={{
          fontSize:   'clamp(9px, 1.8vw, 11px)',
          color:      'var(--color-text-muted)',
          margin:     '0 0 10px 0',
          userSelect: 'none',
        }}>
          {getDisplayEmail()}
        </p>

        {/* Acciones — el email real solo se decodifica al click */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={handleCopy}
            className="font-mono"
            style={{
              flex:         1,
              padding:      '6px 10px',
              fontSize:     '10px',
              background:   copied ? 'rgba(80,250,123,0.1)' : 'var(--color-bg-elevated)',
              border:       `1px solid ${copied ? 'var(--color-status-live)' : 'var(--color-border)'}`,
              color:        copied ? 'var(--color-status-live)' : 'var(--color-text)',
              borderRadius: '4px',
              cursor:       'pointer',
              transition:   'all 0.2s ease',
            }}
          >
            {copied ? '✓ copied' : '[ copy ]'}
          </button>

          <button
            type="button"
            onClick={() => openMailto('Hello DNNNAH', '')}
            className="font-mono"
            style={{
              flex:         1,
              padding:      '6px 10px',
              fontSize:     '10px',
              background:   'var(--color-bg-elevated)',
              border:       '1px solid var(--color-border)',
              color:        'var(--color-text)',
              borderRadius: '4px',
              cursor:       'pointer',
              transition:   'border-color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            [ mail ]
          </button>
        </div>
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