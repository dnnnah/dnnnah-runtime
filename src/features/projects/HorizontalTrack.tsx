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
        display:       'flex',
        gap:           '32px',
        paddingTop:    '24px',
        paddingBottom: '24px',
        paddingLeft:   'clamp(24px, 5vw, 64px)',
        paddingRight:  'clamp(24px, 5vw, 64px)',
      }}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
      {/* Spacer final */}
      <div style={{ flexShrink: 0, width: 'clamp(60px, 10vw, 120px)' }} />
    </div>
  )
}