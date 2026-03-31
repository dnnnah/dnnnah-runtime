'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: '/boot',          href: '/#boot' },
  { label: 'kernel/profile', href: '/#profile' },
  { label: 'bin/projects',   href: '/#bin-projects' },
  { label: 'sys/terminal',   href: '#' },
  { label: 'std/output',     href: '/#contact' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark,   setIsDark]   = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      setIsDark(false)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function toggleTheme() {
    const html = document.documentElement
    if (isDark) {
      html.classList.remove('dark')
      html.classList.add('light')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      html.classList.remove('light')
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  function openTerminal() {
    window.dispatchEvent(new Event('open-terminal'))
  }

  return (
    <>
      <nav
        style={{
          position:             'fixed',
          top:                  0,
          left:                 0,
          right:                0,
          zIndex:               1000,
          display:              'flex',
          alignItems:           'center',
          justifyContent:       'space-between',
          padding:              '0 24px',
          height:               '56px',
          backgroundColor:      scrolled ? 'var(--color-bg-surface)' : 'transparent',
          backdropFilter:       scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom:         scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          transition:           'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Logo */}
        <a
          href="/#boot"
          className="font-mono"
          style={{
            fontWeight:     700,
            fontSize:       '13px',
            color:          'var(--color-accent)',
            textDecoration: 'none',
            letterSpacing:  '0.02em',
          }}
        >
          DNNNAH
          <span style={{ animation: 'blink 1s linear infinite' }}>_</span>
        </a>

        {/* Derecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Activar light mode' : 'Activar dark mode'}
            className="font-mono"
            style={{
              background:    'transparent',
              border:        '1px solid var(--color-border)',
              color:         'var(--color-text-muted)',
              padding:       '4px 10px',
              borderRadius:  '4px',
              fontSize:      '11px',
              cursor:        'pointer',
              minHeight:     '32px',
              transition:    'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
              e.currentTarget.style.color       = 'var(--color-accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.color       = 'var(--color-text-muted)'
            }}
          >
            {isDark ? '◐ light' : '◑ dark'}
          </button>

          {/* CMD+K */}
          <button
            className="font-mono"
            aria-label="Abrir terminal"
            onClick={openTerminal}
            style={{
              background:    'transparent',
              border:        '1px solid var(--color-accent)',
              color:         'var(--color-accent)',
              padding:       '4px 12px',
              borderRadius:  '4px',
              fontSize:      '10px',
              fontWeight:    700,
              letterSpacing: '0.05em',
              cursor:        'pointer',
              transition:    'background-color 0.2s ease, color 0.2s ease',
              minHeight:     '32px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              e.currentTarget.style.color           = 'var(--color-bg-base)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color           = 'var(--color-accent)'
            }}
          >
            CMD+K
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            style={{
              background:   'transparent',
              border:       '1px solid var(--color-border)',
              color:        'var(--color-text-muted)',
              padding:      '4px 8px',
              borderRadius: '4px',
              fontSize:     '14px',
              cursor:       'pointer',
              minHeight:    '32px',
              minWidth:     '32px',
              lineHeight:   1,
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-label="Navigation menu"
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          999,
            backgroundColor: 'var(--color-bg-surface)',
            backdropFilter:  'blur(16px)',
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'center',
            alignItems:      'center',
            gap:             '32px',
            animation:       'slideUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.label === 'sys/terminal' ? '#' : link.href}
              onClick={
                link.label === 'sys/terminal'
                  ? (e) => { e.preventDefault(); openTerminal(); setMenuOpen(false) }
                  : () => setMenuOpen(false)
              }
              className="font-mono"
              style={{
                fontSize:       'clamp(16px, 5vw, 20px)',
                fontWeight:     700,
                color:          'var(--color-text-muted)',
                textDecoration: 'none',
                letterSpacing:  '0.05em',
                transition:     'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}