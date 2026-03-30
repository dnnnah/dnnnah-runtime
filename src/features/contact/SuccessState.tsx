'use client'

interface SuccessStateProps {
  onRestart: () => void
}

export function SuccessState({ onRestart }: SuccessStateProps) {
  return (
    <div style={{
      display:       'flex',
      flexDirection: 'column',
      gap:           '24px',
      animation:     'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
    }}>
      <div className="font-mono" style={{ fontSize: 'clamp(10px, 2vw, 12px)', lineHeight: 1.8 }}>
        <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{'>'} POST /api/contact</p>
        <p style={{ color: 'var(--color-status-live)', margin: 0 }}>{'  '}HTTP/1.1 200 OK</p>
        <p style={{ color: 'var(--color-status-live)', margin: 0 }}>{'  '}payload dispatched successfully ✓</p>
      </div>

      <div style={{
        background:    'rgba(80, 250, 123, 0.06)',
        border:        '1px solid rgba(80, 250, 123, 0.2)',
        borderRadius:  '8px',
        padding:       '24px',
        display:       'flex',
        flexDirection: 'column',
        gap:           '8px',
      }}>
        <p className="font-mono" style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: 'var(--color-accent-cyan)', margin: 0 }}>// 100% DISPATCHED</p>
        <p className="font-mono" style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', color: 'var(--color-text)', margin: 0, fontWeight: 700 }}>Message received. Back to you {'<'} 24h.</p>
        <p className="font-mono" style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: 'var(--color-status-live)', margin: 0 }}>// RUNTIME_SESSION: COMPLETED ✓</p>
      </div>

      <button
        onClick={onRestart}
        className="font-mono btn-primary"
        style={{
          fontSize:       'clamp(10px, 2vw, 12px)',
          minHeight:      '44px',
          cursor:         'pointer',
        }}
      >
        [ ./restart_runtime ]
      </button>
    </div>
  )
}