'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap.config'

/**
 * Inicializa Lenis para scroll suave en toda la app.
 * Sincronizado con GSAP ticker y ScrollTrigger.
 *
 * FIXES aplicados:
 * - require() → import ESM estático (fix bundle en producción)
 * - gsap.ticker.remove(onTick) en cleanup (fix memory leak)
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration:    1.2,
      easing:      (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Guardamos referencia para poder remover el ticker en cleanup
    const onTick = (time: number) => lenis.raf(time * 1000)

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(onTick) // ← sin esto, el ticker vive para siempre
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}