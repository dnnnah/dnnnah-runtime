'use client'

import { useRef } from 'react'
import { useContactForm } from './useContactForm'
import { SuccessState }   from './SuccessState'

/**
 * Formulario de contacto estilo terminal.
 * Inputs con solo border-bottom, sin background.
 */

export function ContactForm() {
  const btnRef = useRef<HTMLButtonElement>(null)

  const { data, errors, status, handleChange, handleSubmit, reset } = useContactForm()

  if (status === 'success') return <SuccessState onRestart={reset} />

  function handleClick() {
    const btn = btnRef.current
    if (!btn || status === 'loading') return

    // Ripple
    const ripple = document.createElement('span')
    const rect   = btn.getBoundingClientRect()
    const size   = Math.max(rect.width, rect.height) * 2
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${rect.width / 2 - size / 2}px;
      top: ${rect.height / 2 - size / 2}px;
      background: rgba(80, 250, 123, 0.25);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleEffect 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      pointer-events: none;
    `
    btn.style.position = 'relative'
    btn.style.overflow = 'hidden'
    btn.appendChild(ripple)

    // Glitch shake
    btn.style.animation = 'glitchShake 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'

    setTimeout(() => {
      ripple.remove()
      btn.style.animation = ''
    }, 600)

    handleSubmit()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Campo name */}
      <div>
        <label className="font-mono" style={{
          fontSize:      'clamp(9px, 2vw, 11px)',
          color:         'var(--color-accent-cyan)',
          letterSpacing: '0.08em',
          display:       'block',
          marginBottom:  '6px',
        }}>
          .name:
        </label>
        <input
          className={`contact-input ${errors.name ? 'error' : ''}`}
          value={data.name}
          onChange={e => handleChange('name', e.target.value)}
          placeholder="// your_name"
          aria-label="Your name"
          autoComplete="name"
        />
        {errors.name && (
          <p role="alert" style={{
            fontSize:  '9px',
            color:     'var(--color-status-off)',
            marginTop: '4px',
            fontFamily: 'inherit',
          }}>
            // {errors.name}
          </p>
        )}
      </div>

      {/* Campo email */}
      <div>
        <label className="font-mono" style={{
          fontSize:      'clamp(9px, 2vw, 11px)',
          color:         'var(--color-accent-cyan)',
          letterSpacing: '0.08em',
          display:       'block',
          marginBottom:  '6px',
        }}>
          .email:
        </label>
        <input
          className={`contact-input ${errors.email ? 'error' : ''}`}
          type="email"
          value={data.email}
          onChange={e => handleChange('email', e.target.value)}
          placeholder="// your@email.com"
          aria-label="Your email"
          autoComplete="email"
        />
        {errors.email && (
          <p role="alert" style={{
            fontSize:  '9px',
            color:     'var(--color-status-off)',
            marginTop: '4px',
            fontFamily: 'inherit',
          }}>
            // {errors.email}
          </p>
        )}
      </div>

      {/* Campo subject */}
      <div>
        <label className="font-mono" style={{
          fontSize:      'clamp(9px, 2vw, 11px)',
          color:         'var(--color-accent-cyan)',
          letterSpacing: '0.08em',
          display:       'block',
          marginBottom:  '6px',
        }}>
          .subject: <span style={{ color: 'var(--color-text-muted)' }}>// optional</span>
        </label>
        <input
          className="contact-input"
          value={data.subject}
          onChange={e => handleChange('subject', e.target.value)}
          placeholder="// subject_line"
          aria-label="Subject"
        />
      </div>

      {/* Campo message */}
      <div>
        <label className="font-mono" style={{
          fontSize:      'clamp(9px, 2vw, 11px)',
          color:         'var(--color-accent-cyan)',
          letterSpacing: '0.08em',
          display:       'block',
          marginBottom:  '6px',
        }}>
          .message:
        </label>
        <textarea
          className={`contact-textarea ${errors.message ? 'error' : ''}`}
          value={data.message}
          onChange={e => handleChange('message', e.target.value)}
          placeholder="// AWAITING PAYLOAD INCOMING FROM RECRUITER..."
          aria-label="Your message"
          rows={5}
        />
        {errors.message && (
          <p role="alert" style={{
            fontSize:  '9px',
            color:     'var(--color-status-off)',
            marginTop: '4px',
            fontFamily: 'inherit',
          }}>
            // {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Submit */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          ref={btnRef}
          onClick={handleClick}
          disabled={status === 'loading'}
          aria-disabled={status === 'loading'}
          className="font-mono btn-filled"
          style={{
            minHeight:     '44px',
            fontSize:      'clamp(10px, 2vw, 12px)',
            letterSpacing: '0.1em',
            cursor:        status === 'loading' ? 'not-allowed' : 'pointer',
            opacity:       status === 'loading' ? 0.7 : 1,
            position:      'relative',
            overflow:      'hidden',
          }}
        >
          {status === 'loading' ? '[ DISPATCHING... ]' : '[ EXECUTE POST_MESSAGE ]'}
        </button>

        <p className="font-mono" style={{
          fontSize: '9px',
          color:    status === 'error'
            ? 'var(--color-status-off)'
            : 'var(--color-text-muted)',
        }}>
          {status === 'error'
            ? '// error: failed to dispatch — try again'
            : '> sys/terminal: Ready to dispatch to dnnnah_api...'}
        </p>
      </div>
    </div>
  )
}