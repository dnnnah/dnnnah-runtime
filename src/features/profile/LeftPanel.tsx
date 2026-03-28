'use client'

import { AvatarBlock }   from './AvatarBlock'
import { StructPreview } from './StructPreview'
import { SectionNav }    from './SectionNav'

/**
 * Panel izquierdo — sticky en desktop.
 * Contiene avatar, struct compacto y navegación interna.
 */

export function LeftPanel() {
  return (
    <aside
      style={{
        display:       'flex',
        flexDirection: 'column',
        gap:           '24px',
      }}
    >
      <AvatarBlock />
      <StructPreview />
      <SectionNav />
    </aside>
  )
}