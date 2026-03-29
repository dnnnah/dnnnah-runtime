'use client'

import type { ProjectStatus } from './types'

/**
 * Badge de status del proyecto.
 * Colores semánticos según estado.
 */

interface StatusBadgeProps {
  status: ProjectStatus
  count?: number
}

const STATUS_CONFIG = {
  live:     { label: '● LIVE',     className: 'badge-live' },
  building: { label: '● BUILDING', className: 'badge-build' },
  offline:  { label: '● OFFLINE',  className: 'badge-off' },
}

export function StatusBadge({ status, count }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span className={`badge-base ${config.className} font-mono`}>
      {config.label}{count !== undefined ? ` ×${count}` : ''}
    </span>
  )
}