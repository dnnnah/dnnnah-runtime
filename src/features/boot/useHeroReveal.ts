'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap.config'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import type { HeroRevealConfig } from './types'

/**
 * Configuración por defecto de la animación hero.
 * Basada en los tokens de motion.ts.
 */
const DEFAULT_CONFIG: HeroRevealConfig = {
  duration: 1.2,                          // cinematic duration
  ease: 'cubic-bezier(0.16, 1, 0.3, 1)', // outExpo
  delay: 0.4,                             // hero delay
  fromY: 20,                              // desplazamiento inicial
  fromBlur: '4px',                        // blur inicial
}

/**
 * Maneja la animación de entrada del título hero con GSAP.
 * Respeta prefers-reduced-motion — si está activo, el elemento
 * aparece instantáneamente sin animación.
 *
 * @param config — opcional, sobreescribe DEFAULT_CONFIG
 * @returns ref para adjuntar al elemento del título
 */
export function useHeroReveal(config: Partial<HeroRevealConfig> = {}) {
  // Ref para el elemento del título
  const titleRef = useRef<HTMLHeadingElement>(null)

  // Si el usuario prefiere menos movimiento, saltamos la animación
  const reducedMotion = useReducedMotion()

  // Mezclamos config por defecto con la que recibimos
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    // Sin animación si el usuario lo prefiere
    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, filter: 'blur(0px)' })
      return
    }

    // Estado inicial — invisible antes de animar
    gsap.set(el, {
      opacity: 0,
      y: finalConfig.fromY,
      filter: `blur(${finalConfig.fromBlur})`,
    })

    // Animación de entrada
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: finalConfig.duration,
      ease: finalConfig.ease,
      delay: finalConfig.delay,
    })

    // Limpieza al desmontar
    return () => {
      tween.kill()
    }
  }, [reducedMotion])

  return titleRef
}