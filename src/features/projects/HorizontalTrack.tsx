'use client'

import { useHorizontalScroll } from './useHorizontalScroll'
import { ProjectCard }         from './ProjectCard'
import type { Project }        from './types'

interface HorizontalTrackProps {
  projects: Project[]
}

export function HorizontalTrack({ projects }: HorizontalTrackProps) {
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
        />
      ))}
    </div>
  )
}