'use client'

import { useEffect, useRef } from 'react'

/**
 * Easter egg — Goroutine Leak.
 * Después de 10 minutos de inactividad, aparecen
 * 3-5 cursors fantasma que se mueven por la pantalla.
 * Cualquier interacción del usuario los elimina.
 */

const INACTIVITY_TIMEOUT = 20 * 1000 // 10 minutos en ms (1 x 60 x 1000 es un minuto)
const GHOST_COUNT = 4                // número de cursors fantasma

interface GhostCursor {
  id:  number
  x:   number
  y:   number
  dx:  number
  dy:  number
}

export function useGoroutineLeak() {
  const timerId    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ghostsRef  = useRef<HTMLDivElement[]>([])
  const activeRef  = useRef(false)
  const frameRef   = useRef<number>(0)

  useEffect(() => {
    // Crea los elementos DOM de los cursors fantasma
    function createGhosts() {
      const ghosts: GhostCursor[] = Array.from({ length: GHOST_COUNT }, (_, i) => ({
        id: i,
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      }))

      // Creamos un div por cada cursor fantasma
      ghosts.forEach((ghost) => {
        const el = document.createElement('div')
        el.style.cssText = `
          position: fixed;
          width: 12px;
          height: 12px;
          pointer-events: none;
          z-index: 8000;
          opacity: 0;
          transition: opacity 1s ease;
          animation: ghostFadeIn 1s ease forwards;
        `

        // Cursor SVG simple
        el.innerHTML = `
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
            <path d="M0 0L0 14L3.5 10.5L6 16L8 15L5.5 9.5L10 9.5L0 0Z"
              fill="rgba(189,147,249,0.25)"
              stroke="rgba(189,147,249,0.4)"
              stroke-width="0.5"
            />
          </svg>
        `

        el.style.left = `${ghost.x}px`
        el.style.top  = `${ghost.y}px`

        document.body.appendChild(el)
        ghostsRef.current.push(el)

        // Fade in después de un pequeño delay
        setTimeout(() => { el.style.opacity = '1' }, 100)
      })

      // Animamos los cursors con requestAnimationFrame
      let positions = ghosts
      function animate() {
        positions = positions.map((g, i) => {
          // Rebota en los bordes de la pantalla
          let { x, y, dx, dy } = g
          x += dx
          y += dy

          if (x <= 0 || x >= window.innerWidth  - 12) dx *= -1
          if (y <= 0 || y >= window.innerHeight - 18) dy *= -1

          const el = ghostsRef.current[i]
          if (el) {
            el.style.left = `${x}px`
            el.style.top  = `${y}px`
          }

          return { ...g, x, y, dx, dy }
        })

        if (activeRef.current) {
          frameRef.current = requestAnimationFrame(animate)
        }
      }

      activeRef.current  = true
      frameRef.current   = requestAnimationFrame(animate)
    }

    // Elimina todos los cursors fantasma
    function removeGhosts() {
      cancelAnimationFrame(frameRef.current)
      activeRef.current = false

      ghostsRef.current.forEach(el => {
        el.style.opacity = '0'
        // Removemos del DOM después del fade out
        setTimeout(() => el.remove(), 1000)
      })
      ghostsRef.current = []
    }

    // Reinicia el timer de inactividad
    function resetTimer() {
      if (timerId.current) clearTimeout(timerId.current)

      // Si hay ghosts activos, los removemos
      if (activeRef.current) removeGhosts()

      timerId.current = setTimeout(createGhosts, INACTIVITY_TIMEOUT)
    }

    // Eventos que resetean el timer
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    events.forEach(ev => window.addEventListener(ev, resetTimer, { passive: true }))

    // Iniciamos el timer al montar
    resetTimer()

    return () => {
      if (timerId.current) clearTimeout(timerId.current)
      removeGhosts()
      events.forEach(ev => window.removeEventListener(ev, resetTimer))
    }
  }, [])
}