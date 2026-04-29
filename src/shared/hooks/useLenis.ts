'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap.config'

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

    const onTick = (time: number) => lenis.raf(time * 1000)

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      ScrollTrigger.update()
    })

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop: () => lenis.scroll,
      getBoundingClientRect: () => ({
        top: 0, left: 0,
        width:  window.innerWidth,
        height: window.innerHeight,
      }),
    })

    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}