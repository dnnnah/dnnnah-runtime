'use client'

import { useState, useEffect } from 'react'

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: '/boot', href: '#boot' },
    { label: 'kernel/profile', href: '#profile' },
    { label: 'bin/projects', href: '#projects' },
    { label: 'sys/terminal', href: '#terminal' },
    { label: 'std/output', href: '#contact' },
  ]

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      height: '56px',
      backgroundColor: scrolled ? 'rgba(30, 31, 41, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <a href="#boot" className="font-mono" style={{
        fontWeight: 700,
        fontSize: '13px',
        color: 'var(--color-accent)',
        textDecoration: 'none',
      }}>
        DNNNAH<span style={{ animation: 'blink 1s linear infinite' }}>_</span>
      </a>

      <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', margin: 0, padding: 0 }}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="font-mono" style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
            }}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button className="font-mono" style={{
        background: 'transparent',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-muted)',
        padding: '4px 10px',
        borderRadius: '4px',
        fontSize: '10px',
        cursor: 'pointer',
      }}>
        CMD+K
      </button>
    </nav>
  )
}
