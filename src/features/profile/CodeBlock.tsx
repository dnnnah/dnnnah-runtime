'use client'

import { useEffect, useRef } from 'react'

/**
 * Componente base para todos los bloques de código del perfil.
 * Centraliza el estilo de contenedor y la animación de entrada
 * via IntersectionObserver.
 */

interface CodeBlockProps {
  children:    React.ReactNode
  delay?:      number  // delay en ms para stagger entre bloques
  className?:  string
  id?:         string  // para anclas del SectionNav
}

export function CodeBlock({
  children,
  delay     = 0,
  className = '',
  id,
}: CodeBlockProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Aplicamos el delay de stagger via CSS
    el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Dejamos de observar una vez visible
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      id={id}
      className={`code-block font-mono ${className}`}
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        border:          '1px solid var(--color-border)',
        borderRadius:    '6px',
        padding:         'clamp(16px, 3vw, 24px)',
        fontSize:        'clamp(11px, 2vw, 13px)',
        lineHeight:      1.8,
      }}
    >
      {children}
    </div>
  )
}