'use client'

import { useState, useEffect } from 'react'
import type { Project } from './types'

/**
 * Maneja el estado del panel de detalle de proyecto.
 * - Abre/cierra el panel
 * - Trackea el proyecto activo
 * - Cierra con ESC
 * - Bloquea scroll del body cuando está abierto
 */

export function useProjectDetail() {
  const [open,    setOpen]    = useState(false)
  const [project, setProject] = useState<Project | null>(null)

  const openDetail = (p: Project) => {
    setProject(p)
    setOpen(true)
  }

  const closeDetail = () => setOpen(false)

  useEffect(() => {
    // Cierra con ESC
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDetail()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    // Bloquea scroll del body cuando el panel está abierto
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return { open, project, openDetail, closeDetail }
}