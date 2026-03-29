'use client'

import { StructProfile }        from './StructProfile'
import { TypeAutomation }      from './TypeAutomation'
import { ExperienceBlock }      from './ExperienceBlock'
import { EducationBlock }       from './EducationBlock'
import { CertificationsBlock }  from './CertificationsBlock'
import { SoftSkillsBlock }      from './SoftSkillsBlock'

/**
 * Panel derecho — scroll normal con bloques apilados.
 * Cada bloque tiene animación de entrada via IntersectionObserver.
 */

export function RightPanel() {
  return (
    <div
      style={{
        display:       'flex',
        flexDirection: 'column',
        gap:           '32px',
      }}
    >
      <StructProfile />
      <TypeAutomation />
      <ExperienceBlock />
      <EducationBlock />
      <CertificationsBlock />
      <SoftSkillsBlock />
    </div>
  )
}