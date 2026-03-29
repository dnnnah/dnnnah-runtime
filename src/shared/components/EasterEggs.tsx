'use client'

import { useRef, useState, useEffect } from 'react'
import { useKonami }         from '@/shared/hooks/useKonami'
import { useGoroutineLeak }  from '@/shared/hooks/useGoroutineLeak'
import { KonamiModal }       from '@/features/boot/KonamiModal'
import { PanicTrace }        from '@/features/boot/PanicTrace'
import type { PanicState }   from '@/features/boot/types'

/**
 * Easter eggs globales — activos en todas las páginas.
 * Se monta en el RootLayout para que funcionen en cualquier ruta.
 */
export function EasterEggs() {
  const [showKonami, setShowKonami] = useState(false)
  const [showPanic,  setShowPanic]  = useState(false)

  const panicRef = useRef<PanicState>({
    active:        false,
    scrollDelta:   0,
    lastTimestamp: 0,
  })

  // Konami code — activo globalmente
  const konamiActivated = useKonami()
  useEffect(() => {
    if (konamiActivated) setShowKonami(true)
  }, [konamiActivated])

  // Goroutine leak — activo globalmente
  useGoroutineLeak()

  // Panic trace — rage scroll global
  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      const now   = Date.now()
      const state = panicRef.current

      if (now - state.lastTimestamp > 400) {
        state.scrollDelta = 0
      }

      state.scrollDelta   += Math.abs(e.deltaY)
      state.lastTimestamp  = now

      if (state.scrollDelta > 3000 && !state.active) {
        state.active = true
        setShowPanic(true)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <>
      {showKonami && (
        <KonamiModal onClose={() => setShowKonami(false)} />
      )}
      {showPanic && (
        <PanicTrace onComplete={() => {
          setShowPanic(false)
          panicRef.current.active      = false
          panicRef.current.scrollDelta = 0
        }} />
      )}
    </>
  )
}