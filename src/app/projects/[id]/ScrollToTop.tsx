'use client'

import { useEffect } from 'react'

/**
 * Fuerza scroll al top al montar la página.
 * Úsalo en cualquier página que deba iniciar arriba.
 */
export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}