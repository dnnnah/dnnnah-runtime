'use client'

import { useEffect, useState } from 'react'

/**
 * Easter egg — Panic Trace.
 * Simula un crash fatal de Go cuando el usuario hace rage scroll.
 * Muestra un stack trace falso con humor técnico.
 */

const STACK_TRACE = [
  'goroutine 1 [running]:',
  'github.com/dnnnah/career.main()',
  '\t/home/dnnnah/career/main.go:404 +0x???',
  '',
  'panic: too_many_side_projects',
  '',
  'github.com/dnnnah/brain.Overflow()',
  '\t/home/dnnnah/brain/context.go:3am +0xCAFFEINE',
  'github.com/dnnnah/sleep.Get()',
  '\t/home/dnnnah/sleep/schedule.go:0 +0x000',
  'github.com/dnnnah/dnnnah.BuildSomethingCool()',
  '\t/home/dnnnah/projects/runtime-v3/boot.go:1 +0x001',
  '',
  'SIGABRT: abort',
  'PC=0x000 m=0 sigcode=0',
  '',
  '// runtime: restarted OK ✓',
]

interface PanicTraceProps {
  onComplete: () => void
}

export function PanicTrace({ onComplete }: PanicTraceProps) {
  // Líneas visibles — se revelan una a una con efecto typewriter
  const [visibleLines, setVisibleLines] = useState(0)
  const [done, setDone]                 = useState(false)

  useEffect(() => {
    // Revelamos una línea cada 80ms
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= STACK_TRACE.length - 1) {
          clearInterval(interval)
          // Esperamos 1s y llamamos onComplete
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 600)
          }, 1000)
          return prev
        }
        return prev + 1
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          8500,
        backgroundColor: 'rgba(18, 10, 10, 0.97)',
        backdropFilter:  'blur(4px)',
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'center',
        padding:         'clamp(24px, 5vw, 64px)',
        animation:       'slideUp 0.2s ease forwards',
        opacity:         done ? 0 : 1,
        transition:      'opacity 0.6s ease',
      }}
    >
      <div
        className="font-mono"
        style={{
          maxWidth:  '680px',
          margin:    '0 auto',
          width:     '100%',
        }}
      >
        {/* Header */}
        <p style={{
          color:         '#ff5555',
          fontSize:      'clamp(10px, 2vw, 13px)',
          marginBottom:  '16px',
          letterSpacing: '0.05em',
        }}>
          SIGABRT — runtime panic detected
        </p>

        {/* Stack trace líneas */}
        {STACK_TRACE.slice(0, visibleLines + 1).map((line, i) => {
          // Última línea — verde (recovery)
          const isRecovery = line.startsWith('// runtime')
          // Líneas de panic — rojo brillante
          const isPanic    = line.startsWith('panic:')
          // Líneas de path — muted
          const isPath     = line.startsWith('\t')

          return (
            <p
              key={i}
              style={{
                color: isRecovery
                  ? 'var(--color-status-live)'
                  : isPanic
                  ? '#ff5555'
                  : isPath
                  ? 'var(--color-text-muted)'
                  : 'var(--color-text)',
                fontSize:      'clamp(9px, 1.8vw, 12px)',
                lineHeight:    1.8,
                margin:        0,
                letterSpacing: '0.02em',
                fontWeight:    isPanic ? 700 : 400,
              }}
            >
              {line || '\u00A0'}
            </p>
          )
        })}

        {/* Cursor parpadeante al final */}
        {!done && (
          <span style={{
            color:     '#ff5555',
            animation: 'blink 1s linear infinite',
            fontSize:  '12px',
          }}>
            _
          </span>
        )}
      </div>
    </div>
  )
}