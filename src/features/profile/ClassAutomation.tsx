'use client'

import { CodeBlock } from './CodeBlock'

/**
 * Bloque 2 — type AutomationEnthusiast struct
 * Idiomático Go: type + struct, sin class.
 */

const TAGS = [
  { label: 'Go',         style: 'tag-go' },
  { label: 'Python',     style: 'tag-py' },
  { label: 'TypeScript', style: 'tag-ts' },
  { label: 'PostgreSQL', style: 'tag-db' },
  { label: 'Redis',      style: 'tag-db' },
  { label: 'Docker',     style: 'tag-inf' },
  { label: 'RabbitMQ',   style: 'tag-inf' },
  { label: 'LangChain',  style: 'tag-py' },
]

export function ClassAutomation() {
  return (
    <div id="class-automation" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <CodeBlock delay={80}>

        {/* type Stack struct { */}
        <div>
          <span className="kw">type</span>
          <span className="val"> Stack </span>
          <span className="kw">struct</span>
          <span className="val"> {'{'}</span>
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <span className="kw3">Core</span>
          <span className="val"> []</span>
          <span className="kw">string</span>
          <span className="cm"> // ["Go", "Python", "TypeScript"]</span>
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <span className="kw3">DB</span>
          <span className="val"> []</span>
          <span className="kw">string</span>
          <span className="cm"> // ["PostgreSQL", "Redis", "Supabase"]</span>
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <span className="kw3">Infra</span>
          <span className="val"> []</span>
          <span className="kw">string</span>
          <span className="cm"> // ["Docker", "RabbitMQ", "Linux"]</span>
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <span className="kw3">AI</span>
          <span className="val"> []</span>
          <span className="kw">string</span>
          <span className="cm"> // ["LangChain", "Vercel AI SDK"]</span>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <span className="val">{'}'}</span>
        </div>

        {/* type AutomationEnthusiast struct { */}
        <div>
          <span className="kw">type</span>
          <span className="val"> AutomationEnthusiast </span>
          <span className="kw">struct</span>
          <span className="val"> {'{'}</span>
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <span className="kw3">Focus</span>
          <span className="val"> []</span>
          <span className="kw">string</span>
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <span className="kw3">Stack</span>
          <span className="val"> </span>
          <span className="kw">Stack</span>
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <span className="kw3">Objective</span>
          <span className="val"> </span>
          <span className="kw">string</span>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <span className="val">{'}'}</span>
        </div>

        {/* var me = AutomationEnthusiast{ */}
        <div>
          <span className="kw">var</span>
          <span className="val"> me = AutomationEnthusiast{'{'}</span>
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <span className="kw3">Focus</span>
          <span className="val">: []</span>
          <span className="kw">string</span>
          <span className="val">{'{'}</span>
          <span className="str">"Distributed Systems"</span>
          <span className="val">, </span>
          <span className="str">"AI Agent Orchestration"</span>
          <span className="val">, </span>
          <span className="str">"Performance Optimization"</span>
          <span className="val">{'},'}</span>
        </div>

        <div style={{ paddingLeft: '20px' }}>
          <span className="kw3">Objective</span>
          <span className="val">: </span>
          <span className="str">"Automate the mundane, empower the intelligent."</span>
          <span className="val">,</span>
        </div>

        <div>
          <span className="val">{'}'}</span>
        </div>

      </CodeBlock>

      {/* Tags */}
      <div role="list" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {TAGS.map((tag) => (
          <span key={tag.label} role="listitem" className={`tag-base ${tag.style} font-mono`}>
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  )
}