import type {
  Project, StackItem, FlowStep, CodePattern,
  Challenge, ScaleDecision, Result, Lesson,
} from '@/features/projects/types'

/* ── Constantes ─────────────────────────────────────────── */

const DOT_COLORS: Record<string, string> = {
  core:     'var(--color-accent)',
  db:       'var(--color-status-live)',
  frontend: 'var(--color-accent-cyan)',
  infra:    'var(--color-status-build)',
}

const NAV_SECTIONS = [
  { id: 'overview',     label: 'overview' },
  { id: 'screenshots',  label: 'screenshots' },
  { id: 'architecture', label: 'architecture' },
  { id: 'data-flow',    label: 'data flow' },
  { id: 'stack',        label: 'stack' },
  { id: 'patterns',     label: 'patterns' },
  { id: 'challenges',   label: 'challenges' },
  { id: 'scalability',  label: 'scalability' },
  { id: 'results',      label: 'results' },
  { id: 'lessons',      label: 'lessons' },
] as const

const OVERVIEW_META = (project: Project) => [
  { label: 'TYPE',     value: project.type },
  { label: 'DURATION', value: project.duration },
  { label: 'ROLE',     value: project.role },
  { label: 'STATUS',   value: project.status.toUpperCase() },
]

/* ── Componente principal ───────────────────────────────── */

