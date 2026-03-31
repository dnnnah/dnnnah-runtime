'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap.config'

export function useHorizontalScroll() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackRef.current) return

    const track   = trackRef.current
    const section = document.getElementById('bin-projects')
    if (!section) return

    const getScrollAmount = () =>
      -(track.scrollWidth - window.innerWidth)

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x:    getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger:             section,
          start:               'top top',
          end: () => `+=${track.scrollWidth}`,
          pin:                 true,
          scrub:               1,
          invalidateOnRefresh: true,
        },
      })
    })

    // Recalcula en resize y orientación
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [])

  return trackRef
}