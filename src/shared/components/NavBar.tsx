'use client'

import { useState, useEffect } from 'react'
import { usePathname }         from 'next/navigation'
import { useRouter }           from 'next/navigation'

const navLinks = [
  { label: '/boot',          anchor: 'boot' },
  { label: 'kernel/profile', anchor: 'profile' },
  { label: 'bin/projects',   anchor: 'bin-projects' },
  { label: 'sys/terminal',   anchor: 'terminal' },
  { label: 'std/output',     anchor: 'contact' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router   = useRouter()
  const isRoot   = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Cuando volvemos a / desde una subpágina, hace scroll al elemento guardado
  useEffect(() => {
    if (!isRoot) return
    const target = sessionStorage.getItem('scrollTo')
    if (!target) return
    sessionStorage.removeItem('scrollTo')

    // Espera 300ms para que GSAP y animaciones terminen de montar
    const t = setTimeout(() => {
      const el = document.getElementById(target)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)

    return () => clearTimeout(t)
  }, [isRoot])

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, anchor: string) {
    e.preventDefault()

    if (isRoot) {
      const el = document.getElementById(anchor)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      sessionStorage.setItem('scrollTo', anchor)
      router.push('/')
    }

    setMenuOpen(false)
  }

  return (
    <>
      <nav
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          zIndex:          1000,
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         '0 24px',
          height:          '56px',
          backgroundColor: scrolled ? 'rgba(30,31,41,0.85)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom:    scrolled
            ? '1px solid var(--color-border)'
            : '1px solid transparent',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <a
          href="/"
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

        <ul
          className="hidden tablet:flex"
          style={{ gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {navLinks.map((link) => (
            <li key={link.anchor}>
              <a
                href={isRoot ? `#${link.anchor}` : `/#${link.anchor}`}
                className="font-mono"
                onClick={(e) => handleNavClick(e, link.anchor)}
                style={{
                  fontSize:       '11px',
                  color:          'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition:     'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="font-mono"
            aria-label="Abrir terminal AI"
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

          <button
            className="tablet:hidden font-mono"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
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

      {menuOpen && (
        <div
          role="dialog"
          aria-label="Navigation menu"
          style={{
            position:            'fixed',
            inset:               0,
            zIndex:              999,
            backgroundColor:     'rgba(30,31,41,0.97)',
            backdropFilter:      'blur(16px)',
            WebkitBackdropFilter:'blur(16px)',
            display:             'flex',
            flexDirection:       'column',
            justifyContent:      'center',
            alignItems:          'center',
            gap:                 '32px',
            animation:           'slideUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.anchor}
              href={isRoot ? `#${link.anchor}` : `/#${link.anchor}`}
              className="font-mono"
              onClick={(e) => handleNavClick(e, link.anchor)}
              style={{
                fontSize:       'clamp(16px, 5vw, 20px)',
                fontWeight:     700,
                color:          'var(--color-text-muted)',
                textDecoration: 'none',
                letterSpacing:  '0.05em',
                transition:     'color 0.2s ease',
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}