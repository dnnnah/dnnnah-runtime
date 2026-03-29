'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap.config'

/**
 * Hook para scroll horizontal con GSAP ScrollTrigger.
 * Solo activo en desktop (≥ 1024px).
 * En mobile: desactivado, las cards se apilan verticalmente.
 */

export function useHorizontalScroll() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Desactivamos en mobile
    const isMobile = window.innerWidth < 1024
    if (isMobile || !trackRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 96),
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
  }, [])

  return trackRef
}