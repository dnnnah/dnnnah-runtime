import { projects }    from '@/features/projects/data/projects'
import { notFound }    from 'next/navigation'
import { NavBar }      from '@/shared/components/NavBar'
import { StatusBadge } from '@/features/projects/StatusBadge'
import { ScrollToTop } from './ScrollToTop'
import { SidebarNav }  from './SidebarNav'
import { MainContent } from './MainContent'

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

      {/* STICKY HEADER */}
      <div style={{
        position:             'sticky',
        top:                  '56px',
        zIndex:               100,
        backgroundColor:      'var(--color-bg-surface)',
        backdropFilter:       'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom:         '1px solid var(--color-border)',
        padding:              '14px clamp(24px, 5vw, 48px)',
        display:              'flex',
        alignItems:           'center',
        justifyContent:       'space-between',
        gap:                  '16px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
          <span className="font-mono" style={{
            fontSize:      '9px',
            color:         'var(--color-text-muted)',
            letterSpacing: '0.1em',
          }}>
            {'// man '}{project.execId}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h1 className="font-mono" style={{
              fontSize:      'clamp(14px, 3vw, 18px)',
              fontWeight:    700,
              color:         'var(--color-text)',
              margin:        0,
              letterSpacing: '-0.01em',
              overflow:      'hidden',
              textOverflow:  'ellipsis',
              whiteSpace:    'nowrap',
            }}>
              {project.title}
            </h1>
            <StatusBadge status={project.status} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono btn-primary"
              style={{
                fontSize:       '10px',
                padding:        '6px 14px',
                textDecoration: 'none',
                display:        'flex',
                alignItems:     'center',
                minHeight:      '36px',
              }}
            >
              {'↗ DEMO'}
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono github-btn"
            style={{
              fontSize:       '10px',
              color:          'var(--color-text-muted)',
              textDecoration: 'none',
              border:         '1px solid var(--color-border)',
              padding:        '6px 14px',
              borderRadius:   '4px',
              display:        'flex',
              alignItems:     'center',
              gap:            '4px',
              minHeight:      '36px',
              transition:     'all 0.2s ease',
            }}
          >
            <span className="github-arrow" style={{ transition: 'transform 0.2s' }}>{'↗'}</span>
            GitHub
          </a>
          <a
            href="/#bin-projects"
            aria-label="Volver a proyectos"
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
              minHeight:      '36px',
              transition:     'color 0.2s, border-color 0.2s',
            }}
          >
            {'← back'}
          </a>
        </div>
      </div>

      {/* BODY — grid manejado por CSS, no inline */}
      <div className="showcase-body">
        <SidebarNav project={project} />
        <MainContent project={project} />
      </div>
    </div>
  )
}