'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap.config'

export function useHorizontalScroll() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    if (isMobile || !trackRef.current) return

    // Esperamos a que Lenis esté inicializado
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.to(trackRef.current, {
          x:    () => -(trackRef.current!.scrollWidth - window.innerWidth + 96),
          ease: 'none',
          scrollTrigger: {
            trigger:             '#bin-projects',
            start:               'top top',
            end:                 () => `+=${trackRef.current!.scrollWidth - window.innerWidth + 96}`,
            pin:                 true,
            scrub:               1,
            invalidateOnRefresh: true,
          },
        })
      })

      return () => ctx.revert()
    }, 300)

    return () => clearTimeout(timeout)
  }, [])

  return trackRef
}