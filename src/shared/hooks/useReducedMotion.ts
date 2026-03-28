'use client'

import { useEffect, useState } from 'react'

/**
 * Detecta si el usuario tiene activada la preferencia
 * de reducción de movimiento en su sistema operativo.
 *
 * Úsalo en cualquier hook de animación antes de ejecutar GSAP:
 * si retorna true, omite la animación completamente.
 *
 * @returns true si el usuario prefiere menos movimiento
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    // Leemos la media query del sistema operativo
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Estado inicial al montar el componente
    setReduced(mq.matches)

    // Escuchamos cambios en tiempo real (ej: usuario cambia config del SO)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)

    // Limpieza al desmontar
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}