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
        <span className="cm">// Deep diving into system internals,</span>
        <span className="cm">// architecting resilient infrastructures,</span>
        <span className="cm">// and pioneering AI-driven workflows.</span>
        <span className="cm">// Always optimizing.</span>
      </div>
    </CodeBlock>
  )
}