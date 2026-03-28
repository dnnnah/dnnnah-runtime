'use client'

import { useEffect, useState } from 'react'

/**
 * Detecta la secuencia Konami: ↑↑↓↓←→←→BA
 * Retorna true cuando la secuencia se completa.
 * Se resetea automáticamente después de activarse.
 */

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonami(): boolean {
  const [activated, setActivated] = useState(false)
  const [progress, setProgress]   = useState(0)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Verificamos si la tecla coincide con la siguiente en la secuencia
      if (e.key === KONAMI_SEQUENCE[progress]) {
        const next = progress + 1

        // Secuencia completa
        if (next === KONAMI_SEQUENCE.length) {
          setActivated(true)
          setProgress(0)

          // Reset después de 100ms para permitir re-activación
          setTimeout(() => setActivated(false), 100)
        } else {
          setProgress(next)
        }
      } else {
        // Tecla incorrecta — reiniciamos
        setProgress(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [progress])

  return activated
}