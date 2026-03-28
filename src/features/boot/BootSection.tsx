'use client'

import { useRef } from 'react'
import { useLenis } from '@/shared/hooks/useLenis'
import { useHeroReveal } from './useHeroReveal'
import type { BootSectionProps, PanicState } from './types'

/**
 * Sección hero del portfolio — /boot
 * Componente de presentación puro: solo JSX y clases.
 * Toda la lógica vive en los hooks.
 */
export function BootSection({ className = '' }: BootSectionProps) {
  // Inicializa scroll suave en toda la app
  useLenis()

  // Ref con animación GSAP de entrada para el título
  const titleRef = useHeroReveal()

  // Ref para detectar rage scroll (panic easter egg)
  const panicRef = useRef<PanicState>({
    active: false,
    scrollDelta: 0,
    lastTimestamp: 0,
  })

  /**
   * Detecta rage scroll: delta acumulado > 800px en menos de 500ms.
   * Activa el flash rojo de pánico definido en globals.css.
   */
  function handleWheel(e: React.WheelEvent<HTMLElement>) {
    const now = Date.now()
    const state = panicRef.current

    // Reiniciamos el contador si pasaron más de 500ms
    if (now - state.lastTimestamp > 500) {
      state.scrollDelta = 0
    }

    state.scrollDelta += Math.abs(e.deltaY)
    state.lastTimestamp = now

    // Umbral de rage scroll alcanzado
    if (state.scrollDelta > 3000 && !state.active) {
      state.active = true
      document.body.classList.add('panic')

      // Removemos la clase después de que termine la animación
      setTimeout(() => {
        document.body.classList.remove('panic')
        state.active = false
        state.scrollDelta = 0
      }, 2500)
    }
  }

  return (
    <section
      className={`scanline-overlay relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg-base ${className}`}
      onWheel={handleWheel}
      aria-label="Hero — DNNNAH Runtime"
    >
      {/* Título principal */}
      <h1
        ref={titleRef}
        className="font-hero text-hero text-content select-none"
      >
        DNNNAH
      </h1>

      {/* Subtítulo con cursor parpadeante */}
      <p className="cursor-blink mt-4 font-mono text-meta uppercase tracking-wider text-content-muted">
        runtime v3.0.0
      </p>

      {/* Indicador de scroll */}
      <span className="absolute bottom-8 font-mono text-meta text-content-muted animate-pulse-build">
        scroll to boot
      </span>
    </section>
  )
}