'use client'

import { CodeBlock } from './CodeBlock'

/**
 * Bloque 6 — soft skills como comentario Go.
 * Color muted a propósito — es sutil, no protagonista.
 */

export function SoftSkillsBlock() {
  return (
    <CodeBlock id="soft-skills" delay={400}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span className="cm">// /dev/core-competencies:</span>
        <span className="cm">// Solving bottlenecks with solid logic,</span>
        <span className="cm">// designing reliable data flows,</span>
        <span className="cm">// and automating the repetitive to focus on the essential.</span>
        <span className="cm">// Done is better than perfect, but optimized is best.</span>
      </div>
    </CodeBlock>
  )
}