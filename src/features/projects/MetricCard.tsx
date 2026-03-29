'use client'

/**
 * Card de métrica individual para el sidebar del detalle.
 * Muestra un valor grande con su label debajo.
 */

interface MetricCardProps {
  value?: string
  label:  string
}

export function MetricCard({ value, label }: MetricCardProps) {
  if (!value) return null

  return (
    <div style={{
      backgroundColor: 'var(--color-bg-elevated)',
      borderRadius:    '6px',
      padding:         '12px 8px',
      textAlign:       'center',
    }}>
      <div className="font-mono" style={{
        fontSize:   'clamp(16px, 3vw, 20px)',
        fontWeight: 700,
        color:      'var(--color-accent)',
      }}>
        {value}
      </div>
      <div className="font-mono" style={{
        fontSize:   '9px',
        color:      'var(--color-text-muted)',
        marginTop:  '4px',
        letterSpacing: '0.05em',
      }}>
        {label}
      </div>
    </div>
  )
}