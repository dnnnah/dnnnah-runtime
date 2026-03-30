import { projects }    from '@/features/projects/data/projects'
import { notFound }    from 'next/navigation'
import { NavBar }      from '@/shared/components/NavBar'
import { MetricCard }  from '@/features/projects/MetricCard'
import { StatusBadge } from '@/features/projects/StatusBadge'
import ReactMarkdown   from 'react-markdown'
import { ScrollToTop } from './ScrollToTop'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { id }  = await params
  const project = projects.find(p => p.id === id)

  if (!project) notFound()

  return (
    <div style={{ backgroundColor: 'var(--color-bg-base)', minHeight: '100vh' }}>
      <ScrollToTop /> 
      <NavBar />

      <div style={{
        maxWidth: '1100px',
        margin:   '0 auto',
        padding:  'clamp(96px, 10vw, 120px) clamp(24px, 5vw, 64px) clamp(64px, 8vw, 96px)',
      }}>

        {/* ── BREADCRUMB + BACK ── */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginBottom:   '40px',
          flexWrap:       'wrap',
          gap:            '12px',
        }}>
          <p className="font-mono" style={{
            fontSize:      '11px',
            color:         'var(--color-text-muted)',
            margin:        0,
            letterSpacing: '0.08em',
          }}>
            <a href="/#bin-projects'" style={{
              color:          'var(--color-accent)',
              textDecoration: 'none',
            }}>
              ~/bin/projects
            </a>
            {' '}/ {project.id}
          </p>

          {/* Botón de regreso */}
          <a
            href="#bin-projects"
            className="font-mono"
            style={{
              fontSize:       '10px',
              color:          'var(--color-text-muted)',
              textDecoration: 'none',
              border:         '1px solid var(--color-border)',
              padding:        '6px 14px',
              borderRadius:   '4px',
              display:        'flex',
              alignItems:     'center',
              gap:            '6px',
              transition:     'color 0.2s ease, border-color 0.2s ease',
              minHeight:      '36px',
            }}
            onMouseEnter={undefined}
          >
            ← back_to_projects
          </a>
        </div>

        {/* ── HEADER ── */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-start',
          flexWrap:       'wrap',
          gap:            '24px',
          marginBottom:   '56px',
          paddingBottom:  '40px',
          borderBottom:   '1px solid var(--color-border)',
        }}>
          <div style={{
            display:        'flex',
            flexDirection:  'column',
            gap:            '10px',
            alignItems:     'flex-start',
          }}>
            <span className="font-mono" style={{
              fontSize:      '10px',
              color:         'var(--color-text-muted)',
              letterSpacing: '0.1em',
            }}>
              // {project.execId}
            </span>
            <h1 className="font-mono" style={{
              fontSize:      'clamp(24px, 5vw, 40px)',
              fontWeight:    700,
              color:         'var(--color-text)',
              margin:        0,
              letterSpacing: '-0.02em',
              lineHeight:    1.1,
            }}>
              {project.title}
            </h1>
            {/* Badge — alignItems: flex-start en el padre evita el stretch */}
            <StatusBadge status={project.status} />
          </div>

          {/* Acciones */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary font-mono"
                style={{
                  textDecoration: 'none',
                  fontSize:       '11px',
                  display:        'flex',
                  alignItems:     'center',
                  gap:            '6px',
                  minHeight:      '44px',
                  padding:        '0 20px',
                }}
              >
                ↗ DEMO
              </a>
            )}
            <GitHubButton url={project.githubUrl} />
          </div>
        </div>

        {/* ── GRID: MAIN + SIDEBAR ── */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 260px',
          gap:                 '56px',
          alignItems:          'start',
        }}
          className="detail-body"
        >

          {/* MAIN — README + screenshots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

            {/* README */}
            <div>
              <div style={{
                display:       'flex',
                alignItems:    'center',
                gap:           '12px',
                marginBottom:  '20px',
              }}>
                <span className="font-mono" style={{
                  fontSize:      '9px',
                  color:         'var(--color-text-muted)',
                  letterSpacing: '0.12em',
                }}>
                  // README.md
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
              </div>
              <div className="font-mono readme-content" style={{
                fontSize:   'clamp(11px, 1.8vw, 13px)',
                lineHeight: 1.9,
                color:      'var(--color-text)',
              }}>
                <ReactMarkdown>{project.readme}</ReactMarkdown>
              </div>
            </div>

            {/* Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div>
                <div style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '12px',
                  marginBottom: '16px',
                }}>
                  <span className="font-mono" style={{
                    fontSize:      '9px',
                    color:         'var(--color-text-muted)',
                    letterSpacing: '0.12em',
                  }}>
                    // screenshots
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {project.screenshots.map((src: string, i: number) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      style={{
                        width:        '100%',
                        borderRadius: '6px',
                        border:       '1px solid var(--color-border)',
                        objectFit:    'cover',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR — sticky */}
          <div style={{
            position:      'sticky',
            top:           '96px',
            display:       'flex',
            flexDirection: 'column',
            gap:           '28px',
          }}>

            {/* Métricas */}
            <SidebarSection label="// metrics">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {project.metrics.buildTime  && <MetricCard value={project.metrics.buildTime}  label="build_time" />}
                {project.metrics.uptime     && <MetricCard value={project.metrics.uptime}     label="uptime" />}
                {project.metrics.requests   && <MetricCard value={project.metrics.requests}   label="req/day" />}
                {project.metrics.binarySize && <MetricCard value={project.metrics.binarySize} label="binary" />}
              </div>
            </SidebarSection>

            {/* Stack */}
            <SidebarSection label="// stack">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {project.stack.map((item: string) => (
                  <div key={item} style={{
                    display:         'flex',
                    alignItems:      'center',
                    gap:             '8px',
                    padding:         '6px 10px',
                    backgroundColor: 'var(--color-bg-elevated)',
                    borderRadius:    '4px',
                    border:          '1px solid var(--color-border)',
                  }}>
                    <span style={{
                      width:           '5px',
                      height:          '5px',
                      borderRadius:    '50%',
                      backgroundColor: 'var(--color-accent)',
                      flexShrink:      0,
                    }} />
                    <span className="font-mono" style={{
                      fontSize: '11px',
                      color:    'var(--color-text)',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </SidebarSection>

            {/* Arquitectura */}
            <SidebarSection label="// architecture">
              <p className="font-mono" style={{
                fontSize:   'clamp(10px, 1.6vw, 11px)',
                color:      'var(--color-text-muted)',
                lineHeight: 1.9,
                margin:     0,
              }}>
                {project.architecture}
              </p>
            </SidebarSection>

          </div>
        </div>
      </div>
    </div>
  )
}

/* ── SIDEBAR SECTION — label + línea separadora + contenido ── */
function SidebarSection({
  label,
  children,
}: {
  label:    string
  children: React.ReactNode
}) {
  return (
    <div>
      <div style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '10px',
        marginBottom:  '12px',
        paddingBottom: '8px',
        borderBottom:  '1px solid var(--color-border)',
      }}>
        <span className="font-mono" style={{
          fontSize:      '9px',
          color:         'var(--color-text-muted)',
          letterSpacing: '0.12em',
          whiteSpace:    'nowrap',
        }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

/* ── GITHUB BUTTON — con hover animation (client component) ── */
function GitHubButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono github-btn"
      style={{
        fontSize:       '11px',
        color:          'var(--color-text-muted)',
        textDecoration: 'none',
        border:         '1px solid var(--color-border)',
        padding:        '0 20px',
        borderRadius:   '4px',
        display:        'flex',
        alignItems:     'center',
        gap:            '6px',
        minHeight:      '44px',
        transition:     'color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
      }}
    >
      <span className="github-arrow" style={{ transition: 'transform 0.2s ease' }}>↗</span>
      GitHub
    </a>
  )
}