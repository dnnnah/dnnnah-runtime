'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Inicializa Lenis para scroll suave en toda la app.
 * Se sincroniza con GSAP ticker y ScrollTrigger para
 * que las animaciones basadas en scroll sean perfectas.
 *
 * @returns ref de la instancia Lenis (para scroll-to externo)
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Importamos la config centralizada de GSAP
    const { gsap, ScrollTrigger } = require('@/shared/lib/gsap.config')

    // Creamos la instancia de Lenis con configuración base
    const lenis = new Lenis({
      duration: 1.2, // Duración del scroll suave en segundos
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponencial
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Conectamos Lenis al ticker de GSAP para sincronía de frames
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })

    // Desactivamos el suavizado de lag para evitar saltos en animaciones
    gsap.ticker.lagSmoothing(0)

    // Notificamos a ScrollTrigger cada vez que Lenis hace scroll
    lenis.on('scroll', ScrollTrigger.update)

    // Limpieza al desmontar el componente
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}