export function MainContent({ project }: { project: Project }) {
  return (
    <main style={{ minWidth: 0 }}>

      {/* Mobile nav pills */}
      <div className="mobile-section-nav">
        {NAV_SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="font-mono"
            style={{
              fontSize:       '9px',
              padding:        '4px 10px',
              borderRadius:   '20px',
              border:         '1px solid var(--color-border)',
              color:          'var(--color-text-muted)',
              textDecoration: 'none',
              whiteSpace:     'nowrap',
              flexShrink:     0,
            }}
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* 1. OVERVIEW */}
      <Section id="overview" label="// overview">
        {/*
          .overview-cards — globals.css:
          - Desktop: 4 columnas
          - Mobile ≤ 767px: 2 columnas
          - Mobile ≤ 390px: 1 columna
        */}
        <div className="overview-cards">
          {OVERVIEW_META(project).map(card => (
            <div key={card.label} style={{
              background:   'var(--color-bg-elevated)',
              border:       '1px solid var(--color-border)',
              borderRadius: '6px',
              padding:      '10px 12px',
              minWidth:     0,
            }}>
              <div className="font-mono" style={{
                fontSize:      '8px',
                color:         'var(--color-text-muted)',
                letterSpacing: '0.1em',
                marginBottom:  '4px',
              }}>
                {card.label}
              </div>
              <div className="font-mono" style={{
                fontSize:     '11px',
                fontWeight:   700,
                color:        'var(--color-text)',
                overflow:     'hidden',
                textOverflow: 'ellipsis',
                whiteSpace:   'nowrap',
              }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <SubSection label="// context">
          <p className="font-mono" style={{ fontSize: 'clamp(11px, 1.8vw, 13px)', color: 'var(--color-text)', lineHeight: 1.9, margin: 0 }}>
            {project.context}
          </p>
        </SubSection>
        <SubSection label="// problem">
          <p className="font-mono" style={{ fontSize: 'clamp(11px, 1.8vw, 13px)', color: 'var(--color-text)', lineHeight: 1.9, margin: 0 }}>
            {project.problem}
          </p>
        </SubSection>
      </Section>

      {/* 2. SCREENSHOTS */}
      {project.screenshots.length > 0 && (
        <Section id="screenshots" label="// screenshots">
          <ScreenshotGallery screenshots={project.screenshots} title={project.title} />
        </Section>
      )}

      {/* 3. ARCHITECTURE */}
      <Section id="architecture" label="// architecture">
        <pre style={{
          background:   'var(--color-bg-elevated)',
          border:       '1px solid var(--color-border)',
          borderRadius: '6px',
          padding:      '16px',
          fontSize:     'clamp(8px, 1.4vw, 11px)',
          color:        'var(--color-accent-cyan)',
          lineHeight:   1.8,
          /*
            overflow-x: auto — el diagrama ASCII no rompe el layout en mobile.
            max-width: 100% — nunca desborda su contenedor.
          */
          overflowX:    'auto',
          maxWidth:     '100%',
          whiteSpace:   'pre',
          marginBottom: '16px',
          fontFamily:   'inherit',
          WebkitOverflowScrolling: 'touch',
        }}>
          {project.architectureDiagram}
        </pre>
        <p className="font-mono" style={{ fontSize: 'clamp(10px, 1.6vw, 12px)', color: 'var(--color-text-muted)', lineHeight: 1.9, margin: 0 }}>
          {project.architecture}
        </p>
      </Section>

      {/* 4. DATA FLOW */}
      <Section id="data-flow" label="// data_flow">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {project.dataFlow.map((step: FlowStep) => (
            <div key={step.step} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span className="font-mono" style={{
                fontSize:   '9px',
                color:      'var(--color-accent)',
                fontWeight: 700,
                minWidth:   '24px',
                paddingTop: '2px',
                flexShrink: 0,
              }}>
                {step.step}
              </span>
              <p
                className="font-mono"
                style={{ fontSize: 'clamp(10px, 1.6vw, 12px)', color: 'var(--color-text-muted)', lineHeight: 1.8, flex: 1, margin: 0, minWidth: 0 }}
                dangerouslySetInnerHTML={{
                  __html: step.content.replace(
                    /`([^`]+)`/g,
                    '<span style="font-size:0.9em;color:var(--color-accent-cyan);background:var(--color-bg-elevated);padding:1px 5px;border-radius:3px;border:1px solid var(--color-border)">$1</span>'
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* 5. STACK */}
      <Section id="stack" label="// stack_decisions">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {project.stackItems.map((item: StackItem) => (
            <div key={item.name} style={{
              display:      'flex',
              gap:          '14px',
              padding:      '14px',
              background:   'var(--color-bg-elevated)',
              border:       '1px solid var(--color-border)',
              borderRadius: '6px',
              minWidth:     0,
            }}>
              <div style={{ paddingTop: '3px', flexShrink: 0 }}>
                <div style={{
                  width:           '8px',
                  height:          '8px',
                  borderRadius:    '50%',
                  backgroundColor: DOT_COLORS[item.category] ?? 'var(--color-accent)',
                }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div className="font-mono" style={{
                  fontSize:     '12px',
                  fontWeight:   700,
                  color:        'var(--color-text)',
                  marginBottom: '6px',
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '8px',
                  flexWrap:     'wrap',
                }}>
                  {item.name}
                  <span style={{
                    fontSize:     '8px',
                    padding:      '1px 6px',
                    borderRadius: '3px',
                    background:   `${DOT_COLORS[item.category] ?? 'var(--color-accent)'}18`,
                    color:        DOT_COLORS[item.category] ?? 'var(--color-accent)',
                    border:       `1px solid ${DOT_COLORS[item.category] ?? 'var(--color-accent)'}40`,
                    flexShrink:   0,
                  }}>
                    {item.category}
                  </span>
                </div>
                <p className="font-mono" style={{ fontSize: 'clamp(10px, 1.6vw, 12px)', color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
                  {item.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. PATTERNS */}
      <Section id="patterns" label="// code_patterns">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {project.codePatterns.map((p: CodePattern) => (
            <div key={p.name} style={{
              display:      'flex',
              gap:          '12px',
              padding:      '10px 12px',
              background:   'var(--color-bg-elevated)',
              border:       '1px solid var(--color-border)',
              borderRadius: '6px',
              flexWrap:     'wrap',
              minWidth:     0,
            }}>
              <div className="font-mono" style={{
                fontSize:   '10px',
                fontWeight: 700,
                color:      'var(--color-accent)',
                minWidth:   '140px',
                flexShrink: 0,
              }}>
                {p.name}
              </div>
              <p className="font-mono" style={{ fontSize: 'clamp(10px, 1.6vw, 11px)', color: 'var(--color-text-muted)', lineHeight: 1.7, flex: 1, margin: 0, minWidth: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. CHALLENGES */}
      <Section id="challenges" label="// challenges">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {project.challenges.map((c: Challenge) => (
            <div key={c.title} style={{
              background:   'var(--color-bg-elevated)',
              border:       '1px solid var(--color-border)',
              borderLeft:   '2px solid var(--color-accent-2)',
              borderRadius: '4px',
              padding:      '14px 16px',
              minWidth:     0,
            }}>
              <div className="font-mono" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                {c.title}
              </div>
              <p className="font-mono" style={{ fontSize: 'clamp(10px, 1.6vw, 12px)', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '10px' }}>
                {c.problem}
              </p>
              <div style={{ paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
                <span className="font-mono" style={{ fontSize: '9px', color: 'var(--color-accent-cyan)', marginRight: '8px' }}>
                  {'→ solution'}
                </span>
                <span className="font-mono" style={{ fontSize: 'clamp(10px, 1.6vw, 12px)', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
                  {c.solution}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. SCALABILITY */}
      <Section id="scalability" label="// scalability">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {project.scalability.map((s: ScaleDecision) => (
            <div key={s.title} style={{
              padding:      '12px 14px',
              background:   'var(--color-bg-elevated)',
              border:       '1px solid var(--color-border)',
              borderRadius: '6px',
              minWidth:     0,
            }}>
              <div className="font-mono" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '6px' }}>
                {s.title}
              </div>
              <p className="font-mono" style={{ fontSize: 'clamp(10px, 1.6vw, 12px)', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 9. RESULTS */}
      <Section id="results" label="// results">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {project.results.map((r: Result) => (
            <div key={r.title} style={{
              background:   'rgba(80,250,123,0.05)',
              border:       '1px solid rgba(80,250,123,0.2)',
              borderRadius: '6px',
              padding:      '12px 16px',
              minWidth:     0,
            }}>
              <div className="font-mono" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-status-live)', marginBottom: '6px' }}>
                {r.title}
              </div>
              <p className="font-mono" style={{ fontSize: 'clamp(10px, 1.6vw, 12px)', color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 10. LESSONS */}
      <Section id="lessons" label="// lessons_learned">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {project.lessons.map((l: Lesson, i: number) => (
            <div key={i} className="font-mono" style={{
              background:   'var(--color-bg-elevated)',
              borderLeft:   '2px solid var(--color-status-build)',
              borderRadius: '4px',
              padding:      '12px 16px',
              fontSize:     'clamp(10px, 1.6vw, 12px)',
              color:        'var(--color-text-muted)',
              lineHeight:   1.8,
              minWidth:     0,
            }}>
              {l.text}
            </div>
          ))}
        </div>
      </Section>

    </main>
  )
}

/* ── Subcomponentes internos ────────────────────────────── */

function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      className="showcase-section"
      style={{ padding: 'clamp(20px, 4vw, 40px)', borderBottom: '1px solid var(--color-border)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <span className="font-mono" style={{ fontSize: '9px', color: 'var(--color-text-muted)', letterSpacing: '0.14em', whiteSpace: 'nowrap' }}>
          {label}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
      </div>
      {children}
    </div>
  )
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <div className="font-mono" style={{
        fontSize:      '9px',
        color:         'var(--color-text-muted)',
        letterSpacing: '0.12em',
        marginBottom:  '10px',
        paddingBottom: '6px',
        borderBottom:  '1px solid var(--color-border)',
      }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function ScreenshotGallery({ screenshots, title }: { screenshots: string[]; title: string }) {
  const imgStyle: React.CSSProperties = {
    width:        '100%',
    borderRadius: '6px',
    border:       '1px solid var(--color-border)',
    objectFit:    'cover',
    display:      'block',
  }

  if (screenshots.length === 1) {
    return <img src={screenshots[0]} alt={title} style={imgStyle} />
  }

  if (screenshots.length === 2) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {screenshots.map((s, i) => (
          <img key={i} src={s} alt={`${title} ${i + 1}`} style={imgStyle} />
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <img src={screenshots[0]} alt={`${title} 1`} style={imgStyle} />
      <div style={{
        display:               'grid',
        gridTemplateColumns:   `repeat(${Math.min(screenshots.length - 1, 3)}, 1fr)`,
        gap:                   '8px',
      }}>
        {screenshots.slice(1).map((s, i) => (
          <img key={i} src={s} alt={`${title} ${i + 2}`} style={imgStyle} />
        ))}
      </div>
    </div>
  )
}