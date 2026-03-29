'use client'

import { useHorizontalScroll } from './useHorizontalScroll'
import { ProjectCard }         from './ProjectCard'
import type { Project }        from './types'

/**
 * Track horizontal de proyectos.
 * Desktop: scroll horizontal con GSAP ScrollTrigger + pin.
 * Mobile: columna vertical normal.
 */

interface HorizontalTrackProps {
  projects: Project[]
  onOpen:   (project: Project) => void
}

export function HorizontalTrack({ projects, onOpen }: HorizontalTrackProps) {
  const trackRef = useHorizontalScroll()

  return (
    <div
      ref={trackRef}
      style={{
        display: 'flex',
        gap:     '24px',
        padding: '24px 0',
      }}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onOpen={onOpen}
        />
      ))}
    </div>
  )
}